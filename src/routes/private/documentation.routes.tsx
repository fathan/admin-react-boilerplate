import { Navigate } from "react-router-dom";

import Documentation from "@/pages/cms/Documentation";

import DocI18n from "@/pages/cms/Documentation/components/I18n";

import DocButton from "@/pages/cms/Documentation/components/Button";
import DocButtonActionButton from "@/pages/cms/Documentation/components/Button/components/ActionButton";
import DocButtonBasic from "@/pages/cms/Documentation/components/Button/components/Basic";
import DocButtonCloseButton from "@/pages/cms/Documentation/components/Button/components/CloseButton";
import DocButtonIconButton from "@/pages/cms/Documentation/components/Button/components/IconButton";

import DocForm from "@/pages/cms/Documentation/components/Form";
import DocFormBasic from "@/pages/cms/Documentation/components/Form/components/FormBasic";
import DocFormValidation from "@/pages/cms/Documentation/components/Form/components/FormValidation";
import DocFormEditor from "@/pages/cms/Documentation/components/Form/components/Editor";

import DocMiscAvatar from "@/pages/cms/Documentation/components/Misc/components/Avatar";
import DocMiscBadge from "@/pages/cms/Documentation/components/Misc/components/Badge";
import DocMisc from "@/pages/cms/Documentation/components/Misc";
import DocMiscChip from "@/pages/cms/Documentation/components/Misc/components/Chip";
import DocMiscEmptyData from "@/pages/cms/Documentation/components/Misc/components/EmptyData";
import DocMiscLink from "@/pages/cms/Documentation/components/Misc/components/Link";
import DocMiscProgressBar from "@/pages/cms/Documentation/components/Misc/components/ProgressBar";
import DocMiscTag from "@/pages/cms/Documentation/components/Misc/components/Tag";
import DocMiscClipboard from "@/pages/cms/Documentation/components/Misc/components/Clipboard";
import DocMiscImages from "@/pages/cms/Documentation/components/Misc/components/Images";

import DocPanel from "@/pages/cms/Documentation/components/Panel";
import DocPanelAccordion from "@/pages/cms/Documentation/components/Panel/components/Accordion";
import DocPanelCard from "@/pages/cms/Documentation/components/Panel/components/Card";
import DocPanelDivider from "@/pages/cms/Documentation/components/Panel/components/Divider";
import DocPanelTabs from "@/pages/cms/Documentation/components/Panel/components/Tabs";

import DocMessages from "@/pages/cms/Documentation/components/Messages";
import DocMessagesAlert from "@/pages/cms/Documentation/components/Messages/components/Alert";
import DocMessagesToasts from "@/pages/cms/Documentation/components/Messages/components/Toasts";

import DocTable from "@/pages/cms/Documentation/components/Table";
import DocTableBasic from "@/pages/cms/Documentation/components/Table/components/Basic";
import DocTableDatatable from "@/pages/cms/Documentation/components/Table/components/Datatable";

import DocTableDatatableClientSide from "@/pages/cms/Documentation/components/Table/components/Datatable/components/ClientSide";
import DocTableDatatableServerSide from "@/pages/cms/Documentation/components/Table/components/Datatable/components/ServerSide";
import DocTableDatatableColMixin from "@/pages/cms/Documentation/components/Table/components/Datatable/components/ColMixin";

import DocOther from "@/pages/cms/Documentation/components/Other";
import DocOtherModal from "@/pages/cms/Documentation/components/Other/components/Modal";
import DocOtherDrawer from "@/pages/cms/Documentation/components/Other/components/Drawer";

import DocIntegrationApi from "@/pages/cms/Documentation/components/IntegrationApi";
import DocIntegrationApiList from "@/pages/cms/Documentation/components/IntegrationApi/List";
import DocIntegrationApiCreate from "@/pages/cms/Documentation/components/IntegrationApi/Create";
import DocIntegrationApiUpdate from "@/pages/cms/Documentation/components/IntegrationApi/Update";
import DocIntegrationApiSendJsonData from "@/pages/cms/Documentation/components/IntegrationApi/SendJsonData";
import DocIntegrationApiSendFormData from "@/pages/cms/Documentation/components/IntegrationApi/SendFormData";
import DocStateManagement from "@/pages/cms/Documentation/components/StateManagement";
import DocStateManagementBasic from "@/pages/cms/Documentation/components/StateManagement/components/Basic";
import DocStateManagementPersistant from "@/pages/cms/Documentation/components/StateManagement/components/Persistant";

export const documentationRoutes = {
  path: "documentations",
  element: <Documentation />,
  children: [
    { index: true,
      element: <Navigate to="button" replace />
    },
    {
      path: 'i18n',
      element: <DocI18n />
    },
    {
      path: "button",
      element: <DocButton />,
      children: [
        { index: true,
          element: <Navigate to="basic" replace />
        },
        {
          path: "basic",
          element: <DocButtonBasic />
        },
        {
          path: "action-button",
          element: <DocButtonActionButton />
        },
        {
          path: "close-button",
          element: <DocButtonCloseButton />
        },
        {
          path: "icon-button",
          element: <DocButtonIconButton />
        }
      ]
    },
    {
      path: "integration-api",
      element: <DocIntegrationApi />,
      children: [
        { index: true,
          element: <Navigate to="list" replace />
        },
        {
          path: "list",
          element: <DocIntegrationApiList />
        },
        {
          path: "create",
          element: <DocIntegrationApiCreate />
        },
        {
          path: "update",
          element: <DocIntegrationApiUpdate />
        },
        {
          path: "send-form-data",
          element: <DocIntegrationApiSendFormData />
        },
        {
          path: "send-json-data",
          element: <DocIntegrationApiSendJsonData />
        }
      ]
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
        },
        {
          path: "editor",
          element: <DocFormEditor />
        }
      ]
    },
    {
      path: "state-management",
      element: <DocStateManagement />,
      children: [
        { index: true,
          element: <Navigate to="basic" replace />
        },
        {
          path: "basic",
          element: <DocStateManagementBasic />
        },
        {
          path: "persistant",
          element: <DocStateManagementPersistant />
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
          element: <DocTableDatatable />,
          children: [
            { index: true,
              element: <Navigate to="client-side" replace />
            },
            {
              path: "client-side",
              element: <DocTableDatatableClientSide />
            },
            {
              path: "server-side",
              element: <DocTableDatatableServerSide />
            },
            {
              path: "col-mixin",
              element: <DocTableDatatableColMixin />
            }
          ]
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
        },
        {
          path: "images",
          element: <DocMiscImages />
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
    },
    {
      path: "other",
      element: <DocOther />,
      children: [
        { index: true,
          element: <Navigate to="modal" replace />
        },
        {
          path: "modal",
          element: <DocOtherModal />
        },
        {
          path: "drawer",
          element: <DocOtherDrawer />
        }
      ]
    }
  ]
}