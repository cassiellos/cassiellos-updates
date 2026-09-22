# Arquivos oficiais da marca — PENDENTE

Os três arquivos SVG desta pasta são **placeholders do projeto**, não a
identidade do Studio Macleny Nails. Eles existem apenas para documentar os
caminhos esperados e para que o validador de configuração tenha o que checar.

Substituir por:

| Arquivo               | Conteúdo esperado                                  |
| --------------------- | -------------------------------------------------- |
| `logo-primary.svg`    | Assinatura principal do rebranding                 |
| `logo-horizontal.svg` | Versão horizontal, usada no header e no footer     |
| `logo-symbol.svg`     | Símbolo isolado (patrimônio oficial da marca)      |

Depois de substituir, marque `assets.officialBrandFiles: true` em
`lib/site-config.ts`. Só a partir daí a interface deixa de usar o fallback
tipográfico e o JSON-LD passa a declarar `logo`.

**Não** redesenhe a marca, não gere um monograma novo e não trate texto digitado
em Instrument Serif como se fosse o wordmark oficial.
