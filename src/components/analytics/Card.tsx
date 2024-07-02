//Component used for analytics page only

import { styled } from "@fast-styles/react";
import { View } from "react-native";

const Card = styled(View, {
  display: "flex",
  padding: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#FFF",
  borderRadius: 20,
  styleProps: {
    flexDirection: "flexDirection",
    gap: "gap",
  },
});

export default Card;
