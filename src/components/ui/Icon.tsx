import React from "react";
import { SvgProps } from "react-native-svg";

import ArrowLeft from "assets/icons/arrow-left.svg";
import ArrowRight from "assets/icons/arrow-right.svg";
import Add from "assets/icons/add.svg";
import Play from "assets/icons/play.svg";
import AwardOutline from "assets/icons/award-outline.svg";
import AwardFilled from "assets/icons/award-filled.svg";
import BadgeOutline from "assets/icons/badge-outline.svg";
import BadgeFilled from "assets/icons/badge-filled.svg";
import CalendarOutline from "assets/icons/calendar-outline.svg";
import CalendarFill from "assets/icons/calendar-fill.svg";
import CancelFilled from "assets/icons/cancel-filled.svg";
import CancelOutline from "assets/icons/cancel-outline.svg";
import ChevronLeft from "assets/icons/chevron-left.svg";
import ChevronRight from "assets/icons/chevron-right.svg";
import ClockFilled from "assets/icons/clock-filled.svg";
import ClockOutline from "assets/icons/clock-outline.svg";
import Close from "assets/icons/close.svg";
import CopyFill from "assets/icons/copy-fill.svg";
import CopyOutline from "assets/icons/copy-outline.svg";
import Day from "assets/icons/day.svg";
import Earbuds from "assets/icons/earbuds.svg";
import InfoFill from "assets/icons/info-fill.svg";
import InfoOutline from "assets/icons/info-outline.svg";
import EditFill from "assets/icons/edit-fill.svg";
import EditOutline from "assets/icons/edit-outline.svg";
import FaceHappy from "assets/icons/face-happy.svg";
import FaceSad from "assets/icons/face-sad.svg";
import HistoryFilled from "assets/icons/history-filled.svg";
import HistoryOutline from "assets/icons/history-outline.svg";
import HourglassFill from "assets/icons/hourglass-fill.svg";
import HourglassOutline from "assets/icons/hourglass-outline.svg";
import LighteningFill from "assets/icons/lightening-fill.svg";
import LighteningOutline from "assets/icons/lightening-outline.svg";
import NavbarAnalyticsNotSelected from "assets/icons/navbar-analytics-notselected.svg";
import NavbarAnalyticsSelected from "assets/icons/navbar-analytics-selected.svg";
import NavbarHomeNotSelected from "assets/icons/navbar-home-notselected.svg";
import NavbarHomeSelected from "assets/icons/navbar-home-selected.svg";
import NavbarProfileNotSelected from "assets/icons/navbar-profile-notselected.svg";
import NavbarProfileSelected from "assets/icons/navbar-profile-selected.svg";
import NavbarTogetherNotSelected from "assets/icons/navbar-together-notselected.svg";
import NavbarTogetherSelected from "assets/icons/navbar-together-selected.svg";
import Night from "assets/icons/night.svg";
import NotificationFill from "assets/icons/notification-fill.svg";
import NotificationOutline from "assets/icons/notification-outline.svg";
import Plus from "assets/icons/plus.svg";
import PlusFilled from "assets/icons/plus-filled.svg";
import PlusOutline from "assets/icons/plus-outline.svg";
import ProgressFill from "assets/icons/progress-fill.svg";
import ProgressOutline from "assets/icons/progress-outline.svg";
import ShareFill from "assets/icons/share-fill.svg";
import ShareOutline from "assets/icons/share-outline.svg";
import Sparkle from "assets/icons/sparkle.svg";
import StarFill from "assets/icons/star-fill.svg";
import StarOutline from "assets/icons/star-outline.svg";
import StreakFill from "assets/icons/streak-fill.svg";
import StreakOutline from "assets/icons/streak-outline.svg";
import Switch from "assets/icons/switch.svg";
import Target from "assets/icons/target.svg";
import Trash from "assets/icons/trash.svg";
import Warning from "assets/icons/warning.svg";
import XpFill from "assets/icons/xp-fill.svg";
import XpOutline from "assets/icons/xp-outline.svg";
import StarIcon from "assets/icons/colorLabelIcon-star.svg";
import LighteningIcon from "assets/icons/colorLabelIcon-lightening.svg";
import StreakIcon from "assets/icons/colorLabelIcon-streak.svg";
import ColorLabelIconLightening from "assets/icons/colorLabelIcon-lightening.svg";
import ColorLabelIconStreak from "assets/icons/colorLabelIcon-streak.svg";
import ColorLabelIconStar from "assets/icons/colorLabelIcon-star.svg";
import ColorLabelIconXp from "assets/icons/colorLabelIcon-xp.svg";
import ColorLabelIconAward from "assets/icons/colorLabelIcon-award.svg";
import Logout from "assets/icons/logout.svg";
import ColorLabelIconTarget from "assets/icons/colorLabelIcon-target.svg";
import StreakCheckmarkUnchecked from "assets/icons/streak-checkmark-unchecked.svg";
import StreakCheckmarkChecked from "assets/icons/streak-checkmark-checked.svg";
import ChallengeAvatar from "assets/icons/challenge-avatar.svg";
import SortAscFilled from "assets/icons/sort-asc-filled.svg";
import SortDescFilled from "assets/icons/sort-desc-filled.svg";
import GoogleIcon from "assets/icons/google-icon.svg";
import RefreshTutorial from "assets/icons/refresh-tutorial.svg";
import TogetherIconOne from "assets/icons/together-icon-1.svg";
import TogetherIconTwo from "assets/icons/together-icon-2.svg";
import TogetherIconThree from "assets/icons/together-icon-3.svg";
import Check from "assets/icons/check.svg";
import StarCircle from "assets/icons/star-circle.svg";
import DoubleChevronUp from "assets/icons/double-chevron-up.svg";
import DoubleChevronDown from "assets/icons/double-chevron-down.svg";

import { theme } from "@src/styles/theme";

const IconConfig = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  add: Add,
  play: Play,
  "award-outline": AwardOutline,
  "award-filled": AwardFilled,
  "badge-outline": BadgeOutline,
  "badge-filled": BadgeFilled,
  "calendar-outline": CalendarOutline,
  "calendar-fill": CalendarFill,
  "cancel-filled": CancelFilled,
  "cancel-outline": CancelOutline,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "clock-filled": ClockFilled,
  "clock-outline": ClockOutline,
  close: Close,
  "copy-fill": CopyFill,
  "copy-outline": CopyOutline,
  day: Day,
  earbuds: Earbuds,
  "info-fill": InfoFill,
  "info-outline": InfoOutline,
  "edit-fill": EditFill,
  "edit-outline": EditOutline,
  "face-happy": FaceHappy,
  "face-sad": FaceSad,
  "history-filled": HistoryFilled,
  "history-outline": HistoryOutline,
  "hourglass-fill": HourglassFill,
  "hourglass-outline": HourglassOutline,
  "lightening-fill": LighteningFill,
  "lightening-outline": LighteningOutline,
  "navbar-analytics-notselected": NavbarAnalyticsNotSelected,
  "navbar-analytics-selected": NavbarAnalyticsSelected,
  "navbar-home-notselected": NavbarHomeNotSelected,
  "navbar-home-selected": NavbarHomeSelected,
  "navbar-profile-notselected": NavbarProfileNotSelected,
  "navbar-profile-selected": NavbarProfileSelected,
  "navbar-together-notselected": NavbarTogetherNotSelected,
  "navbar-together-selected": NavbarTogetherSelected,
  night: Night,
  "notification-fill": NotificationFill,
  "notification-outline": NotificationOutline,
  plus: Plus,
  "plus-filled": PlusFilled,
  "plus-outline": PlusOutline,
  "progress-fill": ProgressFill,
  "progress-outline": ProgressOutline,
  "share-fill": ShareFill,
  "share-outline": ShareOutline,
  sparkle: Sparkle,
  "star-fill": StarFill,
  "star-outline": StarOutline,
  "streak-fill": StreakFill,
  "streak-outline": StreakOutline,
  switch: Switch,
  target: Target,
  trash: Trash,
  warning: Warning,
  "xp-fill": XpFill,
  "xp-outline": XpOutline,
  star: StarIcon,
  lightening: LighteningIcon,
  streak: StreakIcon,
  "colorLabelIcon-lightening": ColorLabelIconLightening,
  "colorLabelIcon-streak": ColorLabelIconStreak,
  "colorLabelIcon-star": ColorLabelIconStar,
  "colorLabelIcon-xp": ColorLabelIconXp,
  "colorLabelIcon-award": ColorLabelIconAward,
  logout: Logout,
  "colorLabelIcon-target": ColorLabelIconTarget,
  "streak-checkmark-unchecked": StreakCheckmarkUnchecked,
  "streak-checkmark-checked": StreakCheckmarkChecked,
  "challenge-avatar": ChallengeAvatar,
  "sort-asc-filled": SortAscFilled,
  "sort-desc-filled": SortDescFilled,
  "google-icon": GoogleIcon,
  "refresh-tutorial": RefreshTutorial,
  "together-icon-1": TogetherIconOne,
  "together-icon-2": TogetherIconTwo,
  "together-icon-3": TogetherIconThree,
  check: Check,
  "star-circle": StarCircle,
  "double-chevron-up": DoubleChevronUp,
  "double-chevron-down": DoubleChevronDown,
};

export type IconName = keyof typeof IconConfig;

type IconProps = {
  name: IconName;
  color?: string;
  size?: number;
} & Omit<SvgProps, "color">;

const Icon: React.FC<IconProps> = ({
  name,
  color = theme.colors.text,
  size = 20,
  ...props
}) => {
  const CustomIcon = IconConfig[name];

  return <CustomIcon {...props} color={color} width={size} height={size} />;
};

export default Icon;
