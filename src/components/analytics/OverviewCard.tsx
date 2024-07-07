import { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { View } from "react-native";
import Card from "./Card";
import { ReText } from "react-native-redash";
import Stack from "@src/components/ui/Stack";
import safenumber from "@src/utils/safenumber";

const outterCircle = {
  backgroundColor: theme.colors.white,
  backgroundStrokeColor: theme.colors.primary[200],
  strokeColor: theme.colors.white,
  fillColor: "transparent",
  strokeWidth: 20,
};

const innerCicle = {
  backgroundColor: theme.colors.white,
  backgroundStrokeColor: theme.colors.secondary[500],
  strokeColor: theme.colors.white,
  fillColor: "transparent",
  strokeWidth: 20,
};

const CIRCLE_LENGTH = 300;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const OverviewCard = ({
  goodCount,
  badCount,
}: {
  goodCount: number;
  badCount: number;
}) => {
  const total = safenumber(goodCount + badCount);
  const goodPercentage = Math.ceil(safenumber((goodCount / total) * 100));
  const badPercentage = 100 - goodPercentage;

  const progress = useSharedValue(0);
  const progressText = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(goodPercentage / 100, { duration: 2000 });
    progressText.value = withTiming(1, { duration: 2000 });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (progress.value - 1),
  }));

  const progressGoodCount = useDerivedValue(() => {
    return `${Math.floor(progressText.value * goodPercentage)}`;
  });
  const progressBadCount = useDerivedValue(() => {
    return `${Math.floor(progressText.value * badPercentage)}`;
  });

  return (
    <Card gap={12}>
      <Text level="headline" weight="bold">
        Overview
      </Text>
      <View style={{ display: "flex", flexDirection: "row", gap: 32 }}>
        <View
          style={{
            height: 116,
            width: 116,
          }}
        >
          <Svg>
            <Circle
              r={R}
              cx={outterCircle.strokeWidth / 2 + R}
              cy={outterCircle.strokeWidth / 2 + R}
              fill={outterCircle.fillColor}
              stroke={
                total > 0
                  ? outterCircle.backgroundStrokeColor
                  : theme.colors.neutral[100]
              }
              strokeWidth={outterCircle.strokeWidth}
            />
            <AnimatedCircle
              r={R}
              cx={innerCicle.strokeWidth / 2 + R}
              cy={innerCicle.strokeWidth / 2 + R}
              fill={innerCicle.fillColor}
              stroke={
                total > 0
                  ? innerCicle.backgroundStrokeColor
                  : theme.colors.neutral[100]
              }
              strokeWidth={innerCicle.strokeWidth}
              strokeDasharray={CIRCLE_LENGTH}
              strokeLinecap="round"
              animatedProps={animatedProps}
            />
          </Svg>
        </View>

        <View style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <View>
            <Stack flexDirection="row" alignItems="center">
              <ReText
                style={{
                  color: theme.colors.secondary[600],
                  fontFamily: "NunitoBold",
                  fontSize: 20,
                  lineHeight: 26,
                }}
                text={progressGoodCount}
              />
              <Text
                level="title_3"
                weight="bold"
                style={{ color: theme.colors.secondary[600] }}
              >
                %
              </Text>
            </Stack>

            <Text
              level="caption_3"
              weight="bold"
              style={{
                textTransform: "uppercase",
                color: theme.colors.neutral[400],
              }}
            >
              Good Posture
            </Text>
          </View>
          <View>
            <Stack flexDirection="row" alignItems="center">
              <ReText
                style={{
                  color: theme.colors.error[400],
                  fontFamily: "NunitoBold",
                  fontSize: 20,
                  lineHeight: 26,
                }}
                text={progressBadCount}
              />
              <Text
                level="title_3"
                weight="bold"
                style={{ color: theme.colors.error[400] }}
              >
                %
              </Text>
            </Stack>

            <Text
              level="caption_3"
              weight="bold"
              style={{
                textTransform: "uppercase",
                color: theme.colors.neutral[400],
              }}
            >
              Bad Posture
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default OverviewCard;
