import { ReactNode, FormEvent } from "react";

type AppFormWrapperProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export const AppFormWrapper = ({ onSubmit, children }: AppFormWrapperProps) => {
  return (
    <form onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
};