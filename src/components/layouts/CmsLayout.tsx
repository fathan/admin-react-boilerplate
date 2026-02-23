import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import {
  Box,
  Flex,
  Switch,
  Text,
  IconButton,
  Menu,
  Avatar,
} from "@chakra-ui/react"
import { useTheme } from "next-themes"
import { ChevronDown } from "lucide-react"

export default function CmsLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-[#12110e] flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-72">
        {/* Header */}
        <Box
          position="fixed"
          top="0"
          left="18rem"
          right="0"
          height="64px"
          bg="white"
          _dark={{ bg: "#1a1814" }}
          borderBottomWidth="1px"
          zIndex="50"
        >
          <Flex
            h="100%"
            px="6"
            align="center"
            justify="space-between"
          >
            <Text fontWeight="bold">CMS Dashboard</Text>

            <Flex align="center" gap="4">
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
          </Flex>
        </Box>

        {/* Main Content */}
        <main className="pt-20 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}