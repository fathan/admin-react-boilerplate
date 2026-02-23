import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../components/layouts/AuthLayout";
import CmsLayout from "../components/layouts/CmsLayout";
import GuestRoute from "../routes/GuestRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/cms/Dashboard";
import Pages from "../pages/cms/Pages";
import FileManager from "../pages/cms/FileManager";
import Settings from "../pages/cms/Settings";
import Users from "../pages/cms/Users";

import Documentation from "../pages/cms/Documentation";
import DocButton from "../pages/cms/Documentation/components/Button";
import DocForm from "../pages/cms/Documentation/components/Form";
import DocFormBasic from "../pages/cms/Documentation/components/Form/components/FormBasic";
import DocFormValidation from "../pages/cms/Documentation/components/Form/components/FormValidation";
import DocMiscAvatar from "../pages/cms/Documentation/components/Misc/components/Avatar";
import DocMiscBadge from "../pages/cms/Documentation/components/Misc/components/Badge";
import DocMisc from "../pages/cms/Documentation/components/Misc";
import DocMiscChip from "../pages/cms/Documentation/components/Misc/components/Chip";
import DocMiscCopyText from "../pages/cms/Documentation/components/Misc/components/CopyText";
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
          {
            path: "pages",
            element: <Pages />
          },
          {
            path: "files",
            element: <FileManager />
          },
          // USERS
          {
            path: "users",
            element: <Users />
          },
          {
            path: "users/create",
            element: <Users />
          },
          {
            path: "users/:id",
            element: <Users />
          },
          {
            path: "users/:id/edit",
            element: <Users />
          },
          {
            path: "settings",
            element: <Settings />
          },
          // DOCUMENTATION
          {
            path: "documentations",
            element: <Documentation />,
            children: [
              { index: true,
                element: <Navigate to="alert" replace />
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
                    path: "copy-text",
                    element: <DocMiscCopyText />
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
          }
        ]
      }
    ]
  }
]);