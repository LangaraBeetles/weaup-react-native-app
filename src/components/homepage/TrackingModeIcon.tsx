import { useUser } from "@src/state/useUser";
import Stack from "../ui/Stack";
import Icon from "../ui/Icon";
import { theme } from "@src/styles/theme";

const TrackingModeIcon = () => {
  const mode = useUser((state) => state.mode);

  return (
    <Stack
      backgroundColor={theme.colors.white}
      h={40}
      w={40}
      borderRadius={20}
      alignItems="center"
      justifyContent="center"
    >
      {/* <Icon name="earbuds" size={24} color={mode === "earbuds" ? theme.colors.text : theme.colors.white} /> */}
      <Icon name={mode === "phone" ? "earbuds-inactive" : "earbuds"} />
    </Stack>
  );
};

export default TrackingModeIcon;
