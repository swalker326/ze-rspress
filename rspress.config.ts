import * as path from "node:path";
import { defineConfig } from "rspress/config";

import { withZephyr } from "zephyr-rspack-plugin";
import type { RsbuildPlugin } from "@rsbuild/shared";

const ZephyrRspressPlugin = (): RsbuildPlugin => ({
  name: "plugin-zephyr-rspress",
  setup(api) {
    api.modifyRspackConfig(async (config, { mergeConfig }) => {
      //@ts-expect-error - rspck config type difference
      const zeConfig = await withZephyr()(config);
      mergeConfig(zeConfig);
    });
  }
});

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "My Site",
  icon: "/rspress-icon.png",
  ssg: true,
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png"
  },
  builderConfig: {
    plugins: [ZephyrRspressPlugin()]
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/web-infra-dev/rspress"
      }
    ]
  }
});
