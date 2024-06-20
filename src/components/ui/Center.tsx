import { styled } from "@fast-styles/react";
import { View } from "react-native";

const Center = styled(View, {
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  styleProps: {
    backgroundColor: "backgroundColor",
    gap: "gap",
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
    flex: "flex",
  },
});

export default Center;
