import { NamedIcon } from "@/NamedIcon";

export function main() {
  document.getElementById("app")!.innerHTML += `
    <div
      id="icons"
      class="images"
    >
    </div>
  `;

  new NamedIcon("music", "#icons").setColor("red");
  new NamedIcon("star", "#icons").setColor("forestgreen");
  new NamedIcon("video", "#icons").setColor("cornflowerblue");
}
