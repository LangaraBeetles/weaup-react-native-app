import { theme } from "@src/styles/theme";
import { Text, View } from "react-native";

const Avatar = (props: any) => {
  const {
    content,
    backgroundColor,
    textColor,
    size,
    borderWidth,
    borderColor,
    fontSize,
  } = props;

  //randomize bgcolor from secondary colors
  const keys = Object.keys(theme.colors.secondary);
  const prop = keys[Math.floor(Math.random() * keys.length - 4)];

  return (
    <View
      style={{
        width: size ?? 40,
        height: size ?? 40,
        borderRadius: 50,
        backgroundColor:
          backgroundColor ??
          theme.colors.secondary[
            prop as unknown as keyof typeof theme.colors.secondary
          ],
        borderWidth: borderWidth ?? 0,
        borderColor: borderColor ?? "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: fontSize ?? theme.fontSizes.$md,
          color: textColor ?? theme.colors.text,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default Avatar;
