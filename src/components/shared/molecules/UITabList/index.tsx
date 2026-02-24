import { FC, ReactNode } from "react";
import { TabsList as ChakraTabsList } from "@chakra-ui/react";
import BaseTabTrigger from "../../atoms/BaseTabTrigger";


interface UITabListProps {
  tabs: { value: string; label: string; icon?: ReactNode }[];
}

const UITabList: FC<UITabListProps> = ({ tabs }) => {
  return (
    <ChakraTabsList>
      {tabs.map((tab) => (
        <BaseTabTrigger key={tab.value} value={tab.value} icon={tab.icon}>
          {tab.label}
        </BaseTabTrigger>
      ))}
    </ChakraTabsList>
  );
};

export default UITabList;