import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

type MenuItem = {
  label: string;
  path: string;
  children?: MenuItem[];
};

interface Node {
  id: string
  name: string
  children?: Node[]
}

const menus: MenuItem[] = [
  {
    label: "Button",
    path: "button",
    children: [
      {
        label: "Basic",
        path: "button/basic",
      },
      {
        label: "Action Button",
        path: "button/action-button",
      },
    ],
  },
  {
    label: "Forms",
    path: "form",
    children: [
      {
        label: "Basic",
        path: "form/basic",
      },
      {
        label: "Validation",
        path: "form/validation",
      },
    ],
  },
  {
    label: "Messages",
    path: "messages",
    children: [
      {
        label: "Alert",
        path: "messages/alert",
      },
      {
        label: "Toasts",
        path: "messages/toasts",
      },
    ],
  },
  {
    label: "Tables",
    path: "table",
    children: [
      {
        label: "Basic",
        path: "table/basic",
      },
      {
        label: "Datatable",
        path: "table/datatable",
      }
    ],
  },
  {
    label: "Misc",
    path: "misc",
    children: [
      {
        label: "Avatar",
        path: "misc/avatar",
      },
      {
        label: "Badge",
        path: "misc/badge",
      },
      {
        label: "Clipboard",
        path: "misc/clipboard",
      },
      {
        label: "Empty Data",
        path: "misc/empty-data",
      },
      {
        label: "Link",
        path: "misc/link",
      },
      {
        label: "Tag",
        path: "misc/tag",
      },
      {
        label: "Progress Bar",
        path: "misc/progress-bar",
      },
      {
        label: "Images",
        path: "misc/images",
      }
    ],
  },
  {
    label: "Panel",
    path: "panel",
    children: [
      {
        label: "Accordion",
        path: "panel/accordion",
      },
      {
        label: "Card",
        path: "panel/card",
      },
      {
        label: "Divider",
        path: "panel/divider",
      },
      {
        label: "Tabs",
        path: "panel/tabs",
      },
    ],
  },
];

export default function Documentation() {
  const navigate = useNavigate()
  const location = useLocation()

  const convertToNode = (items: MenuItem[]): Node[] => {
    return items.map((item) => ({
      id: item.path,
      name: item.label,
      children: item.children ? convertToNode(item.children) : undefined,
    }))
  }

  const menuCollection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: "root",
      name: "Documentation",
      children: convertToNode(menus),
    },
  })

  return (
    <div className="flex">
      <aside className="w-1/5 pr-4 border-r fixed h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Documentation</h2>

        <TreeView.Root
          collection={menuCollection}
          defaultExpandedValue={["button", "form", "messages", "table", "misc", "panel"]}
        >
          <TreeView.Tree>
            <TreeView.Node<Node>
              indentGuide={<TreeView.BranchIndentGuide />}
              render={({ node }) =>
                node.children ? (
                  <TreeView.BranchControl>
                    <LuFolder />
                    <TreeView.BranchText>{node.name}</TreeView.BranchText>
                  </TreeView.BranchControl>
                ) : (
                  <TreeView.Item
                    cursor="pointer"
                    onClick={() => navigate(node.id)}
                    bg={
                      location.pathname.includes(node.id)
                        ? "blue.50"
                        : "transparent"
                    }
                  >
                    <LuFile />
                    <TreeView.ItemText
                      fontWeight={
                        location.pathname.includes(node.id)
                          ? "semibold"
                          : "normal"
                      }
                      color={
                        location.pathname.includes(node.id)
                          ? "blue.600"
                          : "gray.600"
                      }
                    >
                      {node.name}
                    </TreeView.ItemText>
                  </TreeView.Item>
                )
              }
            />
          </TreeView.Tree>
        </TreeView.Root>
      </aside>

      <main className="w-full pl-[26%]">
        <Outlet />
      </main>
    </div>
  );
}