import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../components/layouts/AuthLayout";
import CmsLayout from "../components/layouts/CmsLayout";
import GuestRoute from "../routes/GuestRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/cms/Dashboard";

import Documentation from "../pages/cms/Documentation";
import DocButton from "../pages/cms/Documentation/components/Button";
import DocForm from "../pages/cms/Documentation/components/Form";
import DocFormBasic from "../pages/cms/Documentation/components/Form/components/FormBasic";
import DocFormValidation from "../pages/cms/Documentation/components/Form/components/FormValidation";
import DocMiscAvatar from "../pages/cms/Documentation/components/Misc/components/Avatar";
import DocMiscBadge from "../pages/cms/Documentation/components/Misc/components/Badge";
import DocMisc from "../pages/cms/Documentation/components/Misc";
import DocMiscChip from "../pages/cms/Documentation/components/Misc/components/Chip";
import DocMiscEmptyData from "../pages/cms/Documentation/components/Misc/components/EmptyData";
import DocMiscLink from "../pages/cms/Documentation/components/Misc/components/Link";
import DocMiscProgressBar from "../pages/cms/Documentation/components/Misc/components/ProgressBar";
import DocMiscTag from "../pages/cms/Documentation/components/Misc/components/Tag";
import DocPanel from "../pages/cms/Documentation/components/Panel";
import DocPanelAccordion from "../pages/cms/Documentation/components/Panel/components/Accordion";
import DocPanelCard from "../pages/cms/Documentation/components/Panel/components/Card";
import DocPanelDivider from "../pages/cms/Documentation/components/Panel/components/Divider";
import DocPanelTabs from "../pages/cms/Documentation/components/Panel/components/Tabs";
import DocMessages from "../pages/cms/Documentation/components/Messages";
import DocMessagesAlert from "../pages/cms/Documentation/components/Messages/components/Alert";
import DocMessagesToasts from "../pages/cms/Documentation/components/Messages/components/Toasts";
import DocTable from "../pages/cms/Documentation/components/Table";
import DocTableBasic from "../pages/cms/Documentation/components/Table/components/Basic";
import DocTableDatatable from "../pages/cms/Documentation/components/Table/components/Datatable";
import CmsUsersList from "../pages/cms/Users/List";
import CmsUsersCreate from "../pages/cms/Users/Create";
import CmsUsersDetail from "../pages/cms/Users/Detail";
import CmsUsersUpdate from "../pages/cms/Users/Update";
import CmsUsers from "../pages/cms/Users";

import Pages from "../pages/cms/Sample/Pages";
import FileManager from "../pages/cms/Sample/FileManager";
import Settings from "../pages/cms/Sample/Settings";
import PageNotFound from "../components/layouts/PageNotFound";
import DocMiscClipboard from "../pages/cms/Documentation/components/Misc/components/Clipboard";

export const router = createBrowserRouter([
  // AUTH
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />
          },
          {
            path: "login",
            element: <Login />
          },
        ],
      },
    ],
  },
  // CMS
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/",
        element: <CmsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          // USERS
          {
            path: "users",
            element: <CmsUsers />,
            children: [
              { index: true,
                element: <Navigate to="list" replace />
              },
              {
                path: "list",
                element: <CmsUsersList />
              },
              {
                path: "create",
                element: <CmsUsersCreate />
              },
              {
                path: "detail/:id",
                element: <CmsUsersDetail />
              },
              {
                path: "update/:id",
                element: <CmsUsersUpdate />
              },
            ]
          },
          // DOCUMENTATION
          {
            path: "documentations",
            element: <Documentation />,
            children: [
              { index: true,
                element: <Navigate to="button" replace />
              },
              {
                path: "button",
                element: <DocButton />
              },
              {
                path: "form",
                element: <DocForm />,
                children: [
                  { index: true,
                    element: <Navigate to="basic" replace />
                  },
                  {
                    path: "basic",
                    element: <DocFormBasic />
                  },
                  {
                    path: "validation",
                    element: <DocFormValidation />
                  }
                ]
              },
              {
                path: "messages",
                element: <DocMessages />,
                children: [
                  { index: true,
                    element: <Navigate to="alert" replace />
                  },
                  {
                    path: "alert",
                    element: <DocMessagesAlert />
                  },
                  {
                    path: "toasts",
                    element: <DocMessagesToasts />
                  }
                ]
              },
              {
                path: "table",
                element: <DocTable />,
                children: [
                  { index: true,
                    element: <Navigate to="basic" replace />
                  },
                  {
                    path: "basic",
                    element: <DocTableBasic />
                  },
                  {
                    path: "datatable",
                    element: <DocTableDatatable />
                  }
                ]
              },
              {
                path: "misc",
                element: <DocMisc />,
                children: [
                  { index: true,
                    element: <Navigate to="avatar" replace />
                  },
                  {
                    path: "avatar",
                    element: <DocMiscAvatar />
                  },
                  {
                    path: "badge",
                    element: <DocMiscBadge />
                  },
                  {
                    path: "chip",
                    element: <DocMiscChip />
                  },
                  {
                    path: "clipboard",
                    element: <DocMiscClipboard />
                  },
                  {
                    path: "empty-data",
                    element: <DocMiscEmptyData />
                  },
                  {
                    path: "link",
                    element: <DocMiscLink />
                  },
                  {
                    path: "progress-bar",
                    element: <DocMiscProgressBar />
                  },
                  {
                    path: "tag",
                    element: <DocMiscTag />
                  }
                ]
              },
              {
                path: "panel",
                element: <DocPanel />,
                children: [
                  { index: true,
                    element: <Navigate to="accordion" replace />
                  },
                  {
                    path: "accordion",
                    element: <DocPanelAccordion />
                  },
                  {
                    path: "card",
                    element: <DocPanelCard />
                  },
                  {
                    path: "divider",
                    element: <DocPanelDivider />
                  },
                  {
                    path: "tabs",
                    element: <DocPanelTabs />
                  }
                ]
              }
            ]
          },
          // SAMPLE PAGES
          {
            path: "pages",
            element: <Pages />
          },
          {
            path: "files",
            element: <FileManager />
          },
          {
            path: "settings",
            element: <Settings />
          },
        ]
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);