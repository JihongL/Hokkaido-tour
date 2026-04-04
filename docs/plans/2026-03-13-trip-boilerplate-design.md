# Trip Boilerplate Design

**Date:** 2026-03-13
**Status:** Approved

## Summary

Vietnam-tour 프로젝트를 기반으로 **재사용 가능한 여행 앱 보일러플레이트**를 별도 레포(`/Users/hong/Code/trip-boilerplate`)로 생성한다. 현재 프로젝트는 그대로 유지.

## Key Decisions

| 결정 | 선택 | 이유 |
|------|------|------|
| 배포 형태 | 별도 레포 (원본 유지) | 베트남 여행 앱은 그대로 쓰면서 보일러플레이트 분리 |
| 워크플로우 | Config 파일 + Claude Code 자연어 생성 | 타입 정의가 스키마 역할, AI/사람 모두 편리 |
| Config 범위 | 데이터 + 테마 (이미지 제외) | 테마색까지 config면 여행별 개성 표현 가능, 이미지는 수동 교체 |
| Config 구조 | 단일 파일 + 타입 분리 | Claude Code 컨텍스트 하나로 정확한 생성, 200~250줄 수준 |
| 기존 데이터 | 베트남 데이터를 예시로 유지 | 실동작 예시이자 Claude Code few-shot 레퍼런스 |

## Architecture

### Config 파일 구성

```
src/config/
├── types.ts           # TripConfig 타입 정의 + JSDoc
├── trip.ts            # 여행 데이터 (베트남 예시 포함)
└── trip.meta.json     # 빌드타임 메타 (앱이름, 테마색, PWA)
```

- **`trip.ts`**: 일정, POI, 연락처, 환율, 날씨좌표, 서약 등 런타임 데이터
- **`trip.meta.json`**: JSON 형태로 vite.config.ts / tailwind.config.ts에서 안전하게 import
- **`types.ts`**: TripConfig 인터페이스 + JSDoc으로 Claude Code 정확도 향상

### 타입 설계

```typescript
export interface TripConfig {
  meta: TripMeta;
  rules: Rule[];
  schedule: DaySchedule[];
  checklist: ChecklistItem[];
  pois: POI[];
  sos: SosConfig;
  exchange: ExchangeConfig;
  weather: WeatherConfig;
}
```

`TripMeta`는 `trip.meta.json`과 동일 구조로, 빌드타임(vite/tailwind)과 런타임(컴포넌트) 양쪽에서 사용.

### 컴포넌트 연결

모든 컴포넌트는 하드코딩 대신 `import { tripConfig } from "@/config/trip"` 으로 데이터 참조:

| 컴포넌트 | Config 필드 |
|----------|------------|
| EntryGate.tsx | `tripConfig.rules`, `tripConfig.meta` |
| TodayTab.tsx | `tripConfig.schedule`, `tripConfig.checklist` |
| MapTab.tsx | `tripConfig.pois` |
| SosTab.tsx | `tripConfig.sos` |
| ExchangeTab.tsx | `tripConfig.exchange` |
| useWeather.ts | `tripConfig.weather.locations` |
| vite.config.ts | `trip.meta.json` (JSON import) |
| tailwind.config.ts | `trip.meta.json` (JSON import) |
| index.html | `vite-plugin-html`로 자동 주입 |

### 전체 파일 구조

```
/Users/hong/Code/trip-boilerplate/
├── src/
│   ├── config/
│   │   ├── types.ts
│   │   ├── trip.ts
│   │   └── trip.meta.json
│   ├── components/trip/    # 로직/UI 그대로, 데이터만 config 참조
│   ├── components/ui/      # shadcn 그대로
│   ├── hooks/              # 좌표/통화를 config에서 읽도록 변경
│   ├── pages/              # EntryGate, TripDashboard, Index
│   ├── lib/utils.ts
│   ├── App.tsx
│   └── main.tsx
├── public/                 # 이미지는 수동 교체
├── vite.config.ts          # trip.meta.json import
├── tailwind.config.ts      # trip.meta.json import
├── index.html              # vite-plugin-html 자동 주입
├── CLAUDE.md               # AI용 config 생성 지침
├── TRIP-GUIDE.md           # 사람용 새 여행 가이드
└── package.json
```

## New Trip Workflow

### Claude Code 사용 시
```
"일본 오사카 3박4일 여행으로 config 만들어줘"
→ Claude Code가 types.ts 읽고 → trip.ts + trip.meta.json 생성
→ public/ 이미지 교체 안내
```

### 수동 사용 시
1. `src/config/trip.ts` 편집 (베트남 예시 참고)
2. `src/config/trip.meta.json` 편집 (앱이름, 테마색)
3. `public/` 이미지 교체
4. `npm run dev`로 확인

## Dependencies to Add

- `vite-plugin-html`: index.html 에 trip.meta.json 값 자동 주입

## Out of Scope

- CLI scaffolding 도구 (필요 시 추후 확장)
- 이미지 자동 생성/다운로드
- 다국어 지원
- 서버 사이드 기능
