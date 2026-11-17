#!/usr/bin/env python3
"""Monta o guia de uma franquia: core/ + franchises/<id>/ -> pasta publicada (ex.: got-dubrovnik/).

    python3 guide/tools/build.py got-dubrovnik          # monta e grava na pasta de saída
    python3 guide/tools/build.py got-dubrovnik --check  # só confere se a pasta de saída está em dia (CI)
    python3 guide/tools/build.py --all [--check]        # todas as franquias (menos _template)
    python3 guide/tools/build.py _template --to /tmp/x  # monta em outra pasta (prévia, testes)

Regras (ver guide/docs/ARCHITECTURE.md):
- core/index.html e core/sw.js têm marcadores numa linha só:
    <!--@frag NOME-->  ou  /*@frag NOME*/   -> trocado pelo arquivo franchises/<id>/fragments/NOME
    /*@auto sw-frames*/                      -> lista das imagens de assets/frames para o cache offline
  e tokens @@CACHE@@ e @@SW_VERSION@@ (vêm do franchise.json).
- todo marcador precisa do fragmento, e todo fragmento precisa ser usado: sobra ou falta = erro.
- core/lib vai para <saída>/lib; franchises/<id>/assets/* vai para a raiz da saída.
- a pasta de saída é recriada inteira: não edite nada lá à mão.
"""
import json, os, re, shutil, sys, tempfile, filecmp

GUIDE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(GUIDE)
CORE = os.path.join(GUIDE, 'core')
FR_DIR = os.path.join(GUIDE, 'franchises')
MARK = re.compile(r'^\s*(?:<!--@frag ([\w.\-]+)-->|/\*@frag ([\w.\-]+)\*/)\s*$')
AUTO = re.compile(r'^\s*/\*@auto ([\w\-]+)\*/\s*$')


class BuildError(Exception):
    pass


def load_cfg(fid):
    p = os.path.join(FR_DIR, fid, 'franchise.json')
    if not os.path.exists(p):
        raise BuildError(f'franquia não encontrada: {p}')
    cfg = json.load(open(p, encoding='utf-8'))
    for k in ('id', 'out', 'cache', 'swVersion'):
        if k not in cfg:
            raise BuildError(f'{p}: falta "{k}"')
    if cfg['id'] != fid:
        raise BuildError(f'{p}: id "{cfg["id"]}" diferente da pasta "{fid}"')
    return cfg


def frames_line(fdir):
    d = os.path.join(fdir, 'assets', 'frames')
    names = sorted(n for n in os.listdir(d) if n.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))) if os.path.isdir(d) else []
    return '  ' + ', '.join(f"'./frames/{n}'" for n in names) + '];' if names else '  ];'


def assemble(text, fdir, used, cfg):
    frag_dir = os.path.join(fdir, 'fragments')
    out = []
    for line in text.split('\n'):
        m = MARK.match(line)
        a = AUTO.match(line)
        if m:
            name = m.group(1) or m.group(2)
            p = os.path.join(frag_dir, name)
            if not os.path.exists(p):
                raise BuildError(f'falta o fragmento {name} em {frag_dir}')
            body = open(p, encoding='utf-8').read()
            if body.endswith('\n'):
                body = body[:-1]
            out.extend(body.split('\n'))
            used.add(name)
        elif a:
            if a.group(1) == 'sw-frames':
                out.append(frames_line(fdir))
            else:
                raise BuildError(f'marcador automático desconhecido: {a.group(1)}')
        else:
            out.append(line)
    s = '\n'.join(out)
    for tok, key in (('@@CACHE@@', 'cache'), ('@@SW_VERSION@@', 'swVersion'), ('@@APP_VERSION@@', 'appVersion'), ('@@STORE@@', 'store'), ('@@IDB@@', 'idb')):
        if tok in s:
            if key not in cfg:
                raise BuildError(f'franchise.json: falta "{key}" (usado por {tok})')
            s = s.replace(tok, str(cfg[key]))
    left = re.findall(r'@@[A-Z_]+@@', s)
    if left:
        raise BuildError(f'tokens sem valor: {sorted(set(left))}')
    return s


def check_brand(fid, cfg):
    """toda chave de core/brand-keys.json precisa estar no 25-ui-brand.js da franquia, em cada idioma."""
    keys_p = os.path.join(CORE, 'brand-keys.json')
    frag = os.path.join(FR_DIR, fid, 'fragments', '25-ui-brand.js')
    if not os.path.exists(keys_p):
        return
    if not os.path.exists(frag):
        raise BuildError('falta fragments/25-ui-brand.js (textos de marca)')
    langs = cfg.get('languages', ['pt', 'en', 'es', 'de', 'fr', 'it'])
    js = ('const UI={' + ','.join(f'{l}:{{}}' for l in langs) + '};\n' + open(frag, encoding='utf-8').read()
          + '\nprocess.stdout.write(JSON.stringify(Object.fromEntries(Object.entries(UI).map(([l,o])=>[l,Object.keys(o)]))))')
    import subprocess
    r = subprocess.run(['node', '-e', js], capture_output=True, text=True)
    if r.returncode != 0:
        raise BuildError('25-ui-brand.js não roda: ' + r.stderr.strip().splitlines()[-1])
    have = json.loads(r.stdout)
    need = json.load(open(keys_p, encoding='utf-8'))
    miss = {l: [k for k in need if k not in have.get(l, [])] for l in langs}
    miss = {l: v for l, v in miss.items() if v}
    if miss:
        raise BuildError('textos de marca faltando: ' + '; '.join(f'{l}: {", ".join(v[:8])}{"…" if len(v) > 8 else ""}' for l, v in miss.items()))


def build_to(fid, dest):
    cfg = load_cfg(fid)
    check_brand(fid, cfg)
    fdir = os.path.join(FR_DIR, fid)
    used = set()
    os.makedirs(dest, exist_ok=True)
    for name in ('index.html', 'sw.js'):
        s = assemble(open(os.path.join(CORE, name), encoding='utf-8').read(), fdir, used, cfg)
        open(os.path.join(dest, name), 'w', encoding='utf-8', newline='\n').write(s)
    have = set(os.listdir(os.path.join(fdir, 'fragments')))
    extra = sorted(have - used)
    if extra:
        raise BuildError(f'fragmentos que o core não usa (renomeou algum marcador?): {extra}')
    shutil.copytree(os.path.join(CORE, 'lib'), os.path.join(dest, 'lib'))
    adir = os.path.join(fdir, 'assets')
    for n in sorted(os.listdir(adir)):
        if n in ('index.html', 'sw.js', 'lib'):
            raise BuildError(f'assets/{n} colide com um arquivo do core')
        src = os.path.join(adir, n)
        (shutil.copytree if os.path.isdir(src) else shutil.copy2)(src, os.path.join(dest, n))
    return cfg


def diff_dirs(a, b):
    out = []
    c = filecmp.dircmp(a, b)
    out += [f'só no build: {x}' for x in c.left_only] + [f'só na saída: {x}' for x in c.right_only]
    _, mism, errs = filecmp.cmpfiles(a, b, c.common_files, shallow=False)
    out += [f'diferente: {x}' for x in mism + errs]
    for d in c.common_dirs:
        out += [f'{d}/{x}' for x in diff_dirs(os.path.join(a, d), os.path.join(b, d))]
    return out


def sync(src, dst):
    """deixa dst igual a src sem apagar a pasta (servidores abertos nela continuam funcionando)."""
    os.makedirs(dst, exist_ok=True)
    for n in set(os.listdir(dst)) - set(os.listdir(src)):
        p = os.path.join(dst, n)
        shutil.rmtree(p) if os.path.isdir(p) and not os.path.islink(p) else os.remove(p)
    for n in os.listdir(src):
        a, b = os.path.join(src, n), os.path.join(dst, n)
        if os.path.isdir(a):
            if os.path.exists(b) and not os.path.isdir(b):
                os.remove(b)
            sync(a, b)
        elif not (os.path.isfile(b) and filecmp.cmp(a, b, shallow=False)):
            if os.path.isdir(b):
                shutil.rmtree(b)
            shutil.copy2(a, b)


def todo_count(fid):
    fdir = os.path.join(FR_DIR, fid)
    n = 0
    for root, _, files in os.walk(fdir):
        for f in files:
            if f.endswith(('.js', '.html', '.json', '.webmanifest')):
                n += open(os.path.join(root, f), encoding='utf-8').read().count('TODO')
    return n


def run(fid, check, to=None):
    cfg = load_cfg(fid)
    out = os.path.abspath(to) if to else os.path.join(REPO, cfg['out'])
    with tempfile.TemporaryDirectory() as tmp:
        dest = os.path.join(tmp, 'site')
        build_to(fid, dest)
        if check:
            if not os.path.isdir(out):
                print(f'✗ {fid}: pasta de saída {cfg["out"]}/ não existe — rode o build')
                return False
            d = diff_dirs(dest, out)
            if d:
                print(f'✗ {fid}: {cfg["out"]}/ desatualizada — rode: python3 guide/tools/build.py {fid}')
                for x in d[:30]:
                    print('   ', x)
                return False
            print(f'✓ {fid}: {cfg["out"]}/ em dia')
            return True
        sync(dest, out)
    n = sum(len(f) for _, _, f in os.walk(out))
    td = todo_count(fid)
    if td:
        print(f'⚠ {fid}: ainda há {td} "TODO" no conteúdo da franquia')
    print(f'✓ {fid} → {os.path.relpath(out, REPO)}/ ({n} arquivos, v{cfg.get("appVersion","?")}, cache {cfg["cache"]}-v{cfg["swVersion"]})')
    return True


def main(argv):
    check = '--check' in argv
    to = None
    if '--to' in argv:
        i = argv.index('--to'); to = argv[i + 1]; argv = argv[:i] + argv[i + 2:]
    args = [a for a in argv if not a.startswith('--')]
    if '--all' in argv:
        ids = sorted(d for d in os.listdir(FR_DIR) if not d.startswith('_') and os.path.isdir(os.path.join(FR_DIR, d)))
    elif args:
        ids = args
    else:
        print(__doc__)
        return 2
    ok = True
    for fid in ids:
        try:
            ok = run(fid, check, to if len(ids) == 1 else None) and ok
        except BuildError as e:
            print(f'✗ {fid}: {e}')
            ok = False
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
