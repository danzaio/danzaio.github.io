# Guias de locações de filmagem

Motor único (**core**) para guias interativos de locações de séries e filmes: mapa com GPS,
radar AR, bússola, câmera com guia de enquadramento e planejador de sol, missões de foto com a
cena original por cima, roteiros a pé, quiz, 6 idiomas, offline e app Android.
Cada guia é uma **franquia**: uma pasta de conteúdo que o build junta ao core.

| franquia | pasta | publicada em | estado |
| --- | --- | --- | --- |
| Porto Real — Game of Thrones em Dubrovnik | `franchises/got-dubrovnik/` | `../got-dubrovnik/` + APK | v13 |
| modelo para começar uma nova | `franchises/_template/` | — | esqueleto |

## Comandos

```bash
python3 guide/tools/build.py got-dubrovnik          # monta a pasta publicada
python3 guide/tools/build.py --all --check          # confere que tudo está em dia (o CI roda isto)
python3 guide/tests/run_all.py                      # testes (PASSOU/FALHOU contra gabaritos)
python3 guide/tools/frames/check.py got-dubrovnik   # cenas registradas = imagens na pasta
```

Ver localmente: `python3 guide/tools/build.py got-dubrovnik --to /tmp/g && cd /tmp/g && python3 -m http.server 8765`.

## Documentação

| arquivo | para quê |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | como o core e as franquias se juntam, fragmentos, ganchos `FX`, modelo de dados, armazenamento, serviços |
| [docs/NEW_FRANCHISE.md](docs/NEW_FRANCHISE.md) | passo a passo de uma franquia nova + checklist |
| [docs/CONTENT.md](docs/CONTENT.md) | padrão de texto de cada campo, textos de marca, 6 idiomas, fontes |
| [docs/FRAMES.md](docs/FRAMES.md) | achar, capturar, tratar, nomear e registrar cenas e antes e depois |
| [docs/TESTING.md](docs/TESTING.md) | runner, gabaritos, CI, o que cada teste confere |
| [docs/RELEASE.md](docs/RELEASE.md) | ciclo de mudança, versões, hospedagem web, APK Android |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | histórico do core e de cada franquia |

## Regras de ouro

1. **Nunca edite a pasta publicada** (`got-dubrovnik/`): ela é gerada. Edite `guide/` e rode o build.
2. **Core não cita lugar pelo nome.** Precisa de um lugar por função? Gancho no `FX` da franquia.
3. **Texto que cita franquia/cidade é da franquia** (`25-ui-brand.js`), nunca do core.
4. **Mudou o que um teste imprime?** Leia o diff, depois `--update`, e commit o gabarito junto.
5. **Frames de terceiros só em repositório privado**; tire `assets/frames/` antes de distribuir.
6. **Suba `swVersion`** a cada publicação, senão o celular continua com o cache velho.
