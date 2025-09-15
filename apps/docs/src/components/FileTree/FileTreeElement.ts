import { BaseComponent } from "@/components/BaseComponent";
import { getFileName } from "@/utils/files";

const scriptExtensionsByPreference = [["ts", "mts"], ["js", "mjs"], "html"];
const entryPointsBaseNames = ["index", "main"];
const firstActiveElementCandidates: string[] = ["App"];

for (const exts of scriptExtensionsByPreference) {
  for (const ext of exts) {
    for (const baseName of entryPointsBaseNames) {
      firstActiveElementCandidates.push(baseName + "." + ext);
    }
  }
}

export class FileTreeElement extends BaseComponent {
  /**
   * Path of the currently selected element
   */
  get selectedPath() {
    return this.#internalSelectedPath;
  }

  #internalSelectedPath = "";

  init() {
    const buttons = this.querySelectorAll("button[data-tree-item]") as NodeListOf<HTMLButtonElement>;
    let prevActiveButton: HTMLButtonElement | undefined;

    const getPathFromButton = (button: HTMLButtonElement) => button.dataset.fullPath || "";

    const setSelectedPath = (button: HTMLButtonElement) => {
      if (prevActiveButton) {
        prevActiveButton.classList.remove("active");
        prevActiveButton.disabled = false;
      }

      prevActiveButton = button;
      button.disabled = true;
      button.classList.add("active");
      this.#internalSelectedPath = getPathFromButton(button);
      this.dispatchEvent(new TreeSelectionChangeEvent(this.selectedPath));
    };

    // Add event listeners

    for (const button of buttons) {
      button.addEventListener("click", () => setSelectedPath(button));
    }

    // Find first active element

    (() => {
      for (const candidate of firstActiveElementCandidates) {
        for (const button of buttons) {
          const name = getFileName(getPathFromButton(button));

          if (!name.includes(candidate)) {
            continue;
          }

          setSelectedPath(button);

          // Scroll to button if it's not visible. We have to wait until the tree is visible (if shown first on mobile).

          const onFrame = () => {
            if (!this.clientWidth && !this.clientHeight) {
              requestAnimationFrame(onFrame)
            }

            const visibilityOffset = 12

            if (button.offsetTop < visibilityOffset || button.offsetTop > this.clientHeight - visibilityOffset) {
              this.scrollTop = button.offsetTop - visibilityOffset;
            }
          }

          onFrame()
          return
        }
      }
    })();
  }
}

/**
 * Emitted when <file-tree> changes active selection
 */
export class TreeSelectionChangeEvent extends Event {
  constructor(
    /**
     * Full path to selected item
     */
    public filePath: string,
  ) {
    super("treeselectionchange", { cancelable: false });
  }
}

if (typeof window !== "undefined") {
  customElements.define("file-tree", FileTreeElement);
}
