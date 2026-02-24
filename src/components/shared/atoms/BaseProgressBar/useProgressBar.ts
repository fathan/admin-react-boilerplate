import { useMemo } from "react";

interface UseProgressProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
}

export const useProgress = ({
  value = 0,
  max = 100,
  indeterminate = false,
}: UseProgressProps) => {
  const percentage = useMemo(() => {
    if (indeterminate) return 0;
    const raw = (value / max) * 100;
    return Math.min(Math.max(raw, 0), 100);
  }, [value, max, indeterminate]);

  return { percentage };
};