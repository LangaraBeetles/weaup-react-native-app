import { BadgeName } from "@src/components/ui/Badge";

export type BadgeType = {
  title: string;
  subtitle: string;
  badge: BadgeName;
  unlocked?: boolean;
  date?: string | null;
};
