// 일반인이 쉽게 이해할 수 있는 시술/성형 서비스 카테고리 데이터

/**
 * 메인 카테고리 (옵션1)
 * 일반적으로 표현하는 시술/성형 분야
 */
export const mainCosmeticCategories = [
  { id: "skin", label: "피부 관리111111111111" },
  { id: "face", label: "얼굴 성형" },
  { id: "body", label: "바디 라인" },
  { id: "hair", label: "모발/탈모" },
  { id: "antiaging", label: "노화 방지" },
  { id: "dental", label: "치아 교정/미용" },
  { id: "injectable", label: "주사 시술" },
  { id: "lip", label: "입술 관리" },
  { id: "scar", label: "흉터/점 제거" },
  { id: "eyebrow", label: "눈썹/속눈썹" },
  { id: "laser", label: "레이저 시술" },
  { id: "weight", label: "다이어트/체중" },
];

/**
 * 하위 카테고리 (옵션2)
 * 일반인이 이해하기 쉬운 세부 시술/성형 종류
 */
export const subCosmeticCategories = {
  // 피부 관리 관련 시술
  skin: [
    { id: "skin-basic", label: "기본 피부 관리" },
    { id: "skin-acne", label: "여드름 치료" },
    { id: "skin-pore", label: "모공 관리" },
    { id: "skin-whitening", label: "피부 미백" },
    { id: "skin-exfoliation", label: "각질 관리" },
    { id: "skin-texture", label: "피부결 개선" },
    { id: "skin-hydration", label: "수분 공급" },
    { id: "skin-peeling", label: "필링" },
  ],

  // 얼굴 성형 관련 시술
  face: [
    { id: "face-nose", label: "코 성형" },
    { id: "face-eye", label: "쌍꺼풀/눈 성형" },
    { id: "face-cheek", label: "광대 축소" },
    { id: "face-contour", label: "얼굴 윤곽" },
    { id: "face-jaw", label: "턱 성형" },
    { id: "face-forehead", label: "이마 성형" },
    { id: "face-chin", label: "턱끝 성형" },
    { id: "face-ear", label: "귀 성형" },
  ],

  // 바디 라인 관련 시술
  body: [
    { id: "body-liposuction", label: "지방 흡입" },
    { id: "body-lifting", label: "바디 리프팅" },
    { id: "body-cellulite", label: "셀룰라이트 제거" },
    { id: "body-stretch", label: "튼살 개선" },
    { id: "body-abdomen", label: "복부 성형" },
    { id: "body-arm", label: "팔 성형" },
    { id: "body-leg", label: "다리 성형" },
    { id: "body-hip", label: "엉덩이 성형" },
  ],

  // 모발/탈모 관련 시술
  hair: [
    { id: "hair-loss", label: "탈모 치료" },
    { id: "hair-transplant", label: "모발 이식" },
    { id: "hair-growth", label: "모발 성장 촉진" },
    { id: "hair-scalp", label: "두피 관리" },
    { id: "hair-removal", label: "제모" },
    { id: "hair-styling", label: "헤어 스타일링" },
  ],

  // 노화 방지 관련 시술
  antiaging: [
    { id: "antiaging-wrinkle", label: "주름 개선" },
    { id: "antiaging-lifting", label: "리프팅" },
    { id: "antiaging-tightening", label: "탄력 강화" },
    { id: "antiaging-eye", label: "눈가 주름" },
    { id: "antiaging-neck", label: "목 주름" },
    { id: "antiaging-hand", label: "손 노화 관리" },
    { id: "antiaging-collagen", label: "콜라겐 촉진" },
  ],

  // 치아 교정/미용 관련 시술
  dental: [
    { id: "dental-whitening", label: "치아 미백" },
    { id: "dental-veneer", label: "치아 라미네이트" },
    { id: "dental-alignment", label: "치아 교정" },
    { id: "dental-implant", label: "임플란트" },
    { id: "dental-gum", label: "잇몸 성형" },
    { id: "dental-smile", label: "스마일 라인 개선" },
  ],

  // 주사 시술 관련
  injectable: [
    { id: "injectable-botox", label: "보톡스" },
    { id: "injectable-filler", label: "필러" },
    { id: "injectable-fat", label: "지방 주사" },
    { id: "injectable-prp", label: "피알피 주사" },
    { id: "injectable-vitamin", label: "비타민 주사" },
    { id: "injectable-thread", label: "실 리프팅" },
    { id: "injectable-mesotherapy", label: "메조테라피" },
  ],

  // 입술 관리 관련 시술
  lip: [
    { id: "lip-volume", label: "입술 볼륨" },
    { id: "lip-shape", label: "입술 모양 교정" },
    { id: "lip-line", label: "입술 라인 개선" },
    { id: "lip-plump", label: "입술 필러" },
    { id: "lip-tattoo", label: "입술 문신" },
  ],

  // 흉터/점 제거 관련 시술
  scar: [
    { id: "scar-acne", label: "여드름 흉터" },
    { id: "scar-surgical", label: "수술 흉터" },
    { id: "scar-burn", label: "화상 흉터" },
    { id: "scar-stretch", label: "튼살 흉터" },
    { id: "scar-mole", label: "점 제거" },
    { id: "scar-tattoo", label: "문신 제거" },
  ],

  // 눈썹/속눈썹 관련 시술
  eyebrow: [
    { id: "eyebrow-tattoo", label: "눈썹 문신" },
    { id: "eyebrow-shape", label: "눈썹 정리" },
    { id: "eyebrow-transplant", label: "눈썹 이식" },
    { id: "eyebrow-lift", label: "눈썹 리프팅" },
    { id: "eyebrow-eyelash", label: "속눈썹 연장" },
    { id: "eyebrow-eyelift", label: "눈매 교정" },
  ],

  // 레이저 시술 관련
  laser: [
    { id: "laser-spot", label: "색소 제거" },
    { id: "laser-skin", label: "피부 리서페이싱" },
    { id: "laser-vein", label: "혈관 레이저" },
    { id: "laser-hair", label: "레이저 제모" },
    { id: "laser-tone", label: "피부 톤 개선" },
    { id: "laser-scar", label: "흉터 치료" },
  ],

  // 다이어트/체중 관련 시술
  weight: [
    { id: "weight-management", label: "체중 관리" },
    { id: "weight-slimming", label: "전신 슬리밍" },
    { id: "weight-fat", label: "지방 분해" },
    { id: "weight-reduce", label: "부분 체중 감량" },
    { id: "weight-muscle", label: "근육 강화" },
    { id: "weight-nutrition", label: "영양 요법" },
  ],
};

export default { mainCosmeticCategories, subCosmeticCategories };
