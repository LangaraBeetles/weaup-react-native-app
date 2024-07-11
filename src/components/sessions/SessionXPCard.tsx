import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { Dimensions, StyleSheet, View } from "react-native";
import Box from "../ui/Box";
import ProgressBar from "../ui/ProgressBar";
import levels from "@src/levels";
import Image from "../ui/Image";
import { theme } from "@src/styles/theme";
import { useEffect, useState } from "react";
import safenumber from "@src/utils/safenumber";

const { width } = Dimensions.get("window");

interface XPCardProps {
  xp?: { initial: number; final: number };
}

const XPCard: React.FC<XPCardProps> = ({ xp }) => {
  const userLevel = useUser((state) => state.user.level);
  const [levelXP, setLevelXP] = useState<number>();

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

      setTimeout(() => {
        setLevelXP(nextLevelXP.xp);
      }, 200);
    }
  }, [userLevel]);

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

          {/* INFO: workaround to make the bar animation multiple times */}
          {!!levelXP ? (
            <ProgressBar
              currentValue={safenumber(xp?.final)}
              goal={levelXP}
              height={16}
              backgroundColor={theme.colors.white}
              barColor={theme.colors.error[400]}
              borderWidth={1}
            />
          ) : (
            <View
              style={{
                width: "100%",
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.neutral[100],
                height: 16,
                borderRadius: 8,
                borderWidth: 1,
              }}
            />
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
        <Image
          name="level-up-image"
          width={64}
          height={64}
          style={{ marginHorizontal: 13, opacity: 0.55, flexShrink: 0 }}
        />
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
});

export default XPCard;
