import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "경력 기술서 | 김태영",
  description: "김태영 Backend Engineer 경력 기술서",
};

const CSS = `
  :root {
    --surface: #f8fafc;
    --card: #ffffff;
    --ink: #111827;
    --ink-2: #374151;
    --muted: #6b7280;
    --border: #e2e8f0;
    --accent: #2563eb;
    --accent-light: #eff6ff;
    --accent-border: #bfdbfe;
    --success: #16a34a;
    --warn: #d97706;
  }

  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0 !important;
    padding: 0 !important;
    background: var(--surface) !important;
    color: var(--ink) !important;
    font-family: 'Noto Sans KR', sans-serif !important;
    font-size: 15px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  /* ── 레이아웃 ── */
  .r-root { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }

  /* ── 뒤로가기 ── */
  .r-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; color: var(--muted);
    margin-bottom: 16px; transition: color .15s;
    font-family: 'Noto Sans KR', sans-serif;
  }
  .r-back:hover { color: var(--accent); }

  /* ── 헤더 ── */
  .r-header {
    background: #1e293b;
    border-radius: 14px;
    padding: 40px 48px;
    margin-bottom: 20px;
    color: #f1f5f9;
  }
  .r-name { font-size: 30px; font-weight: 700; color: #fff; margin: 0 0 4px; }
  .r-role { font-size: 17px; color: #93c5fd; font-weight: 500; margin: 0 0 22px; }
  .r-contacts { display: flex; flex-wrap: wrap; gap: 8px 24px; }
  .r-contact {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; color: #94a3b8; transition: color .15s;
  }
  .r-contact:hover { color: #93c5fd; }

  /* ── 섹션 공통 ── */
  .r-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px 32px;
    margin-bottom: 16px;
  }
  .r-section-title {
    font-size: 11px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: var(--accent); margin: 0 0 18px;
  }
  .r-section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

  /* ── 경력 요약 ── */
  .r-summary { font-size: 14.5px; color: var(--ink-2); line-height: 1.9; }

  /* ── 스킬 칩 ── */
  .r-chips { display: flex; flex-wrap: wrap; gap: 7px; }
  .r-chip {
    background: var(--accent-light); color: var(--accent);
    border: 1px solid var(--accent-border); border-radius: 6px;
    padding: 3px 11px; font-size: 12.5px; font-weight: 600;
  }

  /* ── 체크리스트 ── */
  .r-checklist { margin: 0; padding: 0; list-style: none; }
  .r-checklist li {
    display: flex; gap: 8px; align-items: flex-start;
    font-size: 13.5px; color: var(--ink-2); margin-bottom: 8px;
  }
  .r-checklist li::before {
    content: '✓'; color: var(--success); font-weight: 700; flex-shrink: 0; margin-top: 1px;
  }

  /* ── 경력 항목 ── */
  .r-entry { border-left: 3px solid var(--accent); padding-left: 22px; margin-bottom: 32px; }
  .r-entry:last-child { margin-bottom: 0; }

  .r-entry-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 12px; margin-bottom: 2px;
  }
  .r-entry-name { font-size: 16.5px; font-weight: 700; color: var(--ink); margin: 0; }
  .r-entry-period { font-size: 12px; color: var(--muted); white-space: nowrap; padding-top: 3px; }
  .r-entry-meta { font-size: 13px; color: var(--muted); margin: 0 0 14px; }

  .r-row { display: grid; grid-template-columns: 88px 1fr; gap: 6px 14px; margin-bottom: 10px; }
  .r-row:last-child { margin-bottom: 0; }
  .r-k { font-size: 13px; font-weight: 600; color: var(--ink); padding-top: 1px; }
  .r-v { font-size: 13.5px; color: var(--ink-2); line-height: 1.75; }

  .r-ul { margin: 4px 0 0 16px; padding: 0; }
  .r-ul li { margin-bottom: 5px; font-size: 13.5px; color: var(--ink-2); }

  .r-badge-ok {
    display: inline-flex; align-items: center;
    font-size: 11.5px; font-weight: 700; color: var(--success);
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 4px; padding: 1px 6px; margin-left: 4px;
  }
  .r-badge-warn {
    display: inline-flex; align-items: center;
    font-size: 11.5px; font-weight: 700; color: var(--warn);
    background: #fffbeb; border: 1px solid #fde68a;
    border-radius: 4px; padding: 1px 6px; margin-left: 4px;
  }

  /* ── 모바일 ── */
  @media (max-width: 640px) {
    .r-root { padding: 20px 16px 56px; }
    .r-header { padding: 28px 22px; border-radius: 10px; }
    .r-name { font-size: 24px; }
    .r-section { padding: 22px 20px; }
    .r-section-grid { grid-template-columns: 1fr; gap: 24px; }
    .r-row { grid-template-columns: 1fr; gap: 2px; }
    .r-entry-top { flex-direction: column; gap: 2px; }
  }

  @media print {
    body { background: #fff !important; }
    .r-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .r-section { break-inside: avoid; box-shadow: none; }
    .r-entry { break-inside: avoid; }
  }
`;

export default function ResumePage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{CSS}</style>

      <div className="r-root">

        <Link href="/" className="r-back">
          ← 포트폴리오 보러가기
        </Link>

        {/* ── 헤더 ── */}
        <header className="r-header">
          <p className="r-name">김태영 (Taeyoung Kim)</p>
          <p className="r-role">Backend Engineer</p>
          <div className="r-contacts">
            <a href="mailto:kty991213@naver.com" className="r-contact">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              kty991213@naver.com
            </a>
            <a href="https://github.com/taeyoungkim1213" target="_blank" rel="noopener noreferrer" className="r-contact">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              github.com/taeyoungkim1213
            </a>
          </div>
        </header>

        {/* ── 경력 요약 ── */}
        <section className="r-section">
          <p className="r-section-title">Summary</p>
          <p className="r-summary">
            <b>에이아이데이타(데이타이음)</b> 소속으로 공공 교육 플랫폼 및 대규모 운영 서비스에서
            신규 기능 개발 · 시스템 고도화 · 운영 안정화를 담당해온 Java/Spring 기반 백엔드
            개발자입니다.
            <br /><br />
            예약·결제·설문·알림·통계·CMS 등 실사용자가 많은 핵심 기능을 직접 설계·구현·운영했으며,
            외부 API 연동, 배치/스케줄러, 보안(CSAP) 인증까지 서비스 전반의 품질과 안정성을
            책임지는 역할을 수행해왔습니다.
            <br /><br />
            현재는 헥사고날 아키텍처와 컨테이너 기반 배포 환경을 직접 설계·적용하며 아키텍처와
            인프라 영역까지 역량을 넓혀가고 있습니다.
          </p>
        </section>

        {/* ── 역량 & 성과 ── */}
        <section className="r-section">
          <div className="r-section-grid">
            <div>
              <p className="r-section-title">Core Skills</p>
              <div className="r-chips">
                {["Java", "Spring", "eGovFrame", "MyBatis", "Quartz", "Maven",
                  "MySQL", "MariaDB", "Redis", "Docker", "AWS", "GitHub Actions"].map((s) => (
                  <span key={s} className="r-chip">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="r-section-title">Key Achievements</p>
              <ul className="r-checklist">
                <li>동시 요청 환경에서 데이터 충돌 없는 처리 구조 구축</li>
                <li>설문 기능 공통화로 신규 서비스 연계 공수 절감</li>
                <li>FCM 단일 채널 통합으로 웹·모바일 알림 누락 해소</li>
                <li>CODE-RAY 취약점 진단 및 조치 주도 → CSAP 인증 통과</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 경력 ── */}
        <section className="r-section">
          <p className="r-section-title">Experience</p>

          {/* 미래교육원 */}
          <div className="r-entry">
            <div className="r-entry-top">
              <p className="r-entry-name">경상남도교육청 미래교육원</p>
              <span className="r-entry-period">2024.03 – 2025.10 · 4명</span>
            </div>
            <p className="r-entry-meta">에이아이데이타(데이타이음) · 대규모 트래픽 체험예약 플랫폼</p>

            <div className="r-row">
              <span className="r-k">담당 역할</span>
              <span className="r-v">백엔드 2인 중 예약 및 결제 핵심 엔진 담당</span>
            </div>
            <div className="r-row">
              <span className="r-k">문제 상황</span>
              <span className="r-v">피크 시간대 동시 예약으로 정원을 초과하는 오버부킹이 실서비스에서 발생했습니다. 트랜잭션을 걸었는데도 오버부킹이 계속 일어났고, 조회 시점에 락을 걸어야 한다는 걸 직접 테스트하며 파악했습니다.</span>
            </div>
            <div className="r-row">
              <span className="r-k">해결 방법</span>
              <div className="r-v">
                <ul className="r-ul">
                  <li>충돌 빈도 분석 후 낙관적 락 대신 <b>비관적 락(FOR UPDATE)</b> 채택</li>
                  <li>트랜잭션 범위를 검증부터 생성까지 확장 → 원자적 처리 보장</li>
                  <li>데드락 대비 <b>백오프 기반 재시도 로직</b> 구현</li>
                </ul>
              </div>
            </div>
            <div className="r-row">
              <span className="r-k">결과</span>
              <span className="r-v">
                피크 시간대 동시 요청에서 데이터 충돌 <span className="r-badge-ok">0건</span> 달성,
                데드락 발생 시 재시도로 안정 처리
              </span>
            </div>
          </div>

          {/* 경남진로 */}
          <div className="r-entry">
            <div className="r-entry-top">
              <p className="r-entry-name">경남진로교육청 아이꿈봄</p>
              <span className="r-entry-period">2025.08 – 2026.03 · 3명</span>
            </div>
            <p className="r-entry-meta">에이아이데이타(데이타이음) · 체험 프로그램 예약·결제·알림·CMS</p>

            <div className="r-row">
              <span className="r-k">담당 역할</span>
              <span className="r-v">백엔드 2인 중 예약·결제·외부연동 전담 개발</span>
            </div>
            <div className="r-row">
              <span className="r-k">문제 상황</span>
              <span className="r-v">예약 후 즉시 결제와 24시간 이내 마이페이지 결제를 모두 지원해야 했고, 예약·결제 상태를 어떻게 설계할지가 가장 큰 고민이었습니다. 또한 PC와 모바일의 결제 API 파라미터 방식이 달랐고, 다중 결제를 지원해야 해서 API 다중 호출 구조가 필요했습니다. 멀티 서버(2대) 환경이라 DB 락만으로는 동시성 제어에 한계가 있었습니다.</span>
            </div>
            <div className="r-row">
              <span className="r-k">주요 구현</span>
              <div className="r-v">
                <ul className="r-ul">
                  <li>특별/주말 프로그램 예약, 상담예약, 예약 내역, 체험 후기 게시판</li>
                  <li>설문·통계, 지역·식당 정보 CMS</li>
                </ul>
              </div>
            </div>
            <div className="r-row">
              <span className="r-k">외부 연동</span>
              <span className="r-v">NHN KCP 결제 · 비즈사이렌 본인인증 · 비즈톡 SMS · vClass 화상수업</span>
            </div>
            <div className="r-row">
              <span className="r-k">해결 방법</span>
              <div className="r-v">
                <ul className="r-ul">
                  <li>예약 시점에 상태를 <b>대기</b>로 설정하고, 결제 완료 시 예약·결제 상태를 모두 완료로 전환하며, 24시간 경과 시 예약을 자동으로 풀고 결제는 실패로 처리하는 상태 전환 흐름 설계</li>
                  <li><b>CompletableFuture</b>로 결제 API를 병렬 호출하고 allOf로 전체 완료를 기다린 뒤 결과를 집계하는 구조로 구현</li>
                  <li>멀티 서버 환경을 고려해 <b>Redisson RLock</b> 기반 Redis 분산락 도입, TTL 기반 자동 해제로 데드락 방지</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 다채움 */}
          <div className="r-entry">
            <div className="r-entry-top">
              <p className="r-entry-name">충청북도교육청 다채움</p>
              <span className="r-entry-period">2024.01 – 2025.09 · 9명</span>
            </div>
            <p className="r-entry-meta">에이아이데이타(데이타이음) · AI 기반 교수·학습 통합 플랫폼</p>

            <div className="r-row">
              <span className="r-k">담당 역할</span>
              <span className="r-v">백엔드 5인 중 설문·알림·게시판 모듈 단독 담당</span>
            </div>
            <div className="r-row">
              <span className="r-k">문제 상황</span>
              <span className="r-v">MSA 구조로 운영되는 여러 서비스에 동일한 설문 기능이 각각 중복 구현되어 있어 유지보수가 어려웠습니다. 알림도 웹/모바일별로 분산되어 관리가 복잡했습니다.</span>
            </div>
            <div className="r-row">
              <span className="r-k">해결</span>
              <div className="r-v">
                <ul className="r-ul">
                  <li>FCM 단일 채널로 웹·앱 알림 통합, 토큰 갱신 실패 케이스 처리</li>
                  <li>설문 기능을 REST API로 공통화 → 타 서비스 재사용 가능 구조</li>
                  <li>댓글·대댓글·투표 포함한 게시판 테이블 구조·서비스 레이어 재설계</li>
                </ul>
              </div>
            </div>
            <div className="r-row">
              <span className="r-k">결과</span>
              <span className="r-v">
                설문 공통 모듈로 신규 서비스 연계 시 추가 개발 없음,
                알림 채널 단일화로 사용자 공지 누락 해소
              </span>
            </div>
          </div>

          {/* 알콩 */}
          <div className="r-entry">
            <div className="r-entry-top">
              <p className="r-entry-name">알콩 플랫폼</p>
              <span className="r-entry-period">2025.07 – 2025.12 · 6명</span>
            </div>
            <p className="r-entry-meta">에이아이데이타(데이타이음) · AI 기반 학습 플랫폼 · CSAP 인증</p>

            <div className="r-row">
              <span className="r-k">담당 역할</span>
              <span className="r-v">팀 전체 참여, 취약점 진단 및 시큐어 코딩 공통 적용 주도</span>
            </div>
            <div className="r-row">
              <span className="r-k">문제 상황</span>
              <span className="r-v">CSAP 인증 심사를 앞두고 CODE-RAY 정적 분석 결과 XSS·CSRF·인증 우회 등 다수의 웹 취약점이 검출됐습니다.</span>
            </div>
            <div className="r-row">
              <span className="r-k">접근</span>
              <div className="r-v">
                <ul className="r-ul">
                  <li>CODE-RAY 분석 결과를 유형(XSS·CSRF·인증 우회)별로 분류, 위험도 기준 우선순위 설정</li>
                  <li>시큐어 코딩 패턴을 공통 유틸로 정리해 코드베이스 전체에 일관 적용</li>
                  <li>조치 후 재스캔 반복 → 잔존 취약점 0건 확인</li>
                </ul>
              </div>
            </div>
            <div className="r-row">
              <span className="r-k">결과</span>
              <span className="r-v">
                CSAP 인증 <span className="r-badge-ok">통과</span>,
                취약점 <span className="r-badge-ok">0건</span> 유지 및 시큐어 코딩 기준 팀 표준화
              </span>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
