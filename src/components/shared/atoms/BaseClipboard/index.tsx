import { Button, Clipboard, IconButton, Input, InputGroup, Link } from "@chakra-ui/react"

export interface BaseClipboardProps {
  value: string;
  type: 'icon' | 'text' | 'button' | 'input-group';
}

const TypeIcon = ({ value }: { value: string }) => {
  return (
    <Clipboard.Root value={value} timeout={1000}>
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="xs">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}

const TypeText = ({ value }: { value: string }) => {
  return (
    <Clipboard.Root value={value} timeout={1000}>
      <Clipboard.Trigger asChild>
        <Link as="span" color="blue.fg" textStyle="sm">
          <Clipboard.Indicator />
          <Clipboard.ValueText />
        </Link>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}

const TypeButton = ({ value }: { value: string }) => {
  return (
    <>
      <Clipboard.Root value={value} timeout={1000}>
        <Clipboard.Trigger asChild>
          <Button variant="outline" size="sm">
            <Clipboard.Indicator />
            Copy Text
          </Button>
        </Clipboard.Trigger>
      </Clipboard.Root>
    </>
  )
}

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger asChild>
      <IconButton variant="surface" size="xs" me="-2">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  )
}

const TypeInputGroup = ({ value }: { value: string }) => {
  return (
    <>
      <Clipboard.Root value={value} timeout={1000}>
        <InputGroup endElement={<ClipboardIconButton />}>
          <Clipboard.Input asChild>
            <Input />
          </Clipboard.Input>
        </InputGroup>
      </Clipboard.Root>
    </>
  )
}

const BaseClipboard: React.FC<BaseClipboardProps> = ({
  value,
  type
}) => {
  return (
    <>  
      {type === 'icon' && <TypeIcon value={value} />}
      {type === 'text' && <TypeText value={value} />}
      {type === 'button' && <TypeButton value={value} />}
      {type === 'input-group' && <TypeInputGroup value={value} />}
    </>
  )
};

export default BaseClipboard;
