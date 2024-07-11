import { Share } from "react-native";

import Button from "@src/components/ui/Button";

const ShareButton = (props: any) => {
  const { url } = props;

  const onShare = async () => {
    try {
      await Share.share({
        message: url, //Android
        // url: url, //iOS
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Button
      variant="primary"
      title="Share Invitation"
      onPress={onShare}
    ></Button>
  );
};

export default ShareButton;
