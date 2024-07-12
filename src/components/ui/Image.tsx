import { SvgProps } from "react-native-svg";

import StreakFlames from "assets/img/streak-flames.svg";
import WeaselHappyImage from "assets/img/weasel-happy.svg";
import BackGroundHappyImage from "assets/img/background-happy.svg";
import BackGroundBadImage from "assets/img/background-bad.svg";
import WaeaselSideImage from "assets/img/weasel-side-peaceful.svg";
import WaeaselSideSadImage from "assets/img/weasel-side-sad.svg";
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
import WeaselHeadTilt from "assets/img/weasel-head-tilt.svg";
import Tada from "assets/img/tada.svg";

const ImageConfig = {
  "streak-flames": StreakFlames,
  "weasel-happy": WeaselHappyImage,
  "background-happy": BackGroundHappyImage,
  "background-bad": BackGroundBadImage,
  "weasel-side-peaceful": WaeaselSideImage,
  "weasel-side-sad": WaeaselSideSadImage,
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
  "weasel-head-tilt": WeaselHeadTilt,
  tada: Tada,
};

export type ImageName = `${keyof typeof ImageConfig}`;

type ImageProps = {
  name: ImageName;
} & Omit<SvgProps, "color">;

const Image: React.FC<ImageProps> = ({
  name,
  width = "100%",
  height = "100%",
  ...props
}) => {
  const CustomImage = ImageConfig[name];

  return <CustomImage {...props} width={width} height={height} />;
};

export default Image;
