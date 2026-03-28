import imgBase64 from "@/assets/star.svg?base64";

export function main() {
  document.getElementById("app")!.innerHTML += `
    <code
      class="mono"
      role="figure"
      aria-label="Base64 representation of an image"
    >
      ${imgBase64}
    </code>
  `;
}
