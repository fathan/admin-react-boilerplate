import AppTabs from "@/components/shared/organisms/AppTabs";
import { LucideAArrowDown, LucideFolder, User } from "lucide-react";

const ComponentPrimary = () => {
  return (
    <div>
      Componeny Primary
    </div>
  )
};

const ComponentSecondary = () => {
  return (
    <div>
      Componeny Secondary
    </div>
  )
};

const ComponentTertiary = () => {
  return (
    <div>
      Componeny Tertiary
    </div>
  )
};

const tabs = [
  { value: "members", label: "Members", icon: <User />, content: <ComponentPrimary /> },
  { value: "projects", label: "Projects", icon: <LucideFolder />, content: <ComponentSecondary /> },
  { value: "tasks", label: "Tasks", icon: <LucideAArrowDown />, content: <ComponentTertiary /> },
];

export default function DocPanelTabs() {
  return (
    <div className="space-y-6">
      <AppTabs
        defaultValue="members"
        variant="line"
        tabs={tabs}
      />

      <AppTabs
        defaultValue="members"
        variant="subtle"
        tabs={tabs}
      />

      <AppTabs
        defaultValue="members"
        variant="enclosed"
        tabs={tabs}
      />

      <AppTabs
        defaultValue="members"
        variant="outline"
        tabs={tabs}
      />

      <AppTabs
        defaultValue="members"
        variant="plain"
        tabs={tabs}
      />
    </div>
  );
}