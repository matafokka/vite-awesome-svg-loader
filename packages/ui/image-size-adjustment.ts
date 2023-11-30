/**
 * Initializes image size adjustment controls. Should be called when demo app is mounted.
 */
export function initImageSizeAdjustment() {
  const min = "10";
  const max = "500";
  const initialValue = "100";

  const container = document.createElement("div");
  container.className = "adjustment-content";

  const label = document.createElement("label");
  label.htmlFor = "size-input";
  label.innerText = "Image size (px):";

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = min;
  slider.max = max;
  slider.step = "1";
  slider.tabIndex = 0;
  slider.value = initialValue;
  slider.setAttribute("aria-hidden", "true");

  const input = document.createElement("input");
  input.id = "size-input";
  input.type = "number";
  input.min = min;
  input.max = max;
  input.step = "10";
  input.value = initialValue;

  container.appendChild(label);
  container.appendChild(slider);
  container.appendChild(input);

  document.getElementById("adjustment-container")?.appendChild(container);

  const updateVar = () => {
    document.documentElement.style.setProperty("--image-size", slider.value + "px");
  };

  slider.addEventListener("input", () => {
    input.value = slider.value;
    updateVar();
  });

  input.addEventListener("input", () => {
    if (input.checkValidity()) {
      slider.value = input.value;
      updateVar();
    }
  });

  updateVar();
}
