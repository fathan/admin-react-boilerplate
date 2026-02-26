import { useSampleStore } from "@/stores/sampleStore";
import { Button } from "@chakra-ui/react";

const CardSecondary = () => {
  const status = useSampleStore((state) => state.status);
  const addStatus = useSampleStore((state) => state.setStatus);

  return (
    <div>
      Card Secondary: {status ? "true" : "false"}
      <br />
      <Button colorPalette="blue" size={'xs'} onClick={() => addStatus(!status)}>
        Toggle
      </Button>
    </div>
  );
}

export default CardSecondary;
