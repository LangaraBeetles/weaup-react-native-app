import { Text } from "../ui/typography";
import Stack from "../ui/Stack";
import { globalStyles } from "@src/styles/globalStyles";
import Icon from "../ui/Icon";

type Weekdays = {
  day: string;
};

const Days: Weekdays[] = [
  { day: "Mo" },
  { day: "Tu" },
  { day: "We" },
  { day: "Th" },
  { day: "Fr" },
  { day: "Sa" },
  { day: "Su" },
];

const StreakDaysIndicator: React.FC<{
  streak: number;
}> = ({ streak }) => {
  const today = new Date().getDay();
  let startDay = 0;

  if (streak > 0) {
    startDay = (today - streak + 7) % 7;
  } else {
    startDay = 0;
  }

  const renderDays = () => {
    const daysToRender = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (startDay + i) % 7;
      daysToRender.push(
        <Stack key={i} alignItems="center" gap={8}>
          <Text
            level="subhead"
            style={{ color: globalStyles.colors.neutral[500] }}
          >
            {Days[dayIndex].day}
          </Text>
          <Icon
            name={
              i < streak
                ? "streak-checkmark-checked"
                : "streak-checkmark-unchecked"
            }
            size={28}
          />
        </Stack>,
      );
    }
    return daysToRender;
  };

  return (
    <Stack flexDirection="row" justifyContent="space-between" w="100%">
      {renderDays()}
    </Stack>
  );
};

export default StreakDaysIndicator;
