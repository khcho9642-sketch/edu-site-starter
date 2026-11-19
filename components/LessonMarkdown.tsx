import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { SetupScreenshot } from "./SetupScreenshot";

export default function LessonMarkdown({ markdown }: { markdown: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{
    h2({ children }) { return <h2 id={String(children) === "화면 보며 따라 하기" ? "walkthrough" : undefined} className="scroll-mt-24">{children}</h2>; },
    p({ node, children }) { return node?.children.some((child) => child.type === "element" && child.tagName === "img") ? <div className="flow-root">{children}</div> : <p>{children}</p>; },
    img({ src, alt }) {
      if (typeof src !== "string") return null;
      if (src.startsWith("/materials/walkthrough/screens/") || src.startsWith("/materials/setup/")) return <SetupScreenshot src={src} />;
      // Preserve the default Markdown image behavior for existing courses.
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt ?? ""} />;
    },
  }}>{markdown}</ReactMarkdown>;
}
