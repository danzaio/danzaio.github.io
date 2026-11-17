# Cenas (frames) e antes e depois

Como achar, capturar, tratar, nomear e registrar as imagens das cenas que vêm dentro do app.
Vale para qualquer franquia. Tudo aqui foi usado de verdade na de Game of Thrones (Dubrovnik).

> **Direitos e créditos.** Frames de séries/filmes e fotos de blogs têm dono. Publicar com eles é
> decisão do dono do guia (na de GoT: publicar com crédito). Toda fonte usada entra em `CREDITS`
> (`50-frames.js`), que aparece em Mais › Sobre com link, e em `HSRC` para as fotos de hoje.
> Se um dono pedir para tirar, apague os arquivos dele, remova as entradas e publique: o app
> continua funcionando, e cada missão tem os botões para a pessoa adicionar os próprios prints.

## O que é cada imagem

| tipo | o que é | onde aparece no app |
| --- | --- | --- |
| **cena** | frame da série/filme no enquadramento da missão | cartão da missão, visor, câmera (canto e guia por cima), encaixe lado a lado |
| **hoje** | foto do mesmo lugar como está agora, **do mesmo ângulo** da cena | botão **Cena \| Hoje** no cartão, visor (as duas empilhadas), câmera (botão Cena/Hoje) |
| **extra do lugar** | cena boa daquele lugar que não é de nenhuma missão | galeria na ficha do lugar |

A foto de hoje é o que mais ajuda no local: ela mostra os prédios reais sem cenário digital,
então é por ela que a pessoa alinha o celular.

## Ordem de preferência das fontes

1. **Sites de locação com antes e depois** (cena + foto de hoje do mesmo ângulo). São a melhor
   fonte, porque dão as duas coisas já casadas. Na de GoT: *Bored Panda* (série do schmollywood1)
   e *Greta's Travels*.
2. **Sites de locação com capturas grandes da cena** (1000 px ou mais). Na de GoT: weseektravel e sceen-it.
3. **Clipes no YouTube**, capturados no segundo exato do take. Servem para completar o que
   faltar ou para ter uma versão maior. Prefira o canal oficial e os uploads em 1080p/4K.

Descarte:
- imagens menores que ~500 px de largura;
- montagens com recortes pequenos (ex.: 690×260 com três fotos dentro);
- marcas d'água por cima da cena;
- fotos em que pessoas comuns aparecem de frente e em destaque (amigos do blogueiro etc.);
- frames com nudez ou violência explícita. A cena precisa servir de guia de enquadramento,
  então escolha outro segundo do mesmo take.

## Pesquisa

- Busque `"<cidade>" "<franquia>" filming locations then and now`, `... before and after`,
  `... side by side`, e o nome de cada locação.
- Anote para cada missão: temporada/episódio, nome da cena, fonte, e se tem foto de hoje.
- Antes e depois de site e captura do YouTube costumam ser **a mesma cena**: use a captura
  maior como cena e a foto de hoje do site como par (ex.: `w-pilebay` + `h-pilebay`).

## Capturar

O sandbox do Claude **não baixa** imagens desses sites (o proxy bloqueia). Por isso tudo passa
pelo Chrome do usuário (Claude in Chrome): a imagem é mostrada no tamanho real e vira print
salvo em disco.

### Imagem de site (antes e depois)

1. Abra a página no Chrome e recuse cookies não essenciais.
2. Se o JavaScript for permitido no site, liste as imagens grandes:
   `document.querySelectorAll('img')` → pegue o maior item do `srcset`.
3. Abra a URL da imagem direto na aba. Se ela for mais alta que a janela, o Chrome reduz a
   imagem: rode na aba
   ```js
   const i=document.images[0];window.__p=b=>{i.style.cssText='position:fixed;left:0;top:'+(b?innerHeight-i.naturalHeight:0)+'px;width:'+i.naturalWidth+'px;height:'+i.naturalHeight+'px;max-width:none;max-height:none;margin:0'};__p(0)
   ```
   tire o print, depois `__p(1)` e outro print, e junte com `stitch.py`.
4. Se o JavaScript **não** for permitido (ex.: Bored Panda), role a página até a imagem
   (`find` → `scroll_to` + setas) e tire o print da página inteira; `blocks.py` recorta as
   imagens da coluna.
5. Antes e depois vertical num arquivo só: `split.py` divide na emenda.
6. Ícone de "compartilhar" desenhado por cima da cena (Bored Panda): `unshare.py`.

### Frame do YouTube

Use `guide/tools/frames/yt_capture.js`:

1. Na página do vídeo (`youtube.com/watch?v=ID`), rode o **passo 1** com os segundos do take.
   Ele força a maior qualidade, desenha cada segundo num canvas (1080p/4K reduzidos para
   1280 px) e guarda no `localStorage`.
2. Abra `youtube.com/robots.txt` na mesma aba e rode o **passo 2**. `__show(i,0)` mostra o
   frame no canto, no tamanho real. Leve o mouse para fora da imagem e tire o print salvando em disco.
3. Janela com menos de 720 px de altura: tire também `__show(i,1)` e junte com `stitch.py`.
4. Limpe o `localStorage` no fim.

**Nunca tire print da página do vídeo.** O player congela o renderizador e a aba para de
responder até ser fechada. Por isso o frame passa pelo `robots.txt`.

Vídeo 4K HDR sai escuro no canvas: corrija com `brighten.py`.

## Tratar e nomear

| prefixo | origem | exemplo |
| --- | --- | --- |
| `p-<missão>-N` | YouTube, no segundo do take da missão | `p-torneio-1.jpg` |
| `w-<lugar>` | captura de site (weseektravel, sceen-it…) | `w-pilebay.jpg` |
| `bp-<nome>` / `g-<nome>` | cena de antes e depois (Bored Panda, Greta's…) | `bp-jesuit.jpg` |
| `<cena>-hoje` | foto de hoje que acompanha uma cena `bp-`/`g-` | `bp-jesuit-hoje.jpg` |
| `h-<lugar>` | foto de hoje que acompanha uma cena `w-` | `h-pilebay.jpg` |

- Formato JPEG, qualidade 85–90, progressivo; até 1280 px de largura (`crop.py` e `stitch.py` já salvam assim).
- Minúsculas, sem acento, hífen como separador.
- Confira cada par cena/hoje lado a lado antes de registrar: precisa ser o **mesmo ângulo**.

## Registrar

Em `franchises/<id>/fragments/50-frames.js`:

```js
const FR={'p-missao':[['arquivo',largura,altura], ...]};   // 1ª = a que abre primeiro
const LFR={'lugar':[['arquivo',largura,altura]]};           // extras na ficha do lugar
const HOJE={'arquivo-da-cena':['arquivo-hoje',largura,altura,'fonte']};
const HSRC={fonte:'Nome do site · autor'};                  // crédito mostrado com a foto de hoje
const CREDITS=[{n:'Nome',u:'https://…',r:['scenes','today','clips']}]; // lista em Sobre
```

Ordem dentro de `FR`: primeiro a cena **que tem foto de hoje e é do ângulo da missão**,
depois as maiores, e por último as variações (close, outro momento do take).

Os segundos dos clipes (botões ▶ 0:55 no app) ficam em `61-clips.js` (`YT`) e o take escolhido
de cada missão em `60-takes.js` (`TAKE`).

Depois:

```bash
python3 guide/tools/frames/check.py <id>   # arquivo existe, tamanho bate, nada sobrando
python3 guide/tools/build.py <id>          # a lista do cache offline é gerada sozinha
```

## Ferramentas (`guide/tools/frames/`)

| arquivo | faz |
| --- | --- |
| `yt_capture.js` | captura de frames do YouTube em duas etapas (vídeo → robots.txt) |
| `crop.py out shot [W H]` | recorta o frame do canto superior esquerdo do print |
| `stitch.py out topo fundo [W H]` | junta os prints de topo e fundo quando a imagem é mais alta que a janela |
| `blocks.py prefixo shot [x0 x1]` | acha e recorta as imagens inteiras numa coluna de página (blogs) |
| `split.py composto cena hoje` | divide um antes e depois vertical na emenda |
| `unshare.py arquivos…` | apaga o botão de compartilhar desenhado no canto da imagem |
| `brighten.py arquivos…` | clareia frames escuros de vídeos HDR |
| `check.py <id>` | confere `50-frames.js` contra `assets/frames/` |
