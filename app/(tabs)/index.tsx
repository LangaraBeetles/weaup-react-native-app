import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../../src/styles/globalStyles";
import { useUser } from "@state/useUser";

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
});

const HomePage = () => {
  const userName = useUser((state) => state.user.name);
  const setAuth = useUser((state) => state.setAuth);

  //TODO: remove this function
  const onNameChange = () => {
    setAuth(true, {
      deviceIds: ["1"],
      currentDeviceId: "1",
      dailyGoal: 80,
      name: "Dr Seuss",
    });
  };

  const onNameClear = () => {
    setAuth(false, {
      deviceIds: [],
      currentDeviceId: null,
      dailyGoal: 80,
      name: "",
    });
  };

  return (
    <View>
      <Text>Home Page text</Text>
      {!!userName && <Text>Hello {userName}!</Text>}

      <Button title="Update name" onPress={onNameChange}></Button>

      <Button title="Clear name" onPress={onNameClear}></Button>
    </View>
  );
};

export default HomePage;
