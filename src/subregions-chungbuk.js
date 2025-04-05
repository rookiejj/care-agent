/**
 * 충청북도 주요 시/군별 동/읍/면 정보
 */
export const chungbukSubRegions = {
  // 충청북도 청주시의 구별 동
  "chungbuk.cheongju": {
    // 청주시 상당구
    sangdang: [
      { id: "munhwa", label: "문화동", medicalSpecialty: ["general"] },
      { id: "youngun", label: "영운동", medicalSpecialty: ["general"] },
      { id: "namju", label: "남주동", medicalSpecialty: ["general"] },
      { id: "naesu", label: "낭성면", medicalSpecialty: ["general"] },
      { id: "nangseong", label: "미원면", medicalSpecialty: ["general"] },
      { id: "miwon", label: "가덕면", medicalSpecialty: ["general"] },
      { id: "gadeok", label: "남일면", medicalSpecialty: ["general"] },
      { id: "namil", label: "문의면", medicalSpecialty: ["general"] },
      {
        id: "munui",
        label: "중앙동",
        medicalSpecialty: ["general", "internal"],
      },
      {
        id: "jungang",
        label: "성안동",
        medicalSpecialty: ["general", "dental"],
      },
      { id: "seogan", label: "탑대성동", medicalSpecialty: ["general"] },
    ],

    // 청주시 서원구
    seowon: [
      { id: "bokdae", label: "복대동", medicalSpecialty: ["general"] },
      { id: "sacheon", label: "사직동", medicalSpecialty: ["general"] },
      { id: "sajik", label: "사창동", medicalSpecialty: ["general"] },
      { id: "sschang", label: "모충동", medicalSpecialty: ["general"] },
      { id: "mochung", label: "수곡동", medicalSpecialty: ["general"] },
      { id: "sugok", label: "산남동", medicalSpecialty: ["general"] },
      { id: "sannam", label: "분평동", medicalSpecialty: ["general"] },
      { id: "bunpyeong", label: "남이면", medicalSpecialty: ["general"] },
      { id: "nami", label: "현도면", medicalSpecialty: ["general"] },
      { id: "hyeondo", label: "매봉동", medicalSpecialty: ["general"] },
      {
        id: "maebong",
        label: "서원동",
        medicalSpecialty: ["general", "internal"],
      },
    ],

    // 청주시 흥덕구
    heungdeok: [
      { id: "bungang", label: "봉명동", medicalSpecialty: ["general"] },
      { id: "bongmyeong", label: "가경동", medicalSpecialty: ["general"] },
      { id: "gagyeong", label: "복대동", medicalSpecialty: ["general"] },
      { id: "bokdae2", label: "수곡동", medicalSpecialty: ["general"] },
      { id: "sugok2", label: "성화동", medicalSpecialty: ["general"] },
      {
        id: "seonghwa",
        label: "오송읍",
        medicalSpecialty: ["general", "hospital"],
      },
      { id: "osong", label: "강내면", medicalSpecialty: ["general"] },
      { id: "gangnae", label: "옥산면", medicalSpecialty: ["general"] },
      { id: "oksan", label: "운천동", medicalSpecialty: ["general"] },
      { id: "uncheon", label: "신봉동", medicalSpecialty: ["general"] },
      { id: "sinbong", label: "송정동", medicalSpecialty: ["general"] },
      { id: "songjeong", label: "강서동", medicalSpecialty: ["general"] },
      {
        id: "gangseo",
        label: "미평동",
        medicalSpecialty: ["general", "internal"],
      },
    ],

    // 청주시 청원구
    cheongwon: [
      { id: "gaesin", label: "내덕동", medicalSpecialty: ["general"] },
      { id: "naedeok", label: "율량동", medicalSpecialty: ["general"] },
      { id: "yullang", label: "사천동", medicalSpecialty: ["general"] },
      { id: "sacheon", label: "오근장동", medicalSpecialty: ["general"] },
      {
        id: "ogeunjang",
        label: "오창읍",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "ochang", label: "내수읍", medicalSpecialty: ["general"] },
      { id: "naesu", label: "북이면", medicalSpecialty: ["general"] },
      { id: "bugi", label: "우암동", medicalSpecialty: ["general"] },
      { id: "uam", label: "용담동", medicalSpecialty: ["general"] },
      { id: "yongdam", label: "용암동", medicalSpecialty: ["general"] },
      { id: "yongam", label: "운양동", medicalSpecialty: ["general"] },
    ],
  },

  // 충청북도 충주시의 동/읍/면
  "chungbuk.chungju": [
    {
      id: "jungang",
      label: "성내동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "seongnae", label: "교현동", medicalSpecialty: ["general"] },
    { id: "gyohyeon", label: "안림동", medicalSpecialty: ["general"] },
    { id: "anrim", label: "용산동", medicalSpecialty: ["general"] },
    { id: "yongsan", label: "지현동", medicalSpecialty: ["general"] },
    { id: "juwon", label: "문화동", medicalSpecialty: ["general"] },
    { id: "munhwa", label: "호암동", medicalSpecialty: ["general"] },
    { id: "hoam", label: "달천동", medicalSpecialty: ["general"] },
    { id: "dalcheon", label: "봉방동", medicalSpecialty: ["general"] },
    { id: "eundeok", label: "칠금동", medicalSpecialty: ["general"] },
    { id: "chilgeum", label: "연수동", medicalSpecialty: ["general"] },
    { id: "yeonsu", label: "목행동", medicalSpecialty: ["general"] },
    { id: "mokhaeng", label: "용탄동", medicalSpecialty: ["general"] },
    { id: "yongtan", label: "지현동", medicalSpecialty: ["general"] },
    { id: "jihyun", label: "가금면", medicalSpecialty: ["general"] },
    { id: "gageum", label: "금가면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 제천시의 동/읍/면
  "chungbuk.jecheon": [
    { id: "hansu", label: "의림동", medicalSpecialty: ["general"] },
    { id: "uirim", label: "중앙동", medicalSpecialty: ["general", "internal"] },
    { id: "jungang", label: "남현동", medicalSpecialty: ["general"] },
    { id: "namhyeon", label: "화산동", medicalSpecialty: ["general"] },
    { id: "hwasan", label: "청전동", medicalSpecialty: ["general"] },
    { id: "cheongjeon", label: "용두동", medicalSpecialty: ["general"] },
    { id: "yongdu", label: "신백동", medicalSpecialty: ["general"] },
    { id: "sinbaek", label: "교동", medicalSpecialty: ["general"] },
    { id: "gyodong", label: "영천동", medicalSpecialty: ["general"] },
    { id: "yongcheon", label: "고암동", medicalSpecialty: ["general"] },
    { id: "goam", label: "봉양읍", medicalSpecialty: ["general"] },
    { id: "bongyang", label: "백운면", medicalSpecialty: ["general"] },
    { id: "baekun", label: "한수면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 보은군의 읍/면
  "chungbuk.boeun": [
    { id: "boeun", label: "보은읍", medicalSpecialty: ["general"] },
    { id: "jangsu", label: "장안면", medicalSpecialty: ["general"] },
    { id: "maro", label: "마로면", medicalSpecialty: ["general"] },
    { id: "hoein", label: "회인면", medicalSpecialty: ["general"] },
    { id: "sochon", label: "내북면", medicalSpecialty: ["general"] },
    { id: "naebuk", label: "산외면", medicalSpecialty: ["general"] },
    { id: "sanoe", label: "삼승면", medicalSpecialty: ["general"] },
    { id: "samseung", label: "수한면", medicalSpecialty: ["general"] },
    { id: "suhan", label: "죽항면", medicalSpecialty: ["general"] },
    { id: "jukhang", label: "탄부면", medicalSpecialty: ["general"] },
    { id: "tanbu", label: "삼숭면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 옥천군의 읍/면
  "chungbuk.okcheon": [
    { id: "okcheon", label: "옥천읍", medicalSpecialty: ["general"] },
    { id: "dongi", label: "동이면", medicalSpecialty: ["general"] },
    { id: "annam", label: "안남면", medicalSpecialty: ["general"] },
    { id: "gunbuk", label: "군북면", medicalSpecialty: ["general"] },
    { id: "gunseo", label: "군서면", medicalSpecialty: ["general"] },
    { id: "gunnam", label: "군남면", medicalSpecialty: ["general"] },
    { id: "cheoncheon", label: "청성면", medicalSpecialty: ["general"] },
    { id: "iwon", label: "이원면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 영동군의 읍/면
  "chungbuk.yeongdong": [
    { id: "yeongdong", label: "영동읍", medicalSpecialty: ["general"] },
    { id: "simcheon", label: "심천면", medicalSpecialty: ["general"] },
    { id: "yanggang", label: "양강면", medicalSpecialty: ["general"] },
    { id: "sangchon", label: "용산면", medicalSpecialty: ["general"] },
    { id: "yongsan", label: "황간면", medicalSpecialty: ["general"] },
    { id: "hwanggan", label: "상촌면", medicalSpecialty: ["general"] },
    { id: "chupungnyeong", label: "추풍령면", medicalSpecialty: ["general"] },
    { id: "maeul", label: "매곡면", medicalSpecialty: ["general"] },
    { id: "maegok", label: "학산면", medicalSpecialty: ["general"] },
    { id: "haksan", label: "양산면", medicalSpecialty: ["general"] },
    { id: "yangsan", label: "용화면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 진천군의 읍/면
  "chungbuk.jincheon": [
    { id: "jincheon", label: "진천읍", medicalSpecialty: ["general"] },
    { id: "deoksan", label: "덕산읍", medicalSpecialty: ["general"] },
    { id: "baekgok", label: "백곡면", medicalSpecialty: ["general"] },
    { id: "isan", label: "이월면", medicalSpecialty: ["general"] },
    { id: "iwol", label: "광혜원면", medicalSpecialty: ["general"] },
    { id: "gwangye", label: "초평면", medicalSpecialty: ["general"] },
    { id: "chopyeong", label: "문백면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 괴산군의 읍/면
  "chungbuk.goesan": [
    { id: "goesan", label: "괴산읍", medicalSpecialty: ["general"] },
    { id: "buksang", label: "문광면", medicalSpecialty: ["general"] },
    { id: "mungwang", label: "감물면", medicalSpecialty: ["general"] },
    { id: "gammul", label: "장연면", medicalSpecialty: ["general"] },
    { id: "jangyeon", label: "연풍면", medicalSpecialty: ["general"] },
    { id: "yeonpung", label: "소수면", medicalSpecialty: ["general"] },
    { id: "sosu", label: "불정면", medicalSpecialty: ["general"] },
    { id: "buljeong", label: "청천면", medicalSpecialty: ["general"] },
    { id: "cheongcheon", label: "사리면", medicalSpecialty: ["general"] },
    { id: "sari", label: "청안면", medicalSpecialty: ["general"] },
    { id: "cheongan", label: "칠성면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 음성군의 읍/면
  "chungbuk.eumseong": [
    { id: "eumseong", label: "음성읍", medicalSpecialty: ["general"] },
    { id: "gamgok", label: "금왕읍", medicalSpecialty: ["general"] },
    { id: "geumwang", label: "소이면", medicalSpecialty: ["general"] },
    { id: "soi", label: "원남면", medicalSpecialty: ["general"] },
    { id: "wonnam", label: "맹동면", medicalSpecialty: ["general"] },
    { id: "maengdong", label: "대소면", medicalSpecialty: ["general"] },
    { id: "daeso", label: "삼성면", medicalSpecialty: ["general"] },
    { id: "samseong", label: "생극면", medicalSpecialty: ["general"] },
    { id: "saenggeuk", label: "감곡면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 단양군의 읍/면
  "chungbuk.danyang": [
    { id: "danyang", label: "단양읍", medicalSpecialty: ["general"] },
    { id: "daegang", label: "매포읍", medicalSpecialty: ["general"] },
    { id: "maepo", label: "대강면", medicalSpecialty: ["general"] },
    { id: "gagok", label: "가곡면", medicalSpecialty: ["general"] },
    { id: "yeongpung", label: "영춘면", medicalSpecialty: ["general"] },
    { id: "youngchun", label: "어상천면", medicalSpecialty: ["general"] },
    { id: "eosangcheon", label: "적성면", medicalSpecialty: ["general"] },
    { id: "jeokseong", label: "단성면", medicalSpecialty: ["general"] },
  ],

  // 충청북도 증평군의 읍/면
  "chungbuk.jeungpyeong": [
    { id: "jeungpyeong", label: "증평읍", medicalSpecialty: ["general"] },
    { id: "doan", label: "도안면", medicalSpecialty: ["general"] },
  ],
};
