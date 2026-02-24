import { ChevronUp } from "lucide-react"
import BaseIcon from "@/components/shared/atoms/BaseIcon"

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
      {isOpen ? (
        <BaseIcon icon={ChevronUp} className="w-4 h-4 transition-transform" />
      ) : (
        <BaseIcon icon={ChevronUp} className="w-4 h-4 transition-transform rotate-180" />
      )}
    </div>
  )
}

export default UIAccordionHeader