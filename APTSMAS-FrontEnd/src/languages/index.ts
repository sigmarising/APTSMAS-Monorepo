import zhCN from "./locales/zh-CN/index";
import enUS from "./locales/en-US/index";
import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

const translations = {
  zhCN,
  enUS,
};

const i18n = createI18n({
  legacy: false,
  locale: "zhCN",
  fallbackLocale: "zhCN",
  messages: translations as unknown as LocaleMessages<VueMessageType>,
});

export default i18n;
