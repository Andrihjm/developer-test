import {
  Camera,
  CircleFadingPlus,
  MessageCircle,
  Phone,
  Settings,
  User,
  type LucideProps,
} from "lucide-react";

export const sidebar_constant: {
  id: number;
  link: string;
  icon: React.ComponentType<LucideProps>;
}[] = [
  {
    id: 1,
    link: "/status",
    icon: CircleFadingPlus,
  },
  {
    id: 2,
    link: "/panggilan",
    icon: Phone,
  },
  {
    id: 3,
    link: "/kamera",
    icon: Camera,
  },
  {
    id: 4,
    link: "/",
    icon: MessageCircle,
  },
];

export const user_settings: {
  id: number;
  link: string;
  icon: React.ComponentType<LucideProps>;
}[] = [
  {
    id: 1,
    link: "/setting",
    icon: Settings,
  },
  {
    id: 2,
    link: "/profile",
    icon: User,
  },
];
