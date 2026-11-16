#!/usr/bin/env python3
"""Roda os testes do guia e diz PASSOU/FALHOU.

    python3 guide/tests/run_all.py                    # got-dubrovnik, todos os testes, 4 em paralelo
    python3 guide/tests/run_all.py --only v15,v16     # só alguns
    python3 guide/tests/run_all.py --update           # regrava os gabaritos (depois de conferir as diferenças!)
    python3 guide/tests/run_all.py --franchise _template --only smoke
    python3 guide/tests/run_all.py --engine webkit --only smoke   # motor do Safari (precisa: playwright install webkit)

Como funciona:
- monta a franquia numa pasta temporária (build.py --to) e serve numa porta livre;
- cada script roda numa cópia em que localhost:8765 vira a porta certa e /home/claude/tests/
  vira a pasta de prints da rodada (os scripts foram escritos para o sandbox, ver TESTING.md);
- um teste PASSA quando termina com código 0, não tem erro de página e a saída, normalizada,
  é igual ao gabarito em tests/golden/<franquia>/<script>.out. Sem gabarito, basta não falhar.
"""
import argparse, concurrent.futures as cf, difflib, functools, http.server, os, re, shutil, socket, subprocess, sys, tempfile, threading, time

HERE = os.path.dirname(os.path.abspath(__file__))
GUIDE = os.path.dirname(HERE)
SKIP = {'og.py', 'clean.py', 'run_all.py'}          # geram imagens de divulgação, não testam nada
ARGS = {'rm.py': ['mock'], 'smoke.py': None}         # smoke recebe o motor
VOLATILE = [(re.compile(r'data:image/[a-z]+;base64,[A-Za-z0-9+/=]+'), 'data:image…'),
            (re.compile(r'blob:http://localhost:\d+/[0-9a-f-]+'), 'blob:…'),
            (re.compile(r'localhost:\d+'), 'HOST'),
            (re.compile(r'\d+\.\d+s elapsed'), '')]


def free_port():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p


def serve(root, port):
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
    http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', port), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def norm(text, shots):
    text = text.replace(shots, 'SHOTS/')
    for rx, rep in VOLATILE:
        text = rx.sub(rep, text)
    return text.rstrip() + '\n'


def run_one(name, port, shots, engine, timeout):
    src = open(os.path.join(HERE, name), encoding='utf-8').read()
    src = src.replace('localhost:8765', f'localhost:{port}').replace('/home/claude/tests/', shots)
    tmp = os.path.join(shots, '_scripts'); os.makedirs(tmp, exist_ok=True)
    path = os.path.join(tmp, name); open(path, 'w', encoding='utf-8').write(src)
    args = ARGS.get(name, [])
    if name == 'smoke.py':
        args = [engine]
    t0 = time.time()
    try:
        r = subprocess.run([sys.executable, path] + args, cwd=shots, capture_output=True, text=True, timeout=timeout)
        out, code = r.stdout + (('\n[stderr]\n' + r.stderr) if r.returncode else ''), r.returncode
    except subprocess.TimeoutExpired as e:
        out, code = (e.stdout or b'').decode() if isinstance(e.stdout, bytes) else (e.stdout or ''), 'timeout'
    return name, code, out, time.time() - t0


def page_errors(out):
    bad = []
    for line in out.splitlines():
        m = re.match(r'\s*(ERRS|erros:)\s*(.*)', line)
        if m and m.group(2).strip() not in ('[]', 'nenhum', ''):
            bad.append(line.strip()[:200])
        if 'PAGEERROR' in line:
            bad.append(line.strip()[:200])
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--franchise', default='got-dubrovnik')
    ap.add_argument('--only', default='')
    ap.add_argument('--update', action='store_true')
    ap.add_argument('--engine', default='chromium')
    ap.add_argument('-j', type=int, default=4)
    ap.add_argument('--timeout', type=int, default=600)
    ap.add_argument('--keep', action='store_true', help='não apaga a pasta de prints')
    ap.add_argument('--work', default='', help='pasta da rodada (padrão: temporária)')
    a = ap.parse_args()

    names = sorted(n for n in os.listdir(HERE) if n.endswith('.py') and n not in SKIP)
    if a.only:
        want = {x if x.endswith('.py') else x + '.py' for x in a.only.split(',')}
        names = [n for n in names if n in want]
    if a.franchise != 'got-dubrovnik' or a.engine != 'chromium':
        names = [n for n in names if n == 'smoke.py']   # os outros testes conhecem o conteúdo de GoT
    golden_dir = os.path.join(HERE, 'golden', a.franchise + ('' if a.engine == 'chromium' else '-' + a.engine))

    work = os.path.abspath(a.work) if a.work else tempfile.mkdtemp(prefix='guide-test-')
    if a.work and os.path.exists(work):
        shutil.rmtree(work)
    os.makedirs(work, exist_ok=True)
    site, shots = os.path.join(work, 'site'), os.path.join(work, 'shots') + '/'
    r = subprocess.run([sys.executable, os.path.join(GUIDE, 'tools', 'build.py'), a.franchise, '--to', site], capture_output=True, text=True)
    if r.returncode:
        print(r.stdout + r.stderr); sys.exit(1)
    os.makedirs(shots, exist_ok=True)
    shutil.copytree(os.path.join(HERE, 'fake'), os.path.join(shots, 'fake'))
    y4m = os.path.join(shots, 'fake', 'scene.y4m')
    if not os.path.exists(y4m) and shutil.which('ffmpeg'):
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-loop', '1', '-i', os.path.join(shots, 'fake', 'scene.png'), '-t', '1', '-r', '10', '-pix_fmt', 'yuv420p', y4m])
    port = free_port(); srv = serve(site, port)
    print(f'franquia {a.franchise} · motor {a.engine} · {len(names)} testes · servidor :{port} · prints em {shots}')

    results = []
    with cf.ThreadPoolExecutor(a.j) as ex:
        futs = [ex.submit(run_one, n, port, shots, a.engine, a.timeout) for n in names]
        for f in cf.as_completed(futs):
            results.append(f.result())
            n, code, out, dt = results[-1]
            print(f'  · {n} terminou ({dt:.0f}s)', flush=True)
    srv.shutdown()

    fails = 0
    os.makedirs(golden_dir, exist_ok=True)
    print()
    for n, code, out, dt in sorted(results):
        o = norm(out, shots)
        gp = os.path.join(golden_dir, n.replace('.py', '.out'))
        why = []
        if code != 0:
            why.append(f'código {code}')
        why += page_errors(o)
        if a.update and code == 0:
            open(gp, 'w', encoding='utf-8').write(o)
        elif os.path.exists(gp):
            g = open(gp, encoding='utf-8').read()
            if g != o:
                d = list(difflib.unified_diff(g.splitlines(), o.splitlines(), 'gabarito', 'agora', lineterm='', n=0))
                why.append('saída diferente do gabarito:\n      ' + '\n      '.join(x[:180] for x in d[2:40]))
        ok = not why
        fails += not ok
        print(f'{"✓ PASSOU" if ok else "✗ FALHOU"}  {n:12} {dt:5.0f}s' + ('' if ok else '  — ' + '; '.join(why)))
        if not ok and code != 0:
            print('      ' + '\n      '.join(o.strip().splitlines()[-12:]))
    print(f'\n{len(results) - fails}/{len(results)} passaram' + (' · gabaritos regravados' if a.update else ''))
    if not a.keep and not fails:
        shutil.rmtree(work, ignore_errors=True)
    else:
        print(f'prints e scripts da rodada: {shots}')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
