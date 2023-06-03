import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
