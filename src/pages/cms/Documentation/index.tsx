import { Outlet, NavLink } from "react-router-dom";

type MenuItem = {
  label: string;
  path: string;
  children?: MenuItem[];
};

export default function Documentation() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-semibold underline"
      : "text-blue-500 hover:underline";

  // 🔥 MENU CONFIG
  const menus: MenuItem[] = [
    {
      label: "Alert",
      path: "alert",
    },
    {
      label: "Button",
      path: "button",
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
          label: "Chip",
          path: "misc/chip",
        },
        {
          label: "Copy Text",
          path: "misc/copy-text",
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
          label: "Progress Bar",
          path: "misc/progress-bar",
        },
        {
          label: "Tag",
          path: "misc/tag",
        },
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

  return (
    <div className="flex">
      <aside className="w-1/5 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Documentation</h2>

        <nav>
          <ul className="space-y-2 list-disc list-inside">
            {menus.map((menu) => (
              <li key={menu.path}>
                <NavLink to={menu.path} className={linkClass}>
                  {menu.label}
                </NavLink>

                {menu.children && (
                  <ul className="ml-4 mt-2 space-y-1 list-disc list-inside">
                    {menu.children.map((child) => (
                      <li key={child.path}>
                        <NavLink to={child.path} className={linkClass}>
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
}