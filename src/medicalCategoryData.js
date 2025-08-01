// 일반인이 쉽게 이해할 수 있는 비대면 진료 서비스 카테고리 데이터

/**
 * 메인 카테고리 (옵션1)
 * 일상적으로 표현하는 신체 부위나 증상 영역
 */
export const mainCategories = [
  {
    id: "head",
    label: "머리/두통",
    description: "두통, 편두통, 어지러움 등 머리 부위의 통증과 불편함",
  },
  {
    id: "cold",
    label: "기침/목아픔",
    description: "감기, 인후통, 기침, 콧물 등 상기도 관련 증상",
  },
  {
    id: "stomach",
    label: "배/소화 문제",
    description: "복통, 소화불량, 메스꺼움, 설사, 변비 등의 소화기 증상",
  },
  {
    id: "skin",
    label: "피부 문제",
    description: "발진, 가려움, 건조함, 여드름 등 다양한 피부 질환",
  },
  {
    id: "joint",
    label: "관절/근육 통증",
    description: "관절통, 근육통, 허리 통증 등 움직임에 관련된 통증",
  },
  {
    id: "chest",
    label: "가슴/심장 문제",
    description: "가슴 통증, 심장 두근거림, 호흡 곤란 등의 증상",
  },
  {
    id: "sleep",
    label: "수면/피로",
    description: "불면증, 과다 수면, 만성 피로 등 수면과 관련된 문제",
  },
  {
    id: "eye",
    label: "눈 문제",
    description: "충혈, 시력 저하, 건조함 등 눈에 관련된 불편함",
  },
  {
    id: "ear",
    label: "귀 문제",
    description: "이통, 청력 저하, 이명 등 귀와 관련된 증상",
  },
  {
    id: "mental",
    label: "마음 건강",
    description: "우울, 불안, 스트레스 등 정신 건강 관련 증상",
  },
  {
    id: "allergy",
    label: "알레르기",
    description: "알레르기 반응, 두드러기, 비염 등 과민 반응",
  },
  {
    id: "fever",
    label: "열/감염",
    description: "발열, 오한, 몸살 등 감염 관련 증상",
  },
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

/**
 * 의료 전문 과목 카테고리
 * 각 진료과목 별 전문 분야
 */
export const medicalSpecialties = [
  {
    id: "internal",
    label: "내과",
    description: "성인의 내부 장기 질환을 진단하고 치료하는 비수술적 의학 분야",
  },
  {
    id: "surgery",
    label: "외과",
    description: "수술적 방법으로 질병이나 외상을 치료하는 의학 분야",
  },
  {
    id: "obgyn",
    label: "산부인과",
    description:
      "여성 생식기 질환, 임신, 출산 관련 건강을 전문으로 하는 의학 분야",
  },
  {
    id: "pediatrics",
    label: "소아과",
    description: "영유아부터 청소년까지의 성장과 발달, 질병을 다루는 의학 분야",
  },
  {
    id: "neurology",
    label: "신경과",
    description:
      "뇌, 척수, 말초신경 등 신경계 질환을 진단하고 치료하는 의학 분야",
  },
  {
    id: "psychiatry",
    label: "정신건강의학과",
    description:
      "정신 질환, 정서적 장애, 행동 문제를 진단하고 치료하는 의학 분야",
  },
  {
    id: "orthopedics",
    label: "정형외과",
    description:
      "근골격계(뼈, 관절, 근육, 인대, 힘줄) 질환과 외상을 치료하는 의학 분야",
  },
  {
    id: "dermatology",
    label: "피부과",
    description:
      "피부, 머리카락, 손톱 등 피부 관련 질환을 진단하고 치료하는 의학 분야",
  },
  {
    id: "ophthalmology",
    label: "안과",
    description: "눈 질환과 시력 문제를 진단하고 치료하는 의학 분야",
  },
  {
    id: "ent",
    label: "이비인후과",
    description: "귀, 코, 목 관련 질환을 진단하고 치료하는 의학 분야",
  },
  {
    id: "urology",
    label: "비뇨기과",
    description: "요로계통과 남성 생식기 질환을 진단하고 치료하는 의학 분야",
  },
  {
    id: "dentistry",
    label: "치과",
    description: "치아, 잇몸, 구강 건강을 관리하고 치료하는 의학 분야",
  },
  {
    id: "rehabilitation",
    label: "재활의학과",
    description: "장애나 부상 후 신체 기능을 회복하는데 도움을 주는 의학 분야",
  },
  {
    id: "family",
    label: "가정의학과",
    description:
      "모든 연령과 성별의 일반적인 건강 문제를 다루는 통합적 의학 분야",
  },
  {
    id: "oriental",
    label: "한의원",
    description:
      "한약, 침술 등 전통적인 동양 의학 방법으로 질병을 치료하는 의료 분야",
  },
  {
    id: "cardiology",
    label: "심장내과",
    description: "심장 및 혈관 질환을 전문적으로 진단하고 치료하는 내과 분야",
  },
  {
    id: "gastroenterology",
    label: "소화기내과",
    description:
      "식도, 위, 장, 간, 담도, 췌장 등 소화기관 질환을 다루는 내과 분야",
  },
  {
    id: "pulmonology",
    label: "호흡기내과",
    description: "폐, 기관지 등 호흡기 질환을 진단하고 치료하는 내과 분야",
  },
  {
    id: "allergy",
    label: "알레르기내과",
    description: "알레르기, 천식, 면역 관련 질환을 전문적으로 다루는 내과 분야",
  },
  {
    id: "endocrinology",
    label: "내분비내과",
    description: "호르몬 관련 질환과 대사 장애를 진단하고 치료하는 내과 분야",
  },
  {
    id: "plastic",
    label: "성형외과",
    description:
      "선천적 또는 후천적 신체 결함이나 미용 목적의 수술을 하는 외과 분야",
  },
  {
    id: "pain",
    label: "통증의학과",
    description: "만성 통증을 전문적으로 진단하고 관리하는 의학 분야",
  },
];

/**
 * 의료 전문 과목 그룹
 * 세부 전문 분야를 대분류로 묶음
 */
export const specialtyGroups = [
  {
    id: "internalMedicine",
    label: "내과계열",
    specialties: [
      "internal",
      "cardiology",
      "gastroenterology",
      "pulmonology",
      "allergy",
      "endocrinology",
    ],
  },
  {
    id: "surgery",
    label: "외과계열",
    specialties: ["surgery", "orthopedics", "plastic"],
  },
  {
    id: "neuro",
    label: "신경계열",
    specialties: ["neurology", "psychiatry", "rehabilitation"],
  },
  {
    id: "specializedClinic",
    label: "전문클리닉",
    specialties: [
      "dermatology",
      "ophthalmology",
      "ent",
      "urology",
      "obgyn",
      "pain",
    ],
  },
  {
    id: "generalPractice",
    label: "일반진료",
    specialties: ["family", "pediatrics"],
  },
  {
    id: "dental",
    label: "치과계열",
    specialties: ["dentistry"],
  },
  {
    id: "oriental",
    label: "한의학계열",
    specialties: ["oriental"],
  },
];

/**
 * 메인 카테고리와 전문 과목 매핑
 * 증상 기반 메인 카테고리와 관련된 전문 과목 연결
 */
export const categoryToSpecialtyMapping = {
  head: ["neurology", "psychiatry", "pain", "internal", "family"],
  cold: ["pulmonology", "ent", "internal", "family", "allergy"],
  stomach: ["gastroenterology", "internal", "surgery", "family"],
  skin: ["dermatology", "allergy", "family"],
  joint: ["orthopedics", "rehabilitation", "pain", "family"],
  chest: ["cardiology", "pulmonology", "internal", "family"],
  sleep: ["neurology", "psychiatry", "pulmonology", "family"],
  eye: ["ophthalmology", "family"],
  ear: ["ent", "family"],
  mental: ["psychiatry", "neurology", "family"],
  allergy: ["allergy", "dermatology", "pulmonology", "ent", "family"],
  fever: ["internal", "allergy", "pulmonology", "gastroenterology", "family"],
};

/**
 * 의료 기관 타입 카테고리
 * 의료기관의 종류
 */
export const medicalFacilityTypes = [
  { id: "clinic", label: "의원" }, // 일반 의원
  { id: "hospital", label: "병원" }, // 병원
  { id: "general", label: "종합병원" }, // 종합병원
  { id: "university", label: "대학병원" }, // 대학병원
  { id: "oriental", label: "한의원" }, // 한의원
  { id: "dental", label: "치과" }, // 치과
  { id: "public", label: "보건소" }, // 보건소
  { id: "pharmacy", label: "약국" }, // 약국
];

/**
 * 의사 전문 과목에 따른 태그 스타일 클래스 결정
 * @param {string} specialty - 전문 과목 ID
 * @returns {string} 태그 스타일 클래스명
 */
export const getSpecialtyTagClass = (specialty) => {
  const specialtyClasses = {
    neurology: "neurology",
    cardiology: "cardiology",
    dermatology: "dermatology",
    orthopedics: "orthopedics",
    gastroenterology: "gastroenterology",
    ophthalmology: "ophthalmology",
    ent: "ent",
    psychiatry: "psychiatry",
    pulmonology: "pulmonology",
  };

  return specialtyClasses[specialty] || "default";
};

/**
 * 전문 과목 ID를 한글명으로 변환
 * @param {string} specialty - 전문 과목 ID
 * @returns {string} 한글 전문 과목명
 */
export const getSpecialtyKoreanName = (specialty) => {
  const specialtyNames = {
    neurology: "신경과",
    cardiology: "심장내과",
    dermatology: "피부과",
    orthopedics: "정형외과",
    gastroenterology: "소화기내과",
    ophthalmology: "안과",
    ent: "이비인후과",
    psychiatry: "정신건강의학과",
    pulmonology: "호흡기내과",
    internal: "내과",
    family: "가정의학과",
    pain: "통증의학과",
    allergy: "알레르기내과",
    surgery: "외과",
    pediatrics: "소아과",
    obgyn: "산부인과",
    urology: "비뇨기과",
    rehabilitation: "재활의학과",
    dentistry: "치과",
    oriental: "한의원",
    endocrinology: "내분비내과",
    plastic: "성형외과",
  };

  return specialtyNames[specialty] || specialty;
};

/**
 * 서브스페셜티 태그 한글화 함수 - 간결한 전문 용어로 변경
 * @param {string} tag - 서브스페셜티 태그 ID
 * @returns {string} 한글 서브스페셜티명
 */
export const getSubSpecialtyKoreanName = (tag) => {
  // 전체 태그 매핑 (medicalCategoryData.js의 subCategories에서 추출)
  const fullTagKoreanMap = {
    // 머리/두통 관련
    "head-pain": "두통",
    "head-dizziness": "어지럼증",
    "head-migraine": "편두통",
    "head-heaviness": "두부무거움",
    "head-pressure": "두부압박감",
    "head-numb": "두부저림",
    "head-memory": "기억력저하",

    // 감기/기침/목아픔 관련
    "cold-cough": "기침",
    "cold-sore-throat": "인후통",
    "cold-runny-nose": "콧물",
    "cold-stuffy-nose": "비강폐색",
    "cold-sneezing": "재채기",
    "cold-phlegm": "가래",
    "cold-hard-breath": "호흡곤란",
    "cold-voice": "음성변화",

    // 배/소화 문제 관련
    "stomach-pain": "복통",
    "stomach-nausea": "구역감",
    "stomach-diarrhea": "설사",
    "stomach-constipation": "변비",
    "stomach-indigestion": "소화불량",
    "stomach-heartburn": "속쓰림",
    "stomach-bloating": "복부팽만감",
    "stomach-gas": "가스과다",
    "stomach-vomiting": "구토",

    // 피부 문제 관련
    "skin-rash": "발진",
    "skin-itchy": "소양증",
    "skin-dry": "건조피부",
    "skin-acne": "여드름",
    "skin-hives": "두드러기",
    "skin-wound": "상처/염증",
    "skin-color": "색소침착",
    "skin-swollen": "피부부종",
    "skin-hairloss": "탈모",

    // 관절/근육 통증 관련
    "joint-back": "요통",
    "joint-knee": "슬관절통",
    "joint-shoulder": "견관절통",
    "joint-neck": "경부통",
    "joint-wrist": "완/족관절통",
    "joint-muscle": "근육통",
    "joint-swelling": "관절부종",
    "joint-stiffness": "관절강직",
    "joint-sprain": "염좌",

    // 가슴/심장 문제 관련
    "chest-pain": "흉통",
    "chest-palpitation": "심계항진",
    "chest-breath": "호흡곤란",
    "chest-pressure": "흉부압박감",
    "chest-cough": "기침성흉통",
    "chest-burn": "흉부작열감",

    // 수면/피로 관련
    "sleep-insomnia": "불면증",
    "sleep-too-much": "과다수면",
    "sleep-tired": "만성피로",
    "sleep-apnea": "수면무호흡",
    "sleep-snoring": "코골이",
    "sleep-nightmares": "악몽",
    "sleep-energy": "기력저하",

    // 눈 문제 관련
    "eye-pain": "안통",
    "eye-red": "충혈",
    "eye-dry": "건조안",
    "eye-itchy": "안구소양감",
    "eye-vision": "시력저하",
    "eye-blur": "시야흐림",
    "eye-double": "복시",
    "eye-stye": "맥립종",
    "eye-light": "광과민성",

    // 귀 문제 관련
    "ear-pain": "이통",
    "ear-ringing": "이명",
    "ear-hearing": "청력저하",
    "ear-discharge": "이루",
    "ear-itchy": "외이도소양감",
    "ear-fullness": "이충만감",
    "ear-dizziness": "어지럼증",

    // 마음 건강 관련
    "mental-anxiety": "불안증",
    "mental-depression": "우울증",
    "mental-stress": "스트레스",
    "mental-focus": "집중력저하",
    "mental-mood": "기분변화",
    "mental-panic": "공황발작",
    "mental-obsession": "강박증상",
    "mental-anger": "분노조절장애",

    // 알레르기 관련
    "allergy-skin": "피부알레르기",
    "allergy-food": "식품알레르기",
    "allergy-respiratory": "알레르기비염",
    "allergy-eyes": "알레르기결막염",
    "allergy-drug": "약물알레르기",
    "allergy-insect": "곤충알레르기",
    "allergy-unknown": "원인미상알레르기",

    // 열/감염 관련
    "fever-high": "고열",
    "fever-chills": "오한",
    "fever-sweat": "식은땀",
    "fever-body-ache": "근육통",
    "fever-swollen-gland": "림프선종대",
    "fever-unknown": "불명열",
    "fever-recurring": "재발열",
  };

  // 전체 태그 매핑에서 찾기
  if (fullTagKoreanMap[tag]) {
    return fullTagKoreanMap[tag];
  }

  // 태그에서 하이픈 뒤의 부분 추출 (예: "head-pain" -> "pain")
  const subTag = tag.includes("-") ? tag.split("-")[1] : tag;

  // 미리 정의된 부분 태그 매핑을 사용해 한글로 변환
  const subSpecialtyKoreanMap = {
    // 기존 증상 관련
    pain: "통증",
    high: "고열",
    fever: "발열",
    ingestion: "소화불량",
    indigestion: "소화불량",
    cough: "기침",
    cold: "감기",
    headache: "두통",
    dizziness: "어지럼증",
    memory: "기억력저하",
    migraine: "편두통",
    heaviness: "무거움",
    pressure: "압박감",
    numb: "저림",
    allergy: "알레르기",
    itchy: "소양감",
    rash: "발진",
    swollen: "부종",
    nausea: "구역감",
    vomiting: "구토",
    diarrhea: "설사",
    constipation: "변비",
    stress: "스트레스",
    anxiety: "불안",
    depression: "우울",
    insomnia: "불면증",
    bloating: "복부팽만",
    heartburn: "속쓰림",
    gas: "가스",
    focus: "집중력저하",
    mood: "기분변화",
    panic: "공황",
    obsession: "강박",
    anger: "분노조절",
    palpitation: "심계항진",
    breath: "호흡곤란",
    apnea: "무호흡",
    snoring: "코골이",
    dry: "건조",
    vision: "시력저하",
    hearing: "청력저하",
    ringing: "이명",
    stiffness: "강직",
    swelling: "부종",
    respiratory: "호흡기질환",

    // 성형 관련 항목 추가
    facelift: "안면거상술",
    rhinoplasty: "코성형",
    blepharoplasty: "눈꺼풀성형",
    liposuction: "지방흡입",
    botox: "보톡스",
    filler: "필러",
    lifting: "리프팅",
    augmentation: "확대성형",
    reduction: "축소성형",
    implant: "임플란트",
    rejuvenation: "회춘술",
    thread: "실리프팅",
    laser: "레이저시술",
    dermabrasion: "박피술",
    peel: "필링",
    contouring: "윤곽술",
    jawline: "턱선성형",
    cheekbone: "광대축소",
    double: "쌍꺼풀",
    eyelid: "눈꺼풀",
    nose: "코성형",
    chin: "턱성형",
    breast: "가슴성형",
    abdomen: "복부성형",
    body: "체형교정",
    scar: "흉터제거",
    forehead: "이마성형",
    wrinkle: "주름개선",
    face: "안면성형",
    hair: "모발이식",
    lipoplasty: "지방흡입",
    tummy: "복부성형",
    anti: "안티에이징",
    aging: "노화방지",
    cellulite: "셀룰라이트",
    pigmentation: "색소침착",
    spot: "기미/잡티",
    acne: "여드름치료",
    injection: "주사요법",

    // 기타 태그
    specialist: "전문의",
    general: "일반의",
    emergency: "응급진료",
    chronic: "만성질환",
    acute: "급성질환",
    cosmetic: "미용성형",
    reconstructive: "재건성형",
    minimal: "최소침습",
    non: "비수술적",
    surgical: "수술적",
    consultation: "상담",
    procedure: "시술",
    operation: "수술",
    recovery: "회복",
    postop: "수술후관리",
  };

  // 부분 태그 매핑에서 찾기
  if (subSpecialtyKoreanMap[subTag]) {
    return subSpecialtyKoreanMap[subTag];
  }

  // 찾을 수 없으면 원본 그대로 반환
  return tag;
};
