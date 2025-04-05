// 지역 선택을 위한 데이터 구조 (시/도, 구/군, 동/읍/면)

/**
 * 지역 데이터 구조
 * - 사용자가 쉽게 지역을 선택할 수 있는 계층형 데이터
 * - 병원 찾기 및 필터링에 최적화된 구조
 */

/**
 * 최상위 지역 (시/도)
 * 한국의 17개 광역시/도 정보
 */
export const topRegions = [
  {
    id: "seoul",
    label: "서울특별시",
    type: "capital",
    population: "high",
    hospitalDensity: "very_high",
  },
  {
    id: "busan",
    label: "부산광역시",
    type: "metro",
    population: "high",
    hospitalDensity: "high",
  },
  {
    id: "daegu",
    label: "대구광역시",
    type: "metro",
    population: "medium",
    hospitalDensity: "high",
  },
  {
    id: "incheon",
    label: "인천광역시",
    type: "metro",
    population: "medium",
    hospitalDensity: "high",
  },
  {
    id: "gwangju",
    label: "광주광역시",
    type: "metro",
    population: "medium",
    hospitalDensity: "high",
  },
  {
    id: "daejeon",
    label: "대전광역시",
    type: "metro",
    population: "medium",
    hospitalDensity: "high",
  },
  {
    id: "ulsan",
    label: "울산광역시",
    type: "metro",
    population: "medium",
    hospitalDensity: "medium",
  },
  {
    id: "sejong",
    label: "세종특별자치시",
    type: "special",
    population: "low",
    hospitalDensity: "medium",
  },
  {
    id: "gyeonggi",
    label: "경기도",
    type: "province",
    population: "very_high",
    hospitalDensity: "high",
  },
  {
    id: "gangwon",
    label: "강원도",
    type: "province",
    population: "low",
    hospitalDensity: "low",
  },
  {
    id: "chungbuk",
    label: "충청북도",
    type: "province",
    population: "low",
    hospitalDensity: "medium",
  },
  {
    id: "chungnam",
    label: "충청남도",
    type: "province",
    population: "medium",
    hospitalDensity: "medium",
  },
  {
    id: "jeonbuk",
    label: "전라북도",
    type: "province",
    population: "low",
    hospitalDensity: "medium",
  },
  {
    id: "jeonnam",
    label: "전라남도",
    type: "province",
    population: "low",
    hospitalDensity: "low",
  },
  {
    id: "gyeongbuk",
    label: "경상북도",
    type: "province",
    population: "medium",
    hospitalDensity: "medium",
  },
  {
    id: "gyeongnam",
    label: "경상남도",
    type: "province",
    population: "medium",
    hospitalDensity: "medium",
  },
  {
    id: "jeju",
    label: "제주특별자치도",
    type: "special",
    population: "low",
    hospitalDensity: "medium",
  },
];

/**
 * 중분류 지역 (구/군)
 * 각 시/도별 구/군 정보
 */
export const midRegions = {
  // 서울특별시의 구
  seoul: [
    {
      id: "gangnam",
      label: "강남구",
      hospitalDensity: "very_high",
      isMedicalHub: true,
    },
    { id: "gangdong", label: "강동구", hospitalDensity: "high" },
    { id: "gangbuk", label: "강북구", hospitalDensity: "medium" },
    { id: "gangseo", label: "강서구", hospitalDensity: "high" },
    { id: "gwanak", label: "관악구", hospitalDensity: "medium" },
    { id: "gwangjin", label: "광진구", hospitalDensity: "high" },
    { id: "guro", label: "구로구", hospitalDensity: "medium" },
    { id: "geumcheon", label: "금천구", hospitalDensity: "medium" },
    { id: "nowon", label: "노원구", hospitalDensity: "high" },
    { id: "dobong", label: "도봉구", hospitalDensity: "medium" },
    { id: "dongdaemun", label: "동대문구", hospitalDensity: "high" },
    { id: "dongjak", label: "동작구", hospitalDensity: "medium" },
    { id: "mapo", label: "마포구", hospitalDensity: "high" },
    { id: "seodaemun", label: "서대문구", hospitalDensity: "high" },
    {
      id: "seocho",
      label: "서초구",
      hospitalDensity: "very_high",
      isMedicalHub: true,
    },
    { id: "seongdong", label: "성동구", hospitalDensity: "high" },
    { id: "seongbuk", label: "성북구", hospitalDensity: "high" },
    { id: "songpa", label: "송파구", hospitalDensity: "high" },
    { id: "yangcheon", label: "양천구", hospitalDensity: "medium" },
    { id: "yeongdeungpo", label: "영등포구", hospitalDensity: "high" },
    { id: "yongsan", label: "용산구", hospitalDensity: "high" },
    { id: "eunpyeong", label: "은평구", hospitalDensity: "medium" },
    { id: "jongno", label: "종로구", hospitalDensity: "high" },
    { id: "jung", label: "중구", hospitalDensity: "high" },
    { id: "jungnang", label: "중랑구", hospitalDensity: "medium" },
  ],

  // 부산광역시의 구/군
  busan: [
    { id: "gangseo", label: "강서구", hospitalDensity: "medium" },
    { id: "geumjeong", label: "금정구", hospitalDensity: "medium" },
    { id: "gijang", label: "기장군", hospitalDensity: "low" },
    { id: "nam", label: "남구", hospitalDensity: "high" },
    { id: "dong", label: "동구", hospitalDensity: "medium" },
    {
      id: "dongnae",
      label: "동래구",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "busanjin", label: "부산진구", hospitalDensity: "high" },
    { id: "buk", label: "북구", hospitalDensity: "medium" },
    { id: "sasang", label: "사상구", hospitalDensity: "medium" },
    { id: "saha", label: "사하구", hospitalDensity: "medium" },
    { id: "seo", label: "서구", hospitalDensity: "medium" },
    { id: "suyeong", label: "수영구", hospitalDensity: "high" },
    { id: "yeonje", label: "연제구", hospitalDensity: "high" },
    { id: "yeongdo", label: "영도구", hospitalDensity: "medium" },
    { id: "jung", label: "중구", hospitalDensity: "high" },
    { id: "haeundae", label: "해운대구", hospitalDensity: "high" },
  ],

  // 인천광역시의 구/군
  incheon: [
    { id: "ganghwa", label: "강화군", hospitalDensity: "low" },
    { id: "gyeyang", label: "계양구", hospitalDensity: "medium" },
    { id: "namdong", label: "남동구", hospitalDensity: "high" },
    { id: "dong", label: "동구", hospitalDensity: "medium" },
    { id: "michuhol", label: "미추홀구", hospitalDensity: "high" },
    { id: "bupyeong", label: "부평구", hospitalDensity: "high" },
    { id: "seo", label: "서구", hospitalDensity: "high" },
    {
      id: "yeonsu",
      label: "연수구",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "jung", label: "중구", hospitalDensity: "medium" },
    { id: "ongjin", label: "옹진군", hospitalDensity: "very_low" },
  ],

  // 대구광역시의 구/군
  daegu: [
    { id: "nam", label: "남구", hospitalDensity: "medium" },
    { id: "dalseo", label: "달서구", hospitalDensity: "high" },
    { id: "dalseong", label: "달성군", hospitalDensity: "low" },
    { id: "dong", label: "동구", hospitalDensity: "high" },
    { id: "buk", label: "북구", hospitalDensity: "medium" },
    { id: "seo", label: "서구", hospitalDensity: "high" },
    {
      id: "suseong",
      label: "수성구",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "jung", label: "중구", hospitalDensity: "high" },
  ],

  // 광주광역시의 구
  gwangju: [
    { id: "gwangsan", label: "광산구", hospitalDensity: "medium" },
    { id: "nam", label: "남구", hospitalDensity: "high" },
    { id: "dong", label: "동구", hospitalDensity: "high", isMedicalHub: true },
    { id: "buk", label: "북구", hospitalDensity: "medium" },
    { id: "seo", label: "서구", hospitalDensity: "high" },
  ],

  // 대전광역시의 구
  daejeon: [
    { id: "daedeok", label: "대덕구", hospitalDensity: "medium" },
    { id: "dong", label: "동구", hospitalDensity: "medium" },
    { id: "seo", label: "서구", hospitalDensity: "high", isMedicalHub: true },
    { id: "yuseong", label: "유성구", hospitalDensity: "high" },
    { id: "jung", label: "중구", hospitalDensity: "high" },
  ],

  // 울산광역시의 구/군
  ulsan: [
    { id: "nam", label: "남구", hospitalDensity: "high", isMedicalHub: true },
    { id: "dong", label: "동구", hospitalDensity: "medium" },
    { id: "buk", label: "북구", hospitalDensity: "medium" },
    { id: "ulju", label: "울주군", hospitalDensity: "low" },
    { id: "jung", label: "중구", hospitalDensity: "high" },
  ],

  // 세종특별자치시
  sejong: [
    { id: "all", label: "세종시 전체", hospitalDensity: "medium" },
    // 세종시는 행정구역 체계가 다르므로 별도 처리 필요 시 추가
  ],

  // 경기도의 시/군
  gyeonggi: [
    { id: "goyang", label: "고양시", hospitalDensity: "high" },
    { id: "gwacheon", label: "과천시", hospitalDensity: "medium" },
    { id: "gwangmyeong", label: "광명시", hospitalDensity: "medium" },
    { id: "gwangju", label: "광주시", hospitalDensity: "medium" },
    { id: "guri", label: "구리시", hospitalDensity: "medium" },
    { id: "gunpo", label: "군포시", hospitalDensity: "medium" },
    { id: "gimpo", label: "김포시", hospitalDensity: "medium" },
    { id: "namyangju", label: "남양주시", hospitalDensity: "medium" },
    { id: "dongducheon", label: "동두천시", hospitalDensity: "low" },
    { id: "bucheon", label: "부천시", hospitalDensity: "high" },
    {
      id: "seongnam",
      label: "성남시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    {
      id: "suwon",
      label: "수원시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "siheung", label: "시흥시", hospitalDensity: "medium" },
    { id: "ansan", label: "안산시", hospitalDensity: "high" },
    { id: "anseong", label: "안성시", hospitalDensity: "low" },
    { id: "anyang", label: "안양시", hospitalDensity: "high" },
    { id: "yangju", label: "양주시", hospitalDensity: "low" },
    { id: "yangpyeong", label: "양평군", hospitalDensity: "low" },
    { id: "yeoju", label: "여주시", hospitalDensity: "low" },
    { id: "yeoncheon", label: "연천군", hospitalDensity: "very_low" },
    { id: "osan", label: "오산시", hospitalDensity: "medium" },
    { id: "yongin", label: "용인시", hospitalDensity: "high" },
    { id: "uiwang", label: "의왕시", hospitalDensity: "medium" },
    { id: "uijeongbu", label: "의정부시", hospitalDensity: "high" },
    { id: "icheon", label: "이천시", hospitalDensity: "medium" },
    { id: "paju", label: "파주시", hospitalDensity: "medium" },
    { id: "pyeongtaek", label: "평택시", hospitalDensity: "medium" },
    { id: "pocheon", label: "포천시", hospitalDensity: "low" },
    { id: "hanam", label: "하남시", hospitalDensity: "medium" },
    { id: "hwaseong", label: "화성시", hospitalDensity: "medium" },
    { id: "gapyeong", label: "가평군", hospitalDensity: "low" },
  ],

  // 강원도의 시/군
  gangwon: [
    { id: "gangneung", label: "강릉시", hospitalDensity: "medium" },
    { id: "goseong", label: "고성군", hospitalDensity: "very_low" },
    { id: "donghae", label: "동해시", hospitalDensity: "low" },
    { id: "samcheok", label: "삼척시", hospitalDensity: "low" },
    { id: "sokcho", label: "속초시", hospitalDensity: "medium" },
    { id: "yanggu", label: "양구군", hospitalDensity: "very_low" },
    { id: "yangyang", label: "양양군", hospitalDensity: "very_low" },
    { id: "yeongwol", label: "영월군", hospitalDensity: "very_low" },
    {
      id: "wonju",
      label: "원주시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "inje", label: "인제군", hospitalDensity: "very_low" },
    { id: "jeongseon", label: "정선군", hospitalDensity: "very_low" },
    { id: "cheorwon", label: "철원군", hospitalDensity: "very_low" },
    { id: "chuncheon", label: "춘천시", hospitalDensity: "medium" },
    { id: "taebaek", label: "태백시", hospitalDensity: "low" },
    { id: "pyeongchang", label: "평창군", hospitalDensity: "low" },
    { id: "hongcheon", label: "홍천군", hospitalDensity: "low" },
    { id: "hwacheon", label: "화천군", hospitalDensity: "very_low" },
    { id: "hoengseong", label: "횡성군", hospitalDensity: "very_low" },
  ],

  // 충청북도의 시/군
  chungbuk: [
    { id: "goesan", label: "괴산군", hospitalDensity: "very_low" },
    { id: "danyang", label: "단양군", hospitalDensity: "very_low" },
    { id: "boeun", label: "보은군", hospitalDensity: "very_low" },
    { id: "yeongdong", label: "영동군", hospitalDensity: "very_low" },
    { id: "okcheon", label: "옥천군", hospitalDensity: "low" },
    { id: "eumseong", label: "음성군", hospitalDensity: "low" },
    { id: "jecheon", label: "제천시", hospitalDensity: "medium" },
    { id: "jincheon", label: "진천군", hospitalDensity: "low" },
    {
      id: "cheongju",
      label: "청주시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "chungju", label: "충주시", hospitalDensity: "medium" },
    { id: "jeungpyeong", label: "증평군", hospitalDensity: "low" },
  ],

  // 충청남도의 시/군
  chungnam: [
    { id: "gyeryong", label: "계룡시", hospitalDensity: "low" },
    { id: "gongju", label: "공주시", hospitalDensity: "medium" },
    { id: "geumsan", label: "금산군", hospitalDensity: "low" },
    { id: "nonsan", label: "논산시", hospitalDensity: "medium" },
    { id: "dangjin", label: "당진시", hospitalDensity: "medium" },
    { id: "boryeong", label: "보령시", hospitalDensity: "low" },
    { id: "buyeo", label: "부여군", hospitalDensity: "low" },
    { id: "seosan", label: "서산시", hospitalDensity: "medium" },
    { id: "seocheon", label: "서천군", hospitalDensity: "low" },
    {
      id: "asan",
      label: "아산시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "yesan", label: "예산군", hospitalDensity: "low" },
    {
      id: "cheonan",
      label: "천안시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "cheongyang", label: "청양군", hospitalDensity: "very_low" },
    { id: "taean", label: "태안군", hospitalDensity: "low" },
    { id: "hongseong", label: "홍성군", hospitalDensity: "medium" },
  ],

  // 전라북도의 시/군
  jeonbuk: [
    { id: "gochang", label: "고창군", hospitalDensity: "low" },
    { id: "gunsan", label: "군산시", hospitalDensity: "medium" },
    { id: "gimje", label: "김제시", hospitalDensity: "low" },
    { id: "namwon", label: "남원시", hospitalDensity: "low" },
    { id: "muju", label: "무주군", hospitalDensity: "very_low" },
    { id: "buan", label: "부안군", hospitalDensity: "low" },
    { id: "sunchang", label: "순창군", hospitalDensity: "very_low" },
    { id: "wanju", label: "완주군", hospitalDensity: "low" },
    { id: "iksan", label: "익산시", hospitalDensity: "medium" },
    { id: "imsil", label: "임실군", hospitalDensity: "very_low" },
    { id: "jangsu", label: "장수군", hospitalDensity: "very_low" },
    {
      id: "jeonju",
      label: "전주시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "jeongeup", label: "정읍시", hospitalDensity: "low" },
    { id: "jinan", label: "진안군", hospitalDensity: "very_low" },
  ],

  // 전라남도의 시/군
  jeonnam: [
    { id: "gangjin", label: "강진군", hospitalDensity: "very_low" },
    { id: "goheung", label: "고흥군", hospitalDensity: "low" },
    { id: "gokseong", label: "곡성군", hospitalDensity: "very_low" },
    { id: "gwangyang", label: "광양시", hospitalDensity: "medium" },
    { id: "gurae", label: "구례군", hospitalDensity: "very_low" },
    { id: "naju", label: "나주시", hospitalDensity: "medium" },
    { id: "damyang", label: "담양군", hospitalDensity: "low" },
    {
      id: "mokpo",
      label: "목포시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "muan", label: "무안군", hospitalDensity: "low" },
    { id: "boseong", label: "보성군", hospitalDensity: "very_low" },
    { id: "suncheon", label: "순천시", hospitalDensity: "medium" },
    { id: "sinan", label: "신안군", hospitalDensity: "very_low" },
    { id: "yeosu", label: "여수시", hospitalDensity: "medium" },
    { id: "yeonggwang", label: "영광군", hospitalDensity: "low" },
    { id: "yeongam", label: "영암군", hospitalDensity: "low" },
    { id: "wando", label: "완도군", hospitalDensity: "low" },
    { id: "jangseong", label: "장성군", hospitalDensity: "low" },
    { id: "jangheung", label: "장흥군", hospitalDensity: "very_low" },
    { id: "jindo", label: "진도군", hospitalDensity: "very_low" },
    { id: "hampyeong", label: "함평군", hospitalDensity: "very_low" },
    { id: "haenam", label: "해남군", hospitalDensity: "low" },
    { id: "hwasun", label: "화순군", hospitalDensity: "medium" },
  ],

  // 경상북도의 시/군
  gyeongbuk: [
    { id: "gyeongsan", label: "경산시", hospitalDensity: "medium" },
    { id: "gyeongju", label: "경주시", hospitalDensity: "medium" },
    { id: "goryeong", label: "고령군", hospitalDensity: "very_low" },
    { id: "gumi", label: "구미시", hospitalDensity: "high" },
    { id: "gunwi", label: "군위군", hospitalDensity: "very_low" },
    { id: "gimcheon", label: "김천시", hospitalDensity: "medium" },
    { id: "mungyeong", label: "문경시", hospitalDensity: "low" },
    { id: "bonghwa", label: "봉화군", hospitalDensity: "very_low" },
    { id: "sangju", label: "상주시", hospitalDensity: "low" },
    { id: "seongju", label: "성주군", hospitalDensity: "very_low" },
    { id: "andong", label: "안동시", hospitalDensity: "medium" },
    { id: "yeongdeok", label: "영덕군", hospitalDensity: "very_low" },
    { id: "yeongju", label: "영주시", hospitalDensity: "low" },
    { id: "yeongyang", label: "영양군", hospitalDensity: "very_low" },
    { id: "yeongcheon", label: "영천시", hospitalDensity: "low" },
    { id: "yecheon", label: "예천군", hospitalDensity: "very_low" },
    { id: "ulleung", label: "울릉군", hospitalDensity: "very_low" },
    { id: "uljin", label: "울진군", hospitalDensity: "very_low" },
    { id: "uiseong", label: "의성군", hospitalDensity: "very_low" },
    { id: "cheongdo", label: "청도군", hospitalDensity: "very_low" },
    { id: "cheongsong", label: "청송군", hospitalDensity: "very_low" },
    { id: "chilgok", label: "칠곡군", hospitalDensity: "low" },
    {
      id: "pohang",
      label: "포항시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
  ],

  // 경상남도의 시/군
  gyeongnam: [
    { id: "geoje", label: "거제시", hospitalDensity: "medium" },
    { id: "geochang", label: "거창군", hospitalDensity: "low" },
    { id: "goseong", label: "고성군", hospitalDensity: "very_low" },
    { id: "gimhae", label: "김해시", hospitalDensity: "high" },
    { id: "namhae", label: "남해군", hospitalDensity: "low" },
    { id: "miryang", label: "밀양시", hospitalDensity: "low" },
    { id: "sacheon", label: "사천시", hospitalDensity: "low" },
    { id: "sancheong", label: "산청군", hospitalDensity: "very_low" },
    { id: "yangsan", label: "양산시", hospitalDensity: "medium" },
    { id: "uiryeong", label: "의령군", hospitalDensity: "very_low" },
    {
      id: "jinju",
      label: "진주시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "changnyeong", label: "창녕군", hospitalDensity: "low" },
    {
      id: "changwon",
      label: "창원시",
      hospitalDensity: "high",
      isMedicalHub: true,
    },
    { id: "tongyeong", label: "통영시", hospitalDensity: "medium" },
    { id: "hadong", label: "하동군", hospitalDensity: "very_low" },
    { id: "haman", label: "함안군", hospitalDensity: "low" },
    { id: "hamyang", label: "함양군", hospitalDensity: "very_low" },
    { id: "hapcheon", label: "합천군", hospitalDensity: "very_low" },
  ],

  // 제주특별자치도의 시
  jeju: [
    {
      id: "jeju_city",
      label: "제주시",
      hospitalDensity: "medium",
      isMedicalHub: true,
    },
    { id: "seogwipo", label: "서귀포시", hospitalDensity: "medium" },
  ],
};

/**
 * 세분류 지역 (동/읍/면)
 * 각 구/군 내의 동/읍/면 정보 (import 방식으로 통합)
 */
import { subRegions } from "./subregions-final";

/**
 * 지역별 인기 의료 시설 타입
 * 각 지역에서 특히 발달한 의료 시설 유형
 */
export const regionMedicalStrengths = {
  // 서울 강남/서초 지역은 성형외과와 피부과가 특히 발달
  "seoul.gangnam": ["plastic", "dermatology", "dental", "ophthalmology"],
  "seoul.seocho": ["plastic", "dermatology", "dental"],

  // 서울 종로/중구 지역은 안과와 치과가 발달
  "seoul.jongno": ["ophthalmology", "dental"],
  "seoul.jung": ["ophthalmology", "dental"],

  // 나머지 지역별 특화 의료 분야는 필요에 따라 추가
};

/**
 * 인기 지역 검색어 (빠른 검색을 위한 추천 지역)
 */
export const popularRegionSearches = [
  { id: "seoul.gangnam", label: "강남구", category: "plastic_beauty" },
  { id: "seoul.seocho", label: "서초구", category: "plastic_beauty" },
  { id: "seoul.songpa", label: "송파구", category: "general" },
  { id: "busan.dongnae", label: "동래구", category: "general" },
  { id: "busan.haeundae", label: "해운대구", category: "plastic_beauty" },
  { id: "daegu.suseong", label: "수성구", category: "general" },
  { id: "incheon.yeonsu", label: "연수구", category: "general" },
  { id: "gwangju.dong", label: "동구", category: "general" },
  { id: "daejeon.seo", label: "서구", category: "general" },
  { id: "gyeonggi.seongnam", label: "성남시", category: "general" },
  { id: "gyeonggi.suwon", label: "수원시", category: "general" },
  { id: "gangwon.wonju", label: "원주시", category: "general" },
  { id: "chungbuk.cheongju", label: "청주시", category: "general" },
  { id: "chungnam.cheonan", label: "천안시", category: "general" },
  { id: "jeonbuk.jeonju", label: "전주시", category: "general" },
  { id: "jeonnam.mokpo", label: "목포시", category: "general" },
  { id: "gyeongbuk.pohang", label: "포항시", category: "general" },
  { id: "gyeongnam.changwon", label: "창원시", category: "general" },
  { id: "jeju.jeju_city", label: "제주시", category: "general" },
];

/**
 * 지역 간 거리 추정을 위한 좌표 데이터 (간소화된 버전)
 */
export const regionCoordinates = {
  // 서울 주요 구의 대략적인 좌표 (위도, 경도)
  "seoul.gangnam": { lat: 37.4959854, lng: 127.0664091 },
  "seoul.seocho": { lat: 37.4769528, lng: 127.0378103 },
  "seoul.songpa": { lat: 37.5048534, lng: 127.1176778 },
  "seoul.jongno": { lat: 37.5730134, lng: 126.9794742 },
  "seoul.jung": { lat: 37.5638462, lng: 126.9975462 },

  // 부산 주요 구의 대략적인 좌표
  "busan.dongnae": { lat: 35.204725, lng: 129.0932607 },
  "busan.haeundae": { lat: 35.1631868, lng: 129.1587953 },
  "busan.busanjin": { lat: 35.1595454, lng: 129.0551941 },

  // 대구 주요 구의 대략적인 좌표
  "daegu.suseong": { lat: 35.8581985, lng: 128.6309897 },
  "daegu.jung": { lat: 35.8692039, lng: 128.5933511 },

  // 인천 주요 구의 대략적인 좌표
  "incheon.yeonsu": { lat: 37.4102731, lng: 126.6782029 },
  "incheon.namdong": { lat: 37.4133333, lng: 126.7338889 },

  // 광주 주요 구의 대략적인 좌표
  "gwangju.dong": { lat: 35.1472652, lng: 126.9234945 },
  "gwangju.seo": { lat: 35.1515694, lng: 126.8903547 },

  // 대전 주요 구의 대략적인 좌표
  "daejeon.seo": { lat: 36.3553454, lng: 127.384483 },
  "daejeon.yuseong": { lat: 36.3639718, lng: 127.3565895 },

  // 경기도 주요 시의 대략적인 좌표
  "gyeonggi.seongnam": { lat: 37.4386111, lng: 127.1388889 },
  "gyeonggi.suwon": { lat: 37.2636111, lng: 127.0286111 },
  "gyeonggi.yongin": { lat: 37.2380518, lng: 127.1795543 },
  "gyeonggi.anyang": { lat: 37.3942871, lng: 126.9564686 },
  "gyeonggi.bucheon": { lat: 37.5034525, lng: 126.7659389 },

  // 주요 전국 도시의 대략적인 좌표
  "gangwon.wonju": { lat: 37.3422111, lng: 127.9203226 },
  "chungbuk.cheongju": { lat: 36.6424146, lng: 127.4890531 },
  "chungnam.cheonan": { lat: 36.8151183, lng: 127.1138849 },
  "jeonbuk.jeonju": { lat: 35.8242241, lng: 127.1479506 },
  "jeonnam.mokpo": { lat: 34.8118351, lng: 126.3921664 },
  "gyeongbuk.pohang": { lat: 36.0190178, lng: 129.3433953 },
  "gyeongnam.changwon": { lat: 35.2281875, lng: 128.6811784 },
  "jeju.jeju_city": { lat: 33.5003654, lng: 126.530469 },
};

/**
 * 지역별 메타데이터 및 통계 정보
 */
export const regionMetadata = {
  // 지역 유형별 평균 의료 기관 수
  averageMedicalFacilities: {
    capital: 1200, // 수도(서울)
    metro: 700, // 광역시
    province: 400, // 도
    special: 300, // 특별자치시/도
  },

  // 병원 밀집도별 추정 의료 기관 수
  hospitalDensityScale: {
    very_high: 500, // 매우 높음
    high: 300, // 높음
    medium: 150, // 중간
    low: 50, // 낮음
    very_low: 20, // 매우 낮음
  },

  // 인구 규모별 평균 인구 수
  populationScale: {
    very_high: 12000000, // 매우 높음 (경기도)
    high: 10000000, // 높음 (서울)
    medium: 3000000, // 중간 (광역시)
    low: 1500000, // 낮음 (도)
    very_low: 500000, // 매우 낮음 (일부 군 지역)
  },
};

/**
 * 지역 선택 UI를 위한 헬퍼 함수들
 */
export const regionHelpers = {
  /**
   * 지역 ID로부터 전체 경로 생성
   * @param {string} regionId - 지역 ID
   * @param {string} separator - 구분자 (기본값: >)
   * @returns {string} 경로 문자열 (예: 서울특별시 > 강남구 > 압구정동)
   */
  getPathString: (regionId, separator = " > ") => {
    if (!regionId) return "";

    const parts = regionId.split(".");
    let result = "";

    if (parts.length > 0) {
      // 시/도 레벨
      const topRegion = topRegions.find((r) => r.id === parts[0]);
      if (topRegion) {
        result = topRegion.label;
      }

      // 구/군 레벨
      if (parts.length > 1 && midRegions[parts[0]]) {
        const midRegion = midRegions[parts[0]].find((r) => r.id === parts[1]);
        if (midRegion) {
          result += separator + midRegion.label;
        }
      }

      // 동/읍/면 레벨
      if (parts.length > 2 && subRegions[parts[0] + "." + parts[1]]) {
        const subRegion = subRegions[parts[0] + "." + parts[1]].find(
          (r) => r.id === parts[2]
        );
        if (subRegion) {
          result += separator + subRegion.label;
        }
      }
    }

    return result;
  },

  /**
   * 상위 지역 ID 가져오기
   * @param {string} regionId - 지역 ID (예: seoul.gangnam.apgujeong)
   * @returns {string} 상위 지역 ID (예: seoul.gangnam)
   */
  getParentRegionId: (regionId) => {
    const parts = regionId.split(".");
    return parts.slice(0, -1).join(".");
  },

  /**
   * 근처 지역 추천
   * @param {string} regionId - 현재 지역 ID
   * @param {number} limit - 반환할 지역 수
   * @returns {Array} 근처 지역 ID 배열
   */
  getNearbyRegions: (regionId, limit = 5) => {
    const parts = regionId.split(".");
    const results = [];

    // 현재 좌표 찾기
    const currentCoord = regionCoordinates[regionId];
    if (!currentCoord) return results;

    // 같은 시/도 내의 다른 구/군
    if (parts.length >= 2) {
      const parentId = parts[0];

      // 같은 시/도 내 다른 구/군 ID 목록
      const siblingRegionIds = midRegions[parentId]
        .map((r) => `${parentId}.${r.id}`)
        .filter((id) => id !== `${parentId}.${parts[1]}`);

      // 거리 계산 및 정렬
      const distanceMap = {};
      siblingRegionIds.forEach((id) => {
        const coord = regionCoordinates[id];
        if (coord) {
          // 유클리드 거리 계산 (간소화)
          const distance = Math.sqrt(
            Math.pow(currentCoord.lat - coord.lat, 2) +
              Math.pow(currentCoord.lng - coord.lng, 2)
          );
          distanceMap[id] = distance;
        }
      });

      // 거리순 정렬 및 결과 추가
      const sortedByDistance = Object.keys(distanceMap).sort(
        (a, b) => distanceMap[a] - distanceMap[b]
      );
      results.push(...sortedByDistance.slice(0, limit));
    }

    return results.slice(0, limit);
  },

  /**
   * 지역 ID로부터 의료 기관 밀집도 정보 가져오기
   * @param {string} regionId - 지역 ID
   * @returns {string} 밀집도 수준 (very_high, high, medium, low, very_low)
   */
  getHospitalDensity: (regionId) => {
    const parts = regionId.split(".");

    // 동/읍/면 레벨일 경우 상위 구/군의 밀집도 사용
    if (parts.length > 2) {
      const midRegionId = `${parts[0]}.${parts[1]}`;
      const midRegionsList = midRegions[parts[0]];
      if (midRegionsList) {
        const midRegion = midRegionsList.find((r) => r.id === parts[1]);
        if (midRegion) {
          return midRegion.hospitalDensity;
        }
      }
    }

    // 구/군 레벨일 경우 해당 구/군의 밀집도 반환
    if (parts.length === 2) {
      const midRegionsList = midRegions[parts[0]];
      if (midRegionsList) {
        const midRegion = midRegionsList.find((r) => r.id === parts[1]);
        if (midRegion) {
          return midRegion.hospitalDensity;
        }
      }
    }

    // 시/도 레벨일 경우 해당 시/도의 밀집도 반환
    if (parts.length === 1) {
      const topRegion = topRegions.find((r) => r.id === parts[0]);
      if (topRegion) {
        return topRegion.hospitalDensity;
      }
    }

    // 기본값
    return "medium";
  },

  /**
   * 특정 지역의 의료 전문 분야 가져오기
   * @param {string} regionId - 지역 ID
   * @returns {Array} 지역 특화 의료 분야 목록
   */
  getMedicalSpecialties: (regionId) => {
    // 지역별 특화 의료 분야 정보 탐색
    if (regionMedicalStrengths[regionId]) {
      return regionMedicalStrengths[regionId];
    }

    // 상위 지역의 특화 의료 분야 정보로 대체
    const parts = regionId.split(".");
    if (parts.length > 2) {
      const midRegionId = `${parts[0]}.${parts[1]}`;
      if (regionMedicalStrengths[midRegionId]) {
        return regionMedicalStrengths[midRegionId];
      }
    }

    // 기본 의료 분야 목록
    return ["general", "internal"];
  },

  /**
   * 지역명으로 지역 검색
   * @param {string} keyword - 검색 키워드
   * @param {number} limit - 반환할 최대 결과 수
   * @returns {Array} 검색 결과 지역 정보 배열
   */
  searchRegionsByName: (keyword, limit = 10) => {
    if (!keyword || keyword.length < 2) return [];

    const results = [];
    const normalizedKeyword = keyword.toLowerCase();

    // 시/도 검색
    topRegions.forEach((region) => {
      if (region.label.includes(keyword)) {
        results.push({
          id: region.id,
          label: region.label,
          type: "topRegion",
        });
      }
    });

    // 구/군 검색
    Object.keys(midRegions).forEach((topKey) => {
      midRegions[topKey].forEach((region) => {
        if (region.label.includes(keyword)) {
          const topRegion = topRegions.find((r) => r.id === topKey);
          results.push({
            id: `${topKey}.${region.id}`,
            label: `${topRegion?.label || ""} ${region.label}`,
            type: "midRegion",
          });
        }
      });
    });

    // 동/읍/면 검색 (예시 - 실제 구현 시 모든 subRegions 탐색 필요)
    Object.keys(subRegions).forEach((midKey) => {
      const subRegionList = subRegions[midKey];
      if (Array.isArray(subRegionList)) {
        subRegionList.forEach((region) => {
          if (region.label.includes(keyword)) {
            const parts = midKey.split(".");
            const topRegion = topRegions.find((r) => r.id === parts[0]);
            const midRegion = midRegions[parts[0]]?.find(
              (r) => r.id === parts[1]
            );

            results.push({
              id: `${midKey}.${region.id}`,
              label: `${topRegion?.label || ""} ${midRegion?.label || ""} ${
                region.label
              }`,
              type: "subRegion",
            });
          }
        });
      }
    });

    return results.slice(0, limit);
  },
};

/**
 * 전체 지역 데이터 통합 객체
 */
export default {
  topRegions,
  midRegions,
  subRegions,
  regionMedicalStrengths,
  popularRegionSearches,
  regionCoordinates,
  regionMetadata,
  regionHelpers,
};
