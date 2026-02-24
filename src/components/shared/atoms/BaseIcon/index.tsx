type BaseIconProps = {
  open: boolean
}

const BaseIcon = ({ open }: BaseIconProps) => {
  return (
    <span
      className={`transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      ▼
    </span>
  )
}

export default BaseIcon