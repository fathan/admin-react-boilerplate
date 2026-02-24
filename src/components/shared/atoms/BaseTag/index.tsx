import { Span, TagsInput } from "@chakra-ui/react";

interface BaseTagProps {
  value: string[];
  description?: string;
  placeholder?: string;
}

const BaseTag: React.FC<BaseTagProps> = ({
  value,
  description = "Press enter to add more tags",
  placeholder = "Add tag..."
}) => {
  return (
    <>
      <TagsInput.Root defaultValue={value}>
        <TagsInput.Label>Tags</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder={placeholder} />
        </TagsInput.Control>
        <Span textStyle="xs" color="fg.muted" ms="auto">
          {description}
        </Span>
      </TagsInput.Root>
    </>
  );
}

export default BaseTag;
