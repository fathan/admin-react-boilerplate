import { useState } from "react";

import { AppModal } from "@/components/shared/organisms/AppModal";
import { Button } from "@chakra-ui/react";

const DocOtherModal = () => {
  const [open, setOpen] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Button className="w-40" colorPalette="blue" onClick={() => setOpen(true)}>Modal</Button>
        <Button className="w-40" onClick={() => setOpenSize(true)}>Modal Size</Button>
      </div>

      <AppModal
        open={open}
        onOpenChange={setOpen}
        title={
          <>
            Delete Item
          </>
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button colorPalette="red">
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete this item?
      </AppModal>

      <AppModal
        open={openSize}
        size="xl"
        placement="center"
        onOpenChange={setOpenSize}
        title={
          <>
            Delete Item Size
          </>
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpenSize(false)}>
              Cancel
            </Button>
            <Button colorPalette="red">
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete this item?
      </AppModal>
    </div>
  )
};

export default DocOtherModal;
