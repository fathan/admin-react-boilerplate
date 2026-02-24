import { FC, ReactNode } from "react";
import { TabsContent as ChakraTabsContent } from "@chakra-ui/react";

interface BaseTabContentProps {
  value: string;
  children: ReactNode;
}

const BaseTabContent: FC<BaseTabContentProps> = ({ value, children }) => {
  return <ChakraTabsContent value={value}>{children}</ChakraTabsContent>;
};

export default BaseTabContent;