import { readFile, writeFile, mkdir, rm } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = fileURLToPath(new URL("../", import.meta.url))
const template = await readFile(resolve(root, "dist/index.html"), "utf8")
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("The Vite template must contain the app-head and app-html placeholders.")
}
const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href)
const routes = [
  ["/", "index.html"],
  ["/work/public-broadcaster-kpi-pilot/", "work/public-broadcaster-kpi-pilot/index.html"],
  ["/work/municipal-systems-modernization/", "work/municipal-systems-modernization/index.html"],
  ["/work/ai-quota-hud/", "work/ai-quota-hud/index.html"],
  ["/404.html", "404.html"],
]

for (const [url, filename] of routes) {
  const { html, head } = render(url)
  const destination = resolve(root, "dist", filename)
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, template.replace("<!--app-head-->", () => head).replace("<!--app-html-->", () => html))
  console.log(`Prerendered ${url}`)
}
await rm(resolve(root, "dist-ssr"), { recursive: true, force: true })
