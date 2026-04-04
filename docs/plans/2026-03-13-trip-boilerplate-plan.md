# Trip Boilerplate Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Vietnam-tour 프로젝트를 기반으로 `/Users/hong/Code/trip-boilerplate`에 config 기반 재사용 가능한 여행 앱 보일러플레이트를 생성한다.

**Architecture:** 현재 프로젝트를 복사한 후, 모든 하드코딩된 여행 데이터를 `src/config/trip.ts` + `src/config/trip.meta.json`으로 추출. 컴포넌트는 config에서 import하여 사용. `vite-plugin-html`로 index.html 자동 주입.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS, shadcn-ui, Framer Motion, React Leaflet, TanStack Query, vite-plugin-pwa, vite-plugin-html

---

### Task 1: 프로젝트 복사 및 초기화

**Files:**
- Create: `/Users/hong/Code/trip-boilerplate/` (전체 디렉토리)

**Step 1: 프로젝트 복사**

```bash
cp -r /Users/hong/Code/Vietnam-tour /Users/hong/Code/trip-boilerplate
```

**Step 2: git 초기화 (원본과 분리)**

```bash
cd /Users/hong/Code/trip-boilerplate
rm -rf .git
git init
```

**Step 3: 불필요한 파일 제거**

```bash
cd /Users/hong/Code/trip-boilerplate
rm -rf node_modules .claude docs/plans
```

**Step 4: 의존성 설치 + vite-plugin-html 추가**

```bash
cd /Users/hong/Code/trip-boilerplate
npm install
npm install vite-plugin-html --save-dev
```

**Step 5: 빌드 확인**

Run: `cd /Users/hong/Code/trip-boilerplate && npm run build`
Expected: BUILD SUCCESS

**Step 6: Commit**

```bash
cd /Users/hong/Code/trip-boilerplate
git add -A
git commit -m "chore: init trip-boilerplate from Vietnam-tour"
```

---

### Task 2: TripConfig 타입 정의

**Files:**
- Create: `src/config/types.ts`

**Step 1: 타입 파일 작성**

```typescript
// src/config/types.ts

/** 빌드타임 + 런타임 공용 메타 정보 (trip.meta.json과 동일 구조) */
export interface TripMeta {
  /** PWA 앱 이름 (예: "서여사 생신기념 - 다낭 · 호이안") */
  appName: string;
  /** PWA short_name (예: "베트남 계획") */
  shortName: string;
  /** 메타 설명 */
  description: string;
  /** 테마 메인 색상 hex (예: "#E8773A") */
  themeColor: string;
  /** PWA 배경색 hex (예: "#FAF6F1") */
  backgroundColor: string;
  /** 여행 제목 (예: "서여사 생신기념 다낭 · 호이안 여행") */
  tripTitle: string;
  /** 여행 부제 (예: "2026.03.20 ~ 03.23 | 3박 4일") */
  subtitle: string;
  /** 헤더 이미지 경로 (예: "/hoian_lantern_header.webp") */
  headerImage: string;
  /** 배경 이미지 경로 (예: "/vietnam_resort_bg.webp") */
  backgroundImage: string;
  /** 국가 이모지 (예: "🇻🇳") */
  countryEmoji: string;
  /** CSS 테마 변수 (index.css :root 값) */
  cssVars: Record<string, string>;
}

/** 서약 10계명 항목 */
export interface Rule {
  /** 순번 한글 (예: "하나", "둘") */
  num: string;
  /** 규칙 내용 (예: "아직 멀었냐 금지") */
  text: string;
}

/** 일정표 이벤트 타입 */
export type ScheduleType = "flight" | "move" | "food" | "stay" | "activity";

/** 일정 이벤트 */
export interface ScheduleEvent {
  /** 시간 (예: "06:45") */
  time: string;
  /** 활동명 */
  activity: string;
  /** 상세 설명 */
  detail?: string;
  /** 이벤트 타입 */
  type: ScheduleType;
}

/** 하루 일정 */
export interface DaySchedule {
  /** 일차 (1-based) */
  day: number;
  /** 날짜 (예: "3월 20일") */
  date: string;
  /** 요일 (예: "금") */
  weekday: string;
  /** 일정 제목 (예: "호이안 도착 & 올드타운") */
  title: string;
  /** 위치/도시 (예: "호이안") */
  location: string;
  /** 시간대별 일정 */
  schedule: ScheduleEvent[];
  /** 식사 안내 (예: ["조식: 호텔", "점심: 호이안 로컬"]) */
  meals: string[];
  /** 특별 팁 (예: "도착 후 충분히 쉬고 나서 관광 시작") */
  parentTip: string;
  /** 일별 준비물 (예: ["선크림", "모자"]) */
  preparation: string[];
}

/** 숙소 정보 */
export interface Hotel {
  /** 호텔명 */
  name: string;
  /** 주소 */
  address: string;
  /** 위치/도시 */
  area: string;
  /** 체크인 일시 (예: "3/20 (금) 14:00") */
  checkIn: string;
  /** 체크아웃 일시 */
  checkOut: string;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
}

/** 준비 체크리스트 항목 */
export interface ChecklistItem {
  /** 항목 텍스트 (예: "여권 (유효기간 6개월 이상)") */
  text: string;
}

/** 지도 POI */
export interface POI {
  /** 이모지 아이콘 */
  emoji: string;
  /** 장소명 */
  name: string;
  /** 카테고리 (예: "관광지", "맛집", "카페") */
  category: string;
  /** 지역 */
  area: string;
  /** 간단 설명 */
  description: string;
  /** 추천 이유 */
  why: string;
  /** 주소 */
  address: string;
  /** 소요 시간 (예: "2~3시간") */
  visitTime: string;
  /** 교통편 */
  transport: string;
  /** 여행 팁 */
  familyNote: string;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
}

/** 맛집/카페/쇼핑 추천 카테고리 */
export interface PlaceCategory {
  /** 카테고리명 (예: "호이안 맛집") */
  title: string;
  /** 이모지 */
  emoji: string;
  /** 지역 필터 (예: "다낭", "호이안", "all") */
  area: string;
  /** 추천 목록 */
  items: { name: string; tip: string }[];
}

/** 연락처 */
export interface Contact {
  /** 라벨 (예: "호이안 종합병원") */
  label: string;
  /** 전화번호 */
  number: string;
  /** 부가 정보 */
  note?: string;
}

/** 긴급 연락처 설정 */
export interface SosConfig {
  /** 긴급 전화 (구급차, 경찰 등) */
  emergency: { emoji: string; label: string; sublabel: string; number: string }[];
  /** 영사관/대사관 */
  consulate: { emoji: string; label: string; sublabel: string; number: string }[];
  /** 위급 시 행동 가이드 */
  emergencySteps: string[];
  /** 병원 */
  hospitals: Contact[];
  /** 한국 관련 연락처 */
  koreanContacts: Contact[];
  /** 호텔/항공사 */
  hotelAirline: Contact[];
  /** 여권 분실 시 절차 */
  lostPassportSteps: string[];
  /** 병원 방문 시 필요 정보 */
  hospitalVisitInfo: string[];
}

/** 환율 설정 */
export interface ExchangeConfig {
  /** 출발 통화 코드 (예: "krw") */
  from: string;
  /** 출발 통화 이름 (예: "한국 원") */
  fromName: string;
  /** 출발 통화 국기 (예: "🇰🇷") */
  fromFlag: string;
  /** 출발 통화 단위 (예: "원") */
  fromUnit: string;
  /** 도착 통화 코드 (예: "vnd") */
  to: string;
  /** 도착 통화 이름 (예: "베트남 동") */
  toName: string;
  /** 도착 통화 국기 (예: "🇻🇳") */
  toFlag: string;
  /** 도착 통화 단위 (예: "동") */
  toUnit: string;
  /** 오프라인 폴백 환율 */
  fallbackRate: number;
  /** 현지 물가 프리셋 */
  localPrices: { label: string; amount: number }[];
  /** 환율 꿀팁 */
  tip: { main: string; example: string };
}

/** 날씨 위치 */
export interface WeatherLocation {
  /** 위도 */
  lat: number;
  /** 경도 */
  lon: number;
  /** 도시명 */
  city: string;
}

/** 날씨 설정 */
export interface WeatherConfig {
  /** 날씨 조회 위치 목록 */
  locations: WeatherLocation[];
  /** 기본 표시 위치 인덱스 */
  defaultIndex: number;
}

/** 항공편 정보 */
export interface FlightInfo {
  /** 가는편/오는편 */
  direction: "outbound" | "inbound";
  /** 라벨 (예: "가는편") */
  label: string;
  /** 항공사 (예: "대한항공 KE5769") */
  airline: string;
  /** 출발 공항 코드 */
  fromCode: string;
  /** 출발 도시 */
  fromCity: string;
  /** 출발 시간 */
  departTime: string;
  /** 도착 공항 코드 */
  toCode: string;
  /** 도착 도시 */
  toCity: string;
  /** 도착 시간 */
  arriveTime: string;
  /** 비행 시간 */
  duration: string;
  /** 추가 안내 */
  note?: string;
  /** 일차 인덱스 (0-based, schedule 배열 매칭) */
  dayIndex: number;
}

/** 서약서 관련 설정 */
export interface PledgeConfig {
  /** 서약서 제목 (예: "우리 가족 베트남 여행 10계명") */
  title: string;
  /** 서약 문구 */
  pledgeText: string;
  /** 참여 질문 (예: "참가하시겠습니까?") */
  participationQuestion: string;
  /** 참여 수락 버튼 텍스트 */
  acceptText: string;
  /** 참여 거절 버튼 텍스트 */
  declineText: string;
  /** 거절 시 메시지들 */
  declineMessages: string[];
  /** 인트로 인사 (예: "서여사님 생신 축하드립니다! 🎂") */
  introGreeting: string;
  /** 인트로 제목 (예: "우리 가족 베트남 여행") */
  introTitle: string;
  /** 서약 헤더 제목 (예: "서여사 · 이서방 여행 10계명") */
  rulesHeaderTitle: string;
  /** 서약 헤더 부제 */
  rulesHeaderSubtitle: string;
}

/** 옷차림/캐리어 가이드 */
export interface PackingGuide {
  /** 옷차림 목록 */
  clothing: string[];
  /** 캐리어 목록 */
  luggage: string[];
}

/** 여행 전체 설정 */
export interface TripConfig {
  meta: TripMeta;
  pledge: PledgeConfig;
  rules: Rule[];
  schedule: DaySchedule[];
  hotels: Hotel[];
  flights: FlightInfo[];
  checklist: ChecklistItem[];
  packingGuide: PackingGuide;
  pois: POI[];
  placeCategories: PlaceCategory[];
  sos: SosConfig;
  exchange: ExchangeConfig;
  weather: WeatherConfig;
  /** 여행 시작일 (ISO 8601, 예: "2026-03-20T00:00:00+07:00") */
  tripStart: string;
  /** 여행 종료일 (ISO 8601) */
  tripEnd: string;
  /** 지도 기본 센터 [lat, lng] */
  mapCenter: [number, number];
  /** 지도 기본 줌 레벨 */
  mapZoom: number;
  /** 지역 필터 목록 (예: ["다낭", "호이안"]) */
  areas: string[];
  /** 지역별 배지 색상 */
  areaBadgeColors: Record<string, { bg: string; text: string; border: string }>;
  /** 헤더 텍스트 (예: "서여사 생신기념 여행") */
  headerLabel: string;
  /** 푸터 텍스트 (예: "jihong.lee@outlook.com") */
  footerText: string;
}
```

**Step 2: Commit**

```bash
git add src/config/types.ts
git commit -m "feat: add TripConfig type definitions"
```

---

### Task 3: trip.meta.json 생성

**Files:**
- Create: `src/config/trip.meta.json`

**Step 1: 메타 JSON 작성**

```json
{
  "appName": "서여사 생신기념 - 다낭 · 호이안",
  "shortName": "베트남 계획",
  "description": "서여사 생신기념 다낭 · 호이안 여행",
  "themeColor": "#E8773A",
  "backgroundColor": "#FAF6F1",
  "tripTitle": "서여사 생신기념 다낭 · 호이안 여행",
  "subtitle": "2026.03.20 ~ 03.23 | 3박 4일",
  "headerImage": "/hoian_lantern_header.webp",
  "backgroundImage": "/vietnam_resort_bg.webp",
  "countryEmoji": "🇻🇳",
  "cssVars": {
    "--background": "30 25% 97%",
    "--foreground": "20 20% 15%",
    "--card": "30 20% 99%",
    "--card-foreground": "20 20% 15%",
    "--primary": "20 85% 45%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "30 30% 93%",
    "--secondary-foreground": "20 40% 30%",
    "--muted": "25 15% 91%",
    "--muted-foreground": "20 12% 35%",
    "--accent": "170 40% 45%",
    "--accent-foreground": "0 0% 100%",
    "--destructive": "0 70% 55%",
    "--destructive-foreground": "0 0% 100%",
    "--border": "25 18% 88%",
    "--input": "25 18% 88%",
    "--ring": "20 85% 45%"
  }
}
```

**Step 2: Commit**

```bash
git add src/config/trip.meta.json
git commit -m "feat: add trip.meta.json with Vietnam example data"
```

---

### Task 4: trip.ts 작성 (메인 config 파일)

**Files:**
- Create: `src/config/trip.ts`

**Step 1: config 파일 작성**

베트남 여행 데이터를 모든 컴포넌트에서 추출하여 `TripConfig` 타입에 맞게 하나의 파일에 집약한다. 현재 하드코딩된 모든 데이터를 여기에 옮긴다:

- `EntryGate.tsx`의 rules, pledge 텍스트
- `TodayTab.tsx`의 days, checklist, hotels, flights, packingGuide
- `MapTab.tsx`의 places, placeCategories
- `SosTab.tsx`의 모든 연락처/절차
- `ExchangeTab.tsx`의 presets, currency info
- `useWeather.ts`의 좌표
- `TripDashboard.tsx`의 헤더 텍스트

```typescript
import type { TripConfig } from "./types";
import meta from "./trip.meta.json";

export const tripConfig: TripConfig = {
  meta: meta as TripConfig["meta"],
  tripStart: "2026-03-20T00:00:00+07:00",
  tripEnd: "2026-03-23T23:59:59+07:00",
  mapCenter: [15.97, 108.18],
  mapZoom: 11,
  areas: ["다낭", "호이안"],
  areaBadgeColors: {
    "호이안": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
    "다낭": { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-200" },
  },
  headerLabel: "서여사 생신기념 여행",
  footerText: "jihong.lee@outlook.com",

  pledge: {
    title: "우리 가족 베트남 여행 10계명",
    pledgeText: "위 내용을 충실히 이행할 것을 약속합니다.",
    participationQuestion: "참가하시겠습니까?",
    acceptText: "당연하죠! 참가합니다 ✈️",
    declineText: "글쎄요...",
    declineMessages: [
      "다시 한번 생각해보세요... 🤔",
      "진심이세요?! 다낭인데요?! 🏖️",
      "서여사님 이러시면 안 됩니다 😭",
      "마지막 기회입니다... 진짜요?",
      "알겠습니다... (참가 버튼이 커집니다)",
    ],
    introGreeting: "서여사님 생신 축하드립니다! 🎂",
    introTitle: "우리 가족 베트남 여행",
    rulesHeaderTitle: "서여사 · 이서방 여행 10계명",
    rulesHeaderSubtitle: "서여사 · 이서방과 함께하는 다낭 · 호이안",
  },

  rules: [
    { num: "하나", text: "아직 멀었냐 금지" },
    { num: "둘", text: "음식이 달다 금지" },
    { num: "셋", text: "음식이 짜다 금지" },
    { num: "넷", text: "겨우 이거 보러 왔냐 금지" },
    { num: "다섯", text: "조식 이게 다냐 금지" },
    { num: "여섯", text: "돈 아깝다 금지" },
    { num: "일곱", text: "이 돈이면 집에서 해먹는게 낫다 금지" },
    { num: "여덟", text: "이거 무슨맛으로 먹냐 금지" },
    { num: "아홉", text: "이거 한국 돈으로 얼마냐 금지" },
    { num: "열", text: "물이 제일 맛있다 금지" },
  ],

  schedule: [
    {
      day: 1, date: "3월 20일", weekday: "금", title: "호이안 도착 & 올드타운", location: "호이안",
      schedule: [
        { time: "06:45", activity: "인천공항 집합", detail: "터미널 2", type: "flight" },
        { time: "09:45", activity: "인천 출발 (KE5769)", type: "flight" },
        { time: "12:30", activity: "다낭 도착", type: "flight" },
        { time: "13:00", activity: "호이안으로 이동", detail: "차량 약 40분", type: "move" },
        { time: "14:00", activity: "호텔 체크인 & 휴식", type: "stay" },
        { time: "16:00", activity: "올드타운 가이드 투어", detail: "일본교 · 중국회관 · 상인 집", type: "activity" },
        { time: "18:00", activity: "저녁 식사", detail: "White Rose · Cao Lau · Mi Quang", type: "food" },
        { time: "19:00", activity: "소원보트 + 야시장", type: "activity" },
      ],
      meals: ["점심: 기내식 또는 도착 후 간단히", "저녁: 호이안 올드타운"],
      parentTip: "도착 후 충분히 쉬고 나서 관광 시작. 무리하지 않기!",
      preparation: ["선크림", "모자", "편한 신발", "물병"],
    },
    {
      day: 2, date: "3월 21일", weekday: "토", title: "액티비티 & 휴식", location: "호이안",
      schedule: [
        { time: "08:00", activity: "조식", type: "food" },
        { time: "09:30", activity: "코코넛 보트 체험", detail: "대나무 보트로 수로 탐험", type: "activity" },
        { time: "12:00", activity: "점심 식사", type: "food" },
        { time: "13:30", activity: "호텔 수영장 / 마사지", detail: "서여사 · 이서방 휴식 · 스파 추천", type: "stay" },
        { time: "17:00", activity: "올드타운 재방문 + 저녁", type: "activity" },
      ],
      meals: ["조식: 호텔", "점심: 호이안 로컬", "저녁: 올드타운"],
      parentTip: "오후는 완전 자유시간. 서여사 · 이서방 컨디션에 맞춰 휴식 우선!",
      preparation: ["수영복", "갈아입을 옷", "카메라", "선크림"],
    },
    {
      day: 3, date: "3월 22일", weekday: "일", title: "다낭 이동 & 해변", location: "다낭",
      schedule: [
        { time: "08:00", activity: "조식", type: "food" },
        { time: "09:00", activity: "호이안 체크아웃", detail: "Little Oasis Hotel", type: "stay" },
        { time: "10:00", activity: "다낭으로 이동", detail: "차량 약 40분", type: "move" },
        { time: "12:00", activity: "다낭 점심", type: "food" },
        { time: "14:00", activity: "해변 액티비티", detail: "서여사 · 이서방은 해변에서 휴식도 OK", type: "activity" },
        { time: "15:00", activity: "노보텔 체크인", detail: "Novotel Danang Premier Han River", type: "stay" },
        { time: "18:00", activity: "다낭 시내 저녁 식사", type: "food" },
      ],
      meals: ["조식: 호텔", "점심: 다낭", "저녁: 다낭 시내"],
      parentTip: "해변에서 무리하지 말고, 그늘에서 쉬는 시간도 갖기",
      preparation: ["수영복", "선크림", "모자", "샌들"],
    },
    {
      day: 4, date: "3월 23일", weekday: "월", title: "선택 일정 & 귀국", location: "다낭",
      schedule: [
        { time: "08:00", activity: "조식", type: "food" },
        { time: "09:00", activity: "바나힐 or 자유시간", detail: "컨디션 안 좋으면 카페에서 휴식", type: "activity" },
        { time: "12:00", activity: "점심", type: "food" },
        { time: "13:00", activity: "공항 이동", type: "move" },
        { time: "15:45", activity: "다낭 출발 (KE0458)", type: "flight" },
        { time: "22:05", activity: "인천 도착", type: "flight" },
      ],
      meals: ["조식: 호텔", "점심: 간단히", "저녁: 기내식"],
      parentTip: "마지막 날은 무리하지 않기! 공항 일찍 가서 면세점 구경",
      preparation: ["여권", "탑승권", "기념품 정리"],
    },
  ],

  hotels: [
    { name: "Little Oasis Hotel", address: "215 Lê Thánh Tông, Hội An", area: "호이안", checkIn: "3/20 (금) 14:00", checkOut: "3/22 (일) 12:00", lat: 15.8794, lng: 108.3350 },
    { name: "Novotel Danang Premier", address: "36 Bach Dang St, Đà Nẵng", area: "다낭", checkIn: "3/22 (일) 15:00", checkOut: "3/23 (월) 12:00", lat: 16.0681, lng: 108.2240 },
  ],

  flights: [
    {
      direction: "outbound", label: "가는편", airline: "대한항공 KE5769",
      fromCode: "ICN", fromCity: "인천", departTime: "09:45",
      toCode: "DAD", toCity: "다낭", arriveTime: "12:30",
      duration: "4시간 45분", dayIndex: 0,
      note: "진에어(LJ) 카운터에서 탑승수속! 대한항공 코드셰어 · 터미널 2",
    },
    {
      direction: "inbound", label: "오는편", airline: "대한항공 KE0458",
      fromCode: "DAD", fromCity: "다낭", departTime: "15:45",
      toCode: "ICN", toCity: "인천", arriveTime: "22:05",
      duration: "4시간 20분", dayIndex: 3,
    },
  ],

  checklist: [
    { text: "여권 (유효기간 6개월 이상)" },
    { text: "항공권 정보 저장" },
    { text: "환전 (베트남 동)" },
    { text: "유심/eSIM 준비" },
    { text: "여행자 보험 가입" },
    { text: "호텔 예약 확인서" },
    { text: "Grab 앱 설치" },
    { text: "상비약 챙기기" },
    { text: "선크림 & 모자" },
  ],

  packingGuide: {
    clothing: [
      "낮: 반팔/반바지 (평균 25~30°C)",
      "저녁: 얇은 긴팔 하나 (에어컨/바람)",
      "비 올 수 있으니 우산 또는 우비",
      "호이안 사원 방문 시 긴바지 필요",
      "편한 운동화 + 샌들/슬리퍼",
    ],
    luggage: [
      "위탁 수하물: 23kg × 1개 (대한항공)",
      "기내 반입: 12kg 이내, 55×40×20cm",
      "3박이라 24인치면 충분",
      "기념품 공간 여유 두기",
      "보조배터리는 기내 반입만 가능",
    ],
  },

  pois: [
    { emoji: "✈️", name: "다낭 국제공항 (DAD)", category: "공항", area: "다낭", description: "베트남 중부 주요 공항", why: "입출국 공항", address: "Da Nang International Airport", visitTime: "입출국 시", transport: "택시/Grab 이용", familyNote: "작은 공항이라 이동이 편해요", lat: 16.0556, lng: 108.1992 },
    { emoji: "🏨", name: "Little Oasis Hotel", category: "숙소 (3/20~22)", area: "호이안", description: "에코 프렌들리 호텔 & 스파", why: "호이안 숙소", address: "215 Lê Thánh Tông, Hội An", visitTime: "3/20~22", transport: "공항에서 택시 40분", familyNote: "올드타운 가까워 이동 편리", lat: 15.8794, lng: 108.3350 },
    { emoji: "🏨", name: "Novotel Danang Premier", category: "숙소 (3/22~23)", area: "다낭", description: "한강변 5성급 호텔", why: "다낭 숙소", address: "36 Bach Dang St, Đà Nẵng", visitTime: "3/22~23", transport: "공항에서 택시 10분", familyNote: "한강뷰, 수영장, 조식 뷔페 우수", lat: 16.0681, lng: 108.2240 },
    { emoji: "🏛️", name: "호이안 올드타운", category: "관광지", area: "호이안", description: "유네스코 세계문화유산", why: "호이안의 핵심 관광지", address: "Hoi An Ancient Town", visitTime: "2~3시간", transport: "호텔에서 도보 10분", familyNote: "평지라 걷기 편하고 야경이 아름다워요", lat: 15.8773, lng: 108.3280 },
    { emoji: "🌉", name: "일본교 (내원교)", category: "관광지", area: "호이안", description: "호이안 상징적 다리", why: "호이안 대표 랜드마크", address: "Japanese Covered Bridge, Hoi An", visitTime: "20분", transport: "올드타운 내 도보", familyNote: "사진 포인트! 낮과 밤 다른 분위기", lat: 15.8770, lng: 108.3262 },
    { emoji: "🚤", name: "코코넛 보트", category: "액티비티", area: "호이안", description: "대나무 바구니 보트 체험", why: "재미있는 수상 액티비티", address: "Cam Thanh, Hoi An", visitTime: "1~2시간", transport: "호텔에서 차로 15분", familyNote: "서여사 · 이서방도 즐길 수 있는 안전한 체험", lat: 15.8630, lng: 108.3410 },
    { emoji: "🏖️", name: "미케 비치", category: "해변", area: "다낭", description: "다낭 대표 해변", why: "해변 액티비티 & 휴식", address: "My Khe Beach, Da Nang", visitTime: "2~3시간", transport: "다낭 시내에서 가까움", familyNote: "깨끗하고 넓은 해변. 그늘 있는 곳에서 쉬기", lat: 16.0470, lng: 108.2500 },
    { emoji: "🎡", name: "바나힐", category: "관광지", area: "다낭", description: "골든 브릿지로 유명한 테마파크", why: "컨디션 따라 선택 관광", address: "Ba Na Hills, Da Nang", visitTime: "3~4시간", transport: "다낭에서 차로 40분", familyNote: "케이블카 탑승. 선선한 기후가 장점", lat: 15.9977, lng: 107.9875 },
    { emoji: "🛍️", name: "호이안 야시장", category: "시장", area: "호이안", description: "등불과 기념품의 야시장", why: "쇼핑 & 야경 & 소원보트", address: "Nguyen Hoang, Hoi An", visitTime: "1~2시간", transport: "올드타운 내 도보", familyNote: "흥정 가능. 소원보트 체험 추천!", lat: 15.8768, lng: 108.3274 },
    { emoji: "🌉", name: "용다리 (Dragon Bridge)", category: "관광지", area: "다낭", description: "불 뿜는 용 모양 다리", why: "다낭 상징 랜드마크", address: "Dragon Bridge, Da Nang", visitTime: "30분 (주말 밤 불쇼)", transport: "노보텔에서 도보 5분", familyNote: "주말 밤 9시 불쇼! 가까이서 보면 더 멋져요", lat: 16.0612, lng: 108.2278 },
    { emoji: "🛍️", name: "한시장 (Han Market)", category: "시장", area: "다낭", description: "다낭 대표 재래시장", why: "기념품 & 현지 물건 쇼핑", address: "119 Trần Phú, Da Nang", visitTime: "1~2시간", transport: "노보텔에서 도보 10분", familyNote: "흥정 필수! 오전이 덜 붐비고 좋아요", lat: 16.0680, lng: 108.2241 },
    { emoji: "🍜", name: "Phở Bà Vị", category: "맛집", area: "다낭", description: "다낭 현지인 쌀국수 맛집", why: "진한 육수의 로컬 맛집", address: "684 Ngô Quyền, Da Nang", visitTime: "30분", transport: "택시/Grab", familyNote: "현지인이 줄서는 집. 아침식사로 추천", lat: 16.0597, lng: 108.2107 },
    { emoji: "🍜", name: "Bún chả cá Bà Hường", category: "맛집", area: "다낭", description: "다낭식 어묵국수", why: "다낭 대표 로컬 음식", address: "100 Lê Đình Dương, Da Nang", visitTime: "30분", transport: "노보텔에서 도보 15분", familyNote: "다낭 와서 이걸 안 먹으면 섭섭!", lat: 16.0650, lng: 108.2200 },
    { emoji: "🍖", name: "Madame Lân", category: "맛집", area: "다낭", description: "베트남 정통 레스토랑", why: "깔끔한 분위기의 베트남 요리", address: "4 Bạch Đằng, Da Nang", visitTime: "1시간", transport: "노보텔 바로 옆", familyNote: "한강뷰 레스토랑. 서여사 · 이서방 모시기 좋은 분위기", lat: 16.0675, lng: 108.2245 },
    { emoji: "☕", name: "43 Factory Coffee", category: "카페", area: "다낭", description: "다낭 최고 스페셜티 카페", why: "커피 맛집", address: "43 Trần Phú, Da Nang", visitTime: "1시간", transport: "한시장 근처 도보", familyNote: "코코넛 커피 강추. 에어컨 시원해서 쉬기 좋아요", lat: 16.0690, lng: 108.2230 },
    { emoji: "🏥", name: "호이안 종합병원", category: "병원", area: "호이안", description: "응급 시 이용 가능", why: "비상시 대비", address: "Hoi An General Hospital", visitTime: "비상시", transport: "택시/Grab", familyNote: "여행자 보험 가입 확인 필수", lat: 15.8835, lng: 108.3350 },
    { emoji: "🏥", name: "다낭 C병원", category: "병원", area: "다낭", description: "다낭 외국인 대응 병원", why: "비상시 대비", address: "Da Nang Hospital C", visitTime: "비상시", transport: "택시/Grab", familyNote: "외국인 환자 경험 많은 병원", lat: 16.0640, lng: 108.2170 },
    { emoji: "💱", name: "환전소", category: "환전", area: "호이안", description: "다낭/호이안 환전소", why: "현지 환전", address: "올드타운 주변 다수", visitTime: "10분", transport: "도보", familyNote: "금은방이 환율 좋은 편", lat: 15.8780, lng: 108.3290 },
    { emoji: "⛪", name: "다낭 대성당 (핑크성당)", category: "관광지", area: "다낭", description: "1923년 프랑스 식민시기 건설된 고딕 성당", why: "다낭 시내 대표 랜드마크", address: "156 Tran Phu, Hai Chau, Da Nang", visitTime: "30분", transport: "시내 중심, 한시장 도보 5분", familyNote: "포토 스팟! 외관 감상 위주, 내부는 미사 시간 외 제한", lat: 16.0670, lng: 108.2234 },
    { emoji: "🙏", name: "린응사 (선짜반도)", category: "관광지", area: "다낭", description: "67m 해수관음상, 선짜반도 명소", why: "다낭 상징적 뷰포인트", address: "Linh Ung Pagoda, Son Tra Peninsula", visitTime: "1~1.5시간", transport: "시내에서 택시/Grab 약 10km", familyNote: "아침 일찍 가면 시원하고 한적. 다낭 시내 전경 감상", lat: 16.1003, lng: 108.2779 },
    { emoji: "🪨", name: "오행산 (마블 마운틴)", category: "관광지", area: "다낭", description: "석회암 동굴과 사원, 다낭-호이안 중간", why: "독특한 풍경과 전망", address: "Marble Mountains, Ngu Hanh Son, Da Nang", visitTime: "1.5~2시간", transport: "다낭에서 남쪽 약 8km", familyNote: "엘리베이터 있어 올라가기 편함. 계단 구간은 경사 주의", lat: 15.9967, lng: 108.2630 },
    { emoji: "🛒", name: "롯데마트 다낭", category: "시장", area: "다낭", description: "에어컨 시원한 대형마트, 기념품 쇼핑", why: "커피/과자/연고 등 기념품 구매", address: "6 Nai Nam, Hai Chau, Da Nang", visitTime: "1~2시간", transport: "헬리오 야시장/다운타운 근처", familyNote: "시원하고 깔끔! 더운 낮에 2~3시간 구경하기 좋음", lat: 16.0395, lng: 108.2262 },
    { emoji: "🏬", name: "빈컴플라자 다낭", category: "시장", area: "다낭", description: "다낭 시내 대형 쇼핑몰 (9:30~22:00)", why: "쇼핑/식사/놀이 복합몰", address: "910A Ngo Quyen, Son Tra, Da Nang", visitTime: "2~3시간", transport: "시내 중심", familyNote: "4층 푸드코트, 아이스링크, 영화관. 한시장보다 깔끔하고 가격 합리적", lat: 16.0602, lng: 108.2105 },
    { emoji: "🦀", name: "선짜 야시장", category: "시장", area: "다낭", description: "해산물 중심 스트릿 야시장", why: "다낭 대표 야시장 체험", address: "Mai Hac De, Son Tra, Da Nang", visitTime: "1~2시간", transport: "시내에서 택시 10분", familyNote: "해산물 호객 주의. 활기찬 로컬 분위기 체험", lat: 16.0725, lng: 108.2285 },
  ],

  placeCategories: [
    { title: "호이안 맛집", emoji: "🍜", area: "호이안", items: [
      { name: "White Rose (화이트 로즈)", tip: "새우 쌀떡 만두, 부드러운 맛" },
      { name: "Cao Lau (까오 라우)", tip: "호이안에서만 먹을 수 있는 쫄깃 면" },
      { name: "Mi Quang (미꽝)", tip: "다낭 대표 면요리, 다양한 재료에 복잡한 맛" },
      { name: "4P's Pizza (포피스피자)", tip: "미소+연어사시미 피자! 베트남 핫 브랜드" },
    ]},
    { title: "다낭 맛집", emoji: "🍖", area: "다낭", items: [
      { name: "Phở Bà Vị", tip: "현지인 줄서는 쌀국수. 아침식사 추천" },
      { name: "Bún chả cá Bà Hường", tip: "다낭 대표 어묵국수, 꼭 먹어보기" },
      { name: "Madame Lân", tip: "한강뷰 레스토랑. 서여사 · 이서방 모시기 딱" },
    ]},
    { title: "카페", emoji: "☕", area: "all", items: [
      { name: "콩카페 (Cong Caphe)", tip: "코코넛 커피 추천. 다낭점은 한국인 90%" },
      { name: "하이랜드 커피 (Highlands)", tip: "베트남의 스타벅스. 한국인 적은 편" },
      { name: "43 Factory Coffee (다낭)", tip: "다낭 최고 스페셜티. 에어컨 시원" },
      { name: "코코넛 커피/스무디", tip: "어디서나 약 3~5만동" },
    ]},
    { title: "쇼핑", emoji: "🛍️", area: "all", items: [
      { name: "빈컴플라자", tip: "에어컨 시원! 4층 푸드코트, 기념품 깔끔하게" },
      { name: "롯데마트/고마트", tip: "커피, 망고칩, 연고 등 소모품 기념품" },
      { name: "한시장", tip: "1층 먹거리/건망고/커피, 2층 아오자이/라탄백. 흥정 필수" },
    ]},
    { title: "해변", emoji: "🏖️", area: "all", items: [
      { name: "미케 비치 (다낭)", tip: "숙소에서 가까우면 가볍게. 비치바 야경 추천" },
      { name: "안방 비치 (호이안)", tip: "호이안 근처, 조용하고 여유로움" },
    ]},
    { title: "액티비티", emoji: "🎯", area: "all", items: [
      { name: "코코넛 보트 (호이안)", tip: "방수팩 챙기기" },
      { name: "오행산 트레킹", tip: "엘리베이터 이용 가능. 동굴+전망 포인트" },
      { name: "선짜반도 드라이브", tip: "린응사+반코봉+원숭이. 날씨 맑은 날 추천" },
    ]},
  ],

  sos: {
    emergency: [
      { emoji: "🚑", label: "구급차 / 병원", sublabel: "115 바로 전화", number: "115" },
      { emoji: "🚔", label: "경찰", sublabel: "113 바로 전화", number: "113" },
    ],
    consulate: [
      { emoji: "🇰🇷", label: "영사콜센터 (24시간)", sublabel: "+82-2-3210-0404", number: "+82-2-3210-0404" },
    ],
    emergencySteps: [
      "안전한 곳으로 이동",
      "호텔 프론트에 연락 (가장 빠른 도움)",
      "위의 전화 버튼으로 연락",
      "가족 연락망으로 연락",
    ],
    hospitals: [
      { label: "호이안 종합병원", number: "+84-235-3861-364", note: "Hoi An General Hospital" },
      { label: "다낭 패밀리 메디컬", number: "+84-236-3582-700", note: "외국인 진료 가능" },
    ],
    koreanContacts: [
      { label: "다낭 한국총영사관", number: "+84-236-3556-225" },
      { label: "주베트남 한국대사관", number: "+84-24-3831-5110" },
    ],
    hotelAirline: [
      { label: "Little Oasis Hotel (호이안)", number: "+84-235-3939-939" },
      { label: "Novotel Danang (다낭)", number: "+84-236-3929-999" },
      { label: "대한항공 고객센터", number: "1588-2001" },
      { label: "대한항공 다낭", number: "+84-236-3583-398" },
    ],
    lostPassportSteps: [
      "가까운 경찰서에서 분실 신고서 발급",
      "다낭 한국총영사관 방문",
      "여행증명서(여권 대용) 발급",
      "여권 사본, 사진 2매 필요",
    ],
    hospitalVisitInfo: [
      "🛂 여권 원본",
      "📋 여행자 보험 증서",
      "💊 복용 중인 약 정보",
      "🩸 혈액형 정보",
      "📱 보험사 긴급 연락처",
    ],
  },

  exchange: {
    from: "krw", fromName: "한국 원", fromFlag: "🇰🇷", fromUnit: "원",
    to: "vnd", toName: "베트남 동", toFlag: "🇻🇳", toUnit: "동",
    fallbackRate: 18.5,
    localPrices: [
      { label: "쌀국수", amount: 40000 },
      { label: "반미", amount: 25000 },
      { label: "커피", amount: 35000 },
      { label: "맥주", amount: 15000 },
      { label: "마사지 1시간", amount: 200000 },
      { label: "Grab 택시", amount: 50000 },
      { label: "코코넛 보트", amount: 150000 },
      { label: "기념품", amount: 100000 },
    ],
    tip: {
      main: "베트남 동에서 0 하나 빼고 2로 나누면 대략 한국 원!",
      example: "예: 50,000동 → 0 빼면 5,000 → ÷2 = 약 2,500원",
    },
  },

  weather: {
    locations: [
      { lat: 16.0544, lon: 108.2022, city: "다낭" },
      { lat: 15.8801, lon: 108.338, city: "호이안" },
    ],
    defaultIndex: 0,
  },
};
```

**Step 2: Commit**

```bash
git add src/config/trip.ts
git commit -m "feat: add trip.ts with Vietnam example data"
```

---

### Task 5: 컴포넌트 리팩토링 — EntryGate.tsx

**Files:**
- Modify: `src/pages/EntryGate.tsx`

**Step 1: 하드코딩 데이터를 config import로 교체**

변경할 부분:
1. `rules` 배열 → `tripConfig.rules`
2. `noMessages` 배열 → `tripConfig.pledge.declineMessages`
3. `buildPledgeImage` 내 제목 "우리 가족 베트남 여행 10계명" → `tripConfig.pledge.title`
4. 인트로 텍스트들 (여행명, 인사말, 날짜 등) → `tripConfig.pledge.*` 및 `tripConfig.meta.*`
5. 배경 이미지 경로 → `tripConfig.meta.backgroundImage`

상단에 추가:
```typescript
import { tripConfig } from "@/config/trip";
```

로컬 `rules` 배열 제거, `tripConfig.rules` 사용.
`buildPledgeImage` 함수에서 `rules` → `tripConfig.rules`, 제목 → `tripConfig.pledge.title`.
모든 하드코딩 텍스트를 config 필드로 교체.

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/pages/EntryGate.tsx
git commit -m "refactor: EntryGate reads from tripConfig"
```

---

### Task 6: 컴포넌트 리팩토링 — TodayTab.tsx

**Files:**
- Modify: `src/components/trip/TodayTab.tsx`

**Step 1: 하드코딩 데이터를 config import로 교체**

변경할 부분:
1. `TRIP_START`, `TRIP_END` → `new Date(tripConfig.tripStart)`, `new Date(tripConfig.tripEnd)`
2. `days` 배열 → `tripConfig.schedule`
3. `locationBadge` → `tripConfig.areaBadgeColors`
4. 체크리스트 항목들 → `tripConfig.checklist`
5. 옷차림/캐리어 → `tripConfig.packingGuide`
6. 숙소 정보 → `tripConfig.hotels`
7. 항공편 정보 → `tripConfig.flights`
8. 히어로 텍스트 (날짜, 도시명) → `tripConfig.meta.subtitle`
9. `useWeatherDanang()` → config 기반 날씨 호출
10. 날씨 텍스트 "다낭 현재 날씨" → `tripConfig.weather.locations[0].city + " 현재 날씨"`

상단에 추가:
```typescript
import { tripConfig } from "@/config/trip";
```

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/components/trip/TodayTab.tsx
git commit -m "refactor: TodayTab reads from tripConfig"
```

---

### Task 7: 컴포넌트 리팩토링 — MapTab.tsx

**Files:**
- Modify: `src/components/trip/MapTab.tsx`

**Step 1: 하드코딩 데이터를 config import로 교체**

변경할 부분:
1. `places` 배열 → `tripConfig.pois`
2. `placeCategories` → `tripConfig.placeCategories`
3. `MapContainer center` → `tripConfig.mapCenter`
4. `MapContainer zoom` → `tripConfig.mapZoom`
5. 지역 토글 (`["all", "다낭", "호이안"]`) → `["all", ...tripConfig.areas]`
6. 지역별 카운트/색상 → `tripConfig.areas` + `tripConfig.areaBadgeColors`

상단에 추가:
```typescript
import { tripConfig } from "@/config/trip";
```

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/components/trip/MapTab.tsx
git commit -m "refactor: MapTab reads from tripConfig"
```

---

### Task 8: 컴포넌트 리팩토링 — SosTab.tsx

**Files:**
- Modify: `src/components/trip/SosTab.tsx`

**Step 1: 하드코딩 데이터를 config import로 교체**

변경할 부분:
1. 긴급 전화 버튼들 → `tripConfig.sos.emergency`
2. 영사콜센터 → `tripConfig.sos.consulate`
3. 위급 시 가이드 → `tripConfig.sos.emergencySteps`
4. 병원 → `tripConfig.sos.hospitals`
5. 한국 관련 → `tripConfig.sos.koreanContacts`
6. 호텔/항공사 → `tripConfig.sos.hotelAirline`
7. 여권 분실 → `tripConfig.sos.lostPassportSteps`
8. 병원 방문 정보 → `tripConfig.sos.hospitalVisitInfo`

상단에 추가:
```typescript
import { tripConfig } from "@/config/trip";
```

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/components/trip/SosTab.tsx
git commit -m "refactor: SosTab reads from tripConfig"
```

---

### Task 9: 컴포넌트 리팩토링 — ExchangeTab.tsx

**Files:**
- Modify: `src/components/trip/ExchangeTab.tsx`

**Step 1: 하드코딩 데이터를 config import로 교체**

변경할 부분:
1. 통화 라벨 "🇰🇷 한국 원 (KRW)" → config에서 동적 생성
2. 통화 라벨 "🇻🇳 베트남 동 (VND)" → config에서 동적 생성
3. `presets` → `tripConfig.exchange.localPrices`
4. 환율 팁 → `tripConfig.exchange.tip`
5. 단위 표시 ("원", "동") → `tripConfig.exchange.fromUnit`, `toUnit`

상단에 추가:
```typescript
import { tripConfig } from "@/config/trip";
```

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/components/trip/ExchangeTab.tsx
git commit -m "refactor: ExchangeTab reads from tripConfig"
```

---

### Task 10: 컴포넌트 리팩토링 — useWeather.ts + useExchangeRate.ts

**Files:**
- Modify: `src/hooks/useWeather.ts`
- Modify: `src/hooks/useExchangeRate.ts`

**Step 1: useWeather.ts 수정**

하드코딩된 좌표 제거, config 기반으로 변경:

```typescript
import { tripConfig } from "@/config/trip";

// 기존 DANANG, HOIAN 상수 제거
// useWeatherDanang, useWeatherHoian 제거

// 범용 훅으로 변경
export function useWeather(locationIndex = tripConfig.weather.defaultIndex) {
  const loc = tripConfig.weather.locations[locationIndex];
  return useQuery({
    queryKey: ["weather", loc.city],
    queryFn: () => fetchWeather(loc.lat, loc.lon, loc.city),
    staleTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!API_KEY,
  });
}
```

**Step 2: useExchangeRate.ts 수정**

하드코딩된 통화 쌍을 config에서 읽도록:

```typescript
import { tripConfig } from "@/config/trip";

const { from, to, fallbackRate } = tripConfig.exchange;

// URL 동적 생성
const PRIMARY_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.min.json`;
const FALLBACK_URL = `https://latest.currency-api.pages.dev/v1/currencies/${from}.min.json`;

// fetchRate에서 data?.krw?.vnd → data?.[from]?.[to]
```

**Step 3: TodayTab.tsx에서 import 업데이트**

`useWeatherDanang` → `useWeather`로 변경.

**Step 4: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 5: Commit**

```bash
git add src/hooks/useWeather.ts src/hooks/useExchangeRate.ts src/components/trip/TodayTab.tsx
git commit -m "refactor: useWeather and useExchangeRate read from tripConfig"
```

---

### Task 11: 컴포넌트 리팩토링 — TripDashboard.tsx

**Files:**
- Modify: `src/pages/TripDashboard.tsx`

**Step 1: 하드코딩 텍스트를 config에서 읽도록**

변경할 부분:
1. 헤더 텍스트 "서여사 생신기념 여행" → `tripConfig.headerLabel`
2. 헤더 배경 이미지 → `tripConfig.meta.headerImage`
3. 푸터 텍스트 → `tripConfig.footerText`

상단에 추가:
```typescript
import { tripConfig } from "@/config/trip";
```

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/pages/TripDashboard.tsx
git commit -m "refactor: TripDashboard reads from tripConfig"
```

---

### Task 12: 빌드 설정 — vite.config.ts + index.html

**Files:**
- Modify: `vite.config.ts`
- Modify: `index.html`

**Step 1: vite.config.ts에서 trip.meta.json 읽기**

```typescript
import tripMeta from "./src/config/trip.meta.json";
import { createHtmlPlugin } from "vite-plugin-html";

// VitePWA manifest에서 하드코딩 값을 tripMeta로 교체
manifest: {
  lang: "ko",
  name: tripMeta.appName,
  short_name: tripMeta.shortName,
  description: tripMeta.description,
  theme_color: tripMeta.themeColor,
  background_color: tripMeta.backgroundColor,
  // ... icons는 그대로
}

// createHtmlPlugin 추가
createHtmlPlugin({
  inject: {
    data: {
      title: tripMeta.appName,
      description: tripMeta.description,
      themeColor: tripMeta.themeColor,
      shortName: tripMeta.shortName,
    },
  },
}),
```

**Step 2: index.html을 템플릿 변수 사용으로 변경**

```html
<title><%= title %></title>
<meta name="description" content="<%= description %>">
<meta name="theme-color" content="<%= themeColor %>" />
<meta name="apple-mobile-web-app-title" content="<%= shortName %>" />
<meta property="og:title" content="<%= title %>">
<!-- 등등 -->
```

**Step 3: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 4: Commit**

```bash
git add vite.config.ts index.html
git commit -m "refactor: vite config and index.html read from trip.meta.json"
```

---

### Task 13: CLAUDE.md + TRIP-GUIDE.md 작성

**Files:**
- Create: `CLAUDE.md`
- Create: `TRIP-GUIDE.md`

**Step 1: CLAUDE.md 작성**

```markdown
# Trip Boilerplate

여행 앱 보일러플레이트. `src/config/trip.ts`와 `src/config/trip.meta.json`만 수정하면 새 여행 앱 생성.

## 새 여행 config 생성 시

1. `src/config/types.ts`를 먼저 읽어 TripConfig 구조 파악
2. `src/config/trip.ts`의 베트남 예시를 참고하여 새 config 생성
3. `src/config/trip.meta.json`도 함께 갱신 (앱이름, 테마색, CSS 변수)
4. `public/` 폴더의 이미지를 새 여행에 맞게 교체 안내

## 기술 스택

React 18 + TypeScript + Vite 5 + Tailwind CSS + shadcn-ui + Framer Motion + React Leaflet + TanStack Query + PWA

## 주요 명령어

- `npm run dev` — 개발 서버 (port 8080)
- `npm run build` — 프로덕션 빌드
- `npm run preview` — 빌드 미리보기

## 환경 변수

- `VITE_OPENWEATHER_API_KEY` — OpenWeatherMap API 키 (.env 파일에 설정)
```

**Step 2: TRIP-GUIDE.md 작성**

```markdown
# 새 여행 만들기 가이드

## 방법 1: Claude Code 사용 (추천)

"일본 오사카 3박4일 여행으로 config 만들어줘" 한 마디면 끝!

Claude Code가 `src/config/types.ts`를 읽고 정확한 config를 생성합니다.

## 방법 2: 수동 편집

1. `src/config/trip.ts` — 일정, POI, 연락처, 환율 등 수정
2. `src/config/trip.meta.json` — 앱이름, 테마색 수정
3. `public/` — 헤더/배경 이미지 교체
4. `.env` — OpenWeatherMap API 키 설정
5. `npm run dev`로 확인

## config 파일 구조

| 파일 | 역할 |
|------|------|
| `src/config/types.ts` | 타입 정의 (수정 불필요) |
| `src/config/trip.ts` | 여행 데이터 (수정 필요) |
| `src/config/trip.meta.json` | PWA/테마 설정 (수정 필요) |
```

**Step 3: Commit**

```bash
git add CLAUDE.md TRIP-GUIDE.md
git commit -m "docs: add CLAUDE.md and TRIP-GUIDE.md"
```

---

### Task 14: index.css 테마 변수 동적화

**Files:**
- Modify: `src/index.css`

**Step 1: CSS 변수를 런타임에 trip.meta.json에서 주입하도록 변경**

`src/main.tsx`에서 `tripConfig.meta.cssVars`를 `:root`에 동적 적용하는 코드 추가:

```typescript
// main.tsx에 추가
import { tripConfig } from "@/config/trip";

// CSS 변수 주입
const root = document.documentElement;
for (const [key, value] of Object.entries(tripConfig.meta.cssVars)) {
  root.style.setProperty(key, value);
}
```

이렇게 하면 `index.css`의 `:root` 값이 기본값 역할을 하고, config의 값이 오버라이드됨.

**Step 2: 빌드 확인**

Run: `npm run build`
Expected: BUILD SUCCESS

**Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat: inject CSS theme variables from tripConfig at runtime"
```

---

### Task 15: 최종 검증 및 정리

**Step 1: 클린 빌드**

```bash
cd /Users/hong/Code/trip-boilerplate
rm -rf node_modules dist
npm install
npm run build
```

Expected: BUILD SUCCESS

**Step 2: 개발 서버 실행 후 수동 확인**

```bash
npm run dev
```

확인 항목:
- EntryGate 화면 정상 렌더링
- 10계명 표시
- 서명 후 서약서 이미지 생성
- TodayTab 일정 표시
- MapTab 지도 + POI 마커
- ExchangeTab 환율 계산
- SosTab 연락처 표시

**Step 3: 불필요한 파일 정리**

```bash
# lovable-tagger 제거 (boilerplate에 불필요)
npm uninstall lovable-tagger
```

`vite.config.ts`에서 `lovable-tagger` import/사용 제거.

**Step 4: 최종 Commit**

```bash
git add -A
git commit -m "chore: final cleanup for trip-boilerplate"
```
