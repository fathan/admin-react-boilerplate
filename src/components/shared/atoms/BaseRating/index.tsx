import { RatingGroup } from "@chakra-ui/react";
import { Controller, Control } from "react-hook-form";

type BaseRatingProps = {
  name: string;
  control: Control<any>;
  count?: number;
  defaultValue?: number;
  size?: "xs" | "sm" | "md" | "lg";
};

const BaseRating = ({
  name,
  control,
  count = 5,
  defaultValue = 0,
  size = "md",
}: BaseRatingProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RatingGroup.Root
          name={field.name}
          count={count}
          value={Number(field.value) || defaultValue}
          onValueChange={({ value }) => field.onChange(value)}
          onBlur={field.onBlur}
          size={size}
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      )}
    />
  );
};

export default BaseRating;