# LLUCKTEC — Site institucional

Projeto estático pronto para GitHub Pages. A seção **Serviços** usa o conceito **Linha de Energia LLUCKTEC**; Hero, cabeçalho, Certificações, Regiões e WhatsApp flutuante permanecem separados dessa implementação.

## Publicar no GitHub Pages
1. Extraia o ZIP.
2. Envie o conteúdo da pasta `llucktec-linha-energia` para a raiz do repositório no GitHub.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch principal (`main`) e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

Todos os caminhos do projeto são relativos, portanto funcionam no GitHub Pages sem alteração.

## Arquivos principais
- `index.html`: estrutura e textos do site.
- `styles.css`: identidade visual, responsividade e animações.
- `script.js`: menu, Hero, Linha de Energia e Certificações.

## Ícones 3D dos seis serviços
Ficam em `assets/images/`:
- `residencial.png`
- `industrial.png`
- `manutencao.png`
- `automacao.png`
- `spda.png`
- `laudos.png`

Para substituir um ícone, mantenha o mesmo nome de arquivo ou altere o caminho correspondente no array `services` em `script.js`.

## Alterar textos dos serviços
No `script.js`, procure por `const services=[`. Cada objeto contém `title`, `plain` e `desc`.

## Alterar telefone / WhatsApp
O número atual é `5548991169113`. Procure por esse número em `index.html` e `script.js` e substitua pelo novo número com DDI + DDD + telefone, somente dígitos.

## Ajustar a Linha de Energia
No `styles.css`, procure por `SERVIÇOS — Linha de Energia LLUCKTEC` para alterar dimensões, glow, espaçamentos, ícones e HUD.
No `script.js`, na seção com o mesmo título:
- `syncEnergy()` controla a progressão da energia pelo scroll;
- `buildRoute()` controla o percurso técnico do circuito;
- `drawEnergy()` posiciona nós, ramificações e a linha principal;
- `energyFloat` em `styles.css` controla a flutuação dos ícones.

O modo `prefers-reduced-motion: reduce` remove animações contínuas e mantém o conteúdo visível.


## Regiões de atendimento / Google Maps
A seção `#regioes` usa o Google Maps oficial em iframe, sem chave de API e sem backend. As cidades ficam como texto real no `index.html`; ao clicar, `script.js` troca somente a consulta do iframe e mantém a página aberta.

- **Editar cidades:** altere os botões `.city-item` no `index.html` e o atributo `data-city`.
- **Base estratégica:** atualmente é apenas `Santo Amaro da Imperatriz – SC`, sem endereço inventado. Edite o botão `.city-base` e a ação `#show-base` se a base mudar.
- **Raio de 20 km:** o texto fica em `.radius-block`. O iframe sem chave não permite desenhar um círculo geográfico oficial. Para exibir o círculo real, migre somente o mapa para Google Maps JavaScript API e use `google.maps.Circle`; configure a chave no Google Cloud com restrições de HTTP referrer para o domínio do GitHub Pages e o futuro domínio oficial. Nunca coloque credenciais privadas no repositório.
- **WhatsApp/CTAs:** reutilizam o mesmo `wa.me` já configurado no restante do projeto.
- **Mapa inicial:** Grande Florianópolis. O link “Abrir no Google Maps” acompanha a cidade selecionada.


## Dúvidas Frequentes / Central Técnica
A seção `#duvidas` mantém as 12 perguntas e respostas como texto real em `index.html`. Para editar uma pergunta ou resposta, altere o respectivo `.faq-item`. A categoria é definida em `data-category` (`atendimento`, `projetos`, `seguranca` ou `regioes`).

Os filtros e o accordion são controlados por `initFaqCentral()` em `script.js`. Apenas uma resposta fica aberta por vez. O contador é calculado automaticamente a partir dos itens visíveis.

Os CTAs reutilizam o mesmo WhatsApp do restante do projeto. Para alterar o telefone/WhatsApp, procure `5548991169113` no projeto. Para trocar ou adicionar futuramente um ícone 3D na Central Técnica, substitua o SVG dentro de `.faq-tech-icon` em `index.html` por uma imagem em `assets/images/`, mantendo o container. As microanimações ficam no bloco `DÚVIDAS FREQUENTES — Central Técnica LLUCKTEC` em `styles.css`; `faqLed` controla o LED e `.faq-reveal` controla a entrada. O modo `prefers-reduced-motion` desativa os efeitos decorativos contínuos.


## Logo do header
A logo aprovada usada no header está em `assets/logo/llucktec-logo.png`. Substitua esse arquivo mantendo o mesmo nome para trocar a marca sem alterar o HTML.


## Footer — Final do Circuito LLUCKTEC
O rodapé fica no final de `index.html`, no bloco `Footer: Final do Circuito LLUCKTEC`.

- **Copyright e ano:** edite o texto dentro de `.footer-bottom` no `index.html`. O ano atual está fixo em 2026.
- **Links do footer:** edite os links dentro de `.footer-links`, reutilizando os IDs existentes (`#servicos`, `#certificacoes`, `#regioes`, `#duvidas`).
- **WhatsApp/contato:** o footer reutiliza o mesmo `wa.me` do restante do projeto. Para alterar, procure `5548991169113` no projeto. Telefone e e-mail não foram adicionados porque não existem como contatos separados no projeto atual.
- **Base estratégica:** edite `.footer-base` no `index.html`; atualmente usa apenas `Santo Amaro da Imperatriz — SC`, sem endereço.
- **Voltar ao topo:** o link `.back-to-top` aponta para `#inicio` e utiliza o `scroll-behavior: smooth` já existente.
- **Visual/animação:** estilos ficam no bloco `FOOTER — Final do Circuito LLUCKTEC` de `styles.css`; a revelação de entrada fica em `initSiteFooter()` no `script.js`.
