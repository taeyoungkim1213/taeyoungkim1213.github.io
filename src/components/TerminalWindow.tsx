import React from "react";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  title = "taeyoung@portfolio:~",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden border border-[#30363d] bg-[#161b22] shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#21262d] border-b border-[#30363d] select-none">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[#8b949e] text-xs">{title}</span>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
