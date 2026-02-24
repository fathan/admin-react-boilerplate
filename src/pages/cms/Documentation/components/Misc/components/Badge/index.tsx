import BaseBadge from "@/components/shared/atoms/BaseBadge";

export default function DocMiscBadge() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <BaseBadge colorPalette="blue" variant="solid" size="sm">

          <BaseBadge.Icon>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L12 7H20L14 11L16 18L10 14L4 18L6 11L0 7H8L10 0Z" />
            </svg>
          </BaseBadge.Icon>
          Featured
        </BaseBadge>

        <BaseBadge colorPalette="orange" variant="solid" size="sm">

          <BaseBadge.Icon>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L12 7H20L14 11L16 18L10 14L4 18L6 11L0 7H8L10 0Z" />
            </svg>
          </BaseBadge.Icon>
          Featured
        </BaseBadge>

        <BaseBadge colorPalette="red" variant="solid" size="sm">

          <BaseBadge.Icon>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L12 7H20L14 11L16 18L10 14L4 18L6 11L0 7H8L10 0Z" />
            </svg>
          </BaseBadge.Icon>
          Featured
        </BaseBadge>

        <BaseBadge colorPalette="green" variant="solid" size="sm">

          <BaseBadge.Icon>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L12 7H20L14 11L16 18L10 14L4 18L6 11L0 7H8L10 0Z" />
            </svg>
          </BaseBadge.Icon>
          Featured
        </BaseBadge>

        <BaseBadge colorPalette="yellow" variant="solid" size="sm">

          <BaseBadge.Icon>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L12 7H20L14 11L16 18L10 14L4 18L6 11L0 7H8L10 0Z" />
            </svg>
          </BaseBadge.Icon>
          Featured
        </BaseBadge>

        <BaseBadge colorPalette="teal" variant="solid" size="sm">

          <BaseBadge.Icon>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0L12 7H20L14 11L16 18L10 14L4 18L6 11L0 7H8L10 0Z" />
            </svg>
          </BaseBadge.Icon>
          Featured
        </BaseBadge>
      </div>
      
      <div className="flex flex-row gap-3">
        <BaseBadge colorPalette="gray" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="red" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="orange" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="yellow" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="green" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="teal" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="blue" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="cyan" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="purple" variant="subtle" size="md">
          Badge
        </BaseBadge>

        <BaseBadge colorPalette="pink" variant="subtle" size="md">
          Badge
        </BaseBadge>
      </div>
    </div>
  );
}