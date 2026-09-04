import {
  LayoutDashboard,
  Target,
  CalendarDays,
  ClipboardCheck,
  FolderOpen,
  BarChart3,
  LucideIcon,
  School,
  GraduationCap,
  UserRound,
  BookOpen,
} from "lucide-react";
import { Subjects } from "@/configs/acl";

export interface NavigationItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  children?: { name: string; href: string }[];
  subject: Subjects;
}

export const navigation: NavigationItem[] = [
  { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard, subject: "InternNavigation" },
  { name: "Dự án", icon: Target, href: "/projects", subject: "InternNavigation", },
  { name: "Bài tập", href: "/tasks", icon: ClipboardCheck, subject: "InternNavigation" },
  { name: "Điểm danh", href: "/attendance", icon: ClipboardCheck, subject: "InternNavigation" },
  { name: "Lịch làm việc", href: "/schedule", icon: CalendarDays, subject: "InternNavigation", },
  { name: "Báo cáo", icon: BarChart3, href: "/reports", subject: "InternNavigation", },
  { name: "Tài liệu", href: "/documents", icon: FolderOpen, subject: "InternNavigation" },
  { name: "Lịch sử ", href: "/history", icon: BarChart3, subject: "InternNavigation" },
  // { name: "Hồ sơ", href: "/profile", icon: User, subject: "InternNavigation" },
  { name: "Trường học", href: "/school", icon: School, subject: "SchoolNavigation" },
  { name: "Bài tập", href: "/school/assignments", icon: ClipboardCheck, subject: "SchoolNavigation" },
  { name: "Tổng quan", href: "/kid", icon: LayoutDashboard, subject: "KidNavigation" },
  { name: "Bài tập", href: "/kid/assignments", icon: BookOpen, subject: "KidNavigation" },
  { name: "Lớp học", href: "/kid/classes", icon: GraduationCap, subject: "KidNavigation" },
  { name: "Lịch học", href: "/kid/sessions", icon: CalendarDays, subject: "KidNavigation" },
  { name: "Hồ sơ", href: "/kid/profile", icon: UserRound, subject: "KidNavigation" },
];
