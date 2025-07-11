import React, { ReactNode } from 'react';

const ErrorInput = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500 mt-1">{children}</p>;
};

export default ErrorInput;
