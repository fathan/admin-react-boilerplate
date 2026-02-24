import UIFormActions from "@/components/shared/molecules/UIFormActions";
import { CheckIcon } from "lucide-react";

const DocButtonActionButton: React.FC = () => {
  const handleSubmit = () => {
    alert("Form submitted!");
  }

  return (
    <div className="flex flex-col gap-4">
      <UIFormActions
        align="center"
        actions={[
          {
            label: "Reset",
            type: "reset",
            variant: "ghost",
            colorScheme: "orange",
            onClick: () => alert("Form reset!"),
          },
          {
            label: "Draft",
            variant: "outline",
            colorScheme: "gray",
            onClick: () => alert("Disimpan sebagai draft"),
          },
          {
            label: "Publish",
            colorScheme: "green",
            onClick: () => alert("Dipublish!"),
          },
        ]}
      />

      <UIFormActions
        align="right"
        actions={[
          {
            label: "Batal",
            variant: "ghost",
            colorScheme: "gray",
            onClick: () => alert("Dibatalkan"),
          },
          {
            label: "Simpan",
            type: "submit",
            colorScheme: "blue",
            loadingText: "Menyimpan...",
            leftIcon: <CheckIcon />,
            onClick: handleSubmit,
          },
        ]}
      />

      <UIFormActions
        align="left"
        actions={[
          {
            label: "Batal",
            variant: "ghost",
            colorScheme: "gray",
            onClick: () => alert("Dibatalkan"),
          },
          {
            label: "Simpan",
            type: "submit",
            colorScheme: "blue",
            loadingText: "Menyimpan...",
            leftIcon: <CheckIcon />,
            onClick: handleSubmit,
          },
        ]}
      />
    </div>
  );
};

export default DocButtonActionButton;