"use client";

import { useEffect, useState } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { useInView } from "@/hooks/useInView";

const COMMAND = "skills --list";

const SKILLS = [
  { category: "Language ", items: ["Java", "SQL"] },
  { category: "Framework", items: ["Spring Boot", "JPA", "QueryDSL"] },
  { category: "Infra    ", items: ["Docker", "AWS"] },
  { category: "DB       ", items: ["MySQL", "Redis"] },
  { category: "Arch     ", items: ["Hexagonal Architecture"] },
  { category: "CI/CD    ", items: ["GitHub Actions"] },
];

export default function Skills() {
  const { ref, inView } = useInView(0.25);
  const [cmdText, setCmdText] = useState("");
  const [cmdDone, setCmdDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < COMMAND.length) {
        setCmdText(COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setCmdDone(true), 200);
      }
    }, 55);
    return () => clearInterval(timer);
  }, [inView]);

  useEffect(() => {
    if (!cmdDone) return;
    let line = 0;
    const timer = setInterval(() => {
      if (line < SKILLS.length) {
        setVisibleLines((v) => v + 1);
        line++;
      } else {
        clearInterval(timer);
      }
    }, 130);
    return () => clearInterval(timer);
  }, [cmdDone]);

  return (
    <section id="skills" ref={ref} className="py-24">
      <TerminalWindow
        title="taeyoung@portfolio:~ — skills"
        className="w-full"
      >
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#3fb950]">$</span>
            <span className="text-[#e6edf3]">{cmdText}</span>
            {inView && !cmdDone && (
              <span className="text-[#58a6ff] animate-blink">▌</span>
            )}
          </div>

          {cmdDone && (
            <div className="mt-5 space-y-2">
              {SKILLS.slice(0, visibleLines).map((skill, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-3 animate-fadeIn"
                >
                  <span className="text-[#8b949e] text-xs shrink-0 font-mono">
                    [{skill.category}]
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {skill.items.map((item, j) => (
                      <span key={j} className="text-[#e6edf3]">
                        {item}
                        {j < skill.items.length - 1 && (
                          <span className="text-[#30363d] ml-3">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {visibleLines >= SKILLS.length && (
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-[#3fb950]">$</span>
                  <span className="text-[#58a6ff] animate-blink">▌</span>
                </div>
              )}
            </div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
}
