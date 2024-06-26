import ArrowLeft from "assets/icons/arrow-left.svg";
import ArrowRight from "assets/icons/arrow-right.svg";

const IconConfig = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
};

type IconProps = {
  name: `${keyof typeof IconConfig}`;
};

const Icon: React.FC<IconProps> = ({ name }) => {
  const CustomIcon = IconConfig[name];
  return <CustomIcon />;
};

export default Icon;
