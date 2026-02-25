import { RadioCard } from "@chakra-ui/react";
import React from "react";

export interface BaseRadioCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  disabled?: boolean;
  variant?: "outline" | "subtle" | "surface";
  colorPalette?: string;
}

const BaseRadioCard: React.FC<BaseRadioCardProps> = ({
  value,
  label,
  description,
  icon,
  image,
  disabled = false,
  // variant = "outline",
  // colorPalette = "blue",
}) => {
  return (
    <>
      <RadioCard.Item value={value} disabled={disabled}>
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl>
        <RadioCard.ItemContent>
          {image && (
            <img
              src={image}
              alt={label}
              className="w-10 h-10 rounded-md object-cover mb-2"
            />
          )}
          {icon && (
            <span className="text-2xl mb-2 block">{icon}</span>
          )}
          <RadioCard.ItemText fontWeight="semibold">{label}</RadioCard.ItemText>
          {description && (
            <RadioCard.ItemDescription fontSize="sm" color="gray.500">
              {description}
            </RadioCard.ItemDescription>
          )}
        </RadioCard.ItemContent>
        <RadioCard.ItemIndicator />
      </RadioCard.ItemControl>
    </RadioCard.Item>
    </>
  );
};

export default BaseRadioCard;