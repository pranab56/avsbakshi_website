import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  Scissors,
  Users,
  Clock,
  Star,
  Image as ImageIcon,
  Building2,
  Armchair,
  LucideIcon,
} from "lucide-react";

export type RoleType = "customer" | "business" | "professional";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface DashboardConfig {
  role: RoleType;
  roleName: string;
  roleBadgeColor: string;
  actionButtonLabel: string;
  actionButtonHref: string;
  navItems: NavItem[];
}

export const DASHBOARD_CONFIGS: Record<RoleType, DashboardConfig> = {
  customer: {
    role: "customer",
    roleName: "Customer Portal",
    roleBadgeColor: "bg-[#D99722]/15 text-[#D99722] border-[#D99722]/30",
    actionButtonLabel: "+ Add New Booking",
    actionButtonHref: "/discover",
    navItems: [
      { title: "Dashboard", href: "/customer/overview", icon: LayoutDashboard },
      { title: "My Bookings", href: "/customer/bookings", icon: CalendarCheck },
      { title: "Calendar", href: "/customer/calendar", icon: Calendar },
      { title: "Messages", href: "/customer/messages", icon: MessageSquare },
      { title: "Favorites", href: "/customer/favorites", icon: Heart },
      { title: "Settings", href: "/customer/settings", icon: Settings },
    ],
  },
  business: {
    role: "business",
    roleName: "Business Dashboard",
    roleBadgeColor: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    actionButtonLabel: "+ Add New Service",
    actionButtonHref: "/business/services/new",
    navItems: [
      { title: "Dashboard", href: "/business/dashboard", icon: LayoutDashboard },
      { title: "Business Profile", href: "/business/business-profile", icon: Building2 },
      { title: "Chairs & Space", href: "/business/chairs-space", icon: Armchair },
      { title: "Work Space", href: "/business/workspace", icon: Armchair },
      { title: "Business Rentals", href: "/business/business-rentals", icon: Armchair },
      { title: "Services", href: "/business/services", icon: Scissors },
      { title: "Calendar", href: "/business/calendar", icon: Calendar },
      { title: "Bookings", href: "/business/bookings", icon: CalendarCheck },
      { title: "Reviews", href: "/business/reviews", icon: Star },
      { title: "Settings", href: "/business/settings", icon: Settings },
    ],
  },
  professional: {
    role: "professional",
    roleName: "Professional Hub",
    roleBadgeColor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    actionButtonLabel: "+ Add New Services",
    actionButtonHref: "/professional/services/new",
    navItems: [
      { title: "Dashboard", href: "/professional/dashboard", icon: LayoutDashboard },
      { title: "Business Profile", href: "/professional/business-profile", icon: Building2 },
      { title: "Chairs & Space", href: "/professional/chairs-space", icon: Armchair },
      { title: "Work Space", href: "/professional/workspace", icon: Armchair },
      { title: "Service Booking", href: "/professional/bookings", icon: CalendarCheck },
      { title: "Calendar", href: "/professional/calendar", icon: Calendar },
      { title: "Messages", href: "/professional/messages", icon: MessageSquare },
      { title: "Services", href: "/professional/services", icon: Scissors },
      { title: "Portfolio", href: "/professional/portfolio", icon: ImageIcon },
      { title: "Reviews", href: "/professional/reviews", icon: Star },
      { title: "Settings", href: "/professional/settings", icon: Settings },
    ],
  },
};

export const getProfessionalNavItems = (isSalonOwner?: boolean): NavItem[] => {
  if (isSalonOwner) {
    return [
      { title: "Dashboard", href: "/professional/dashboard", icon: LayoutDashboard },
      { title: "Business Profile", href: "/professional/business-profile", icon: Building2 },
      { title: "My Workspace", href: "/professional/workspaces", icon: Armchair },
      { title: "Workspace Booking", href: "/professional/booking", icon: Armchair },
      { title: "Service Booking", href: "/professional/service-bookings", icon: CalendarCheck },
      { title: "Calendar", href: "/professional/calendar", icon: Calendar },
      { title: "Messages", href: "/professional/messages", icon: MessageSquare },
      { title: "Services", href: "/professional/services", icon: Scissors },
      { title: "Reviews", href: "/professional/reviews", icon: Star },
      { title: "Settings", href: "/professional/settings", icon: Settings },
    ];
  }

  return [
    { title: "Dashboard", href: "/professional/dashboard", icon: LayoutDashboard },
    { title: "Service Booking", href: "/professional/service-bookings", icon: CalendarCheck },
    { title: "Calendar", href: "/professional/calendar", icon: Calendar },
    { title: "Messages", href: "/professional/messages", icon: MessageSquare },
    { title: "Services", href: "/professional/services", icon: Scissors },
    { title: "Work Space", href: "/professional/workspace", icon: Armchair },
    { title: "Portfolio", href: "/professional/portfolio", icon: ImageIcon },
    { title: "Reviews", href: "/professional/reviews", icon: Star },
    { title: "Settings", href: "/professional/settings", icon: Settings },
  ];
};
