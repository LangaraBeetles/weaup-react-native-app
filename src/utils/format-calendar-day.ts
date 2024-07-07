import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

//INFO:
//Function mainly to use for analytics, if we need other formats we can customize it as needed

const formatCalendarDay = (value: string) => {
  if (!dayjs(value).isValid) {
    return value;
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
