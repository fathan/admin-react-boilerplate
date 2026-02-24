import AppAccordion from "@/components/shared/organisms/AppAccordion"

export default function DocPanelAccordion() {
  return (
    <>
      <AppAccordion>
        <AppAccordion.Item value="a">
          <AppAccordion.Header>
            First Item
          </AppAccordion.Header>

          <AppAccordion.Content>
            Some value 1...
          </AppAccordion.Content>
        </AppAccordion.Item>

        <AppAccordion.Item value="b">
          <AppAccordion.Header>
            Second Item
          </AppAccordion.Header>

          <AppAccordion.Content>
            Some value 2...
          </AppAccordion.Content>
        </AppAccordion.Item>
      </AppAccordion>
    </>
  );
}