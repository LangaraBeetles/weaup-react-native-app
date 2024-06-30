import { styled } from "@fast-styles/react";
import { globalStyles } from "@src/styles/globalStyles";
import { View } from "react-native";

const Box = styled(View, {
  display: "flex",
  width: "100%",
  padding: 16,
  backgroundColor: globalStyles.colors.white,
  borderRadius: 16,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: globalStyles.colors.neutral[100],
});

export default Box;
