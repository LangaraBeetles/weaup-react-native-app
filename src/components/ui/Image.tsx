import { SvgProps } from "react-native-svg";

import StreakFlames from "assets/img/streak-flames.svg";
import WeaselHappyImage from "assets/img/weasel-happy.svg";
import BackGroundHappyImage from "assets/img/background-happy.svg";
import BackGroundBadImage from "assets/img/background-bad.svg";
import AvatarImage from "assets/img/avatar.svg";
import WaeaselSideImage from "assets/img/weasel-side-peaceful.svg";
import GreenGradientImage from "assets/img/green-gradient.svg";
import TitltArrow from "assets/img/tilt-arrow.svg";
import TiltCorrect from "assets/img/tilt-correct.svg";
import Sparkling from "assets/img/sparkling-image.svg";
import FourCornerStar from "assets/img/four-corner-star.svg";
import NotificationImage from "assets/img/notification.svg";
import NotificationWindow from "assets/img/notification-window.svg";
import HomeScreenImage from "assets/img/Home-screen-image .svg";
import ProfileXpImage from "assets/img/profile-XP-image.svg";
import LevelUpImage from "assets/img/level-up-image.svg";
import Confeties from "assets/img/confeties.svg";
import BadgeBackground from "assets/img/badge-background.svg";

const ImageConfig = {
  "streak-flames": StreakFlames,
  "weasel-happy": WeaselHappyImage,
  "background-happy": BackGroundHappyImage,
  "background-bad": BackGroundBadImage,
  avatar: AvatarImage,
  "weasel-side-peaceful": WaeaselSideImage,
  "green-gradient": GreenGradientImage,
  "tilt-arrow": TitltArrow,
  "tilt-correct": TiltCorrect,
  sparkling: Sparkling,
  "four-corner-star": FourCornerStar,
  notification: NotificationImage,
  "notification-window": NotificationWindow,
  "home-screen-image": HomeScreenImage,
  "profile-XP-image": ProfileXpImage,
  "level-up-image": LevelUpImage,
  confeties: Confeties,
  "badge-background": BadgeBackground,
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
