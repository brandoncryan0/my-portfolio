import katex from "katex";
import "katex/dist/katex.min.css";

export default function MathFormula({ tex }) {
  return <div className="eigen-formula" dangerouslySetInnerHTML={{
    __html: katex.renderToString(tex, { throwOnError: false, trust: false, displayMode: true }),
  }} />;
}
