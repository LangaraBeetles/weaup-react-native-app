import AnalyticsContent from "@src/components/analytics/AnalyticsContent";
import Page from "@src/components/layout/Page";
import FilterMenu from "@src/components/notifications/FilterMenu";
import Stack from "@src/components/ui/Stack";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useState } from "react";
import Icon from "@src/components/ui/Icon";
import { Text } from "@src/components/ui/typography";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAnalyticsFilter } from "@src/state/useAnalyticsFilters";

dayjs.extend(calendar);

const filterIndex = {
  day: 0,
  week: 1,
  month: 2,
};

const AnalyticsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <AnalyticsLayout
      currentIndex={currentIndex}
      tabs={[
        { label: "Day", value: "day", view: <AnalyticsContent term="day" /> },
        {
          label: "Week",
          value: "week",
          view: <AnalyticsContent term="week" />,
        },
        {
          label: "Month",
          value: "month",
          view: <AnalyticsContent term="month" />,
        },
      ]}
      onChange={setCurrentIndex}
    />
  );
};

const AnalyticsLayout = ({
  currentIndex,
  tabs,
  onChange,
}: {
  currentIndex: number;
  onChange: (index: number) => void;
  tabs: Array<{ label: string; value: string; view: React.ReactNode }>;
}) => {
  const { setDates, isSame, displayDate } = useAnalyticsFilter();

  const term = tabs[currentIndex].value as "day" | "week" | "month";
  const isTodaysDateIncluded = isSame(term);

  return (
    <Page
      title="Analytics"
      header={
        <Stack gap={16}>
          <FilterMenu
            tabs={tabs}
            onChange={(value) => {
              onChange(filterIndex[value as "day" | "week" | "month"]);
            }}
          />

          <View style={styles.dateHeader}>
            <TouchableOpacity onPress={() => setDates(term, "backwards")}>
              <Icon name="chevron-left" />
            </TouchableOpacity>
            <Text level="headline" style={{ marginTop: 4 }}>
              {displayDate(term)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (!isTodaysDateIncluded) {
                  setDates(term, "forward");
                }
              }}
            >
              <Icon
                name="chevron-right"
                color={isTodaysDateIncluded ? "transparent" : undefined}
              />
            </TouchableOpacity>
          </View>
        </Stack>
      }
    >
      {tabs[currentIndex].view}
    </Page>
  );
};

const styles = StyleSheet.create({
  dateHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AnalyticsScreen;
