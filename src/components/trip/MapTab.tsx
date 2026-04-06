import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getSelectedRestaurants } from "@/data/restaurants";

/* ── Types & Constants ── */

type FilterKey = "all" | "관광지" | "온천" | "숙소" | "공항" | "맛집" | "기타";

const categoryFilters: { key: FilterKey; emoji: string; label: string }[] = [
  { key: "all", emoji: "📍", label: "전체" },
  { key: "관광지", emoji: "🏛️", label: "관광" },
  { key: "온천", emoji: "♨️", label: "온천" },
  { key: "숙소", emoji: "🏨", label: "숙소" },
  { key: "맛집", emoji: "🍽️", label: "맛집" },
];

function getFilterKey(category: string): FilterKey {
  if (category === "숙소") return "숙소";
  if (category === "온천") return "온천";
  if (category === "관광지") return "관광지";
  if (category === "공항") return "공항";
  if (category === "맛집") return "맛집";
  return "기타";
}

/* ── Data ── */

interface MapPlace {
  emoji: string;
  name: string;
  category: string;
  description: string;
  why: string;
  address: string;
  visitTime: string;
  transport: string;
  familyNote: string;
  lat: number;
  lng: number;
}

const places: MapPlace[] = [
  { emoji: "✈️", name: "신치토세공항 (CTS)", category: "공항", description: "홋카이도 주요 공항", why: "입출국 공항", address: "New Chitose Airport", visitTime: "입출국 시", transport: "렌터카 픽업", familyNote: "렌터카 픽업은 공항 라벤더점", lat: 42.7752, lng: 141.6925 },
  { emoji: "🏞️", name: "시코쓰호", category: "관광지", description: "일본에서 가장 맑은 칼데라 호수", why: "투명도 1위의 호수", address: "Lake Shikotsu, Chitose", visitTime: "1~2시간", transport: "공항에서 차로 40분", familyNote: "호숫가 산책 + 온천 마을", lat: 42.7570, lng: 141.3490 },
  { emoji: "🏨", name: "파크 호텔 미야비테이", category: "숙소", description: "노보리베츠 온천 근처 호텔", why: "1박 숙소", address: "Noboribetsu, Hokkaido", visitTime: "5/3 체크인", transport: "시코쓰호에서 차로 약 1시간", familyNote: "온천 호텔, 조석식 뷔페 포함", lat: 42.4957, lng: 141.1412 },
  { emoji: "🌋", name: "노보리베츠 지옥계곡", category: "관광지", description: "화산 온천 계곡, 유황 냄새", why: "홋카이도 대표 관광지", address: "Jigokudani, Noboribetsu", visitTime: "1~1.5시간", transport: "시코쓰호에서 차로 1시간", familyNote: "산책로 평탄, 유황 냄새 강함", lat: 42.4933, lng: 141.1573 },
  { emoji: "♨️", name: "노보리베츠 온천가", category: "온천", description: "일본 최고 온천 중 하나", why: "다양한 수질의 온천 체험", address: "Noboribetsu Onsen", visitTime: "1~2시간", transport: "지옥계곡에서 도보", familyNote: "수건은 물에 담그지 않기! 10계명 셋째", lat: 42.4847, lng: 141.1558 },
  { emoji: "🏞️", name: "도야호", category: "관광지", description: "칼데라 호수, 나카지마 섬 전망", why: "홋카이도 3대 경관", address: "Lake Toya, Toyako", visitTime: "1~2시간", transport: "노보리베츠에서 차로 40분", familyNote: "호수 둘레 산책로, 유람선 가능", lat: 42.6100, lng: 140.8560 },
  { emoji: "🏨", name: "토야 코한 테이 (도야호)", category: "숙소", description: "도야호 호반 온천 호텔", why: "2박 숙소", address: "Toyako Onsen, Toyako", visitTime: "5/4~5/6", transport: "도야호에서 도보", familyNote: "호수뷰 대욕장, 조석식 뷔페 포함", lat: 42.5659, lng: 140.8259 },
  { emoji: "🚡", name: "우스산 로프웨이", category: "관광지", description: "활화산 전망대, 쇼와신잔 조망", why: "화산 지형 감상", address: "Mt. Usu Ropeway, Sobetsu", visitTime: "1~1.5시간", transport: "도야호에서 차로 15분", familyNote: "로프웨이 탑승, 전망대에서 호수+화산 파노라마", lat: 42.5390, lng: 140.8603 },
  { emoji: "🚢", name: "도야호 유람선", category: "관광지", description: "나카시마 순환 50분, 30분 간격", why: "호수 위에서 풍경 감상", address: "Toyako Onsen, 유람선 터미널", visitTime: "50분", transport: "성인 1,800엔", familyNote: "앉아서 감상, 체력 부담 제로", lat: 42.5730, lng: 140.8430 },
  { emoji: "🎆", name: "도야호 불꽃놀이", category: "관광지", description: "매일 밤 20:45~21:05 (4/28~10/31)", why: "호수 위 불꽃놀이", address: "Toyako Onsen 호반", visitTime: "20분", transport: "관람선 1,900엔 (20:35 출항)", familyNote: "호반에서 무료 관람 또는 관람선 탑승", lat: 42.5735, lng: 140.8420 },
  { emoji: "♨️", name: "도류노유 족욕", category: "온천", description: "호반 무료 천연 족욕탕", why: "원천 가케나가시 족욕", address: "Toyako Onsen 호반", visitTime: "20~30분", transport: "온천가에서 도보", familyNote: "무료, 9:00~22:00 (4/28~10/31)", lat: 42.5735, lng: 140.8410 },
  { emoji: "🌸", name: "소베쓰 공원", category: "관광지", description: "5월 초 매화 300그루 만개", why: "도야호 조망 + 매화 절경", address: "Sobetsu, Hokkaido", visitTime: "30분~1시간", transport: "온천가에서 차 15분", familyNote: "무료, 주차 15대", lat: 42.5290, lng: 140.8680 },
  { emoji: "🏔️", name: "사이로 전망대", category: "관광지", description: "도야호+우스산+요테이산 파노라마", why: "전체 조망 최고 스폿", address: "Toyako-cho, Hokkaido", visitTime: "30분~1시간", transport: "온천가에서 차 10분", familyNote: "무료, 대형 주차장, 평탄", lat: 42.6040, lng: 140.7980 },
  { emoji: "🍦", name: "레이크힐 농장", category: "관광지", description: "목장 젤라토, 요테이산 뷰", why: "홋카이도 우유 젤라토", address: "Toyako-cho Hanawa, Hokkaido", visitTime: "30분~1시간", transport: "온천가에서 차 10분", familyNote: "무료 입장, 주차 무료", lat: 42.6155, lng: 140.7865 },
  { emoji: "🏛️", name: "서밋 기념관", category: "관광지", description: "G8 정상회담 원탁, 각국 선물 전시", why: "2008년 G8 서밋 개최지", address: "Toyako Onsen, 유람선 터미널", visitTime: "20~30분", transport: "온천가에서 도보", familyNote: "무료, 실내", lat: 42.5730, lng: 140.8430 },
  { emoji: "♨️", name: "오유누마 천연 족욕", category: "온천", description: "산에서 흘러내리는 온천수 족욕", why: "지옥계곡과 세트", address: "Noboribetsu Onsen, Oyunuma", visitTime: "20~30분", transport: "지옥계곡에서 도보 15분", familyNote: "무료, 타올 지참", lat: 42.4880, lng: 141.1520 },
  { emoji: "🏖️", name: "톳카리쇼 전망대", category: "관광지", description: "해안 절벽 절경, 무로란 8경", why: "깎아지른 해안 절벽", address: "Muroran, Hokkaido", visitTime: "20~30분", transport: "지구곶에서 차 10분", familyNote: "전망대까지 짧은 거리, 무료", lat: 42.3100, lng: 140.9760 },
  { emoji: "🌉", name: "하쿠초 대교", category: "관광지", description: "동일본 최대 현수교 1,380m", why: "드라이브로 통과 + 전망", address: "Muroran, Hokkaido", visitTime: "통과 5분", transport: "무료 통행", familyNote: "차에서 내리지 않아도 됨", lat: 42.3380, lng: 140.9550 },
  ...getSelectedRestaurants().map(r => ({
    emoji: "🍽️",
    name: r.nameKr,
    category: "맛집",
    description: `${r.genre} · ★${r.rating}`,
    why: r.representativeMenu,
    address: r.address,
    visitTime: r.dayRecommendation?.join(", ") || "",
    transport: r.priceRange || "",
    familyNote: r.familyNote || "",
    lat: r.lat!,
    lng: r.lng!,
  })),
];

interface PlaceCategory {
  title: string;
  emoji: string;
  items: { name: string; tip: string }[];
}

const placeCategories: PlaceCategory[] = [
  { title: "온천 가이드", emoji: "♨️", items: [
    { name: "노보리베츠 온천", tip: "유황천, 철천 등 9종 수질. 피부에 따라 선택" },
    { name: "시코쓰호 온천", tip: "투명한 호수를 보며 노천탕 체험" },
    { name: "도야호 온천", tip: "호텔 대욕장 + 족욕 무료" },
  ]},
  { title: "맛집", emoji: "🍜", items: [
    { name: "홋카이도 라멘", tip: "미소 라멘이 기본! 삿포로 스타일" },
    { name: "호텔 뷔페", tip: "미야비테이·코한테이 모두 조석식 뷔페 포함" },
    { name: "소프트크림", tip: "홋카이도 우유로 만든 진한 맛. 어디서나 350엔 전후" },
    { name: "편의점 간식", tip: "세이코마트(홋카이도 한정 편의점) 꼭 가보기!" },
  ]},
  { title: "드라이브 코스", emoji: "🚗", items: [
    { name: "신치토세→시코쓰호", tip: "40분, 산길 드라이브. 좌측통행 주의!" },
    { name: "시코쓰호→노보리베츠", tip: "1시간, 국도 276→36. 산악 경치" },
    { name: "노보리베츠→도야호", tip: "40분, 고속도로 이용 가능" },
  ]},
];

/* ── Leaflet helpers ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function createEmojiIcon(emoji: string, name?: string) {
  const safeName = name ? escapeHtml(name) : "";
  const titleAttr = safeName ? ` title="${safeName}" aria-label="${safeName}"` : "";
  return L.divIcon({
    html: `<div style="font-size:22px;text-align:center;line-height:44px;width:44px;height:44px;background:white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2.5px solid hsl(270,50%,55%);"${titleAttr}>${escapeHtml(emoji)}</div>`,
    className: "emoji-marker",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });
}

function FlyToPlace({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lng], 15, { duration: 0.8 }); }, [lat, lng, map]);
  return null;
}

function FitBounds({ points }: { points: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, points]);
  return null;
}

/* ── Component ── */

const MapTab = () => {
  const [selected, setSelected] = useState<MapPlace | null>(null);
  const [flyTo, setFlyTo] = useState<{ lat: number; lng: number } | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredPlaces = useMemo(() =>
    places.filter((p) => {
      return activeFilter === "all" || getFilterKey(p.category) === activeFilter;
    }),
  [activeFilter]);

  const clearFilters = () => {
    setActiveFilter("all");
    setFlyTo(null);
    setSelected(null);
  };

  const hasActiveFilters = activeFilter !== "all";

  return (
    <div className="space-y-4 fade-in">

      {/* ── Category Chips ── */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-0.5">
        {categoryFilters.map((f) => {
          const count = places.filter((p) =>
            f.key === "all" || getFilterKey(p.category) === f.key
          ).length;
          if (count === 0 && f.key !== "all") return null;
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setFlyTo(null); setSelected(null); }}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              <span className="text-sm">{f.emoji}</span>
              <span>{f.label}</span>
              {f.key !== "all" && (
                <span className={`text-xs ml-0.5 ${isActive ? "text-white/70" : "text-muted-foreground"}`}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Map ── */}
      <div className="relative z-0 rounded-2xl overflow-hidden border border-border shadow-sm" style={{ height: "min(55vh, 400px)" }}>
        <MapContainer
          center={[42.6, 141.3]}
          zoom={9}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!flyTo && <FitBounds points={filteredPlaces} />}
          {flyTo && <FlyToPlace lat={flyTo.lat} lng={flyTo.lng} />}
          {filteredPlaces.map((place, i) => (
            <Marker
              key={`${place.name}-${i}`}
              position={[place.lat, place.lng]}
              icon={createEmojiIcon(place.emoji, place.name)}
              eventHandlers={{
                click: () => { setSelected(place); setFlyTo({ lat: place.lat, lng: place.lng }); },
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* ── Active filter badge ── */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{categoryFilters.find((f) => f.key === activeFilter)?.label}</span>
            <span className="ml-1.5">{filteredPlaces.length}곳</span>
          </p>
          <button onClick={clearFilters} className="text-sm text-primary font-semibold active:opacity-70">
            필터 초기화
          </button>
        </div>
      )}

      {/* ── Place List ── */}
      <div className="space-y-2">
        {filteredPlaces.map((place, i) => (
          <button
            key={i}
            onClick={() => { setSelected(place); setFlyTo({ lat: place.lat, lng: place.lng }); }}
            className={`w-full card-base flex items-center gap-3 text-left active:scale-[0.98] transition-all ${
              selected?.name === place.name ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-xl">{place.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{place.name}</p>
              <p className="text-sm text-muted-foreground truncate">{place.description}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full flex-shrink-0 font-medium bg-secondary text-secondary-foreground">
              {place.category}
            </span>
          </button>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="text-center py-8">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm text-muted-foreground">해당 조건의 장소가 없습니다</p>
          <button onClick={clearFilters} className="mt-3 text-sm text-primary font-bold">전체 보기</button>
        </div>
      )}

      {/* ── Tip Categories ── */}
      {placeCategories.length > 0 && (
        <div className="space-y-4 pt-2">
          {placeCategories.map((cat, ci) => (
            <div key={ci}>
              <h3 className="text-base font-bold text-foreground mb-2.5">{cat.emoji} {cat.title}</h3>
              <div className="space-y-1.5">
                {cat.items.map((item, pi) => (
                  <div key={pi} className="flex items-start gap-3 bg-secondary/40 rounded-xl px-4 py-3">
                    <span className="text-base mt-0.5">{cat.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Bottom Sheet (portal to body to avoid parent transform breaking fixed positioning) ── */}
      {selected && createPortal(
        <div
          className="fixed inset-0 bg-black/40 z-[9999] flex items-end"
          role="dialog"
          aria-modal="true"
          onClick={() => { setSelected(null); setFlyTo(null); }}
          onKeyDown={(e) => { if (e.key === "Escape") { setSelected(null); setFlyTo(null); } }}
        >
          <div
            className="bg-card w-full rounded-t-3xl p-5 max-h-[70vh] overflow-y-auto"
            aria-label="장소 상세 정보"
            style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">{selected.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{selected.name}</h3>
                <div className="flex gap-1.5 mt-1">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{selected.category}</span>
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-2 text-sm">
              {[
                { label: "📝 설명", value: selected.description },
                { label: "📍 주소", value: selected.address },
                { label: "⏱ 소요", value: selected.visitTime },
                { label: "🚗 교통", value: selected.transport },
              ].map((row, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-muted-foreground w-16 shrink-0">{row.label}</span>
                  <span className="text-foreground">{row.value}</span>
                </div>
              ))}

              {/* Family tip */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-3.5 mt-2">
                <p className="text-xs text-primary font-bold mb-1">👨‍👩‍👧 여행 꿀팁</p>
                <p className="text-sm text-foreground leading-relaxed">{selected.familyNote}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <a
                  href={`https://maps.google.com/?q=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-secondary text-secondary-foreground min-h-[48px] flex items-center justify-center rounded-xl text-sm font-bold active:opacity-80 transition-opacity"
                >
                  🗺️ Google Maps
                </a>
                <button
                  onClick={() => { setSelected(null); setFlyTo(null); }}
                  className="flex-1 min-h-[48px] bg-primary text-primary-foreground rounded-xl font-bold active:opacity-80 transition-opacity"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MapTab;
