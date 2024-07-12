import { theme } from "@src/styles/theme";
import { Text, View, ViewStyle } from "react-native";

const colorOptions = {
  blue1: {
    bg: theme.colors.secondary[300],
    color: theme.colors.text,
  },
  blue2: {
    bg: theme.colors.secondary[700],
    color: theme.colors.white,
  },
  yellow1: {
    bg: theme.colors.primary[500],
    color: theme.colors.text,
  },
  yellow2: {
    bg: theme.colors.primary[500],
    color: theme.colors.white,
  },
  red1: {
    bg: theme.colors.error[400],
    color: theme.colors.white,
  },
  red2: {
    bg: theme.colors.error[500],
    color: theme.colors.white,
  },
  gray1: {
    bg: theme.colors.neutral[200],
    color: theme.colors.text,
  },
};

const Avatar = (props: {
  content: string | number;
  backgroundColor?: string;
  textColor?: string;
  variant?: keyof typeof colorOptions;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  style?: ViewStyle;
}) => {
  const {
    content,
    backgroundColor,
    textColor,
    variant = "blue1",
    size,
    borderWidth,
    borderColor,
    fontSize,
    style,
  } = props;

  const bg = backgroundColor ?? colorOptions[variant].bg;
  const color = textColor ?? colorOptions[variant].color;

  return (
    <View
      style={{
        width: size ?? 40,
        height: size ?? 40,
        borderRadius: 50,
        backgroundColor: bg,
        borderWidth: borderWidth ?? 0,
        borderColor: borderColor ?? "none",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          fontSize: fontSize ?? theme.fontSizes.$md,
          color: color,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default Avatar;
