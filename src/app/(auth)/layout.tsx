import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex flex-col min-h-svh justify-center items-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}

export default AuthLayout;
