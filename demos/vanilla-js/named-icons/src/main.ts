import { NamedIcon } from "@/NamedIcon";

export function main() {
  // Initial markup

  document.getElementById("app")!.innerHTML += `
    <div
      id="icons"
      class="images"
    >
    </div>
  `;

  // Create icons

  const icons = ["music", "star", "video"];
  const container = document.getElementById("icons")!;

  for (const name of icons) {
    new NamedIcon(name, container).setColor("orange").getSvgEl().classList.add("image");
  }
}
