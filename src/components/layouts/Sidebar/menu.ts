import {
  LayoutDashboard,
  User,
  FileText,
  Shield,
  Users,
  FolderOpen,
  Activity,
  MessageCircle,
  Folder,
  Menu,
  Users2,
  PenLine,
  Newspaper,
  PanelTop,
  Box,
} from 'lucide-react';
import { NavGroup } from '.';
import { LuTableOfContents } from 'react-icons/lu';

export const navGroups: NavGroup[] = [
  {
    items: [
      {
        icon: LayoutDashboard,
        label: 'Dashboard',
        path: '/dashboard',
      },
    ],
  },
  {
    title: 'Posts & Pages',
    items: [
      {
        icon: Box,
        label: 'Posts',
        roles: ['superadmin', 'admin'],
        children: [
          {
            label: 'All Posts',
            path: '/posts',
            icon: Newspaper,
            roles: ['superadmin', 'admin'],
          },
          {
            label: 'Create Post',
            path: '/posts/create',
            icon: PenLine,
            roles: ['superadmin', 'admin'],
          },
        ],
      },
      {
        icon: Box,
        label: 'Pages',
        roles: ['superadmin', 'admin'],
        children: [
          {
            label: 'All Pages',
            path: '/pages',
            icon: PanelTop,
            roles: ['superadmin', 'admin'],
          },
          {
            label: 'Create Page',
            path: '/pages/create',
            icon: PenLine,
            roles: ['superadmin', 'admin'],
          },
        ],
      },
      {
        icon: LuTableOfContents,
        label: 'Categories',
        path: '/categories',
        roles: ['superadmin', 'admin'],
      },
      {
        icon: LuTableOfContents,
        label: 'Tags',
        path: '/tags',
        roles: ['superadmin', 'admin'],
      },
    ],
  },
  {
    title: '',
    items: [
      {
        icon: MessageCircle,
        label: 'Comments',
        path: '/comments',
      },
    ],
  },
  {
    title: '',
    items: [
      {
        icon: Folder,
        label: 'Media',
        path: '/media',
      },
    ],
  },
  {
    title: 'User Management',
    items: [
      {
        icon: Users,
        label: 'Users',
        roles: ['superadmin', 'admin'],
        children: [
          {
            label: 'All Users',
            path: '/users',
            icon: User,
            roles: ['superadmin', 'admin'],
          },
          {
            label: 'Roles & Permissions',
            path: '/users/roles',
            icon: Shield,
            roles: ['superadmin'],
          },
          {
            icon: Users2,
            label: 'Visitor',
            path: '/visitor',
            roles: ['superadmin'],
          },
        ],
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        icon: Menu,
        label: 'Menu',
        path: '/menu',
        roles: ['superadmin'],
      },
      {
        icon: Activity,
        label: 'Log Activity',
        path: '/log-activity',
        roles: ['superadmin'],
      },
      {
        icon: FolderOpen,
        label: 'Documentations',
        children: [
          {
            label: 'All Docs',
            path: '/documentations',
            icon: FileText,
          },
        ],
      },
    ],
  },
];