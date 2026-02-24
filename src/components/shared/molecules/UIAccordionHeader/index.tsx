import BaseIcon from "../../atoms/BaseIcon"

type UIAccordionHeaderProps = {
  children: React.ReactNode
  isOpen: boolean
  onClick: () => void
}

const UIAccordionHeader = ({
  children,
  isOpen,
  onClick,
}: UIAccordionHeaderProps) => {
  return (
    <div
      className="flex justify-between items-center p-4 cursor-pointer"
      onClick={onClick}
    >
      <div>{children}</div>
      <BaseIcon open={isOpen} />
    </div>
  )
}

export default UIAccordionHeader