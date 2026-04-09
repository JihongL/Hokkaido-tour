import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
import { useWeatherShikotsu } from "@/hooks/useWeather";
import { restaurants, mealRecommendations } from "@/data/restaurants";

const TRIP_START = new Date("2026-05-03T00:00:00+09:00");
const TRIP_END = new Date("2026-05-06T23:59:59+09:00");

type TripPhase = "before" | "during" | "after";

interface ScheduleItem {
  time: string;
  activity: string;
  detail?: string;
  type: "flight" | "move" | "food" | "stay" | "activity" | "placeholder";
}

interface RouteStop {
  name: string;
  emoji: string;
  lat: number;
  lng: number;
}

interface DayOption {
  id: string;
  emoji: string;
  label: string;
  subtitle: string;
  location: string;
  schedule: ScheduleItem[];
  meals: string[];
  parentTip: string;
  preparation: string[];
  stops?: RouteStop[];
}

interface DayData {
  day: number;
  date: string;
  weekday: string;
  title: string;
  location: string;
  schedule: ScheduleItem[];
  meals: string[];
  parentTip: string;
  preparation: string[];
  options?: DayOption[];
}

const days: DayData[] = [
  {
    day: 1, date: "5월 3일", weekday: "일", title: "신치토세 도착 & 노보리베츠",
    location: "노보리베츠",
    schedule: [
      { time: "10:35", activity: "인천 출발 (KE765)", type: "flight" },
      { time: "13:25", activity: "신치토세공항 도착", detail: "입국심사·세관", type: "flight" },
      { time: "14:30", activity: "렌터카 픽업", detail: "혼다렌탈리스 라벤더점 · 예약 확인서 지참", type: "move" },
      { time: "17:00", activity: "미야비테이 체크인", detail: "노보리베츠 온천 호텔 · 5실 화양실", type: "stay" },
      { time: "17:30", activity: "지옥계곡 & 오유누마 족욕", detail: "지옥계곡 산책 후 천연 족욕탕 · 무료", type: "activity" },
      { time: "19:00", activity: "석식", detail: "호텔 뷔페", type: "food" },
      { time: "21:00", activity: "온천", detail: "미야비테이 온천", type: "activity" },
    ],
    meals: ["점심: 기내식 또는 공항에서 간단히", "저녁: 미야비테이 호텔 뷔페"],
    parentTip: "드디어 홋카이도! 렌터카 타고 노보리베츠로. 지옥계곡 산책 후 오유누마 천연 족욕, 저녁은 호텔 뷔페!",
    preparation: ["여권", "렌터카 예약서", "국제운전면허증", "편한 신발"],
  },
  {
    day: 2, date: "5월 4일", weekday: "월", title: "곰목장 & 소베쓰 & 도야호",
    location: "노보리베츠 → 소베쓰 → 도야호",
    schedule: [
      { time: "08:00", activity: "조식", detail: "호텔 뷔페", type: "food" },
      { time: "09:00", activity: "곰목장", detail: "노보리베츠 곰목장 · 로프웨이 탑승", type: "activity" },
      { time: "10:00", activity: "미야비테이 체크아웃", type: "stay" },
      { time: "10:30", activity: "소베쓰로 이동", detail: "노보리베츠 → 소베쓰 · 차로 약 40분", type: "move" },
      { time: "11:15", activity: "소베쓰 공원", detail: "매화 만개! 도야호 조망 · 무료", type: "activity" },
      { time: "12:00", activity: "점심", detail: "미정", type: "placeholder" },
      { time: "13:30", activity: "우스산 로프웨이", detail: "활화산 전망대 + 쇼와신잔 조망", type: "activity" },
      { time: "15:00", activity: "토야 코한 테이 체크인", detail: "도야호 온천 호텔 (2박) · 호수뷰 화양실", type: "stay" },
      { time: "16:00", activity: "호숫가 산책", detail: "도류노유 족욕 · 조각공원 · 무료", type: "activity" },
      { time: "19:00", activity: "석식", detail: "호텔 뷔페", type: "food" },
      { time: "20:30", activity: "온천", detail: "토야 코한 테이 온천", type: "activity" },
      { time: "20:45", activity: "도야호 불꽃놀이", detail: "호반에서 관람 · 20:45~21:05", type: "activity" },
    ],
    meals: ["조식: 호텔 뷔페", "점심: 미정", "저녁: 토야 코한 테이 호텔 뷔페"],
    parentTip: "곰목장 후 소베쓰 매화 감상, 우스산 로프웨이! 체크인 후 호숫가 족욕, 밤에는 불꽃놀이!",
    preparation: ["온천 타올", "카메라", "편한 신발"],
  },
  {
    day: 3, date: "5월 5일", weekday: "화", title: "일정 미정 (3개 옵션)",
    location: "도야호",
    schedule: [],
    meals: [],
    parentTip: "",
    preparation: [],
    options: [
      {
        id: "toya-relax",
        emoji: "🛶",
        label: "여유로운 도야호",
        subtitle: "호수 유람 · 젤라토 · 족욕",
        location: "도야호",
        stops: [
          { name: "토야 코한 테이", emoji: "🏨", lat: 42.5659, lng: 140.8259 },
          { name: "사이로 전망대", emoji: "🏔️", lat: 42.6040, lng: 140.7980 },
          { name: "레이크힐 농장", emoji: "🍦", lat: 42.6155, lng: 140.7865 },
          { name: "유람선", emoji: "🚢", lat: 42.5730, lng: 140.8430 },
        ],
        schedule: [
          { time: "08:00", activity: "조식", detail: "호텔 뷔페", type: "food" },
          { time: "09:30", activity: "사이로 전망대", detail: "도야호+우스산+요테이산 파노라마 · 무료 · 차 10분", type: "activity" },
          { time: "10:30", activity: "레이크힐 농장", detail: "목장 젤라토 · 요테이산 뷰 · 무료 · 차 5분", type: "activity" },
          { time: "11:30", activity: "도야호 유람선", detail: "나카시마 순환 50분 · 성인 1,800엔", type: "activity" },
          { time: "12:30", activity: "점심", detail: "코노젠샤 나카무라 (예약 확정)", type: "food" },
          { time: "14:00", activity: "호숫가 산책", detail: "도류노유 족욕 · 조각공원 · 무료", type: "activity" },
          { time: "15:30", activity: "호텔 휴식 & 온천", detail: "토야 코한 테이 대욕장", type: "activity" },
          { time: "18:00", activity: "석식", detail: "호텔 뷔페", type: "food" },
          { time: "20:45", activity: "도야호 불꽃놀이", detail: "호숫가에서 관람 · 20:45~21:05", type: "activity" },
        ],
        meals: ["조식: 호텔 뷔페", "점심: 코노젠샤 나카무라 (예약 확정)", "저녁: 토야 코한 테이 호텔 뷔페"],
        parentTip: "전망대, 목장 젤라토, 유람선! 오후는 여유롭게 호숫가 족욕과 산책, 온천.",
        preparation: ["편한 옷", "카메라", "모자/선크림"],
      },
      {
        id: "yotei",
        emoji: "🗻",
        label: "미니후지 요테이산",
        subtitle: "니세코 드라이브 · 양갱마을 · 요테이뷰",
        location: "도야호 → 니세코",
        stops: [
          { name: "토야 코한 테이", emoji: "🏨", lat: 42.5659, lng: 140.8259 },
          { name: "사이로 전망대", emoji: "🏔️", lat: 42.6040, lng: 140.7980 },
          { name: "후키다시 공원", emoji: "💧", lat: 42.7640, lng: 140.5780 },
          { name: "레이크힐 농장", emoji: "🍦", lat: 42.6155, lng: 140.7865 },
        ],
        schedule: [
          { time: "08:00", activity: "조식", detail: "호텔 뷔페", type: "food" },
          { time: "09:00", activity: "사이로 전망대", detail: "도야호+요테이산 파노라마 · 무료 · 차 10분", type: "activity" },
          { time: "10:00", activity: "요테이산 방면 드라이브", detail: "도야호~니세코 루트 · 약 40분", type: "move" },
          { time: "10:40", activity: "마코마나이/후키다시 공원", detail: "요테이산 용천수 · 무료 · 미니후지 포토스팟", type: "activity" },
          { time: "12:00", activity: "점심", detail: "니세코/마코마나이 지역 식당", type: "food" },
          { time: "13:30", activity: "레이크힐 농장", detail: "목장 젤라토 · 요테이산 뷰 · 무료", type: "activity" },
          { time: "14:30", activity: "호텔 복귀", detail: "차 20분", type: "move" },
          { time: "15:00", activity: "호텔 휴식 & 온천", detail: "토야 코한 테이 대욕장", type: "activity" },
          { time: "18:00", activity: "석식", detail: "호텔 뷔페", type: "food" },
          { time: "20:45", activity: "도야호 불꽃놀이", detail: "호숫가에서 관람 · 20:45~21:05", type: "activity" },
        ],
        meals: ["조식: 호텔 뷔페", "점심: 니세코 지역 식당", "저녁: 토야 코한 테이 호텔 뷔페"],
        parentTip: "홋카이도의 후지산! 요테이산 용천수 공원에서 인생샷, 니세코 드라이브 후 젤라토.",
        preparation: ["편한 옷", "카메라", "모자/선크림"],
      },
      {
        id: "muroran",
        emoji: "🌊",
        label: "태평양뷰 무로란",
        subtitle: "지구곶 절경 · 무로란야키토리",
        location: "도야호 → 무로란",
        stops: [
          { name: "토야 코한 테이", emoji: "🏨", lat: 42.5659, lng: 140.8259 },
          { name: "지구곶", emoji: "🌏", lat: 42.2970, lng: 140.9750 },
          { name: "토키카라모이", emoji: "🪨", lat: 42.3110, lng: 140.9640 },
          { name: "미타라 무로란", emoji: "🛒", lat: 42.3370, lng: 140.9490 },
        ],
        schedule: [
          { time: "08:00", activity: "조식", detail: "호텔 뷔페", type: "food" },
          { time: "09:00", activity: "무로란 방면 출발", detail: "도야호~무로란 약 1시간", type: "move" },
          { time: "10:00", activity: "지구곶 전망대", detail: "태평양 수평선 270도 파노라마 · 무료 · 지구가 둥글다!", type: "activity" },
          { time: "11:00", activity: "토키카라모이 해안", detail: "기암절벽 산책로 · 무료 · 차 5분", type: "activity" },
          { time: "12:00", activity: "점심", detail: "무로란 야키토리/카레라멘", type: "food" },
          { time: "13:30", activity: "미타라 무로란 (도로 휴게소)", detail: "백조대교 조망 · 기념품 · 차 10분", type: "activity" },
          { time: "14:30", activity: "호텔 복귀", detail: "무로란~도야호 약 1시간", type: "move" },
          { time: "15:30", activity: "호텔 휴식 & 온천", detail: "토야 코한 테이 대욕장", type: "activity" },
          { time: "18:00", activity: "석식", detail: "호텔 뷔페", type: "food" },
          { time: "20:45", activity: "도야호 불꽃놀이", detail: "호숫가에서 관람 · 20:45~21:05", type: "activity" },
        ],
        meals: ["조식: 호텔 뷔페", "점심: 무로란 야키토리/카레라멘", "저녁: 토야 코한 테이 호텔 뷔페"],
        parentTip: "지구가 둥글다는 걸 눈으로! 지구곶 절경 후 무로란 명물 돼지꼬치 야키토리 점심.",
        preparation: ["편한 신발", "카메라", "바람막이 (해안 바람)"],
      },
    ],
  },
  {
    day: 4, date: "5월 6일", weekday: "수", title: "시코쓰호 & 귀국",
    location: "시코쓰호 → 신치토세",
    schedule: [
      { time: "08:00", activity: "조식", detail: "호텔", type: "food" },
      { time: "09:30", activity: "시코쓰호", detail: "일본에서 가장 맑은 호수", type: "activity" },
      { time: "12:00", activity: "점심?", detail: "미확정 — 추후 업데이트 예정", type: "placeholder" },
      { time: "14:00", activity: "공항 이동 & 렌터카 반납", detail: "혼다렌탈리스 라벤더점", type: "move" },
      { time: "16:20", activity: "신치토세 출발 (KE770)", type: "flight" },
      { time: "19:30", activity: "인천 도착", type: "flight" },
    ],
    meals: ["조식: 호텔 뷔페", "점심: 미정", "저녁: 기내식"],
    parentTip: "마지막 날! 시코쓰호 들르고 공항으로. 기념품 쇼핑 시간 확보, 로이스 초콜릿 추천!",
    preparation: ["여권", "기념품 정리", "면세품 수령"],
  },
];

const dayRoutes = [
  {
    day: 1, color: "#9B7EC8",
    stops: [
      { name: "신치토세공항", emoji: "✈️", lat: 42.7752, lng: 141.6925 },
      { name: "미야비테이", emoji: "🏨", lat: 42.4957, lng: 141.1412 },
      { name: "지옥계곡", emoji: "🌋", lat: 42.4933, lng: 141.1573 },
    ],
  },
  {
    day: 2, color: "#7C5BAF",
    stops: [
      { name: "곰목장", emoji: "🐻", lat: 42.4850, lng: 141.1610 },
      { name: "미야비테이", emoji: "🚗", lat: 42.4957, lng: 141.1412 },
      { name: "소베쓰 공원", emoji: "🌸", lat: 42.5290, lng: 140.8680 },
      { name: "우스산", emoji: "🚡", lat: 42.5390, lng: 140.8603 },
      { name: "토야 코한 테이", emoji: "🏨", lat: 42.5659, lng: 140.8259 },
    ],
  },
  {
    day: 3, color: "#6B8EC4",
    stops: [
      { name: "토야 코한 테이", emoji: "🏨", lat: 42.5659, lng: 140.8259 },
      { name: "사이로 전망대", emoji: "🏔️", lat: 42.6040, lng: 140.7980 },
      { name: "레이크힐 농장", emoji: "🍦", lat: 42.6155, lng: 140.7865 },
      { name: "유람선", emoji: "🚢", lat: 42.5730, lng: 140.8430 },
    ],
  },
  {
    day: 4, color: "#A0C4B8",
    stops: [
      { name: "토야 코한 테이", emoji: "🚗", lat: 42.5659, lng: 140.8259 },
      { name: "시코쓰호", emoji: "🏞️", lat: 42.7570, lng: 141.3490 },
      { name: "신치토세공항", emoji: "✈️", lat: 42.7752, lng: 141.6925 },
    ],
  },
];

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function createEmojiIcon(emoji: string) {
  return L.divIcon({
    html: `<div style="font-size:16px;text-align:center;line-height:32px;width:32px;height:32px;background:white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.2);border:2px solid hsl(270,50%,55%);">${escapeHtml(emoji)}</div>`,
    className: "emoji-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

const DayRouteMap = ({ dayNumber, overrideStops }: { dayNumber: number; overrideStops?: RouteStop[] }) => {
  const route = dayRoutes.find(r => r.day === dayNumber);
  const stops = overrideStops ?? route?.stops;
  const color = route?.color ?? "#6B8EC4";
  if (!stops || stops.length === 0) return null;

  const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng] as [number, number]));

  return (
    <div className="relative z-0 rounded-2xl overflow-hidden border border-border shadow-sm" style={{ height: 200 }}>
      <MapContainer
        key={stops.map(s => s.name).join(",")}
        bounds={bounds}
        boundsOptions={{ padding: [25, 25] }}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stops.map((stop, i) => (
          <Marker
            key={i}
            position={[stop.lat, stop.lng]}
            icon={createEmojiIcon(stop.emoji)}
          />
        ))}
        <Polyline
          positions={stops.map(s => [s.lat, s.lng] as [number, number])}
          pathOptions={{ color, weight: 3, opacity: 0.8, dashArray: "6 4" }}
        />
      </MapContainer>
    </div>
  );
};

const typeConfig: Record<string, { icon: string; color: string }> = {
  flight: { icon: "✈️", color: "hsl(210, 70%, 50%)" },
  move: { icon: "🚗", color: "hsl(280, 50%, 50%)" },
  food: { icon: "🍽️", color: "hsl(20, 85%, 55%)" },
  stay: { icon: "🏨", color: "hsl(170, 40%, 45%)" },
  activity: { icon: "🎯", color: "hsl(45, 90%, 50%)" },
  placeholder: { icon: "❓", color: "hsl(0, 0%, 65%)" },
};

const locationBadge: Record<string, string> = {
  "시코쓰호": "bg-purple-100 text-purple-800 border-purple-200",
  "노보리베츠": "bg-rose-100 text-rose-800 border-rose-200",
  "노보리베츠 → 소베쓰 → 도야호": "bg-violet-100 text-violet-800 border-violet-200",
  "도야호": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "도야호 → 니세코": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "도야호 → 무로란": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "시코쓰호 → 신치토세": "bg-sky-100 text-sky-800 border-sky-200",
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const TodayTab = () => {
  const { now, daysLeft, phase, todayDayIndex } = useMemo(() => {
    const n = new Date();
    const diff = TRIP_START.getTime() - n.getTime();
    const dl = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    const p: TripPhase = n < TRIP_START ? "before" : n > TRIP_END ? "after" : "during";
    let idx = 0;
    if (p === "during") {
      const tripDay = Math.floor((n.getTime() - TRIP_START.getTime()) / (1000 * 60 * 60 * 24));
      idx = Math.min(Math.max(0, tripDay), days.length - 1);
    }
    return { now: n, daysLeft: dl, phase: p, todayDayIndex: idx };
  }, []);

  const [selectedDay, setSelectedDay] = useState(phase === "before" ? -1 : todayDayIndex);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const day = selectedDay >= 0 ? days[selectedDay] : null;

  // Resolve effective day data: if day has options, use the selected option's fields
  const activeOption = day?.options?.find(o => o.id === selectedOptionId) ?? day?.options?.[0] ?? null;
  const effectiveDay = day && day.options && activeOption
    ? { ...day, title: activeOption.label, location: activeOption.location, schedule: activeOption.schedule, meals: activeOption.meals, parentTip: activeOption.parentTip, preparation: activeOption.preparation }
    : day;

  const { data: weather } = useWeatherShikotsu();

  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("hokkaido-trip-checklist");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleChecklistChange = (item: string, checked: boolean) => {
    const next = { ...checklist, [item]: checked };
    setChecklist(next);
    localStorage.setItem("hokkaido-trip-checklist", JSON.stringify(next));
  };

  // Determine if a day index is "today" (during trip)
  const isToday = (idx: number) => phase === "during" && idx === todayDayIndex;

  // All selectable tabs: -1 = 출발 전, 0-3 = Day 1-4
  const allTabs = [
    { id: -1, label: "준비", sublabel: "출발 전", accent: "hsl(170, 40%, 45%)" },
    ...days.map((d, i) => ({
      id: i,
      label: isToday(i) ? "오늘" : d.weekday,
      sublabel: d.date.replace(/^\d+월\s*/, ""),
      accent: i <= 1 ? "hsl(270, 50%, 55%)" : "hsl(200, 40%, 50%)",
    })),
  ];

  return (
    <div className="space-y-5">
      {/* ── Hero ── */}
      <AnimatePresence mode="wait">
        {phase === "before" && selectedDay === -1 && (
          <motion.div
            key="hero-before"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(135deg, hsl(270, 50%, 55%) 0%, hsl(280, 45%, 65%) 50%, hsl(200, 40%, 50%) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            <div className="relative px-6 py-7 text-white text-center">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium tracking-widest uppercase opacity-80"
              >
                Hokkaido · Drive Tour
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
                className="my-3"
              >
                <span className="text-6xl font-black tabular-nums">{daysLeft}</span>
                <span className="text-xl font-bold ml-1 opacity-90">일</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.5 }}
                className="text-base font-medium"
              >
                출발까지 남았어요
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6 }}
                className="text-sm mt-1"
              >
                2026.05.03 ~ 05.06 · 3박 4일
              </motion.p>
            </div>
          </motion.div>
        )}

        {phase === "during" && day && (
          <motion.div
            key={`hero-during-${selectedDay}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(135deg, hsl(270, 50%, 55%) 0%, hsl(280, 45%, 65%) 100%)",
            }}
          >
            <div className="relative px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80 tracking-wide">
                    Day {effectiveDay.day} · {effectiveDay.location}
                  </p>
                  <h2 className="text-xl font-bold mt-1">{effectiveDay.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl">{weather?.current.icon || "☀️"}</p>
                  <p className="text-lg font-bold">{weather?.current.temp || 28}°C</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "after" && (
          <motion.div
            key="hero-after"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl text-center py-8 px-6"
            style={{
              background: "linear-gradient(135deg, hsl(270, 50%, 55%) 0%, hsl(280, 45%, 65%) 100%)",
            }}
          >
            <p className="text-4xl mb-2">🎉</p>
            <h2 className="text-xl font-bold text-white">즐거운 여행이었어요!</h2>
            <p className="text-white/80 text-sm mt-1">홋카이도 우리 여행 완료</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weather inline */}
      {phase === "before" && weather && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 border border-border shadow-sm"
        >
          <span className="text-2xl">{weather.current.icon || "🌤️"}</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">홋카이도 현재 날씨</p>
            <p className="text-xs text-muted-foreground">{weather.current.description}</p>
          </div>
          <p className="text-lg font-bold text-primary">{weather.current.temp}°C</p>
        </motion.div>
      )}

      {/* ── Day Selector ── */}
      <div className="flex gap-2">
        {allTabs.map((tab) => {
          const isActive = selectedDay === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedDay(tab.id)}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="relative rounded-2xl text-center overflow-hidden"
              style={{
                flex: isActive ? 1.8 : 1,
                minWidth: 0,
              }}
            >
              <motion.div
                layout
                className="flex flex-col items-center justify-center"
                style={{
                  height: 56,
                  padding: "0 4px",
                  background: isActive
                    ? tab.accent
                    : "hsl(var(--card))",
                  borderRadius: "1rem",
                  border: isActive ? "none" : "1px solid hsl(var(--border))",
                  boxShadow: isActive ? "0 4px 16px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <motion.p
                  layout="position"
                  className="font-bold leading-tight"
                  style={{
                    fontSize: isActive ? "1.05rem" : "0.9rem",
                    color: isActive ? "white" : "hsl(var(--foreground))",
                  }}
                >
                  {tab.sublabel}
                </motion.p>
                <motion.p
                  layout="position"
                  className="text-xs font-medium leading-tight mt-0.5"
                  style={{
                    color: isActive ? "rgba(255,255,255,0.8)" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {tab.label}
                </motion.p>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {/* ── 출발 전 ── */}
        {selectedDay === -1 && (
          <motion.div
            key="prep"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            {/* 준비 체크리스트 */}
            <motion.div variants={contentVariants} custom={0} className="card-base">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-foreground">준비 체크리스트</h4>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary tabular-nums">
                  {Object.values(checklist).filter(Boolean).length} / 9
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-secondary rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "hsl(var(--primary))" }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(Object.values(checklist).filter(Boolean).length / 9) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="space-y-1">
                {["여권 (유효기간 6개월 이상)", "항공권 정보 저장", "환전 (일본 엔)", "유심/eSIM 준비", "여행자 보험 가입", "호텔 예약 확인서", "국제운전면허증", "상비약 챙기기", "온천 타올"].map((item, i) => {
                  const checked = !!checklist[item];
                  return (
                    <motion.label
                      key={i}
                      variants={contentVariants}
                      custom={i * 0.3}
                      className="flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-xl min-h-[48px] transition-colors"
                      style={{
                        background: checked ? "hsl(var(--secondary) / 0.5)" : "transparent",
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          borderColor: checked ? "hsl(var(--primary))" : "hsl(var(--border))",
                          background: checked ? "hsl(var(--primary))" : "transparent",
                        }}
                      >
                        {checked && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            width="14" height="14" viewBox="0 0 14 14" fill="none"
                          >
                            <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) => handleChecklistChange(item, e.target.checked)}
                      />
                      <span
                        className="text-base transition-all"
                        style={{
                          color: checked ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
                          textDecoration: checked ? "line-through" : "none",
                        }}
                      >
                        {item}
                      </span>
                    </motion.label>
                  );
                })}
              </div>
            </motion.div>

            {/* 옷차림 & 캐리어 */}
            <motion.div variants={contentVariants} custom={0.8} className="card-base">
              <h4 className="text-lg font-bold text-foreground mb-4">옷차림 & 캐리어</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-primary mb-1.5">👕 옷차림</p>
                  <ul className="space-y-1.5 text-base text-foreground">
                    <li>· 낮: 긴팔/얇은 겉옷 (평균 10~15°C)</li>
                    <li>· 저녁: 패딩 또는 두꺼운 겉옷 (5°C 이하)</li>
                    <li>· 비 올 수 있으니 우산 또는 우비</li>
                    <li>· 온천용 수건/목욕 가운 (료칸 제공)</li>
                    <li>· 편한 운동화 + 슬리퍼</li>
                  </ul>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-sm font-bold text-primary mb-1.5">🧳 캐리어</p>
                  <ul className="space-y-1.5 text-base text-foreground">
                    <li>· 위탁 수하물: 23kg × 1개 (대한항공)</li>
                    <li>· 기내 반입: 12kg 이내, 55×40×20cm</li>
                    <li>· 3박이라 24인치면 충분</li>
                    <li>· 기념품 공간 여유 두기</li>
                    <li>· 보조배터리는 기내 반입만 가능</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 일별 준비물 */}
            <motion.div variants={contentVariants} custom={1.5} className="card-base">
              <h4 className="text-lg font-bold text-foreground mb-4">일별 준비물</h4>
              <div className="space-y-4">
                {days.map((d) => (
                  <div key={d.day}>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-md border"
                        style={{
                          borderColor: "hsl(270, 50%, 70%)",
                          background: "hsl(270, 50%, 95%)",
                          color: "hsl(270, 50%, 35%)",
                        }}
                      >
                        Day {d.day}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{d.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-1">
                      {d.preparation.map((p, i) => (
                        <span
                          key={i}
                          className="text-sm bg-secondary/70 text-foreground px-3 py-1 rounded-full"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 숙소 */}
            <motion.div variants={contentVariants} custom={2.5} className="space-y-3">
              {/* 파크 호텔 미야비테이 */}
              <div className="card-base">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(270, 50%, 92%)" }}
                  >
                    <span className="text-xl">🏨</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-foreground">파크 호텔 미야비테이</p>
                    <p className="text-sm text-muted-foreground">Noboribetsu, Hokkaido</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${locationBadge["노보리베츠"]}`}>
                    노보리베츠
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl p-3 text-center" style={{ background: "hsl(var(--secondary) / 0.5)" }}>
                    <p className="text-xs text-muted-foreground mb-0.5">체크인</p>
                    <p className="text-sm font-bold text-primary">5/3 (일) 17:00</p>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: "hsl(var(--secondary) / 0.5)" }}>
                    <p className="text-xs text-muted-foreground mb-0.5">체크아웃</p>
                    <p className="text-sm font-bold text-foreground">5/4 (월) 10:00</p>
                  </div>
                </div>
              </div>

              {/* 토야 코한 테이 */}
              <div className="card-base">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(270, 40%, 93%)" }}
                  >
                    <span className="text-xl">🏨</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-foreground">토야 코한 테이</p>
                    <p className="text-sm text-muted-foreground">도야호 온천, Toyako</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${locationBadge["도야호"]}`}>
                    도야호
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl p-3 text-center" style={{ background: "hsl(var(--secondary) / 0.5)" }}>
                    <p className="text-xs text-muted-foreground mb-0.5">체크인</p>
                    <p className="text-sm font-bold text-primary">5/4 (월) 15:00</p>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: "hsl(var(--secondary) / 0.5)" }}>
                    <p className="text-xs text-muted-foreground mb-0.5">체크아웃</p>
                    <p className="text-sm font-bold text-foreground">5/6 (수) 10:00</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Day 1~4 ── */}
        {effectiveDay && (
          <motion.div
            key={`day-${selectedDay}-${selectedOptionId}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            {/* Hotel card — during trip */}
            {phase === "during" && (
              <>
                {effectiveDay.day === 1 && (
                  <motion.div variants={contentVariants} custom={0} className="card-base flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(270, 50%, 92%)" }}>
                      <span className="text-xl">🏨</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-foreground">파크 호텔 미야비테이</p>
                      <p className="text-sm text-muted-foreground">Noboribetsu, Hokkaido</p>
                    </div>
                  </motion.div>
                )}
                {effectiveDay.day === 2 && (
                  <motion.div variants={contentVariants} custom={0} className="space-y-2">
                    <div className="card-base flex items-center gap-3 opacity-50">
                      <span className="text-xl">🏨</span>
                      <div>
                        <p className="text-sm text-muted-foreground line-through">파크 호텔 미야비테이</p>
                        <p className="text-xs text-muted-foreground">10:00 체크아웃 완료</p>
                      </div>
                    </div>
                    <div className="card-base flex items-center gap-3" style={{ boxShadow: "0 0 0 2px hsl(var(--primary) / 0.25)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(270, 40%, 93%)" }}>
                        <span className="text-xl">🏨</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-foreground">토야 코한 테이</p>
                        <p className="text-sm text-muted-foreground">도야호 온천, Toyako</p>
                        <p className="text-xs text-primary font-semibold mt-1">15:00 체크인</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {effectiveDay.day >= 3 && (
                  <motion.div variants={contentVariants} custom={0} className="card-base flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(270, 40%, 93%)" }}>
                      <span className="text-xl">🏨</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-foreground">토야 코한 테이</p>
                      <p className="text-sm text-muted-foreground">도야호 온천, Toyako</p>
                      {effectiveDay.day === 4 && <p className="text-xs font-semibold mt-1" style={{ color: "hsl(var(--destructive))" }}>10:00 체크아웃 · 짐 정리 잊지 마세요!</p>}
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Flight info */}
            {(selectedDay === 0 || selectedDay === 3) && (
              <motion.div
                variants={contentVariants}
                custom={0.5}
                className="relative overflow-hidden rounded-2xl border-2"
                style={{
                  borderColor: "hsl(var(--primary) / 0.2)",
                  background: "hsl(var(--card))",
                }}
              >
                {/* Ticket-style top strip */}
                <div
                  className="px-5 py-2.5 flex items-center justify-between"
                  style={{
                    background: selectedDay === 0
                      ? "linear-gradient(135deg, hsl(270, 50%, 55%), hsl(280, 45%, 65%))"
                      : "linear-gradient(135deg, hsl(270, 50%, 55%), hsl(280, 45%, 65%))",
                  }}
                >
                  <span className="text-sm font-bold text-white">
                    {selectedDay === 0 ? "가는편" : "오는편"}
                  </span>
                  <span className="text-sm text-white/80">
                    대한항공 {selectedDay === 0 ? "KE765" : "KE770"}
                  </span>
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{selectedDay === 0 ? "ICN" : "CTS"}</p>
                      <p className="text-sm text-muted-foreground">{selectedDay === 0 ? "인천" : "신치토세"}</p>
                      <p className="text-base font-bold text-primary mt-1">{selectedDay === 0 ? "10:35" : "16:20"}</p>
                    </div>
                    <div className="flex-1 mx-4 flex flex-col items-center">
                      <p className="text-xs text-muted-foreground mb-2">{selectedDay === 0 ? "2시간 50분" : "3시간 10분"}</p>
                      <div className="w-full h-px bg-border relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                          animate={{ left: ["30%", "70%", "30%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <span className="text-sm">✈️</span>
                        </motion.div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{selectedDay === 0 ? "CTS" : "ICN"}</p>
                      <p className="text-sm text-muted-foreground">{selectedDay === 0 ? "신치토세" : "인천"}</p>
                      <p className="text-base font-bold text-primary mt-1">{selectedDay === 0 ? "13:25" : "19:30"}</p>
                    </div>
                  </div>
                </div>
                {selectedDay === 0 && (
                  <div className="mx-5 mb-4 bg-purple-50 border border-purple-200 rounded-xl p-3">
                    <p className="text-sm font-bold text-purple-800">렌터카 픽업 14:30</p>
                    <p className="text-xs text-purple-700 mt-0.5">혼다렌탈리스 신치토세공항 라벤더점</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Day 3 option selector */}
            {day?.options && (
              <motion.div variants={contentVariants} custom={0.6} className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase px-1">일정 옵션 선택</p>
                <div className="grid gap-2">
                  {day.options.map((opt) => {
                    const isActive = (selectedOptionId ?? day.options![0].id) === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        onClick={() => setSelectedOptionId(opt.id)}
                        whileTap={{ scale: 0.98 }}
                        className="text-left rounded-2xl p-3.5 transition-all"
                        style={{
                          background: isActive ? "hsl(var(--primary) / 0.08)" : "hsl(var(--card))",
                          border: isActive ? "2px solid hsl(var(--primary))" : "1.5px solid hsl(var(--border))",
                          boxShadow: isActive ? "0 2px 12px hsl(var(--primary) / 0.12)" : "none",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opt.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-foreground">{opt.label}</p>
                            <p className="text-sm text-muted-foreground">{opt.subtitle}</p>
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "hsl(var(--primary))" }}
                            >
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Day route map */}
            <motion.div variants={contentVariants} custom={0.8}>
              <DayRouteMap dayNumber={effectiveDay.day} overrideStops={activeOption?.stops} />
            </motion.div>

            {/* Parent tip */}
            <motion.div
              variants={contentVariants}
              custom={1}
              className="rounded-2xl p-4 border"
              style={{
                background: "hsl(var(--primary) / 0.06)",
                borderColor: "hsl(var(--primary) / 0.18)",
              }}
            >
              <p className="text-base font-bold text-primary mb-1">오늘의 꿀팁 🍯</p>
              <p className="text-base text-foreground leading-relaxed">{effectiveDay.parentTip}</p>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={contentVariants} custom={1.5} className="card-base">
              <div className="flex items-center gap-2 mb-5">
                <h4 className="text-lg font-bold text-foreground">{effectiveDay.date} ({effectiveDay.weekday})</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${locationBadge[effectiveDay.location] || ""}`}>
                  {effectiveDay.location}
                </span>
              </div>
              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-[1.75rem] top-3 bottom-3 w-px"
                  style={{ background: "hsl(var(--border))" }}
                />
                <div className="space-y-1">
                  {effectiveDay.schedule.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={contentVariants}
                      custom={2 + i * 0.15}
                      className="flex gap-3 items-start relative py-2"
                    >
                      <div className="flex flex-col items-center flex-shrink-0 w-14 z-10">
                        <span className="text-xs font-bold text-primary tabular-nums">{item.time}</span>
                        <div
                          className="w-3 h-3 rounded-full mt-1 border-2"
                          style={{
                            borderColor: typeConfig[item.type]?.color || "hsl(var(--primary))",
                            background: "hsl(var(--card))",
                          }}
                        />
                      </div>
                      <div
                        className="flex-1 min-w-0 rounded-xl p-3 transition-colors"
                        style={item.type === "placeholder" ? {
                          background: "hsl(var(--secondary) / 0.2)",
                          border: "1.5px dashed hsl(var(--border))",
                          opacity: 0.7,
                        } : { background: "hsl(var(--secondary) / 0.4)" }}
                      >
                        <p className="text-base font-semibold text-foreground">
                          {typeConfig[item.type]?.icon} {item.activity}
                        </p>
                        {item.detail && (
                          <p className="text-sm text-muted-foreground mt-0.5">{item.detail}</p>
                        )}
                        {/* 외식 끼니에 맛집 추천 */}
                        {item.type === "food" && (() => {
                          const mealKey = item.activity.includes("점심")
                            ? `day${effectiveDay.day}-lunch`
                            : item.activity.includes("석식") && !item.detail?.includes("호텔")
                              ? `day${effectiveDay.day}-dinner`
                              : null;
                          const recs = mealKey ? (mealRecommendations[mealKey] || []) : [];
                          const recList = recs.map(id => restaurants.find(r => r.id === id)).filter(Boolean);
                          if (recList.length === 0) return null;
                          return (
                            <div className="mt-2 space-y-1.5">
                              {recList.map(r => r && (
                                <a
                                  key={r.id}
                                  href={r.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.nameJa + " " + r.address)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-2.5 py-2 active:scale-[0.98] transition-transform"
                                >
                                  <span className="text-base">🍽️</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-bold text-foreground truncate">{r.nameKr}</span>
                                      <span className="text-xs font-bold text-orange-600 bg-orange-100 px-1 py-0.5 rounded flex-shrink-0">★{r.rating}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{r.representativeMenu}</p>
                                  </div>
                                  <span className="text-sm text-orange-500 flex-shrink-0">📍</span>
                                </a>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Meals */}
            <motion.div
              variants={contentVariants}
              custom={3}
              className="rounded-2xl p-4 border"
              style={{
                background: "hsl(20, 85%, 97%)",
                borderColor: "hsl(20, 60%, 88%)",
              }}
            >
              <p className="text-sm font-bold mb-2" style={{ color: "hsl(20, 85%, 45%)" }}>식사 안내</p>
              {effectiveDay.meals.map((m, i) => {
                const mealKey = m.includes("점심")
                  ? `day${effectiveDay.day}-lunch`
                  : m.includes("저녁") && !m.includes("호텔") && !m.includes("기내")
                    ? `day${effectiveDay.day}-dinner`
                    : null;
                const recs = mealKey ? (mealRecommendations[mealKey] || []) : [];
                const recList = recs.map(id => restaurants.find(r => r.id === id)).filter(Boolean);

                return (
                  <div key={i} className="mb-2 last:mb-0">
                    <p className="text-sm text-foreground leading-relaxed">{m}</p>
                    {recList.length > 0 && (
                      <div className="mt-1.5 space-y-1.5">
                        {recList.map(r => r && (
                          <a
                            key={r.id}
                            href={r.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.nameJa + " " + r.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 active:scale-[0.98] transition-transform"
                          >
                            <span className="text-lg">🍽️</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base font-bold text-foreground truncate">{r.nameKr}</span>
                                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded flex-shrink-0">★{r.rating}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{r.representativeMenu}</p>
                            </div>
                            <span className="text-sm text-orange-500 flex-shrink-0">📍</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodayTab;
