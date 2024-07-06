import { styled } from "@fast-styles/react";
import { Text as RNText, TextProps } from "react-native";

type BodyTextVariant = {
  level?:
    | "body"
    | "subhead"
    | "callout"
    | "footnote"
    | "footnote_2"
    | "caption_1"
    | "caption_2"
    | "caption_3"
    | "title_1"
    | "title_2"
    | "title_3"
    | "headline";
  weight?: "bold" | "semibold" | "medium" | "regular" | "default";
  align?: "auto" | "left" | "right" | "center" | "justify";
};

type BodyTextProps = TextProps & BodyTextVariant;

export const Text: React.FC<BodyTextProps> = ({
  align = "auto",
  weight = "default",
  level = "body",
  ...props
}) => {
  return <StyledText {...props} level={level} align={align} weight={weight} />;
};

export const StyledText = styled(RNText, {
  fontFamily: "NunitoRegular",
  variants: {
    align: {
      auto: {
        textAlign: "auto",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
      center: {
        textAlign: "center",
      },
      justify: {
        textAlign: "justify",
      },
    },
    level: {
      // Heading
      title_1: {
        fontSize: 28,
        fontStyle: "normal",
        // lineHeight: 34,
        fontFamily: "NunitoBold",
      },
      title_2: {
        fontSize: 22,
        fontStyle: "normal",
        // lineHeight: 28,
        fontFamily: "NunitoBold",
      },
      title_3: {
        fontSize: 20,
        fontStyle: "normal",
        // lineHeight: 25,
        fontFamily: "NunitoBold",
      },
      headline: {
        fontSize: 17,
        fontStyle: "normal",
        // lineHeight: 22,
        fontFamily: "NunitoBold",
      },

      // Body
      body: {
        fontSize: 16,
        fontStyle: "normal",
        fontFamily: "NunitoMedium",
        // lineHeight: 17,
      },
      callout: {
        fontSize: 16,
        fontStyle: "normal",
        fontFamily: "NunitoSemiBold",
        // lineHeight: 21,
      },
      subhead: {
        fontSize: 15,
        fontStyle: "normal",
        fontFamily: "NunitoRegular",
        // lineHeight: 16, // Design is with 15px but, this will make the text be cut off at the top
      },
      footnote: {
        fontSize: 14,
        fontStyle: "normal",
        fontFamily: "NunitoRegular",
        // lineHeight: 22,
      },
      footnote_2: {
        fontSize: 14,
        fontStyle: "normal",
        fontFamily: "NunitoBold",
        lineHeight: 22,
      },
      caption_1: {
        fontSize: 12,
        fontStyle: "normal",
        fontFamily: "NunitoRegular",
        // lineHeight: 16,
      },
      caption_2: {
        fontSize: 10,
        fontStyle: "normal",
        fontFamily: "NunitoRegular",
        // lineHeight: 14,
      },
      caption_3: {
        fontSize: 11,
        fontStyle: "normal",
        fontFamily: "NunitoBold",
        // lineHeight: 13,
        textTransform: "uppercase",
      },
    },
    weight: {
      default: {},
      bold: {
        fontFamily: "NunitoBold",
      },
      semibold: {
        fontFamily: "NunitoSemiBold",
      },
      medium: {
        fontFamily: "NunitoMedium",
      },
      regular: {
        fontFamily: "NunitoRegular",
      },
    },
  },
});
