import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";

export const usePageTitle = (title: string) => {
  const setPageTitle = useAppStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle(title);
  }, [title, setPageTitle]);
};