import { ReactNode, FormEvent } from "react";

type AppFormWrapperProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
};

export const AppFormWrapper = ({ onSubmit, children, className }: AppFormWrapperProps) => {
  return (
    <form onSubmit={onSubmit} className={ className }  noValidate>
      {children}
    </form>
  );
};