import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SetupScreenshot } from "./SetupScreenshot";

export function SetupGuide({ markdown }: { markdown: string }) {
  return <article className="prose-edu mt-8"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h2({ children }) { const number = String(children).match(/^([0-9]+)\./)?.[1]; return <h2 id={number ? `step-${number}` : undefined} className="scroll-mt-24">{children}</h2>; },
    p({ node, children }) { return node?.children.some((child) => child.type === "element" && child.tagName === "img") ? <div>{children}</div> : <p>{children}</p>; },
    img({ src }) { return typeof src === "string" ? <SetupScreenshot src={src} /> : null; },
  }}>{markdown}</ReactMarkdown></article>;
}
