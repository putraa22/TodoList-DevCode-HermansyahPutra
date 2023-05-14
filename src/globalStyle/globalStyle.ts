import { css } from "@emotion/react";

export const globalStyle = css({
  ":root": {
    "--primary-color": "#16ABF8",
    "--main-background-color": "#E5E5E51F",
    "--second-background-color": "#FFFFFF",
    "--mq-1200": "0px 10rem",
    "--mobile": "0px 2rem",
  },
  html: {
    background: "var(--main-background-color)",
  },
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
});
