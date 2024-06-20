import { View, ViewProps } from "react-native";

type SpacerProps = ViewProps & {
  height?: any;
  width?: any;
};

const Spacer: React.FC<SpacerProps> = ({ height, width, style, ...props }) => {
  return (
    <View
      {...props}
      style={{
        height,
        width,
        ...(typeof style === "object" ? style : {}),
      }}
    />
  );
};

export default Spacer;
