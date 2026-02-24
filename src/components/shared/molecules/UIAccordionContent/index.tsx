type UIAccordionContentProps = {
  children: React.ReactNode
  isOpen: boolean
}

const UIAccordionContent = ({
  children,
  isOpen,
}: UIAccordionContentProps) => {
  if (!isOpen) return null

  return <div className="p-4 border-t">{children}</div>
}

export default UIAccordionContent