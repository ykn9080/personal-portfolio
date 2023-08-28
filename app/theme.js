// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

const MDXWrapper = (props) => <div className="mdx-prose" {...props} />;
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: {
      ".mdx-prose": {
        h1: {
          fontSize: "2xl",
          mb: "4",
        },
        p: {
          fontSize: "sm",
          lineHeight: "1.4",
        },
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
