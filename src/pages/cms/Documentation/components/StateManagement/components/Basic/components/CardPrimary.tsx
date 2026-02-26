import { useSampleStore } from "@/stores/sampleStore";
import { Button } from "@chakra-ui/react";

const CardPrimary = () => {
  const status = useSampleStore((state) => state.status);
  const addStatus = useSampleStore((state) => state.setStatus);

  return (
    <div>
      Card Primary: {status ? "true" : "false"}
      <br />
      <Button colorPalette="blue" size={'xs'} onClick={() => addStatus(!status)}>
        Toggle
      </Button>
    </div>
  );
}

export default CardPrimary;
