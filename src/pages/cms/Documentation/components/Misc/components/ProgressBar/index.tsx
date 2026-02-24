import BaseProgressBar from "@/components/shared/atoms/BaseProgressBar";

export default function DocMiscProgressBar() {
  return (
    <div className="space-y-6">
      <BaseProgressBar value={70} />

      <BaseProgressBar
        value={45}
        variant="success"
        size="lg"
        showLabel
      />

      <BaseProgressBar value={78} customColor="#8B5CF6" />

      <BaseProgressBar indeterminate />

      <BaseProgressBar value={80} tooltip showLabel />

      <BaseProgressBar
        value={80}
        variant="warning"
        striped
        animated
        showLabel
      />
    </div>
  );
}