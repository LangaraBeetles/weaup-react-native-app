import { styled } from "@fast-styles/react";
import { TouchableOpacity } from "react-native";

const Chip = styled(TouchableOpacity, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  styleProps: {
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
  variants: {
    colorScheme: {
      primary: {
        backgroundColor: "#fff",
      },
      selected: {
        backgroundColor: "#C59102",
      },
    },
  },
});

export default Chip;
