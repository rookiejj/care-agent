/**
 * 강원도 주요 시/군별 동/읍/면 정보
 */
export const gangwonSubRegions = {
  // 강원도 춘천시의 동/읍/면
  "gangwon.chuncheon": [
    {
      id: "seoksa",
      label: "석사동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "hyoja", label: "효자동", medicalSpecialty: ["general"] },
    { id: "gangnam", label: "강남동", medicalSpecialty: ["general"] },
    { id: "geunhwa", label: "근화동", medicalSpecialty: ["general"] },
    { id: "juhak", label: "죽림동", medicalSpecialty: ["general"] },
    { id: "chunghyo", label: "후평동", medicalSpecialty: ["general"] },
    { id: "hujeong", label: "후평동", medicalSpecialty: ["general"] },
    { id: "gyodon", label: "교동", medicalSpecialty: ["general"] },
    { id: "socheon", label: "소양동", medicalSpecialty: ["general"] },
    { id: "sindong", label: "신동면", medicalSpecialty: ["general"] },
    { id: "dongsan", label: "동산면", medicalSpecialty: ["general"] },
    { id: "seo", label: "서면", medicalSpecialty: ["general"] },
    { id: "sabuk", label: "사북면", medicalSpecialty: ["general"] },
    { id: "buksan", label: "북산면", medicalSpecialty: ["general"] },
    { id: "dong", label: "동면", medicalSpecialty: ["general"] },
    { id: "nam", label: "남면", medicalSpecialty: ["general"] },
    { id: "namsan", label: "남산면", medicalSpecialty: ["general"] },
  ],

  // 강원도 원주시의 동/읍/면
  "gangwon.wonju": [
    {
      id: "jungang",
      label: "중앙동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "wonju", label: "원주동", medicalSpecialty: ["general"] },
    { id: "bangok", label: "반곡동", medicalSpecialty: ["general"] },
    { id: "mugeuk", label: "무실동", medicalSpecialty: ["general"] },
    { id: "bongsan", label: "봉산동", medicalSpecialty: ["general"] },
    { id: "dan", label: "단계동", medicalSpecialty: ["general"] },
    { id: "bangil", label: "학성동", medicalSpecialty: ["general"] },
    { id: "hakseong", label: "일산동", medicalSpecialty: ["general"] },
    { id: "ilsan", label: "명륜동", medicalSpecialty: ["general"] },
    { id: "myeongnyun", label: "개운동", medicalSpecialty: ["general"] },
    { id: "gaeun", label: "단구동", medicalSpecialty: ["general", "hospital"] },
    { id: "dangu", label: "우산동", medicalSpecialty: ["general"] },
    { id: "usan", label: "태장동", medicalSpecialty: ["general"] },
    { id: "taejang", label: "행구동", medicalSpecialty: ["general"] },
    { id: "haenggu", label: "호저면", medicalSpecialty: ["general"] },
    { id: "hojeo", label: "지정면", medicalSpecialty: ["general"] },
    { id: "jijeong", label: "소초면", medicalSpecialty: ["general"] },
  ],

  // 강원도 강릉시의 동/읍/면
  "gangwon.gangneung": [
    { id: "okcheon", label: "옥천동", medicalSpecialty: ["general"] },
    { id: "naegok", label: "내곡동", medicalSpecialty: ["general"] },
    { id: "hongje", label: "홍제동", medicalSpecialty: ["general"] },
    {
      id: "jungang",
      label: "중앙동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "gangmun", label: "강문동", medicalSpecialty: ["general"] },
    { id: "gyeongpo", label: "경포동", medicalSpecialty: ["general"] },
    { id: "sacheon", label: "사천면", medicalSpecialty: ["general"] },
    { id: "okgye", label: "옥계면", medicalSpecialty: ["general"] },
    { id: "gujeong", label: "구정면", medicalSpecialty: ["general"] },
    { id: "gangdong", label: "강동면", medicalSpecialty: ["general"] },
    { id: "seongsan", label: "성산면", medicalSpecialty: ["general"] },
    { id: "wangsan", label: "왕산면", medicalSpecialty: ["general"] },
    { id: "nam", label: "남면", medicalSpecialty: ["general"] },
  ],

  // 강원도 속초시의 동
  "gangwon.sokcho": [
    {
      id: "jungang",
      label: "중앙동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "geumho", label: "금호동", medicalSpecialty: ["general"] },
    { id: "joyang", label: "조양동", medicalSpecialty: ["general"] },
    { id: "dongmyeong", label: "동명동", medicalSpecialty: ["general"] },
    { id: "yeongrang", label: "영랑동", medicalSpecialty: ["general"] },
    { id: "daepo", label: "대포동", medicalSpecialty: ["general"] },
    { id: "nohak", label: "노학동", medicalSpecialty: ["general"] },
    { id: "cheongho", label: "청호동", medicalSpecialty: ["general"] },
  ],

  // 강원도 동해시의 동
  "gangwon.donghae": [
    { id: "bugok", label: "부곡동", medicalSpecialty: ["general"] },
    { id: "bukgu", label: "북평동", medicalSpecialty: ["general"] },
    { id: "bugpyeong", label: "북삼동", medicalSpecialty: ["general"] },
    { id: "buksam", label: "송정동", medicalSpecialty: ["general"] },
    {
      id: "songjeong",
      label: "천곡동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "cheongok", label: "묵호동", medicalSpecialty: ["general"] },
    { id: "mukho", label: "발한동", medicalSpecialty: ["general"] },
    { id: "balhan", label: "망상동", medicalSpecialty: ["general"] },
    { id: "mangsang", label: "삼화동", medicalSpecialty: ["general"] },
  ],

  // 강원도 삼척시의 동/읍/면
  "gangwon.samcheok": [
    { id: "namyang", label: "남양동", medicalSpecialty: ["general"] },
    { id: "seopo", label: "성내동", medicalSpecialty: ["general", "internal"] },
    { id: "seongnae", label: "교동", medicalSpecialty: ["general"] },
    { id: "gyo", label: "정라동", medicalSpecialty: ["general"] },
    { id: "jeongna", label: "도계읍", medicalSpecialty: ["general"] },
    { id: "dogye", label: "원덕읍", medicalSpecialty: ["general"] },
    { id: "wondeok", label: "근덕면", medicalSpecialty: ["general"] },
    { id: "geundeok", label: "하장면", medicalSpecialty: ["general"] },
    { id: "hajang", label: "노곡면", medicalSpecialty: ["general"] },
    { id: "nogok", label: "미로면", medicalSpecialty: ["general"] },
    { id: "miro", label: "가곡면", medicalSpecialty: ["general"] },
    { id: "gagok", label: "신기면", medicalSpecialty: ["general"] },
  ],

  // 강원도 평창군의 읍/면
  "gangwon.pyeongchang": [
    { id: "pyeongchang", label: "평창읍", medicalSpecialty: ["general"] },
    { id: "mitan", label: "미탄면", medicalSpecialty: ["general"] },
    { id: "bangnim", label: "방림면", medicalSpecialty: ["general"] },
    { id: "jinbu", label: "진부면", medicalSpecialty: ["general"] },
    { id: "daehwa", label: "대화면", medicalSpecialty: ["general"] },
    { id: "bongpyeong", label: "봉평면", medicalSpecialty: ["general"] },
    { id: "yongpyeong", label: "용평면", medicalSpecialty: ["general"] },
    { id: "doam", label: "도암면", medicalSpecialty: ["general"] },
  ],
};
