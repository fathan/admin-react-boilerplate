import BaseCloseButton from "@/components/shared/atoms/BaseCloseButton";

const DocButtonCloseButton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <BaseCloseButton variant="outline" size="md" />
        <BaseCloseButton variant="solid" size="md" />
        <BaseCloseButton variant="ghost" size="md" />
        <BaseCloseButton variant="subtle" size="md" />
      </div>

      <div className="flex flex-row gap-4">
        <BaseCloseButton variant="outline" size="2xs" />
        <BaseCloseButton variant="outline" size="xs" />
        <BaseCloseButton variant="outline" size="sm" />
        <BaseCloseButton variant="outline" size="md" />
        <BaseCloseButton variant="outline" size="lg" />
        <BaseCloseButton variant="outline" size="xl" />
      </div>

      <div className="flex flex-row gap-4">
        <BaseCloseButton variant="solid" size="2xs" />
        <BaseCloseButton variant="solid" size="xs" />
        <BaseCloseButton variant="solid" size="sm" />
        <BaseCloseButton variant="solid" size="md" />
        <BaseCloseButton variant="solid" size="lg" />
        <BaseCloseButton variant="solid" size="xl" />
      </div>

      <div className="flex flex-row gap-4">
        <BaseCloseButton variant="ghost" size="2xs" />
        <BaseCloseButton variant="ghost" size="xs" />
        <BaseCloseButton variant="ghost" size="sm" />
        <BaseCloseButton variant="ghost" size="md" />
        <BaseCloseButton variant="ghost" size="lg" />
        <BaseCloseButton variant="ghost" size="xl" />
      </div>

      <div className="flex flex-row gap-4">
        <BaseCloseButton variant="subtle" size="2xs" />
        <BaseCloseButton variant="subtle" size="xs" />
        <BaseCloseButton variant="subtle" size="sm" />
        <BaseCloseButton variant="subtle" size="md" />
        <BaseCloseButton variant="subtle" size="lg" />
        <BaseCloseButton variant="subtle" size="xl" />
      </div>
    </div>
  )
}

export default DocButtonCloseButton;
