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
import UILanguageSwitcher from "../shared/molecules/UILanguageSwitcher"

export default function CmsLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-[#12110e] flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-72">
        {/* Header */}
        <div
          className="fixed py-3 top-0 left-[18rem] right-0 h-16 bg-white dark:bg-[#1a1814] rounded-2xl border border-gray-200 dark:border-gray-600 m-8 mt-6 z-50"
        >
          <div className="flex justify-between items-center px-6">
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
        </div>

        {/* Main Content */}
        <main className="pt-32 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}