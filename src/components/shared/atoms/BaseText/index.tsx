import { Span, SpanProps } from "@chakra-ui/react"

type BaseTextProps = SpanProps & {
  children: React.ReactNode
}

const BaseText = ({ children, ...props }: BaseTextProps) => {
  return (
    <Span flex="1" {...props}>
      {children}
    </Span>
  )
}

export default BaseText