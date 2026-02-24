import BaseLink from "@/components/shared/atoms/BaseLink";
import { User } from "lucide-react";

export default function DocMiscLink() {
  return (
    <>
      <BaseLink href="/dashboard" icon={<User />} iconPosition="right">
        Go to Dashboard
      </BaseLink>

      <BaseLink href="https://chakra-ui.com" external>
        Chakra UI Docs
      </BaseLink>

      <BaseLink href="#" variant="underline" size="sm">
        Underline Link
      </BaseLink>
    </>
  );
}