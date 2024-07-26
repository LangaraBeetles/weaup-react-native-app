import { theme } from "@src/styles/theme";
import { Image, Text, View, ViewStyle } from "react-native";

import Image01 from "assets/avatar/01.svg";
import Image02 from "assets/avatar/02.svg";
import Image03 from "assets/avatar/03.svg";
import Image04 from "assets/avatar/04.svg";
import Image05 from "assets/avatar/05.svg";
import Image06 from "assets/avatar/06.svg";
import Image07 from "assets/avatar/07.svg";
import Image08 from "assets/avatar/08.svg";
import Image09 from "assets/avatar/09.svg";
import Image10 from "assets/avatar/10.svg";

export const source = {
  Image01,
  Image02,
  Image03,
  Image04,
  Image05,
  Image06,
  Image07,
  Image08,
  Image09,
  Image10,
};

const colorOptions = {
  blue1: {
    bg: theme.colors.secondary[300],
    color: theme.colors.white,
  },
  blue2: {
    bg: theme.colors.secondary[700],
    color: theme.colors.white,
  },
  yellow1: {
    bg: theme.colors.primary[500],
    color: theme.colors.white,
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
  src?: keyof typeof source;
  showDefault: boolean;
}) => {
  const {
    src,
    content,
    backgroundColor,
    textColor,
    borderColor,
    fontSize,
    style,
    showDefault,
    size = 40,
    variant = "blue1",
    borderWidth = 0,
  } = props;

  const bg = backgroundColor ?? colorOptions[variant].bg;
  const color = textColor ?? colorOptions[variant].color;

  if (!!showDefault) {
    return (
      <Container
        style={style}
        borderColor={borderColor}
        borderWidth={borderWidth}
        size={size}
      >
        <Image
          source={require("../../../assets/avatar/guest.png")}
          style={{
            width: size - borderWidth ?? 40,
            height: size - borderWidth ?? 40,
          }}
        />
      </Container>
    );
  }

  if (!!src) {
    const CustomImage = source[src];

    return (
      <Container
        style={style}
        borderColor={borderColor}
        borderWidth={borderWidth}
        size={size}
      >
        <CustomImage
          width={size - borderWidth ?? 40}
          height={size - borderWidth ?? 40}
        />
      </Container>
    );
  }

  return (
    <Container
      style={style}
      bg={bg}
      borderColor={borderColor}
      borderWidth={borderWidth}
      size={size}
    >
      <Text
        style={{
          fontSize: fontSize ?? theme.fontSizes.$md,
          color: color,
        }}
      >
        {content}
      </Text>
    </Container>
  );
};

const Container = ({
  children,
  bg,
  borderColor,
  size = 40,
  borderWidth = 0,
  style = {},
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  size?: number;
  borderWidth?: number;
  borderColor?: string;

  bg?: string;
}) => {
  return (
    <View
      style={{
        width: size + borderWidth ?? 40,
        height: size + borderWidth ?? 40,
        borderRadius: size + borderWidth ?? 40,
        backgroundColor: bg,
        borderWidth: borderWidth ?? 0,
        borderColor: borderColor ?? "none",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default Avatar;
