import { renderToString } from "react-dom/server"
import App from "./App"
import { getPage, ORIGIN } from "./content"

function escapeAttribute(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!)
}

export function render(url: string) {
  const page = getPage(url)
  const title = escapeAttribute(page.title)
  const description = escapeAttribute(page.description)
  const canonical = escapeAttribute(`${ORIGIN}${page.path === "/" || page.study || page.booking ? page.path : "/404.html"}`)
  const head = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="${page.type}" />${page.path !== "/" && !page.study && !page.booking ? '\n    <meta name="robots" content="noindex" />' : ""}`
  return { html: renderToString(<App url={url} />), head }
}
