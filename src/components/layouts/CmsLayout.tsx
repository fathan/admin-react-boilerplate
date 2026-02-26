import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import {
  Flex,
  Switch,
  Text,
  IconButton,
  Menu,
  Avatar,
} from "@chakra-ui/react"
import { useTheme } from "next-themes"
import { ChevronDown } from "lucide-react"
import UILanguageSwitcher from "@/components/shared/molecules/UILanguageSwitcher"
import UIBreadcrumbs from "../shared/molecules/UIBreadcrumbs"

export default function CmsLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-[#12110e] flex">
      <Sidebar />

      <div className="flex-1 ml-72">
        <div className="fixed top-0 left-[18rem] right-0 m-8 pt-10 -mt-3 z-50 bg-white dark:bg-[#12110e]">
          <div className="flex justify-between items-center px-6 py-3 h-16 bg-white dark:bg-[#12110e] rounded-2xl border border-gray-200 dark:border-gray-600">
            <Text fontWeight="bold">CMS Dashboard</Text>

            <Flex align="center" gap="4">
              <UILanguageSwitcher />

              {/* Dark Mode Switch */}
              <Flex align="center" gap="2">
                <Text fontSize="sm">
                  {theme === "dark" ? "Dark" : "Light"}
                </Text>
                <Switch.Root
                  checked={theme === "dark"}
                  onCheckedChange={(e) =>
                    setTheme(e.checked ? "dark" : "light")
                  }
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
              </Flex>

              {/* Avatar Dropdown */}
              <Menu.Root>
                <Menu.Trigger asChild>
                  <IconButton variant="ghost">
                    <Flex align="center" gap="2">
                      <Avatar.Root size="sm">
                        <Avatar.Fallback name="Admin User" />
                      </Avatar.Root>
                      <ChevronDown size={16} />
                    </Flex>
                  </IconButton>
                </Menu.Trigger>

                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="profile">
                      Profile
                    </Menu.Item>
                    <Menu.Item value="settings">
                      Settings
                    </Menu.Item>
                    <Menu.Item value="logout" color="red.500">
                      Logout
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            </Flex>
          </div>

          <div className="mt-4">
            <UIBreadcrumbs separator=">" />
          </div>
        </div>

        {/* Main Content */}
        <main className="pt-36 p-8 bg-white dark:bg-[#12110e]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}