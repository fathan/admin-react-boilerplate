import BaseDivider from "@/components/shared/atoms/BaseDivider";

export default function DocPanelDivider() {
  return (
    <>
      <BaseDivider />

      <BaseDivider thickness={2} colorClass="bg-red-500" marginClass="my-6" />
      <BaseDivider thickness={2} colorClass="bg-blue-500" marginClass="my-6" />
      <BaseDivider thickness={2} colorClass="bg-green-500" marginClass="my-6" />
      <BaseDivider thickness={2} colorClass="bg-orange-500" marginClass="my-6" />

      <div className="flex items-center">
        <div>Item A</div>
        <BaseDivider
          orientation="vertical"
          thickness={2}
          colorClass="bg-gray-300"
          height="40px"
          className="mx-4"
        />
        <div>Item B</div>
        <BaseDivider
          orientation="vertical"
          thickness={2}
          colorClass="bg-gray-300"
          height="40px"
          className="mx-4"
        />
        <div>Item C</div>
        <BaseDivider
          orientation="vertical"
          thickness={2}
          colorClass="bg-gray-300"
          height="40px"
          className="mx-4"
        />
        <div>Item D</div>
      </div>
    </>
  );
}