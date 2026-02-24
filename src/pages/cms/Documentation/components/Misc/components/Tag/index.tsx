import BaseTag from "@/components/shared/atoms/BaseTag";

export default function DocMiscTag() {
  return (
    <>
      <BaseTag
        value={["tag1", "tag2"]}
        description="Press enter to add more tags"
        placeholder="Add tag..."
      />
    </>
  );
}