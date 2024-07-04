import { SvgProps } from "react-native-svg";

import StreakFlames from "assets/img/streak-flames.svg";
import WeaselHappyImage from "assets/img/weasel-happy.svg";
import BackGroundHappyImage from "assets/img/background-happy.svg";
import AvatarImage from "assets/img/avatar.svg";

const ImageConfig = {
  "streak-flames": StreakFlames,
  "weasel-happy": WeaselHappyImage,
  "background-happy": BackGroundHappyImage,
  avatar: AvatarImage,
};

export type ImageName = `${keyof typeof ImageConfig}`;

type ImageProps = {
  name: ImageName;
  w?: string | number;
  h?: string | number;
} & Omit<SvgProps, "color">;

const Image: React.FC<ImageProps> = ({
  name,
  w = "100%",
  h = "100%",
  ...props
}) => {
  const CustomImage = ImageConfig[name];

  return <CustomImage {...props} width={w} height={h} />;
};

export default Image;
