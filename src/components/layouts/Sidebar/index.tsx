import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@chakra-ui/react';
import { useModal } from '@/providers/modal.providers';
import { navGroups } from './menu';

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = 'superadmin' | 'admin' | 'editor' | 'viewer';

export interface NavChild {
  label: string;
  path: string;
  icon?: React.ElementType;
  roles?: Role[];
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  roles?: Role[];
  children?: NavChild[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

// ─── Hook: current user role ──────────────────────────────────────────────────
// Ganti dengan selector dari auth store kamu
const useUserRole = (): Role => {
  // contoh: return useAuthStore((s) => s.user?.role) ?? 'viewer';
  return 'superadmin';
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const hasAccess = (roles: Role[] | undefined, userRole: Role): boolean => {
  if (!roles || roles.length === 0) return true;
  return roles.includes(userRole);
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ChildMenuProps {
  children: NavChild[];
  userRole: Role;
  isOpen: boolean;
}

const ChildMenu = ({ children, userRole, isOpen }: ChildMenuProps) => {
  const accessible = children.filter((c) => hasAccess(c.roles, userRole));
  if (!accessible.length) return null;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      {/* smooth bg block untuk children */}
      <div className="ml-0 mt-1 mb-1 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 overflow-hidden">
        <ul className="py-1 px-1 space-y-0.5">
          {accessible.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-digital-blue-600 bg-digital-blue-50 dark:bg-digital-blue-500/15 dark:text-digital-blue-300 font-medium'
                      : 'text-gray-500 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`
                }
              >
                {child.icon && <child.icon className="w-4 h-4 shrink-0" />}
                <span>{child.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface NavItemRowProps {
  item: NavItem;
  userRole: Role;
}

const NavItemRow = ({ item, userRole }: NavItemRowProps) => {
  const { icon: Icon, label, path, children, roles } = item;
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(() => {
    if (!children) return false;
    return children.some((c) => location.pathname.startsWith(c.path));
  });

  if (!hasAccess(roles, userRole)) return null;

  const hasChildren = !!children?.length;

  if (hasChildren) {
    const anyChildActive = children!.some((c) =>
      location.pathname.startsWith(c.path)
    );

    return (
      <li>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
            anyChildActive
              ? 'text-digital-blue-500 bg-digital-blue-50 dark:bg-digital-blue-500/10'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 dark:text-gray-500'
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="flex-1 text-left text-sm font-medium">{label}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        <ChildMenu
          children={children!}
          userRole={userRole}
          isOpen={open}
        />
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={path!}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
            isActive
              ? 'text-digital-blue-500 bg-digital-blue-100 dark:bg-digital-blue-500/15'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 dark:text-gray-500'
          }`
        }
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = () => {
  const { showModal } = useModal();
  const userRole = useUserRole();

  const onClickHandleLogout = () => {
    showModal({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      cancelText: 'No',
      cancelColor: 'gray',
      confirmText: 'Yes',
      confirmColor: 'red',
      onConfirm: () => {
        useAuthStore.getState().logout();
      },
    });
  };

  return (
    <div className="w-72 border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col bg-white dark:bg-[#0a0a09] dark:border-[#1a1a18] overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pt-6 pb-3 shrink-0">
        <h1 className="text-2xl font-bold text-gray-500 dark:text-white">
          CMS
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 pb-4 space-y-3">
        {navGroups.map((group, gi) => {
          const visibleItems = group.items.filter((item) =>
            hasAccess(item.roles, userRole)
          );
          if (!visibleItems.length) return null;

          return (
            <div key={gi} className="space-y-1.5">
              {group.title && (
                <p className="px-3 mb-1.5 text-[12px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 select-none">
                  {group.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item, ii) => (
                  <NavItemRow key={ii} item={item} userRole={userRole} />
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="shrink-0 px-6 py-5 border-t border-gray-100 dark:border-white/5">
        <Button variant="plain" onClick={onClickHandleLogout}>
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;