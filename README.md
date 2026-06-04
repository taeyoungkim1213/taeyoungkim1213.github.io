# taeyoungkim1213.github.io

김태영 포트폴리오 & 경력기술서  
**Next.js 15 + Tailwind CSS** 기반 정적 사이트, GitHub Pages 자동 배포

🔗 **https://taeyoungkim1213.github.io**

---

## 로컬 실행

```bash
# 의존성 설치 (처음 한 번)
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:3000

# 프로덕션 빌드 (out/ 디렉토리 생성)
npm run build
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── (portfolio)/        # 포트폴리오 메인 (/)
│   │   ├── layout.tsx      # Navbar 포함
│   │   └── page.tsx        # Hero / Projects / Skills / Contact
│   ├── resume/
│   │   └── page.tsx        # 경력기술서 (/resume)
│   ├── layout.tsx          # 루트 레이아웃
│   └── globals.css         # JetBrains Mono, 다크 기본 스타일
├── components/
│   ├── TerminalWindow.tsx  # macOS 타이틀바 래퍼
│   ├── Navbar.tsx
│   └── sections/
│       ├── Hero.tsx        # cat about.txt
│       ├── Projects.tsx    # ls projects/
│       ├── Skills.tsx      # skills --list
│       └── Contact.tsx     # contact --info
└── hooks/
    └── useInView.ts        # Intersection Observer
```

---

## CI/CD — GitHub Actions 자동 배포

### 흐름

```
main 브랜치에 git push
        ↓
GitHub Actions 자동 실행 (.github/workflows/deploy.yml)
        ↓
  1. 코드 체크아웃
  2. Node.js 설치 + npm ci
  3. npm run build → out/ 생성
  4. out/ → GitHub Pages 배포
        ↓
https://taeyoungkim1213.github.io 반영 (1~2분 소요)
```

### 배포 확인

GitHub 레포 → **Actions 탭**
- 🟡 노란 점 : 빌드 중
- ✅ 초록 체크 : 배포 완료
- ❌ 빨간 X : 실패 → 클릭해서 어느 step인지 확인

### 주의사항

- GitHub 레포 **Settings → Pages → Source** 를 **GitHub Actions** 로 설정해야 배포됨
- `main` 브랜치에 push할 때만 자동 배포 (다른 브랜치는 실행 안 됨)
- 수동 실행: Actions 탭 → `Deploy to GitHub Pages` → `Run workflow`

---

## 콘텐츠 수정 위치

| 수정 내용 | 파일 |
|---|---|
| 이름 / 소개 / 연락처 | `src/components/sections/Hero.tsx` |
| 프로젝트 추가·수정 | `src/components/sections/Projects.tsx` |
| 스킬 추가·수정 | `src/components/sections/Skills.tsx` |
| 경력기술서 내용 | `src/app/resume/page.tsx` |
