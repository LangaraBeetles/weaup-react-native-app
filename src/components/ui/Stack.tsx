import { styled } from "@fast-styles/react";
import { View } from "react-native";

const Stack = styled(View, {
  display: "flex",
  flexDirection: "column",
  styleProps: {
    flexDirection: "flexDirection",
    gap: "gap",
    justifyContent: "justifyContent",
    alignItems: "alignItems",
    p: "padding",
    pb: "paddingBottom",
    pt: "paddingTop",
    pl: "paddingLeft",
    pr: "paddingRight",
    px: "paddingHorizontal",
    py: "paddingVertical",
    borderRadius: "borderRadius",
    border: "borderWidth",
    borderColor: "borderColor",
    w: "width",
    h: "height",
  },
});

export default Stack;
