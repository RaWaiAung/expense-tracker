import type { ReactNode } from "react"
type AuthLayoutProps = {
    children: ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f8fc] px-4 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout
