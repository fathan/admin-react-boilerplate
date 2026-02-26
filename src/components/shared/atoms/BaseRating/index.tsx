import { RatingGroup } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type BaseRatingProps = {
  name: string;
  count: number;
  defaultValue: number;
  size: "xs" | "sm" | "md" | "lg";
   registration?: UseFormRegisterReturn;
};

const BaseRating = ({
  name,
  count,
  defaultValue,
  size,
  registration,
}: BaseRatingProps) => {
  return (
    <>
      <RatingGroup.Root
        name={name}
        count={count}
        defaultValue={defaultValue}
        size={size}
        {...registration}
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>
    </>
  );
};

export default BaseRating;
