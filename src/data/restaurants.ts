/**
 * 홋카이도 3박4일 시니어 그룹 맛집 데이터
 * 출처: tabelog.com (2026년 4월 기준 검색)
 * 대상: 60대 시니어 10명 그룹, 렌터카 여행
 */

export interface Restaurant {
  id: string;
  nameJa: string;
  nameKr: string;
  area: AreaKey;
  tabelogUrl: string;
  rating: number;
  reviewCount: number;
  genre: string;
  representativeMenu: string;
  address: string;
  phone: string;
  businessHours: string;
  closedDays: string;
  totalSeats: number;
  privateRoom: string;
  seatType: string;
  reservable: string;
  parking: string;
  priceRange: string;
  googleMapsUrl: string;
  seniorNote: string;
  lat: number;
  lng: number;
  /** GW 영업 상태: confirmed=확인됨, likely=가능성높음, check=확인필요 */
  gwStatus: "confirmed" | "likely" | "check";
  /** true이면 GW 백업용 식당 */
  isBackup?: boolean;
  // 하위 호환용 필드
  familyFriendly: boolean;
  familyNote: string;
  dayRecommendation: string[];
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
    description: "지구곶 근처, 무로란야키토리/카레라멘이 명물",
  },
  {
    key: "toyako",
    nameJa: "洞爺湖・洞爺湖温泉",
    nameKr: "도야호/토야코 온센",
    dayLabel: "Day 2 저녁 ~ Day 3",
    description: "호수뷰 레스토랑, 향토요리, 온천마을 식당가",
  },
];

export const restaurants: Restaurant[] = [
  // ============================================================
  // 끼니 1. Day 1 점심 — 신치토세공항 (공항 예외 규칙 적용)
  // ============================================================
  {
    id: "d1l-01",
    nameJa: "えびそば一幻 新千歳空港店",
    nameKr: "에비소바 잇겐 신치토세공항점",
    area: "shinchitose",
    tabelogUrl: "https://tabelog.com/hokkaido/A0107/A010701/1034338/",
    rating: 3.59,
    reviewCount: 3821,
    genre: "라멘 (새우소바)",
    representativeMenu: "에비미소 ¥950",
    address: "北海道千歳市美々 新千歳空港ターミナルビル3F 北海道ラーメン道場内",
    phone: "0123-45-6755",
    businessHours: "09:00~21:00 (L.O. 20:30)",
    closedDays: "연중무휴",
    totalSeats: 38,
    privateRoom: "없음",
    seatType: "카운터 6석, 테이블 32석",
    reservable: "불가 (선착순)",
    parking: "공항 주차장 (150엔/60분)",
    priceRange: "~¥999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=えびそば一幻+新千歳空港店",
    seniorNote: "공항 라멘도장 1위, 새우 풍미 진한 라멘. 10명 분산 입장으로 빠르게 식사 가능",
    lat: 42.7877,
    lng: 141.6803,
    gwStatus: "confirmed",
    familyFriendly: true,
    familyNote: "공항 라멘도장 1위, 새우 풍미 진한 라멘. 10명 분산 입장으로 빠르게 식사 가능",
    dayRecommendation: ["Day 1 점심"],
  },
  {
    id: "d1l-02",
    nameJa: "味処 きくよ食堂 新千歳空港店",
    nameKr: "아지도코로 키쿠요식당 신치토세공항점",
    area: "shinchitose",
    tabelogUrl: "https://tabelog.com/hokkaido/A0107/A010701/1054111/",
    rating: 3.49,
    reviewCount: 744,
    genre: "해산물 덮밥",
    representativeMenu: "원조 하코다테 토모에동 ¥2,780 / 4종 선택동 ¥2,980",
    address: "北海道千歳市美々 新千歳空港国内線ターミナルビル3F",
    phone: "0123-21-9943",
    businessHours: "11:00~20:45 (L.O. 20:15)",
    closedDays: "연중무휴",
    totalSeats: 72,
    privateRoom: "없음",
    seatType: "테이블 60석, 테라스 12석",
    reservable: "불가 (선착순)",
    parking: "공항 주차장",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=きくよ食堂+新千歳空港店",
    seniorNote: "72석으로 10명도 비교적 빨리 착석 가능. 하코다테 직송 해산물 덮밥이 일품",
    lat: 42.7871,
    lng: 141.6804,
    gwStatus: "confirmed",
    familyFriendly: true,
    familyNote: "72석으로 10명도 비교적 빨리 착석 가능. 하코다테 직송 해산물 덮밥이 일품",
    dayRecommendation: ["Day 1 점심"],
  },
  {
    id: "d1l-03",
    nameJa: "らっきょ 新千歳空港店",
    nameKr: "랏쿄 신치토세공항점",
    area: "shinchitose",
    tabelogUrl: "https://tabelog.com/hokkaido/A0107/A010701/1080051/",
    rating: 3.51,
    reviewCount: 192,
    genre: "스프카레",
    representativeMenu: "홋카이도산 치킨과 야채 스프카레 ¥1,880",
    address: "北海道千歳市美々 国内線ターミナルビル3F",
    phone: "0123-21-9855",
    businessHours: "10:30~20:30 (L.O. 20:00)",
    closedDays: "연중무휴",
    totalSeats: 50,
    privateRoom: "없음",
    seatType: "테이블 50석 (4인×6, 2인×12)",
    reservable: "불가 (선착순)",
    parking: "공항 주차장",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=スープカレーlavi+新千歳空港店",
    seniorNote: "삿포로 유명 스프카레 체인의 공항점. 50석으로 여유 있고, 매운맛 조절 가능. 화학조미료 무첨가",
    lat: 42.7888,
    lng: 141.6807,
    gwStatus: "confirmed",
    familyFriendly: true,
    familyNote: "삿포로 유명 스프카레 체인의 공항점. 50석으로 여유 있고, 매운맛 조절 가능. 화학조미료 무첨가",
    dayRecommendation: ["Day 1 점심"],
  },

  // ============================================================
  // 끼니 2. Day 2 점심 — 무로란/지구곶 근처
  // ============================================================
  {
    id: "d2l-01",
    nameJa: "乃ざ喜",
    nameKr: "노자키",
    area: "muroran",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010803/1006608/",
    rating: 3.45,
    reviewCount: 159,
    genre: "스키야키/샤브샤브",
    representativeMenu: "니쿠나베 돼지 정식 ¥1,050 / 니쿠나베 소 정식 ¥1,000~¥1,700",
    address: "北海道室蘭市中央町2-3-2",
    phone: "0143-24-4121",
    businessHours: "월·수~일 11:30~13:30, 17:00~20:30",
    closedDays: "화요일",
    totalSeats: 30,
    privateRoom: "있음 (최대 30명 수용)",
    seatType: "카운터석, 테이블석, 좌식",
    reservable: "전화 예약 가능",
    parking: "있음",
    priceRange: "점심 ~¥999 / 저녁 ¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=乃ざ喜+室蘭市中央町2-3-2",
    seniorNote: "무로란 대표 스키야키 노포. 개인실 30명까지 가능해 10명 그룹 최적. 돼지고기 니쿠나베가 지역 명물",
    lat: 42.3177,
    lng: 140.9721,
    gwStatus: "check",
    familyFriendly: true,
    familyNote: "무로란 대표 스키야키 노포. 개인실 30명까지 가능해 10명 그룹 최적. 돼지고기 니쿠나베가 지역 명물",
    dayRecommendation: ["Day 2 점심"],
  },
  {
    id: "d2l-02",
    nameJa: "天勝",
    nameKr: "텐카츠",
    area: "muroran",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010803/1005942/",
    rating: 3.41,
    reviewCount: 236,
    genre: "텐동/텐푸라/소바",
    representativeMenu: "텐동 (튀김덮밥) / 텐푸라 정식 ¥1,000~¥1,500",
    address: "北海道室蘭市中央町2-3-16",
    phone: "0143-22-5564",
    businessHours: "월~수·금 11:00~18:00 / 토일공휴 11:00~18:30",
    closedDays: "목요일",
    totalSeats: 72,
    privateRoom: "없음",
    seatType: "카운터 18석, 테이블 12석(3개×4인), 소좌식 42석(7개×6인)",
    reservable: "불가",
    parking: "있음 (지정 주차장 9대)",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=天勝+室蘭市中央町2-3-16",
    seniorNote: "1920년 창업 105년 역사 노포. 72석으로 넉넉하고 텐푸라/소바 메뉴가 어르신 입맛에 맞음. 주차 9대",
    lat: 42.3170,
    lng: 140.9720,
    gwStatus: "check",
    familyFriendly: true,
    familyNote: "1920년 창업 105년 역사 노포. 72석으로 넉넉하고 텐푸라/소바 메뉴가 어르신 입맛에 맞음. 주차 9대",
    dayRecommendation: ["Day 2 점심"],
  },
  {
    id: "d2l-03",
    nameJa: "浜勝やきとり店",
    nameKr: "하마카츠 야키토리점",
    area: "muroran",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010803/1016886/",
    rating: 3.19,
    reviewCount: 30,
    genre: "야키토리 (무로란식 돼지꼬치)",
    representativeMenu: "무로란 야키토리 세트 + 카레라멘 ¥1,000~¥1,500",
    address: "北海道室蘭市母恋北町2-9-4",
    phone: "0143-22-8908",
    businessHours: "월~토 11:30~14:00, 16:30~23:00",
    closedDays: "일요일",
    totalSeats: 58,
    privateRoom: "없음",
    seatType: "테이블석 중심",
    reservable: "전화 예약 가능",
    parking: "있음 (2대)",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=浜勝やきとり店+室蘭市母恋北町2-9-4",
    seniorNote: "1968년 개업 무로란야키토리(돼지꼬치+겨자) 노포. 58석으로 10명 수용 가능. 카레라멘과 야키토리 세트가 지역색 만점",
    lat: 42.3210,
    lng: 140.9560,
    gwStatus: "check",
    familyFriendly: true,
    familyNote: "1968년 개업 무로란야키토리(돼지꼬치+겨자) 노포. 58석으로 10명 수용 가능. 카레라멘과 야키토리 세트가 지역색 만점",
    dayRecommendation: ["Day 2 점심"],
  },

  // ============================================================
  // 끼니 3. Day 3 점심 — 도야호/토야코온센
  // ============================================================
  {
    id: "d3l-01",
    nameJa: "フェニックス洞爺クラブ",
    nameKr: "피닉스 도야 클럽",
    area: "toyako",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010801/1002215/",
    rating: 3.28,
    reviewCount: 32,
    genre: "프렌치/오베르주",
    representativeMenu: "런치 코스 ¥3,700~ (전채·메인·디저트)",
    address: "北海道虻田郡洞爺湖町洞爺町307-1",
    phone: "0142-87-2781",
    businessHours: "11:30~14:30, 17:30~20:30",
    closedDays: "4~6월·10월 화요일, 11~3월 화·수요일, 7~9월 무휴",
    totalSeats: 40,
    privateRoom: "있음 (대절 가능)",
    seatType: "테이블석, 소파석",
    reservable: "전화 예약 가능",
    parking: "있음",
    priceRange: "점심 ¥3,000~¥3,999 / 저녁 ¥15,000~",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=フェニックス洞爺クラブ+洞爺湖町洞爺町307-1",
    seniorNote: "도야호 전망 레스토랑. 런치코스 ¥3,700~로 가성비 좋은 프렌치. 개인실·대절 가능, 그랜드피아노가 있는 우아한 공간",
    lat: 42.6390,
    lng: 140.8155,
    gwStatus: "check",
    familyFriendly: true,
    familyNote: "도야호 전망 레스토랑. 런치코스 ¥3,700~로 가성비 좋은 프렌치. 개인실·대절 가능, 그랜드피아노가 있는 우아한 공간",
    dayRecommendation: ["Day 3 점심"],
  },
  {
    id: "d3l-02",
    nameJa: "道の駅 あぷた レストラン",
    nameKr: "미치노에키 아푸타 레스토랑",
    area: "toyako",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010801/1068886/",
    rating: 3.24,
    reviewCount: 20,
    genre: "해산물 덮밥/카레",
    representativeMenu: "가리비 프라이 카레 ¥1,200 / 우니동 ¥5,700",
    address: "北海道虻田郡洞爺湖町入江84-2",
    phone: "0142-76-5501",
    businessHours: "11:00~14:00",
    closedDays: "연중무휴",
    totalSeats: 60,
    privateRoom: "없음",
    seatType: "테이블석, 테라스석",
    reservable: "불가",
    parking: "있음 (보통차 51대, 대형차 3대)",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=道の駅あぷた+洞爺湖町入江84-2",
    seniorNote: "도로 휴게소(미치노에키) 내 식당. 60석+대형 주차장으로 10명 편하게 이용. 바다 전망 테라스에서 가리비 요리가 인기",
    lat: 42.5530,
    lng: 140.7980,
    gwStatus: "confirmed",
    familyFriendly: true,
    familyNote: "도로 휴게소(미치노에키) 내 식당. 60석+대형 주차장으로 10명 편하게 이용. 바다 전망 테라스에서 가리비 요리가 인기",
    dayRecommendation: ["Day 3 점심"],
  },
  {
    id: "d3l-03",
    nameJa: "レストランかわなみ",
    nameKr: "레스토랑 카와나미",
    area: "toyako",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010801/1033549/",
    rating: 3.06,
    reviewCount: 10,
    genre: "가마메시 (솥밥)",
    representativeMenu: "3색 가마메시(연어·가리비·게) ¥1,500 / 소고기 가마메시 ¥1,600",
    address: "北海道虻田郡洞爺湖町洞爺湖温泉36",
    phone: "0142-75-2165",
    businessHours: "10:00~19:00",
    closedDays: "부정기",
    totalSeats: 50,
    privateRoom: "없음",
    seatType: "테이블석",
    reservable: "전화 예약 가능",
    parking: "있음",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=レストランかわなみ+洞爺湖温泉36",
    seniorNote: "온천거리 내 솥밥 전문점. 도야호 전망 좌석 있고 50석으로 여유. 가마메시는 따뜻하고 소화가 좋아 어르신에게 적합",
    lat: 42.5650,
    lng: 140.8230,
    gwStatus: "likely",
    familyFriendly: true,
    familyNote: "온천거리 내 솥밥 전문점. 도야호 전망 좌석 있고 50석으로 여유. 가마메시는 따뜻하고 소화가 좋아 어르신에게 적합",
    dayRecommendation: ["Day 3 점심"],
  },

  // ============================================================
  // 끼니 4. Day 3 저녁 — 도야호/토야코온센
  // ============================================================
  {
    id: "d3d-01",
    nameJa: "きつつきカナディアンクラブ",
    nameKr: "키츠츠키 캐나디안 클럽",
    area: "toyako",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010801/1023695/",
    rating: 3.09,
    reviewCount: 28,
    genre: "양식/파스타/함박스테이크",
    representativeMenu: "레드 포크촙 / 밀라노풍 크림 커틀릿 ¥1,500~¥2,500",
    address: "北海道虻田郡洞爺湖町月浦8",
    phone: "0142-75-2228",
    businessHours: "11:00~20:00",
    closedDays: "수요일 (겨울 휴업 있음)",
    totalSeats: 36,
    privateRoom: "없음",
    seatType: "테이블석, 테라스석",
    reservable: "전화 예약 가능",
    parking: "있음",
    priceRange: "¥1,000~¥2,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=きつつきカナディアンクラブ+洞爺湖町月浦",
    seniorNote: "도야호수 전망 통나무집 양식 레스토랑. 느긋한 분위기로 어르신 그룹 저녁 식사에 적합. 포크촙·함박이 인기",
    lat: 42.5850,
    lng: 140.8100,
    gwStatus: "check",
    familyFriendly: true,
    familyNote: "도야호수 전망 통나무집 양식 레스토랑. 느긋한 분위기로 어르신 그룹 저녁 식사에 적합. 포크촙·함박이 인기",
    dayRecommendation: ["Day 3 저녁"],
  },
  {
    id: "d3d-02",
    nameJa: "牛助",
    nameKr: "규스케",
    area: "toyako",
    tabelogUrl: "https://tabelog.com/hokkaido/A0108/A010801/1023681/",
    rating: 3.13,
    reviewCount: 25,
    genre: "야키니쿠/징기스칸",
    representativeMenu: "징기스칸 세트 ¥1,500~ / 야키니쿠 코스 ¥3,000~",
    address: "北海道虻田郡洞爺湖町洞爺湖温泉",
    phone: "0142-75-2687",
    businessHours: "월·수~일 11:00~14:00, 16:30~21:30",
    closedDays: "화요일",
    totalSeats: 40,
    privateRoom: "없음",
    seatType: "테이블석",
    reservable: "전화 예약 가능",
    parking: "있음",
    priceRange: "¥3,000~¥3,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=牛助+洞爺湖温泉144-50",
    seniorNote: "온천마을 야키니쿠점. 테이블석 40석, 예약 가능. 양고기 징기스칸과 홋카이도산 소고기를 1인 ¥3,000대로 즐길 수 있음",
    lat: 42.5660,
    lng: 140.8220,
    gwStatus: "likely",
    familyFriendly: true,
    familyNote: "온천마을 야키니쿠점. 테이블석 40석, 예약 가능. 양고기 징기스칸과 홋카이도산 소고기를 1인 ¥3,000대로 즐길 수 있음",
    dayRecommendation: ["Day 3 저녁"],
  },
  {
    id: "d3d-03",
    nameJa: "松前屋",
    nameKr: "마츠마에야",
    area: "toyako",
    tabelogUrl: "https://tabelog.com/en/hokkaido/A0108/A010801/1023689/",
    rating: 3.08,
    reviewCount: 18,
    genre: "일식/식당",
    representativeMenu: "정식류 ¥1,500~ / 가리비 요리 / 일품요리 ¥3,000~¥5,000",
    address: "北海道虻田郡洞爺湖町洞爺湖温泉40-16",
    phone: "0142-75-2754",
    businessHours: "월·화·금~일 17:30~23:30",
    closedDays: "수·목요일",
    totalSeats: 30,
    privateRoom: "있음 (4명실, 6명실)",
    seatType: "카운터석, 좌식(다다미)",
    reservable: "전화 예약 가능",
    parking: "있음",
    priceRange: "¥3,000~¥5,000",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=松前屋+洞爺湖温泉40-16",
    seniorNote: "온천거리 일식당. 개인실 있어 소그룹으로 나눠 이용 가능. 신선한 가리비·해산물 일품요리가 1인 ¥3,000~¥5,000대",
    lat: 42.5650,
    lng: 140.8220,
    familyFriendly: true,
    familyNote: "온천거리 일식당. 개인실 있어 소그룹으로 나눠 이용 가능. 신선한 가리비·해산물 일품요리가 1인 ¥3,000~¥5,000대",
    dayRecommendation: ["Day 3 저녁"],
  },

  // ============================================================
  // 끼니 5. Day 4 점심 — 시코쓰호 또는 공항
  // ============================================================
  {
    id: "d4l-01",
    nameJa: "お食事処 寿",
    nameKr: "오쇼쿠지도코로 코토부키",
    area: "shikotsu",
    tabelogUrl: "https://tabelog.com/hokkaido/A0107/A010701/1001074/",
    rating: 3.43,
    reviewCount: 147,
    genre: "소바/해산물/스시",
    representativeMenu: "히메마스 야키 세트 ¥2,800 (1일 10식 한정: 구이·초밥·마리네·이소베마키·오스이모노)",
    address: "北海道千歳市支笏湖温泉",
    phone: "0123-25-2642",
    businessHours: "10:30~15:00",
    closedDays: "수요일",
    totalSeats: 30,
    privateRoom: "없음",
    seatType: "카운터석, 테이블석",
    reservable: "불가 (선착순)",
    parking: "시코쓰호 온천 주차장 (승용차 ¥500)",
    priceRange: "¥2,000~¥2,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=お食事処+寿+千歳市支笏湖温泉",
    seniorNote: "1971년 개업 시코쓰호 히메마스(チップ) 전문 노포. 히메마스 세트는 1일 한정이니 오전에 방문 필수. 호수 특산물 만끽",
    lat: 42.7734,
    lng: 141.4040,
    familyFriendly: true,
    familyNote: "1971년 개업 시코쓰호 히메마스(チップ) 전문 노포. 히메마스 세트는 1일 한정이니 오전에 방문 필수. 호수 특산물 만끽",
    dayRecommendation: ["Day 4 점심"],
  },
  {
    id: "d4l-02",
    nameJa: "レイクサイドキッチン トントン",
    nameKr: "레이크사이드 키친 톤톤",
    area: "shikotsu",
    tabelogUrl: "https://tabelog.com/hokkaido/A0107/A010701/1031081/",
    rating: 3.30,
    reviewCount: 97,
    genre: "일식/라멘/징기스칸",
    representativeMenu: "히메마스 시오야키 ¥1,300 / 히메마스 프라이 정식 ¥1,850",
    address: "北海道千歳市支笏湖温泉",
    phone: "0123-25-4011",
    businessHours: "10:30~17:00",
    closedDays: "부정기",
    totalSeats: 50,
    privateRoom: "없음 (대절 가능: 20~50명)",
    seatType: "테이블석",
    reservable: "전화 예약 가능 (대절 가능)",
    parking: "시코쓰호 유료 주차장 (12~3월 무료)",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=レイクサイドキッチン+トントン+支笏湖温泉",
    seniorNote: "50석+대절 가능으로 10명 그룹 최적. 히메마스 구이·프라이 모두 가능. 호숫가 위치로 경치 좋음",
    lat: 42.7731,
    lng: 141.4039,
    familyFriendly: true,
    familyNote: "50석+대절 가능으로 10명 그룹 최적. 히메마스 구이·프라이 모두 가능. 호숫가 위치로 경치 좋음",
    dayRecommendation: ["Day 4 점심"],
  },
  {
    id: "d4l-03",
    nameJa: "ドライブインいとう豚丼名人 新千歳空港店",
    nameKr: "드라이브인 이토 부타동 명인 신치토세공항점",
    area: "shinchitose",
    tabelogUrl: "https://tabelog.com/hokkaido/A0107/A010701/1034346/",
    rating: 3.49,
    reviewCount: 1355,
    genre: "부타동 (돼지고기 덮밥)",
    representativeMenu: "부타동 ¥1,100~ / 고기 1.5배 부타동 / 온천달걀 부타동",
    address: "北海道千歳市美々 新千歳空港 国内線ターミナルビル3F",
    phone: "0123-46-4200",
    businessHours: "월~금 11:00~19:00 (L.O. 18:30) / 토일공휴 11:00~20:00 (L.O. 19:30)",
    closedDays: "연중무휴",
    totalSeats: 40,
    privateRoom: "없음",
    seatType: "테이블석",
    reservable: "불가 (선착순)",
    parking: "공항 주차장",
    priceRange: "¥1,000~¥1,999",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=ドライブインいとう豚丼名人+新千歳空港店",
    seniorNote: "오비히로 명물 부타동의 공항점. Day 1 점심과 겹치지 않는 메뉴. 달콤한 양념 돼지고기밥은 어르신 입맛에 부담 없음",
    lat: 42.7876,
    lng: 141.6807,
    familyFriendly: true,
    familyNote: "오비히로 명물 부타동의 공항점. Day 1 점심과 겹치지 않는 메뉴. 달콤한 양념 돼지고기밥은 어르신 입맛에 부담 없음",
    dayRecommendation: ["Day 4 점심"],
  },
];

/**
 * 지역별 맛집 필터 헬퍼
 */
export function getRestaurantsByArea(area: AreaKey): Restaurant[] {
  return restaurants.filter((r) => r.area === area);
}

/**
 * 시니어 친화적 맛집 (전부 해당)
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
  "day1-lunch": ["d1l-01", "d1l-02", "d1l-03"],   // 공항: 에비소바, 키쿠요, 랏쿄
  "day2-lunch": ["d2l-01", "d2l-02", "d2l-03"],   // 무로란: 노자키, 텐카츠, 하마카츠
  "day3-lunch": ["d3l-01", "d3l-02", "d3l-03"],   // 도야호: 피닉스, 아푸타, 카와나미
  // day3-dinner: 호텔 뷔페 (토야 코한 테이)
  "day4-lunch": ["d4l-01", "d4l-02", "d4l-03"],   // 시코쓰호: 코토부키, 톤톤, 공항 이토
};

/** MapTab용 선별 맛집 ID */
export const SELECTED_RESTAURANT_IDS = new Set([
  "d1l-01", "d1l-02", "d1l-03",
  "d2l-01", "d2l-02", "d2l-03",
  "d3l-01", "d3l-02", "d3l-03",
  "d3d-01", "d3d-02", "d3d-03",
  "d4l-01", "d4l-02", "d4l-03",
]);

export function getSelectedRestaurants(): Restaurant[] {
  return restaurants.filter(r => SELECTED_RESTAURANT_IDS.has(r.id) && r.lat && r.lng);
}
