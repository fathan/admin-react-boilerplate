import BaseClipboard from "@/components/shared/atoms/BaseClipboard";

export default function DocMiscClipboard() {
  return (
    <div className="flex flex-col gap-4">
      <BaseClipboard
        value="Hello World, icon text copy"
        type="icon"
      />

      <BaseClipboard
        value="This is text copy"
        type="text"
      />

      <BaseClipboard
        value="Hello World, button copy"
        type="button"
      />

      <BaseClipboard
        value="Hello World, input group copy"
        type="input-group"
      />
    </div>
  );
}