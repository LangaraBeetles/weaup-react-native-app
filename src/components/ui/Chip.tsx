import { styled } from "@fast-styles/react";
import { theme } from "@src/styles/theme";
import { TouchableOpacity } from "react-native";
import { Text } from "./typography";
import Icon, { IconName } from "./Icon";
import Stack from "./Stack";

const StyledChip = styled(TouchableOpacity, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  styleProps: {
    px: "paddingHorizontal",
    py: "paddingVertical",
    borderRadius: "borderRadius",
    w: "width",
    h: "height",
  },
  variants: {
    colorScheme: {
      default: {
        backgroundColor: theme.colors.white,
      },
      selected: {
        backgroundColor: theme.colors.primary[700],
      },
    },
  },
});

const Chip: React.FC<{
  children: React.ReactNode | string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  colorScheme?: "default" | "selected";
  w?: string | number;
  h?: string | number;
  onPress?: () => void;
}> = ({
  children,
  onPress,
  leadingIcon,
  trailingIcon,
  colorScheme = "default",
  ...props
}) => {
  return (
    <StyledChip
      {...props}
      onPress={onPress}
      colorScheme={colorScheme}
      px={12}
      py={8}
      borderRadius={100}
    >
      {typeof children === "string" ? (
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {leadingIcon ? (
            <Icon
              name={leadingIcon}
              size={18}
              color={
                colorScheme === "default"
                  ? theme.colors.text
                  : theme.colors.white
              }
            />
          ) : null}
          <Text
            weight={colorScheme === "default" ? "regular" : "bold"}
            style={{
              color:
                colorScheme === "default"
                  ? theme.colors.text
                  : theme.colors.white,
            }}
          >
            {children}
          </Text>
          {trailingIcon ? <Icon name={trailingIcon} size={20} /> : null}
        </Stack>
      ) : (
        children
      )}
    </StyledChip>
  );
};
export default Chip;
