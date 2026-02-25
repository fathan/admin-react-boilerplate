import { useState } from "react";

import { AppDrawer } from "@/components/shared/organisms/AppDrawer";
import { Button } from "@chakra-ui/react";

const DocOtherDrawer = () => {
  const [open, setOpen] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Button className="w-40" colorPalette="blue" onClick={() => setOpen(true)}>Drawer</Button>
        <Button className="w-40" onClick={() => setOpenSize(true)}>Drawer Size</Button>
      </div>

      <AppDrawer
        open={open}
        onOpenChange={setOpen}
        size="sm"
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
      </AppDrawer>

      <AppDrawer
        open={openSize}
        size="xl"
        placement="end"
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
      </AppDrawer>
    </div>
  )
};

export default DocOtherDrawer;
