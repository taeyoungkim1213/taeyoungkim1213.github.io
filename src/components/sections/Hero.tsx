"use client";

import { useEffect, useState } from "react";
import TerminalWindow from "@/components/TerminalWindow";

const COMMAND = "cat about.txt";
const SEP = "─".repeat(46);

export default function Hero() {
  const [cmdText, setCmdText] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < COMMAND.length) {
        setCmdText(COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowOutput(true), 350);
      }
    }, 55);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="min-h-[calc(100vh-53px)] flex items-center py-16">
      <TerminalWindow
        title="taeyoung@portfolio:~ — cat about.txt"
        className="w-full"
      >
        <div className="text-sm leading-relaxed">
          <div className="flex items-center gap-2">
            <span className="text-[#3fb950]">$</span>
            <span className="text-[#e6edf3]">{cmdText}</span>
            {!showOutput && (
              <span className="text-[#58a6ff] animate-blink">▌</span>
            )}
          </div>

          {showOutput && (
            <div className="mt-5 animate-fadeIn">
              <div className="text-[#30363d] text-xs">{SEP}</div>

              <div className="mt-3 space-y-1.5">
                <Row label="Name" value="김태영 (Taeyoung Kim)" accent />
                <Row label="Role" value="Backend Engineer" blue />
              </div>

              <div className="my-3 text-[#30363d] text-xs">{SEP}</div>

              <div className="space-y-1">
                <div className="flex gap-2">
                  <span className="text-[#8b949e] shrink-0 w-[72px]">About</span>
                  <span className="text-[#8b949e]">:</span>
                  <span className="text-[#e6edf3]">
                    아키텍처 설계와 인프라 구성을 직접 고민하며,
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="shrink-0 w-[72px]" />
                  <span className="text-[#8b949e]"> </span>
                  <span className="text-[#e6edf3]">
                    AI 도구를 개발 워크플로에 녹여내는 백엔드 개발자
                  </span>
                </div>
              </div>

              <div className="my-3 text-[#30363d] text-xs">{SEP}</div>

              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <span className="text-[#8b949e] shrink-0 w-[72px]">GitHub</span>
                  <span className="text-[#8b949e]">:</span>
                  <a
                    href="https://github.com/taeyoungkim1213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#58a6ff] hover:underline underline-offset-2"
                  >
                    github.com/taeyoungkim1213
                  </a>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#8b949e] shrink-0 w-[72px]">Email</span>
                  <span className="text-[#8b949e]">:</span>
                  <a
                    href="mailto:kty991213@naver.com"
                    className="text-[#58a6ff] hover:underline underline-offset-2"
                  >
                    kty991213@naver.com
                  </a>
                </div>
              </div>

              <div className="my-3 text-[#30363d] text-xs">{SEP}</div>

              <div className="mt-6">
                <a
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#58a6ff] text-[#58a6ff] rounded-md text-xs hover:bg-[#58a6ff]/10 transition-colors duration-150"
                >
                  <span>📄</span>
                  <span>경력기술서 보기</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
}

function Row({
  label,
  value,
  accent,
  blue,
}: {
  label: string;
  value: string;
  accent?: boolean;
  blue?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <span className="text-[#8b949e] shrink-0 w-[72px]">{label}</span>
      <span className="text-[#8b949e]">:</span>
      <span
        className={
          blue
            ? "text-[#58a6ff] font-semibold"
            : accent
            ? "text-[#e6edf3] font-semibold"
            : "text-[#e6edf3]"
        }
      >
        {value}
      </span>
    </div>
  );
}
