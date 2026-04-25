import React from "react";

const AuthLayout = ({ left, children }) => {
  return (
    <div className="flex min-h-screen bg-[#f5f0e0]">
      {left}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
