import { NamedIcon } from "@/NamedIcon";

export function main() {
  NamedIcon.define();

  document.getElementById("app")!.innerHTML += `
    <div class="images">
      <named-icon
        name="music"
        color="red"
      ></named-icon>
      <named-icon
        name="star"
        color="forestgreen"
      ></named-icon>
      <named-icon
        name="video"
        color="cornflowerblue"
      ></named-icon>
    </div>
  `;
}
