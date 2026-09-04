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
    roleBadgeColor: "bg-[#B78735]/15 text-[#B78735] border-[#B78735]/30",
    actionButtonLabel: "+ Add New Booking",
    actionButtonHref: "/discover",
    navItems: [
      { title: "Dashboard", href: "/customer/overview", icon: LayoutDashboard },
      { title: "Discovery", href: "/customer/discover", icon: Compass },
      { title: "My Bookings", href: "/customer/bookings", icon: CalendarCheck, badge: 2 },
      { title: "Calendar", href: "/customer/calendar", icon: Calendar },
      { title: "Messages", href: "/customer/messages", icon: MessageSquare, badge: 3 },
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
      { title: "Bookings", href: "/professional/bookings", icon: CalendarCheck },
      { title: "Services", href: "/professional/services", icon: Scissors },
      { title: "Availability", href: "/professional/availability", icon: Clock },
      { title: "Calendar", href: "/professional/calendar", icon: Calendar },
      { title: "Chair Rental", href: "/professional/chair-rental", icon: Armchair },
      { title: "My Customers", href: "/professional/my-customers", icon: Users },
      { title: "Portfolio", href: "/professional/portfolio", icon: ImageIcon },
      { title: "Reviews", href: "/professional/reviews", icon: Star },
      { title: "Settings", href: "/professional/settings", icon: Settings },
    ],
  },
};
