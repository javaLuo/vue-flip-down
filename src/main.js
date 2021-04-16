import { createApp } from "vue";
import App from "./App.vue";
import { ElDivider, ElInput, ElSelect, ElOption } from "element-plus";

const app = createApp(App);
app.use(ElDivider);
app.use(ElInput);
app.use(ElSelect);
app.use(ElOption);

app.mount("#app");
