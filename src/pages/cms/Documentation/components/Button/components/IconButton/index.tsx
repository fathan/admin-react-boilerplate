import { LayoutDashboard, User, Users } from "lucide-react";

import BaseIcon from "@/components/shared/atoms/BaseIcon";
import BaseIconButton from "@/components/shared/atoms/BaseIconButton";

const DocButtonIconButton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <BaseIconButton ariaLabel="User Icon Button" icon={<BaseIcon icon={Users} />} />
        <BaseIconButton ariaLabel="User Icon Button" icon={<BaseIcon icon={User} />} isDisabled />
        <BaseIconButton ariaLabel="User Icon Button" icon={<BaseIcon icon={LayoutDashboard} />} />
        <BaseIconButton ariaLabel="User Icon Button" icon={<BaseIcon icon={LayoutDashboard} />} />
      </div>
    </div>
  )
}

export default DocButtonIconButton;
