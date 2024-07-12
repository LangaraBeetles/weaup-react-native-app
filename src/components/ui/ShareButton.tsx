import { Share } from "react-native";
import Button from "@src/components/ui/Button";

const ShareButton = (props: {
  url: string;
  setHasShared: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { url, setHasShared } = props;

  const onShare = async () => {
    try {
      await Share.share({
        message: url, //Android
        url: url, //iOS
      });
      setHasShared(true);
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
