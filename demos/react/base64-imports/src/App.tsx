import imgBase64 from "@/assets/star.svg?base64";

export default function App() {
  return (
    <code
      className="mono"
      role="figure"
      aria-label="Base64 representation of an image"
    >
      {imgBase64}
    </code>
  );
}
