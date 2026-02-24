import AppAccordion from "./AppAccordion"
import AppAccordionItem from "./AppAccordionItem"

function Header({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
Header.displayName = "AccordionHeader"

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
Content.displayName = "AccordionContent"

AppAccordion.Item = AppAccordionItem
AppAccordion.Header = Header
AppAccordion.Content = Content

export default AppAccordion