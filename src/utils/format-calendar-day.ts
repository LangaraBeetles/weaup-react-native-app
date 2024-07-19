import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

//INFO:
//Function mainly to use for analytics, if we need other formats we can customize it as needed

const formatCalendarDay = (value: string, format?: "short" | "long") => {
  if (!dayjs(value).isValid) {
    return value;
  }

  if (format === "short") {
    return dayjs(value).calendar(null, {
      sameDay: "[Today]", // The same day ( Today )
      nextDay: "[Tomorrow]", // The next day ( Tomorrow )
      nextWeek: "MMM DD", // The next week ( Jul 06 )
      lastDay: "[Yesterday]", // The day before ( Yesterday )
      lastWeek: "MMM DD", // Last week ( Jul 06 )
      sameElse: "MMM DD", // Everything else ( Jul 06 )
    });
  }
  return dayjs(value).calendar(null, {
    sameDay: "[Today], MMM DD", // The same day ( Today, Jul 06 )
    nextDay: "[Tomorrow], MMM DD", // The next day ( Tomorrow, Jul 06 )
    nextWeek: "dddd MMM DD", // The next week ( Sunday Jul 06 )
    lastDay: "[Yesterday], MMM DD", // The day before ( Yesterday, Jul 06 )
    lastWeek: "dddd MMM DD", // Last week ( Monday Jul 06 )
    sameElse: "MMM DD", // Everything else ( Jul 06 )
  });
};

export default formatCalendarDay;
