import "ui/styles.scss";
import { initImageSizeAdjustment } from "ui/image-size-adjustment";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
initImageSizeAdjustment();