import BaseCard from "@/components/shared/atoms/BaseCard";
import { Button } from "@chakra-ui/react";

export default function DocPanelCard() {
  return (
    <div className="flex flex-col gap-6">
      <BaseCard
        variant="elevated"
        withHover
        clickable
        onClick={() => console.log("Card clicked")}
      >
        <BaseCard.Header
          closable
          onClose={() => console.log("Card closed")}
        >
          <h3 className="font-semibold text-lg">Ciamik Card</h3>
        </BaseCard.Header>

        <BaseCard.Body scrollable maxHeight="120px">
          <p className="text-gray-600 dark:text-gray-300">
            Konten panjang bisa scroll di body.
          </p>
        </BaseCard.Body>

        <BaseCard.Footer justify="between">
          <Button>Action 1</Button>
          <Button colorPalette="red">Action 2</Button>
        </BaseCard.Footer>
      </BaseCard>


      <BaseCard
        variant="outlined"
        clickable
        onClick={() => console.log("Card clicked")}
      >
        <BaseCard.Header
          image={<img src="https://i.pravatar.cc/150?img=3" className="w-10 h-10 rounded-full" />}
          badge={<span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">NEW</span>}
          closable
          onClose={() => console.log("Card closed")}
        >
          <h3 className="font-semibold text-lg">Ciamik Card</h3>
        </BaseCard.Header>

        <BaseCard.Body scrollable maxHeight="120px">
          <p className="text-gray-600 dark:text-gray-300">
            Konten panjang bisa scroll di body.
          </p>
        </BaseCard.Body>

        <BaseCard.Footer justify="between">
          <Button>Action 1</Button>
          <Button colorPalette="red">Action 2</Button>
        </BaseCard.Footer>
      </BaseCard>

      <BaseCard
        variant="outlined"
        clickable
        onClick={() => console.log("Card clicked")}
      >
        <BaseCard.Header
          image={<img src="https://i.pravatar.cc/150?img=3" className="w-10 h-10 rounded-full" />}
          badge={<span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">NEW</span>}
          closable
          onClose={() => console.log("Card closed")}
        >
          <h3 className="font-semibold text-lg">Ciamik Card</h3>
        </BaseCard.Header>

        <BaseCard.Body scrollable maxHeight="120px">
          <p className="text-gray-600 dark:text-gray-300">
            Konten panjang bisa scroll di body.
          </p>
        </BaseCard.Body>

        <BaseCard.Footer justify="center" className="gap-4">
          <Button>Action 1</Button>
          <Button colorPalette="red">Action 2</Button>
        </BaseCard.Footer>
      </BaseCard>

      <BaseCard
        variant="flat"
        clickable
        onClick={() => console.log("Card clicked")}
      >
        <BaseCard.Header
          image={<img src="https://i.pravatar.cc/150?img=3" className="w-10 h-10 rounded-full" />}
          badge={<span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">NEW</span>}
          closable
          onClose={() => console.log("Card closed")}
        >
          <h3 className="font-semibold text-lg">Ciamik Card</h3>
        </BaseCard.Header>

        <BaseCard.Body scrollable maxHeight="120px">
          <p className="text-gray-600 dark:text-gray-300">
            Konten panjang bisa scroll di body.
          </p>
        </BaseCard.Body>

        <BaseCard.Footer justify="between">
          <Button>Action 1</Button>
          <Button colorPalette="red">Action 2</Button>
        </BaseCard.Footer>
      </BaseCard>
    </div>
  );
}