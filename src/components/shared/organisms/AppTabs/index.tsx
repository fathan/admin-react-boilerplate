import { FC, ReactNode } from "react";
import { TabsRoot } from "@chakra-ui/react";
import UITabList from "../../molecules/UITabList";
import BaseTabContent from "../../atoms/BaseTabContent";

interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface AppTabsProps {
  defaultValue?: string;
  variant?: "line" | "subtle" | "enclosed" | "outline" | "plain";
  tabs: TabItem[];
}

const AppTabs: FC<AppTabsProps> = ({ defaultValue, variant = "line", tabs }) => {
  return (
    <TabsRoot defaultValue={defaultValue} variant={variant}>
      <UITabList tabs={tabs} />
      {tabs.map((tab) => (
        <BaseTabContent key={tab.value} value={tab.value}>
          {tab.content}
        </BaseTabContent>
      ))}
    </TabsRoot>
  );
};

export default AppTabs;