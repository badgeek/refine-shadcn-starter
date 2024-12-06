import { Calendar, Home, Inbox, Search, Settings, ChevronDown, Users, Mail, FileText, Bell, User2, ChevronUp, BarChart } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"
import { Link, useLogout } from "@refinedev/core"

// Menu items.
const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
  {
    title: "Blog", 
    url: "/blog-posts",
    icon: FileText,
  },
  {
    title: "Inbox",
    url: "#", 
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const teamItems = [
  {
    title: "Members",
    url: "#",
    icon: Users,
  },
  {
    title: "Messages",
    url: "#",
    icon: Mail,
  },
  {
    title: "Documents",
    url: "#",
    icon: FileText,
  },
]

const notificationItems = [
  {
    title: "Alerts",
    url: "#",
    icon: Bell,
  },
  {
    title: "Updates",
    url: "#",
    icon: FileText, 
  },
]

type MenuItemType = {
  title: string
  url: string
  icon: React.ElementType
}

function SidebarMenuItems({ items }: { items: MenuItemType[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function CollapsibleMenuSection({ title, items }: { title: string, items: MenuItemType[] }) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {title}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenuItems items={items} />
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
function UserDropdown() {
  const { theme, setTheme } = useTheme()
  const { mutate: logout } = useLogout();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> Username
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <User2 className="h-4 w-4 mr-2" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => logout()}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span>Sign out</span>
            </DropdownMenuItem>
            {(theme as string) === 'dark' ? (
              <DropdownMenuItem 
                onClick={() => setTheme("light")}
                className={(theme as string) === "light" ? "bg-accent" : ""}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem 
                onClick={() => setTheme("dark")}
                className={(theme as string) === "dark" ? "bg-accent" : ""}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <CollapsibleMenuSection title="Help" items={items} />
        <CollapsibleMenuSection title="Team" items={teamItems} />
        <CollapsibleMenuSection title="Notifications" items={notificationItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}
