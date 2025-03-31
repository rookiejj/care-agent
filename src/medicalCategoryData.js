// 일반인이 쉽게 이해할 수 있는 비대면 진료 서비스 카테고리 데이터

/**
 * 메인 카테고리 (옵션1)
 * 일상적으로 표현하는 신체 부위나 증상 영역
 */
export const mainCategories = [
  { id: "head", label: "머리/두통" },
  { id: "cold", label: "감기/기침/목아픔" },
  { id: "stomach", label: "배/소화 문제" },
  { id: "skin", label: "피부 문제" },
  { id: "joint", label: "관절/근육 통증" },
  { id: "chest", label: "가슴/심장 문제" },
  { id: "sleep", label: "수면/피로" },
  { id: "eye", label: "눈 문제" },
  { id: "ear", label: "귀 문제" },
  { id: "mental", label: "마음 건강" },
  { id: "allergy", label: "알레르기" },
  { id: "fever", label: "열/감염" },
];

/**
 * 하위 카테고리 (옵션2)
 * 일반인이 경험으로 쉽게 선택할 수 있는 세부 증상들
 */
export const subCategories = {
  // 머리/두통 관련 증상
  head: [
    { id: "head-pain", label: "두통이 있어요" },
    { id: "head-dizziness", label: "어지러워요" },
    { id: "head-migraine", label: "심한 편두통이 있어요" },
    { id: "head-heaviness", label: "머리가 무거워요" },
    { id: "head-pressure", label: "머리가 압박감이 있어요" },
    { id: "head-numb", label: "머리가 저려요" },
    { id: "head-memory", label: "기억력이 떨어져요" },
  ],

  // 감기/기침/목아픔 관련 증상
  cold: [
    { id: "cold-cough", label: "기침이 나요" },
    { id: "cold-sore-throat", label: "목이 아파요" },
    { id: "cold-runny-nose", label: "콧물이 나요" },
    { id: "cold-stuffy-nose", label: "코가 막혀요" },
    { id: "cold-sneezing", label: "재채기가 나요" },
    { id: "cold-phlegm", label: "가래가 있어요" },
    { id: "cold-hard-breath", label: "숨쉬기 힘들어요" },
    { id: "cold-voice", label: "목소리가 변했어요" },
  ],

  // 배/소화 문제 관련 증상
  stomach: [
    { id: "stomach-pain", label: "배가 아파요" },
    { id: "stomach-nausea", label: "속이 메스꺼워요" },
    { id: "stomach-diarrhea", label: "설사를 해요" },
    { id: "stomach-constipation", label: "변비가 있어요" },
    { id: "stomach-indigestion", label: "소화가 안 돼요" },
    { id: "stomach-heartburn", label: "속쓰림이 있어요" },
    { id: "stomach-bloating", label: "배가 더부룩해요" },
    { id: "stomach-gas", label: "가스가 많이 차요" },
    { id: "stomach-vomiting", label: "구토를 했어요" },
  ],

  // 피부 문제 관련 증상
  skin: [
    { id: "skin-rash", label: "발진이 생겼어요" },
    { id: "skin-itchy", label: "피부가 가려워요" },
    { id: "skin-dry", label: "피부가 건조해요" },
    { id: "skin-acne", label: "여드름이 생겼어요" },
    { id: "skin-hives", label: "두드러기가 났어요" },
    { id: "skin-wound", label: "상처/염증이 있어요" },
    { id: "skin-color", label: "피부 색이 변했어요" },
    { id: "skin-swollen", label: "피부가 부었어요" },
    { id: "skin-hairloss", label: "머리카락이 빠져요" },
  ],

  // 관절/근육 통증 관련 증상
  joint: [
    { id: "joint-back", label: "허리가 아파요" },
    { id: "joint-knee", label: "무릎이 아파요" },
    { id: "joint-shoulder", label: "어깨가 아파요" },
    { id: "joint-neck", label: "목이 아파요" },
    { id: "joint-wrist", label: "손목/발목이 아파요" },
    { id: "joint-muscle", label: "근육통이 있어요" },
    { id: "joint-swelling", label: "관절이 부었어요" },
    { id: "joint-stiffness", label: "관절이 뻣뻣해요" },
    { id: "joint-sprain", label: "삐끗했어요" },
  ],

  // 가슴/심장 문제 관련 증상
  chest: [
    { id: "chest-pain", label: "가슴이 아파요" },
    { id: "chest-palpitation", label: "심장이 두근거려요" },
    { id: "chest-breath", label: "숨이 차요" },
    { id: "chest-pressure", label: "가슴이 답답해요" },
    { id: "chest-cough", label: "가슴이 아프면서 기침이 나요" },
    { id: "chest-burn", label: "가슴이 화끈거려요" },
  ],

  // 수면/피로 관련 증상
  sleep: [
    { id: "sleep-insomnia", label: "잠이 안 와요" },
    { id: "sleep-too-much", label: "너무 많이 자요" },
    { id: "sleep-tired", label: "항상 피곤해요" },
    { id: "sleep-apnea", label: "자다가 숨을 못 쉬어요" },
    { id: "sleep-snoring", label: "코골이가 심해요" },
    { id: "sleep-nightmares", label: "악몽을 자주 꿔요" },
    { id: "sleep-energy", label: "기운이 없어요" },
  ],

  // 눈 문제 관련 증상
  eye: [
    { id: "eye-pain", label: "눈이 아파요" },
    { id: "eye-red", label: "눈이 충혈됐어요" },
    { id: "eye-dry", label: "눈이 건조해요" },
    { id: "eye-itchy", label: "눈이 가려워요" },
    { id: "eye-vision", label: "시력이 안 좋아졌어요" },
    { id: "eye-blur", label: "시야가 흐려요" },
    { id: "eye-double", label: "물체가 둘로 보여요" },
    { id: "eye-stye", label: "눈에 다래끼가 생겼어요" },
    { id: "eye-light", label: "눈이 부셔요" },
  ],

  // 귀 문제 관련 증상
  ear: [
    { id: "ear-pain", label: "귀가 아파요" },
    { id: "ear-ringing", label: "귀에서 소리가 들려요" },
    { id: "ear-hearing", label: "잘 안 들려요" },
    { id: "ear-discharge", label: "귀에서 분비물이 나와요" },
    { id: "ear-itchy", label: "귀가 가려워요" },
    { id: "ear-fullness", label: "귀가 막힌 느낌이에요" },
    { id: "ear-dizziness", label: "귀 문제로 어지러워요" },
  ],

  // 마음 건강 관련 증상
  mental: [
    { id: "mental-anxiety", label: "불안해요" },
    { id: "mental-depression", label: "우울해요" },
    { id: "mental-stress", label: "스트레스가 심해요" },
    { id: "mental-focus", label: "집중이 안 돼요" },
    { id: "mental-mood", label: "기분 변화가 심해요" },
    { id: "mental-panic", label: "갑자기 심장이 뛰고 식은땀이 나요" },
    { id: "mental-obsession", label: "같은 생각이 반복돼요" },
    { id: "mental-anger", label: "화가 자주 나요" },
  ],

  // 알레르기 관련 증상
  allergy: [
    { id: "allergy-skin", label: "피부 알레르기가 있어요" },
    { id: "allergy-food", label: "음식 알레르기가 있어요" },
    { id: "allergy-respiratory", label: "알레르기성 비염이 있어요" },
    { id: "allergy-eyes", label: "눈 알레르기가 있어요" },
    { id: "allergy-drug", label: "약물 알레르기가 있어요" },
    { id: "allergy-insect", label: "벌레 물림에 알레르기가 있어요" },
    { id: "allergy-unknown", label: "원인 모를 알레르기 반응이 있어요" },
  ],

  // 열/감염 관련 증상
  fever: [
    { id: "fever-high", label: "고열이 있어요" },
    { id: "fever-chills", label: "오한이 있어요" },
    { id: "fever-sweat", label: "식은땀이 나요" },
    { id: "fever-body-ache", label: "몸살이 있어요" },
    { id: "fever-swollen-gland", label: "림프선이 부었어요" },
    { id: "fever-unknown", label: "미확인 감염 의심돼요" },
    { id: "fever-recurring", label: "열이 반복적으로 나요" },
  ],
};

export default { mainCategories, subCategories };
