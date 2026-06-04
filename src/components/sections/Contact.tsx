"use client";

import { useEffect, useState, type ReactNode } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { useInView } from "@/hooks/useInView";

const COMMAND = "contact --info";

export default function Contact() {
  const { ref, inView } = useInView(0.3);
  const [cmdText, setCmdText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < COMMAND.length) {
        setCmdText(COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 55);
    return () => clearInterval(timer);
  }, [inView]);

  const copyEmail = () => {
    navigator.clipboard.writeText("kty991213@naver.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-24">
      <TerminalWindow
        title="taeyoung@portfolio:~ — contact"
        className="w-full max-w-2xl"
      >
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#3fb950]">$</span>
            <span className="text-[#e6edf3]">{cmdText}</span>
            {inView && !showContent && (
              <span className="text-[#58a6ff] animate-blink">▌</span>
            )}
          </div>

          {showContent && (
            <div className="mt-5 space-y-4 animate-fadeIn">
              <ContactRow label="Email" delay={0}>
                <span className="text-[#e6edf3]">kty991213@naver.com</span>
                <button
                  onClick={copyEmail}
                  className="ml-3 text-xs px-2 py-0.5 border border-[#30363d] text-[#8b949e] rounded hover:border-[#58a6ff] hover:text-[#58a6ff] transition-colors duration-150 shrink-0"
                >
                  {copied ? "✓ 복사됨" : "복사"}
                </button>
              </ContactRow>

              <ContactRow label="GitHub" delay={80}>
                <a
                  href="https://github.com/taeyoungkim1213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline underline-offset-2"
                >
                  github.com/taeyoungkim1213
                </a>
                <span className="text-[#8b949e] ml-2 text-xs">↗</span>
              </ContactRow>

              <ContactRow label="Resume" delay={160}>
                <a
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline underline-offset-2"
                >
                  taeyoungkim1213.github.io/resume
                </a>
                <span className="text-[#8b949e] ml-2 text-xs">↗</span>
              </ContactRow>

              <div className="mt-6 flex items-center gap-2">
                <span className="text-[#3fb950]">$</span>
                <span className="text-[#58a6ff] animate-blink">▌</span>
              </div>
            </div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
}

function ContactRow({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 animate-fadeIn"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
    >
      <span className="text-[#58a6ff] shrink-0">{">"}</span>
      <span className="text-[#8b949e] shrink-0 w-16">{label}</span>
      <div className="flex items-center flex-wrap gap-1">{children}</div>
    </div>
  );
}
