import React from "react"

import { useAccordionContext } from "./AppAccordion"
import UIAccordionHeader from "@/components/shared/molecules/UIAccordionHeader"
import UIAccordionContent from "@/components/shared/molecules/UIAccordionContent"

type AppAccordionItemProps = {
  value: string
  children: React.ReactNode
}

function AppAccordionItem({
  value,
  children,
}: AppAccordionItemProps) {
  const { activeValue, toggle } = useAccordionContext()
  const isOpen = activeValue === value

  let header: React.ReactNode = null
  let content: React.ReactNode = null

  React.Children.forEach(children, (child: any) => {
    if (child?.type?.displayName === "AccordionHeader") {
      header = child.props.children
    }
    if (child?.type?.displayName === "AccordionContent") {
      content = child.props.children
    }
  })

  return (
    <div>
      <UIAccordionHeader
        isOpen={isOpen}
        onClick={() => toggle(value)}
      >
        {header}
      </UIAccordionHeader>

      <UIAccordionContent isOpen={isOpen}>
        {content}
      </UIAccordionContent>
    </div>
  )
}

export default AppAccordionItem