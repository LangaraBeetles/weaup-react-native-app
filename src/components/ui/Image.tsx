import StreakFlames from "assets/img/streak-flames.svg";
import WeaselHappyImage from "assets/img/weasel-happy.svg";

const ImageConfig = {
  "streak-flames": StreakFlames,
  "weasel-happy": WeaselHappyImage,
};

export type ImageName = `${keyof typeof ImageConfig}`;

type ImageProps = {
  name: ImageName;
  w?: string | number;
  h?: string | number;
};

const Image: React.FC<ImageProps> = ({ name, w = "100%", h = "100%" }) => {
  const CustomImage = ImageConfig[name];

  return <CustomImage width={w} height={h} />;
};

export default Image;
