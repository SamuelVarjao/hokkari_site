# Site Hokkari

Site one-page da Hokkari, uma padaria-café de panificação japonesa moderna. Foi feito em HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

**Por que sem framework:** é uma página de vendas estática. HTML puro carrega mais rápido, chega mais facilmente a Lighthouse acima de 90 e pode ser publicado em qualquer hospedagem sem configuração.

## Estrutura

```
index.html              página principal (6 blocos)
cardapio.html           cardápio completo (preços editáveis direto no HTML)
assets/css/styles.css   estilos (mobile-first, cores em variáveis no topo)
assets/js/config.js     ← TODOS os dados editáveis ficam aqui
assets/js/main.js       links do WhatsApp, menu, animações e schema.org
assets/img/             logos, padrão, fotos (WebP) e favicon
```

## Onde editar os dados

Abra `assets/js/config.js`. Lá estão o WhatsApp, a URL do cardápio, o endereço, os **horários (ainda não preenchidos)**, o Instagram, os preços, os pesos e as mensagens. Todos os botões e o rodapé são preenchidos a partir desse arquivo, assim como os dados estruturados `Bakery`.

Para alterar itens ou preços do cardápio, edite `cardapio.html`: cada item é um `<li class="menu-item">` com nome, preço e descrição.
Quando o domínio for definido, atualize `siteUrl` no config e as tags `canonical` e `og:*` no `<head>` do `index.html`.

## Como publicar

**Netlify (mais simples):** acesse app.netlify.com/drop e arraste a pasta `hokkari-site`. Para usar domínio próprio, vá em *Domain settings*.

**Vercel:** `npx vercel` dentro da pasta. Também dá para importar o repositório pelo painel, com o preset "Other" e sem comando de build.

**GitHub Pages:** suba a pasta para um repositório e ative em *Settings → Pages → Deploy from branch → main / root*.

**Hospedagem comum (Hostinger etc.):** envie o conteúdo da pasta para `public_html`.

Para ver localmente: `python -m http.server 8000` dentro da pasta. Depois abra http://localhost:8000.

## Identidade visual aplicada

Segue a *Apresentação de Marca Hokkari (2026)*:

- **Cores:** vermelho `#8C0808` e creme `#ECDEC9` (principais), branco e preto (apoio). Não há outros tons no site.
- **Fontes:** Times New Roman nos títulos e Helvetica no texto. São fontes do sistema, sem download, o que deixa o site mais leve.
- **Logotipo:** a versão colorida (positiva) fica no topo, sobre o creme, e a versão creme (negativa) no rodapé preto. A logo não recebe efeitos, rotação nem distorção.
- **Padrão japonês:** usado só como textura sutil no fundo vermelho da seção "O que é Shokupan".

Arquivos da marca em `assets/img/`: `logo-vermelho.webp`, `logo-creme.webp`, `simbolo-*.webp`, `padrao.png` e `favicon.png`.
Se houver a logo em SVG, troque os `.webp` por ela para ter nitidez máxima.

## Fotos a produzir

As fotos atuais são **provisórias**, retiradas da Apresentação de Marca. Antes de publicar, confirme que vocês têm direito de uso sobre elas, ou substitua-as pelas fotos reais.
Mantenha o **mesmo nome de arquivo e a mesma proporção**. Exporte em WebP com qualidade entre 75 e 82.
Direção de arte: luz natural, madeira clara, cerâmica neutra e fundo creme. O produto fala por si.

| Arquivo | Tamanho | O que fotografar |
|---|---|---|
| `hero.webp` (+ opcional vídeo) | 1200×1440 | Close do miolo do shokupan sendo rasgado, mostrando os fios |
| `shokupan-branco.webp` | 900×900 | Shokupan Branco inteiro e fatias, em fundo creme |
| `shokupan-integral.webp` | 900×900 | Shokupan Integral no mesmo enquadramento do Branco |
| `cafe.webp` | 900×1200 | Café e sando no balcão da Hokkari |
| `sobre.webp` | 1000×1200 | Mãos da equipe trabalhando a massa |
| `og-image.jpg` | 1200×630 | Imagem de compartilhamento. Hoje é a logo sobre o creme; pode virar uma foto com a logo |
