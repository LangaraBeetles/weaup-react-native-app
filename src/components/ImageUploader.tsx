import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "@src/services/fileStorage";
import { Buffer } from "buffer";

export default function ImageUploader() {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const fileName = result.assets[0].fileName!;
      const fileData = result.assets[0].base64!;
      const body = Buffer.from(fileData, "base64");

      uploadFile(fileName, body)
        .then((result) => {
          setImage(result.Location);
        })
        .catch((uploadError) => console.log(uploadError));
    }
  };

  return (
    <View>
      <Button title="Upload an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
