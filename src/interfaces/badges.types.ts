import { BadgeName } from "@src/components/ui/Badge";

export type BadgeType = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: BadgeName;
  color?: string;
  unlocked?: boolean;
  date?: string | null;
};

export type UserBadgeType = {
  id: number;
  date: string;
};
