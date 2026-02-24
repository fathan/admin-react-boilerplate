import { FC, ReactNode } from "react";
import { TabsTrigger as ChakraTabsTrigger } from "@chakra-ui/react";

interface BaseTabTriggerProps {
  value: string;
  icon?: ReactNode;
  children: ReactNode;
}

const BaseTabTrigger: FC<BaseTabTriggerProps> = ({ value, icon, children }) => {
  return (
    <ChakraTabsTrigger value={value} className="flex items-center space-x-1">
      {icon && icon}
      <span>{children}</span>
    </ChakraTabsTrigger>
  );
};

export default BaseTabTrigger;