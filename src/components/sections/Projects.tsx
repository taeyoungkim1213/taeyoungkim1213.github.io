"use client";

import { useEffect, useState } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { useInView } from "@/hooks/useInView";

const COMMAND = "ls projects/";

const PROJECTS = [
  {
    id: "ticketing-fifo-concurrency",
    name: "선착순 티켓 발급 API",
    period: "2025.12 ~ 2026.01",
    description:
      "멀티 서버 환경에서 대규모 동시 요청의 정확성과 무결성을 보장하는 선착순 티켓 발급 백엔드 시스템",
    achievements: [
      "Redis 분산락으로 중복 발급 0건, 초과 발급 0건",
      "헥사고날 아키텍처로 도메인·인프라 완전 분리",
    ],
    stack: ["Java", "Spring Boot", "Redis (Redisson)", "JPA", "QueryDSL", "MySQL", "Docker"],
    github: "https://github.com/taeyoungkim1213/ticketing-fifo-concurrency",
    status: null,
  },
  {
    id: "weather-alert",
    name: "날씨 조건 알림 서비스",
    period: "2026.05 ~",
    description:
      "사용자가 등록한 날씨 조건이 충족되면 FCM 푸시 알림을 자동 발송하는 백엔드 서비스",
    achievements: [
      "Redis TTL 캐싱으로 외부 API 중복 호출 방지",
      "GitHub Actions CI/CD 파이프라인 구성",
    ],
    stack: ["Spring Boot", "Redis", "FCM", "Docker", "GitHub Actions"],
    github: "https://github.com/taeyoungkim1213/weather-alert",
    status: "진행 중",
  },
];

export default function Projects() {
  const { ref, inView } = useInView(0.2);
  const [cmdText, setCmdText] = useState("");
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < COMMAND.length) {
        setCmdText(COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowProjects(true), 300);
      }
    }, 55);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section id="projects" ref={ref} className="py-24">
      <TerminalWindow
        title="taeyoung@portfolio:~/projects — ls"
        className="w-full"
      >
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#3fb950]">$</span>
            <span className="text-[#e6edf3]">{cmdText}</span>
            {inView && !showProjects && (
              <span className="text-[#58a6ff] animate-blink">▌</span>
            )}
          </div>

          {showProjects && (
            <div className="animate-fadeIn">
              <div className="mt-3 text-[#58a6ff] text-xs flex flex-wrap gap-x-6">
                {PROJECTS.map((p) => (
                  <span key={p.id}>{p.id}/</span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((project, i) => (
                  <div
                    key={project.id}
                    className="border border-[#30363d] rounded-lg p-5 hover:border-[#58a6ff]/40 transition-colors duration-200 flex flex-col"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${i * 120}ms forwards`,
                      opacity: 0,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[#58a6ff] font-semibold leading-tight">
                        {project.name}
                      </span>
                      {project.status && (
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded-full border border-[#d29922] text-[#d29922]">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <div className="text-[#8b949e] text-xs mb-3">{project.period}</div>

                    <p className="text-[#8b949e] text-xs leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 mb-4">
                      {project.achievements.map((ach, j) => (
                        <li key={j} className="flex gap-2 text-xs text-[#e6edf3]">
                          <span className="text-[#3fb950] shrink-0">✓</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-[#0d1117] text-[#8b949e] border border-[#30363d]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors duration-150"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      <span>GitHub에서 보기</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
}
