import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { Dimensions, StyleSheet, View } from "react-native";
import Box from "../ui/Box";
import ProgressBar from "../ui/ProgressBar";
import levels from "@src/levels";
import Image, { ImageName, ImageConfig } from "../ui/Image";
import { theme } from "@src/styles/theme";
import { useEffect, useState, useRef, useCallback } from "react";
import safenumber from "@src/utils/safenumber";
import Center from "../ui/Center";
import { useLevelSystem } from "@src/components/providers/LevelSystemProvider";
import * as Haptics from "expo-haptics";
import Animated, {
  runOnJS,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface XPCardProps {
  xp?: { initial: number; final: number };
}

const XPCard: React.FC<XPCardProps> = ({ xp }) => {
  const userLevel = useUser((state) => state.user.level);
  const [levelXP, setLevelXP] = useState<number>();
  const { unlockedLevels, showLevelUpModal } = useLevelSystem();
  const unlockedLevelsRef = useRef(unlockedLevels);

  const levelImageOpacity = useSharedValue<number>(0.55);

  const getImageNameForLevel = (level: number): ImageName => {
    const imageName = `level-${level}` as ImageName;
    if (imageName in ImageConfig) {
      return imageName;
    }
    return "level-1"; // Fallback
  };

  useEffect(() => {
    const getNextLevel = () => {
      const nextLevelConfig = levels.find(
        ({ level }) => level == userLevel + 1,
      );

      return nextLevelConfig;
    };
    const nextLevelXP = getNextLevel();
    if (!!nextLevelXP && nextLevelXP.level !== userLevel) {
      setLevelXP(0);

      const timeout = setTimeout(() => {
        setLevelXP(nextLevelXP.xp);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [userLevel]);

  useEffect(() => {
    unlockedLevelsRef.current = unlockedLevels;
  }, [unlockedLevels]);

  const handleAnimationEnd = useCallback(
    (progress: number) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      if (progress >= 100) {
        levelImageOpacity.value = withSequence(
          withDelay(
            2500,
            withTiming(1, {}, (finished) => {
              "worklet";
              if (finished) {
                runOnJS(showLevelUpModal)();
              }
            }),
          ),
          withDelay(2000, withTiming(0.55)),
        );
      } else {
        withDelay(
          2500,
          withTiming(0, {}, () => {
            runOnJS(showLevelUpModal)();
          }),
        );
      }
    },
    [showLevelUpModal],
  );

  return (
    <Box>
      <Stack flexDirection="row" gap={4}>
        <Stack w={width * 0.6}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row" gap={8} alignItems="center">
              <Icon name="colorLabelIcon-xp" size={16} />
              <Text level="footnote" style={{ lineHeight: 19 }}>
                You gained{" "}
                <Text level="footnote" weight="bold">
                  {safenumber(xp?.final) - safenumber(xp?.initial)} XP{" "}
                </Text>{" "}
                in this session
              </Text>
            </Stack>
          </Stack>

          {!!levelXP ? (
            <ProgressBar
              currentValue={safenumber(xp?.final)}
              // currentValue={levelXP}
              goal={levelXP}
              height={16}
              backgroundColor={theme.colors.white}
              barColor={theme.colors.error[400]}
              borderWidth={1}
              onAnimationEnd={handleAnimationEnd}
            />
          ) : (
            <View style={styles.view} />
          )}

          <Stack flexDirection="row" justifyContent="space-between">
            <Text level="caption_1" style={styles.caption1}>
              Level {userLevel}
            </Text>
            <Text level="caption_1" style={styles.caption1}>
              Level {Number(userLevel) + 1}
            </Text>
          </Stack>
        </Stack>
        <Center>
          <Animated.View
            style={{
              opacity: levelImageOpacity,
            }}
          >
            <Image
              name={getImageNameForLevel(Number(userLevel) + 1)}
              width={64}
              height={64}
              style={styles.image}
            />
          </Animated.View>
        </Center>
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.neutral[800],
  },
  caption1: {
    color: theme.colors.neutral[400],
  },
  view: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.neutral[100],
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  image: {
    marginHorizontal: 13,
    flexShrink: 0,
  },
});

export default XPCard;
