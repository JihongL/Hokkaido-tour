/**
 * 홋카이도 3박4일 가족여행 맛집 데이터
 * 출처: tabelog.com (2025~2026 기준)
 */

export interface Restaurant {
  id: string;
  nameJa: string;
  nameKr: string;
  area: AreaKey;
  rating: number;
  genre: string;
  representativeMenu: string;
  address: string;
  businessHours?: string;
  closedDays?: string;
  priceRange?: string;
  phone?: string;
  familyFriendly: boolean;
  familyNote?: string;
  tabelogUrl?: string;
  dayRecommendation?: string[];
  lat?: number;
  lng?: number;
}

export type AreaKey =
  | "shinchitose"
  | "shikotsu"
  | "noboribetsu"
  | "muroran"
  | "toyako";

export interface AreaInfo {
  key: AreaKey;
  nameJa: string;
  nameKr: string;
  dayLabel: string;
  description: string;
}

export const areas: AreaInfo[] = [
  {
    key: "shinchitose",
    nameJa: "新千歳空港",
    nameKr: "신치토세공항",
    dayLabel: "Day 1 도착 / Day 4 출발",
    description: "공항 내 터미널 3F 중심, 홋카이도 대표 그르메 집합",
  },
  {
    key: "shikotsu",
    nameJa: "支笏湖・千歳",
    nameKr: "시코쓰호/치토세",
    dayLabel: "Day 1, Day 4",
    description: "맑은 호수 주변 온천 리조트 내 식당 위주",
  },
  {
    key: "noboribetsu",
    nameJa: "登別・登別温泉",
    nameKr: "노보리베츠/노보리베츠 온센",
    dayLabel: "Day 1 저녁 ~ Day 2 아침",
    description: "온천마을 식당가, 지옥골 근처 먹거리",
  },
  {
    key: "muroran",
    nameJa: "室蘭",
    nameKr: "무로란",
    dayLabel: "Day 2 점심",
    description: "지구곶 근처, 카레라멘/야키토리가 명물",
  },
  {
    key: "toyako",
    nameJa: "洞爺湖・洞爺湖温泉",
    nameKr: "도야호/토야코 온센",
    dayLabel: "Day 2 저녁 ~ Day 3",
    description: "호수뷰 레스토랑, 스프카레, 젤라또 인기",
  },
];

export const restaurants: Restaurant[] = [
  // ============================================================
  // 1. 신치토세공항 (新千歳空港)
  // ============================================================
  {
    id: "cts-01",
    nameJa: "えびそば一幻 新千歳空港店",
    nameKr: "에비소바 잇켄",
    area: "shinchitose",
    rating: 3.59,
    genre: "라멘",
    representativeMenu: "에비소바 (새우라멘) - 시오/미소/쇼유",
    address: "新千歳空港 国内線ターミナル3F 北海道ラーメン道場",
    phone: "0123-45-6755",
    familyFriendly: true,
    familyNote: "아이용 의자 있음, 새우맛이 진해 아이들도 좋아함",
    dayRecommendation: ["Day 1 도착", "Day 4 출발"],
    lat: 42.7877, lng: 141.6803,
  },
  {
    id: "cts-02",
    nameJa: "札幌味噌ラーメン専門店 けやき 新千歳空港店",
    nameKr: "삿포로 미소라멘 전문점 케야키",
    area: "shinchitose",
    rating: 3.59,
    genre: "라멘",
    representativeMenu: "미소라멘, 교자",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "0123-45-6010",
    familyFriendly: true,
    familyNote: "삿포로 미소라멘의 대표 맛집, 진하고 고소한 맛",
    dayRecommendation: ["Day 1 도착", "Day 4 출발"],
    lat: 42.788, lng: 141.6801,
  },
  {
    id: "cts-03",
    nameJa: "らーめん空 新千歳空港店",
    nameKr: "라멘 소라",
    area: "shinchitose",
    rating: 3.58,
    genre: "라멘",
    representativeMenu: "미소라멘, 교자",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "0123-45-6038",
    familyFriendly: true,
    familyNote: "2025 타베로그 라멘 HOKKAIDO Top 100 선정",
    dayRecommendation: ["Day 1 도착", "Day 4 출발"],
    lat: 42.7879, lng: 141.6803,
  },
  {
    id: "cts-04",
    nameJa: "ジアス ルーク＆タリー",
    nameKr: "지아스 루크 앤 탈리",
    area: "shinchitose",
    rating: 3.57,
    genre: "비스트로/스프카레",
    representativeMenu: "스프카레, 바 메뉴",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "050-5890-7881",
    familyFriendly: true,
    familyNote: "스프카레가 맛있고 분위기 좋음, 가족 식사 적합",
    dayRecommendation: ["Day 4 출발"],
  },
  {
    id: "cts-05",
    nameJa: "あじさい 新千歳空港店",
    nameKr: "아지사이",
    area: "shinchitose",
    rating: 3.57,
    genre: "라멘",
    representativeMenu: "시오라멘 (하코다테 스타일 소금라멘)",
    address: "新千歳空港 国内線ターミナル3F 北海道ラーメン道場",
    phone: "0123-45-8550",
    familyFriendly: true,
    familyNote: "담백한 시오라멘, 어르신도 부담 없음",
    dayRecommendation: ["Day 1 도착", "Day 4 출발"],
  },
  {
    id: "cts-06",
    nameJa: "味処 きくよ食堂 新千歳空港店",
    nameKr: "아지도코로 키쿠요 식당",
    area: "shinchitose",
    rating: 3.49,
    genre: "해산물덮밥",
    representativeMenu: "해산물동 (카이센동), 연어알밥",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "050-5456-8589",
    familyFriendly: true,
    familyNote: "신선한 해산물, 아이도 먹을 수 있는 연어/참치동 가능",
    dayRecommendation: ["Day 1 도착"],
  },
  {
    id: "cts-07",
    nameJa: "スープカレーlavi 新千歳空港店",
    nameKr: "스프카레 라비",
    area: "shinchitose",
    rating: 3.49,
    genre: "스프카레",
    representativeMenu: "홋카이도 야채 스프카레",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "050-5596-5829",
    familyFriendly: true,
    familyNote: "매운맛 조절 가능, 야채 풍부해 건강한 식사",
    dayRecommendation: ["Day 4 출발"],
  },
  {
    id: "cts-08",
    nameJa: "松尾ジンギスカン 新千歳空港店",
    nameKr: "마츠오 징기스칸",
    area: "shinchitose",
    rating: 3.49,
    genre: "징기스칸 (양고기 BBQ)",
    representativeMenu: "특제 다레 징기스칸 정식",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "0123-46-5829",
    familyFriendly: true,
    familyNote: "홋카이도 명물 양고기 BBQ, 냄새 적은 공항 매장",
    dayRecommendation: ["Day 4 출발"],
  },
  {
    id: "cts-09",
    nameJa: "ドライブインいとう豚丼名人 新千歳空港店",
    nameKr: "드라이브인 이토 부타동 명인",
    area: "shinchitose",
    rating: 3.49,
    genre: "부타동 (돼지고기덮밥)",
    representativeMenu: "오비히로식 부타동",
    address: "新千歳空港 国内線ターミナル3F",
    phone: "0123-46-4200",
    familyFriendly: true,
    familyNote: "달콤한 양념 돼지고기밥, 아이/어르신 모두 무난",
    dayRecommendation: ["Day 1 도착", "Day 4 출발"],
  },
  {
    id: "cts-10",
    nameJa: "北の味覚 すず花 ゲート店",
    nameKr: "키타노 미카쿠 스즈카 게이트점",
    area: "shinchitose",
    rating: 3.48,
    genre: "스시/해산물",
    representativeMenu: "서서 먹는 초밥, 해산물동",
    address: "新千歳空港 国内線ターミナル2F ゲート付近",
    phone: "0123-46-2215",
    familyFriendly: true,
    familyNote: "게이트 근처 입식 스시, 출발 직전 간단히 먹기 좋음",
    dayRecommendation: ["Day 4 출발"],
  },
  {
    id: "cts-11",
    nameJa: "グルメ回転寿司 函太郎 新千歳空港店",
    nameKr: "구루메 카이텐즈시 칸타로",
    area: "shinchitose",
    rating: 3.47,
    genre: "회전초밥",
    representativeMenu: "회전초밥, 홋카이도 네타 (연어, 성게, 게 등)",
    address: "新千歳空港 国際線ターミナル3F",
    phone: "0123-25-3310",
    familyFriendly: true,
    familyNote: "회전초밥이라 아이들이 좋아함, 한 접시씩 골라 먹기",
    dayRecommendation: ["Day 1 도착", "Day 4 출발"],
    lat: 42.7874, lng: 141.6803,
  },
  {
    id: "cts-12",
    nameJa: "花畑牧場 RACLETTE",
    nameKr: "하나바타케 목장 라클렛",
    area: "shinchitose",
    rating: 3.45,
    genre: "치즈요리/이탈리안",
    representativeMenu: "라클렛 치즈, 치즈 파스타, 피자",
    address: "新千歳空港 ターミナル3F",
    phone: "0120-929-187",
    familyFriendly: true,
    familyNote: "녹인 치즈 요리, 아이들이 매우 좋아함",
    dayRecommendation: ["Day 4 출발"],
  },

  // ============================================================
  // 2. 시코쓰호 / 치토세 (支笏湖/千歳)
  // ============================================================
  {
    id: "skts-01",
    nameJa: "食事処 寿",
    nameKr: "식사처 코토부키",
    area: "shikotsu",
    rating: 3.43,
    genre: "소바/해산물/스시",
    representativeMenu: "히메마스(칩) 요리, 소바, 해산물정식",
    address: "北海道千歳市支笏湖温泉",
    closedDays: "수요일",
    priceRange: "¥2,000~¥2,999",
    familyFriendly: true,
    familyNote: "시코쓰호 명물 히메마스 전문, 아이도 먹을 수 있는 정식 있음",
    dayRecommendation: ["Day 1 점심", "Day 4 점심"],
    lat: 42.7734, lng: 141.404,
  },
  {
    id: "skts-02",
    nameJa: "ヘルシービュッフェ アマム",
    nameKr: "헬시 뷔페 아맘",
    area: "shikotsu",
    rating: 3.42,
    genre: "뷔페/카페",
    representativeMenu: "건강 뷔페, 디저트",
    address: "北海道千歳市支笏湖温泉 しこつ湖鶴雅リゾートスパ 水の謌",
    priceRange: "¥2,000~¥2,999",
    familyFriendly: true,
    familyNote: "뷔페라 골라 먹기 가능, 어르신/아이 모두 적합",
    dayRecommendation: ["Day 1 점심"],
    lat: 42.7738, lng: 141.4037,
  },
  {
    id: "skts-03",
    nameJa: "ミオンエシカルキッチン＆カフェ",
    nameKr: "미온 에시컬 키친 앤 카페",
    area: "shikotsu",
    rating: 3.42,
    genre: "카페",
    representativeMenu: "에시컬 런치플레이트, 디저트",
    address: "北海道千歳市蘭越1625-6",
    closedDays: "목요일",
    priceRange: "¥2,000~¥2,999",
    familyFriendly: true,
    familyNote: "분위기 좋은 카페, 건강한 메뉴",
    dayRecommendation: ["Day 1", "Day 4"],
  },
  {
    id: "skts-04",
    nameJa: "レイクサイドキッチン トントン",
    nameKr: "레이크사이드 키친 톤톤",
    area: "shikotsu",
    rating: 3.3,
    genre: "일식/라멘/징기스칸",
    representativeMenu: "히메마스 프라이, 징기스칸, 라멘",
    address: "北海道千歳市支笏湖温泉",
    priceRange: "~¥999",
    familyFriendly: true,
    familyNote: "저렴하고 가볍게 먹기 좋음, 호수 주차장 근처",
    dayRecommendation: ["Day 1 점심", "Day 4 점심"],
    lat: 42.7731, lng: 141.4039,
  },
  {
    id: "skts-05",
    nameJa: "アズーロ",
    nameKr: "아즈로",
    area: "shikotsu",
    rating: 3.29,
    genre: "이탈리안",
    representativeMenu: "이탈리안 코스 (레이크사이드 빌라 내)",
    address: "北海道千歳市支笏湖温泉 レイクサイドヴィラ翠明閣",
    closedDays: "화요일",
    priceRange: "¥15,000~¥19,999",
    familyFriendly: false,
    familyNote: "고급 이탈리안, 성인 위주 분위기 (어린아이 비추천)",
    dayRecommendation: ["Day 1 저녁 (부부만)"],
  },
  {
    id: "skts-06",
    nameJa: "ログ ベアー",
    nameKr: "로그 베어",
    area: "shikotsu",
    rating: 3.26,
    genre: "카페/바",
    representativeMenu: "커피, 경식, 디저트",
    address: "北海道千歳市支笏湖温泉 番外地",
    priceRange: "¥1,000~¥1,999",
    familyFriendly: true,
    familyNote: "통나무집 분위기 카페, 간식/휴식에 좋음",
    dayRecommendation: ["Day 1", "Day 4"],
  },
  {
    id: "skts-07",
    nameJa: "レストラン&テイクアウト memere",
    nameKr: "레스토랑 앤 테이크아웃 메메르",
    area: "shikotsu",
    rating: 3.24,
    genre: "카페/젤라토/양식",
    representativeMenu: "스프카레, 햄버거, 젤라토",
    address: "北海道千歳市支笏湖温泉",
    priceRange: "~¥999",
    familyFriendly: true,
    familyNote: "테이크아웃 가능, 젤라토 인기, 가볍게 먹기 좋음",
    dayRecommendation: ["Day 1", "Day 4"],
  },

  // ============================================================
  // 3. 노보리베츠 (登別)
  // ============================================================
  {
    id: "nbts-01",
    nameJa: "温泉市場",
    nameKr: "온센 이치바 (온천시장)",
    area: "noboribetsu",
    rating: 3.45,
    genre: "해산물/식당",
    representativeMenu: "해산물정식, 게요리, 해산물동",
    address: "登別市登別温泉町50",
    familyFriendly: true,
    familyNote: "온천가 중심, 신선한 해산물, 넓은 좌석으로 가족 적합",
    dayRecommendation: ["Day 1 저녁"],
  },
  {
    id: "nbts-02",
    nameJa: "つるつる屋",
    nameKr: "츠루츠루야",
    area: "noboribetsu",
    rating: 3.47,
    genre: "라멘 (카레라멘 전문)",
    representativeMenu: "카레라멘, 교자",
    address: "登別市若草町2-22-6",
    closedDays: "월~화요일",
    familyFriendly: true,
    familyNote: "노보리베츠 카레라멘 인기점, 아이도 먹기 좋은 맛",
    dayRecommendation: ["Day 2 아침/점심"],
  },
  {
    id: "nbts-03",
    nameJa: "洋食のいし川",
    nameKr: "요쇼쿠노 이시카와",
    area: "noboribetsu",
    rating: 3.35,
    genre: "양식/카레",
    representativeMenu: "함박스테이크, 카레라이스, 오므라이스",
    address: "登別市中央町2-13-6",
    familyFriendly: true,
    familyNote: "경양식 전문, 아이/어르신 모두 좋아하는 메뉴",
    dayRecommendation: ["Day 2 아침/점심"],
  },
  {
    id: "nbts-04",
    nameJa: "香龍飯店",
    nameKr: "코류 한텐",
    area: "noboribetsu",
    rating: 3.34,
    genre: "중화요리",
    representativeMenu: "중화 코스, 볶음밥, 마파두부",
    address: "登別市幸町5-7-33",
    closedDays: "월요일",
    familyFriendly: true,
    familyNote: "로컬 인기 중화요리, 대가족 식사에 적합",
    dayRecommendation: ["Day 1 저녁"],
  },
  {
    id: "nbts-05",
    nameJa: "味の大王 登別温泉店",
    nameKr: "아지노 다이오 노보리베츠 온센점",
    area: "noboribetsu",
    rating: 3.31,
    genre: "라멘/카레",
    representativeMenu: "카레라멘 (노보리베츠/무로란 명물)",
    address: "登別市登別温泉町29-9",
    familyFriendly: true,
    familyNote: "온천가 내 위치, 카레라멘 원조 체인 중 하나",
    dayRecommendation: ["Day 1 저녁"],
  },
  {
    id: "nbts-06",
    nameJa: "ソーダ食堂",
    nameKr: "소다 식당",
    area: "noboribetsu",
    rating: 3.3,
    genre: "식당/라멘",
    representativeMenu: "엔마 야키소바 (지옥 볶음면), 라멘",
    address: "登別市千歳町6-1-98",
    closedDays: "일요일",
    familyFriendly: true,
    familyNote: "노보리베츠 명물 엔마야키소바, 독특한 체험",
    dayRecommendation: ["Day 2 아침"],
  },
  {
    id: "nbts-07",
    nameJa: "花鐘亭 はなや",
    nameKr: "카쇼테이 하나야",
    area: "noboribetsu",
    rating: 3.29,
    genre: "일식/카이세키",
    representativeMenu: "카이세키 런치, 회석요리",
    address: "登別市登別温泉町134",
    familyFriendly: true,
    familyNote: "격식 있는 일본 가이세키, 특별한 식사에 추천",
    dayRecommendation: ["Day 1 저녁"],
  },
  {
    id: "nbts-08",
    nameJa: "そば処 福庵",
    nameKr: "소바도코로 후쿠안",
    area: "noboribetsu",
    rating: 3.09,
    genre: "소바/우동",
    representativeMenu: "수타소바, 우동, 텐푸라소바",
    address: "登別市登別温泉町30",
    familyFriendly: true,
    familyNote: "온천가 내 가벼운 소바, 아침 식사로 좋음",
    dayRecommendation: ["Day 2 아침"],
  },

  // ============================================================
  // 4. 무로란 (室蘭) - 지구곶 근처
  // ============================================================
  {
    id: "mrr-01",
    nameJa: "味の大王 室蘭本店",
    nameKr: "아지노 다이오 무로란 본점",
    area: "muroran",
    rating: 3.58,
    genre: "라멘/카레라멘",
    representativeMenu: "카레라멘 (무로란 명물), 츠케멘",
    address: "室蘭市中央町2-9-3",
    closedDays: "화요일",
    familyFriendly: true,
    familyNote: "무로란 카레라멘의 원조, 가족 모두 먹기 좋은 맛",
    dayRecommendation: ["Day 2 점심"],
    lat: 42.3177, lng: 140.9703,
  },
  {
    id: "mrr-02",
    nameJa: "呆屋やきとり店",
    nameKr: "호케야 야키토리점",
    area: "muroran",
    rating: 3.51,
    genre: "야키토리 (무로란식 돼지고기 꼬치)",
    representativeMenu: "무로란 야키토리 (돼지고기+양파 꼬치, 겨자 소스)",
    address: "室蘭市中島町2-24-6",
    businessHours: "17:00~23:00",
    closedDays: "일요일",
    familyFriendly: false,
    familyNote: "저녁 전용, 술집 분위기라 점심 방문 불가",
    dayRecommendation: ["Day 2 저녁 (시간 되면)"],
  },
  {
    id: "mrr-03",
    nameJa: "やきとりの一平 中島本店",
    nameKr: "야키토리노 잇페이 나카지마 본점",
    area: "muroran",
    rating: 3.46,
    genre: "야키토리/이자카야",
    representativeMenu: "무로란 야키토리 (돼지고기 꼬치구이)",
    address: "室蘭市中島町1-17-3",
    familyFriendly: true,
    familyNote: "무로란 야키토리 대표점, 체인이라 가족 방문 가능",
    dayRecommendation: ["Day 2 점심/저녁"],
    lat: 42.3529, lng: 141.0162,
  },
  {
    id: "mrr-04",
    nameJa: "鳥辰 本店",
    nameKr: "토리타츠 본점",
    area: "muroran",
    rating: 3.46,
    genre: "야키토리/향토요리/이자카야",
    representativeMenu: "무로란 야키토리, 향토 안주",
    address: "室蘭市中央町2-4-17",
    familyFriendly: true,
    familyNote: "무로란 야키토리 노포, 향토 맛 체험",
    dayRecommendation: ["Day 2 점심"],
  },
  {
    id: "mrr-05",
    nameJa: "回転寿司割烹和さび 室蘭店",
    nameKr: "카이텐즈시 캇포 와사비 무로란점",
    area: "muroran",
    rating: 3.45,
    genre: "회전초밥/해산물",
    representativeMenu: "회전초밥, 홋카이도 네타",
    address: "室蘭市中島町3-1-1",
    closedDays: "수요일",
    familyFriendly: true,
    familyNote: "회전초밥이라 아이들 매우 좋아함, 점심 추천",
    dayRecommendation: ["Day 2 점심"],
    lat: 42.3494, lng: 141.0206,
  },
  {
    id: "mrr-06",
    nameJa: "小舟",
    nameKr: "코부네",
    area: "muroran",
    rating: 3.45,
    genre: "이자카야/라멘/야키토리",
    representativeMenu: "카레라멘, 야키토리, 해산물",
    address: "室蘭市絵鞆町2-8-13",
    closedDays: "월요일",
    familyFriendly: true,
    familyNote: "에토모 지역 (지구곶 근처), 점심 영업 있음",
    dayRecommendation: ["Day 2 점심"],
  },
  {
    id: "mrr-07",
    nameJa: "じぇんとる麺 中島店",
    nameKr: "젠토루멘 나카지마점",
    area: "muroran",
    rating: 3.42,
    genre: "라멘/츠케멘",
    representativeMenu: "카레라멘, 츠케멘",
    address: "室蘭市中島町1-14-10",
    closedDays: "일요일",
    familyFriendly: true,
    familyNote: "카레라멘 인기점, 양 조절 가능",
    dayRecommendation: ["Day 2 점심"],
  },
  {
    id: "mrr-08",
    nameJa: "ノンシャラン",
    nameKr: "농샬랑",
    area: "muroran",
    rating: 3.41,
    genre: "양식/프렌치/햄버그",
    representativeMenu: "함박스테이크, 양식 런치",
    address: "室蘭市築地町89-40",
    closedDays: "월요일",
    familyFriendly: true,
    familyNote: "양식 레스토랑, 아이/어르신 모두 좋아하는 메뉴",
    dayRecommendation: ["Day 2 점심"],
  },

  // ============================================================
  // 5. 도야호 / 토야코 온센 (洞爺湖/洞爺湖温泉)
  // ============================================================
  {
    id: "tyk-01",
    nameJa: "レークヒル・ファーム",
    nameKr: "레이크힐 팜",
    area: "toyako",
    rating: 3.58,
    genre: "젤라토/아이스크림",
    representativeMenu: "젤라토, 소프트아이스크림, 치즈",
    address: "虻田郡洞爺湖町花和127",
    familyFriendly: true,
    familyNote: "목장 체험+젤라토, 아이들 최고 인기 스팟",
    dayRecommendation: ["Day 3 오전"],
    lat: 42.6155, lng: 140.7865,
  },
  {
    id: "tyk-02",
    nameJa: "レストラン望羊蹄",
    nameKr: "레스토랑 보요테이",
    area: "toyako",
    rating: 3.47,
    genre: "양식",
    representativeMenu: "폭찹 (1946년 창업 이래 명물), 함박스테이크",
    address: "虻田郡洞爺湖町洞爺湖温泉36",
    priceRange: "¥1,500~¥2,500",
    familyFriendly: true,
    familyNote: "1946년 창업 노포 양식당, 호수뷰, 가족 식사에 최적",
    dayRecommendation: ["Day 2 저녁", "Day 3 점심"],
    lat: 42.5652, lng: 140.819,
  },
  {
    id: "tyk-03",
    nameJa: "きのこ王国 本店",
    nameKr: "키노코 왕국 본점",
    area: "toyako",
    rating: 3.48,
    genre: "식당/휴게소",
    representativeMenu: "키노코 (버섯) 된장국 (100엔!), 버섯 요리",
    address: "伊達市大滝区三階滝町637-1",
    familyFriendly: true,
    familyNote: "100엔 버섯국이 유명, 드라이브 중 간식/휴식에 최고",
    dayRecommendation: ["Day 3 이동 중"],
    lat: 42.6985, lng: 141.1276,
  },
  {
    id: "tyk-04",
    nameJa: "スープカリー ハラハル",
    nameKr: "스프카레 하라하루",
    area: "toyako",
    rating: 3.28,
    genre: "스프카레",
    representativeMenu: "스프카레, 소프트아이스크림",
    address: "虻田郡洞爺湖町洞爺湖温泉27-34",
    familyFriendly: true,
    familyNote: "매운맛 조절 가능, 아이용 메뉴 있음",
    dayRecommendation: ["Day 2 저녁", "Day 3 점심"],
    lat: 42.5655, lng: 140.8232,
  },
  {
    id: "tyk-05",
    nameJa: "岡田屋",
    nameKr: "오카다야",
    area: "toyako",
    rating: 3.26,
    genre: "디저트/식당",
    representativeMenu: "시로쿠마 (흰곰) 빙수, 우유 푸딩",
    address: "虻田郡洞爺湖町洞爺湖温泉36",
    familyFriendly: true,
    familyNote: "온천가 산책 중 디저트, 아이들 좋아함",
    dayRecommendation: ["Day 2 저녁 후", "Day 3"],
    lat: 42.5652, lng: 140.8185,
  },
  {
    id: "tyk-06",
    nameJa: "Lagorto",
    nameKr: "라고르토",
    area: "toyako",
    rating: 3.22,
    genre: "피자/파스타",
    representativeMenu: "화덕 피자, 파스타",
    address: "虻田郡洞爺湖町洞爺湖温泉54",
    familyFriendly: true,
    familyNote: "피자/파스타라 아이들 매우 좋아함, 캐주얼 분위기",
    dayRecommendation: ["Day 2 저녁", "Day 3 점심"],
    lat: 42.565, lng: 140.8227,
  },
  {
    id: "tyk-07",
    nameJa: "わかさいも本舗 洞爺湖本店",
    nameKr: "와카사이모 혼포 도야호 본점",
    area: "toyako",
    rating: 3.22,
    genre: "화과자/카페",
    representativeMenu: "와카사이모 (홋카이도 명과), 카페 메뉴",
    address: "虻田郡洞爺湖町洞爺湖温泉144",
    familyFriendly: true,
    familyNote: "홋카이도 대표 과자 와카사이모 본점, 기념품+카페",
    dayRecommendation: ["Day 3"],
  },
  {
    id: "tyk-08",
    nameJa: "仙堂庵",
    nameKr: "센도안",
    area: "toyako",
    rating: 3.13,
    genre: "식당/해산물/소바",
    representativeMenu: "호타테(가리비) 찬완무시 정식, 소바, 카레",
    address: "虻田郡洞爺湖町洞爺湖温泉144 わかさいも本舗 2F",
    priceRange: "¥1,000~¥1,500",
    familyFriendly: true,
    familyNote: "와카사이모 본점 2층, 가리비 요리가 일품",
    dayRecommendation: ["Day 3 점심"],
  },
  {
    id: "tyk-09",
    nameJa: "でめきん食堂",
    nameKr: "데메킹 식당",
    area: "toyako",
    rating: 3.22,
    genre: "라멘/식당",
    representativeMenu: "라멘, 카레, 정식",
    address: "虻田郡洞爺湖町洞爺湖温泉40",
    familyFriendly: true,
    familyNote: "서민적인 분위기, 다양한 메뉴로 가족 식사 적합",
    dayRecommendation: ["Day 2 저녁"],
  },
  {
    id: "tyk-10",
    nameJa: "Lake Toya Beer",
    nameKr: "레이크 토야 비어",
    area: "toyako",
    rating: 3.03,
    genre: "비어바/크래프트맥주",
    representativeMenu: "도야호 크래프트 맥주, 간단한 안주",
    address: "虻田郡洞爺湖町洞爺湖温泉4-16",
    familyFriendly: false,
    familyNote: "크래프트 맥주 전문, 성인 전용 추천",
    dayRecommendation: ["Day 2 저녁 (어른만)"],
  },
];

/**
 * 지역별 맛집 필터 헬퍼
 */
export function getRestaurantsByArea(area: AreaKey): Restaurant[] {
  return restaurants.filter((r) => r.area === area);
}

/**
 * 가족 친화적 맛집만 필터
 */
export function getFamilyFriendlyRestaurants(area?: AreaKey): Restaurant[] {
  const filtered = area
    ? restaurants.filter((r) => r.area === area)
    : restaurants;
  return filtered.filter((r) => r.familyFriendly);
}

/**
 * 평점순 정렬
 */
export function getTopRated(area?: AreaKey, limit = 5): Restaurant[] {
  const filtered = area
    ? restaurants.filter((r) => r.area === area)
    : restaurants;
  return [...filtered].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

/** 끼니별 추천 맛집 ID 매핑 */
export const mealRecommendations: Record<string, string[]> = {
  "day1-lunch": ["cts-01", "cts-11"],       // 공항: 에비소바 잇켄, 칸타로
  "day2-lunch": ["mrr-01", "mrr-03"],       // 무로란: 아지노 다이오, 잇페이
  "day3-lunch": ["tyk-02", "tyk-01"],       // 도야호: 보요테이, 레이크힐 팜
  "day3-dinner": ["tyk-06", "tyk-04"],      // 도야호: 라고르토, 하라하루
  "day4-lunch": ["skts-01", "cts-03"],      // 시코쓰호: 코토부키, 공항: 라멘소라
};

/** MapTab용 선별 맛집 ID */
export const SELECTED_RESTAURANT_IDS = new Set([
  "cts-01", "cts-11", "cts-03",
  "mrr-01", "mrr-03", "mrr-05",
  "tyk-02", "tyk-01", "tyk-06", "tyk-04", "tyk-03", "tyk-05",
  "skts-01", "skts-02", "skts-04",
]);

export function getSelectedRestaurants(): Restaurant[] {
  return restaurants.filter(r => SELECTED_RESTAURANT_IDS.has(r.id) && r.lat && r.lng);
}
