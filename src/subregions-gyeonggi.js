/**
 * 경기도 주요 시/군별 동/읍/면 정보 (1)
 */
export const gyeonggiSubRegions = {
  // 경기도 수원시의 구별 동
  "gyeonggi.suwon": {
    // 수원시 장안구
    jangan: [
      { id: "jangan", label: "장안동", medicalSpecialty: ["general"] },
      { id: "jeongja", label: "정자동", medicalSpecialty: ["general"] },
      { id: "yeongtong", label: "영통동", medicalSpecialty: ["general"] },
      { id: "padarim", label: "파장동", medicalSpecialty: ["general"] },
      { id: "yeonmu", label: "연무동", medicalSpecialty: ["general"] },
      {
        id: "jowon",
        label: "조원동",
        medicalSpecialty: ["general", "internal"],
      },
    ],

    // 수원시 권선구
    gwonseon: [
      { id: "gwonseon", label: "권선동", medicalSpecialty: ["general"] },
      { id: "seodun", label: "서둔동", medicalSpecialty: ["general"] },
      { id: "geummam", label: "금곡동", medicalSpecialty: ["general"] },
      { id: "ho", label: "호매실동", medicalSpecialty: ["general"] },
      { id: "seryu", label: "세류동", medicalSpecialty: ["general"] },
      { id: "gosaek", label: "구운동", medicalSpecialty: ["general"] },
      { id: "gwowol", label: "곡선동", medicalSpecialty: ["general"] },
    ],

    // 수원시 팔달구
    paldal: [
      {
        id: "ingye",
        label: "인계동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "maegyo", label: "매교동", medicalSpecialty: ["general"] },
      { id: "hwaseo", label: "화서동", medicalSpecialty: ["general"] },
      { id: "jisam", label: "지동", medicalSpecialty: ["general"] },
      {
        id: "pallyong",
        label: "팔달로",
        medicalSpecialty: ["general", "dental", "ophthalmology"],
      },
      { id: "maesan", label: "매산동", medicalSpecialty: ["general"] },
      { id: "namsu", label: "남수동", medicalSpecialty: ["general"] },
    ],

    // 수원시 영통구
    yeongtong: [
      {
        id: "yeongtong",
        label: "영통동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "woncheon", label: "원천동", medicalSpecialty: ["general"] },
      { id: "taejeon", label: "태장동", medicalSpecialty: ["general"] },
      { id: "maetan", label: "매탄동", medicalSpecialty: ["general"] },
      {
        id: "sinwon",
        label: "광교동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "hwaseo", label: "하동", medicalSpecialty: ["general"] },
    ],
  },

  // 경기도 성남시의 구별 동
  "gyeonggi.seongnam": {
    // 성남시 수정구
    sujeong: [
      { id: "sujeong", label: "수진동", medicalSpecialty: ["general"] },
      { id: "taepyeong", label: "태평동", medicalSpecialty: ["general"] },
      { id: "sinheung", label: "신흥동", medicalSpecialty: ["general"] },
      { id: "geumgwang", label: "금광동", medicalSpecialty: ["general"] },
      { id: "sanseong", label: "산성동", medicalSpecialty: ["general"] },
      { id: "dan", label: "단대동", medicalSpecialty: ["general"] },
      { id: "yangji", label: "양지동", medicalSpecialty: ["general"] },
      { id: "bokjeong", label: "복정동", medicalSpecialty: ["general"] },
    ],

    // 성남시 중원구
    jungwon: [
      { id: "seongnam", label: "성남동", medicalSpecialty: ["general"] },
      { id: "sangdaewon", label: "상대원동", medicalSpecialty: ["general"] },
      { id: "jungang", label: "중앙동", medicalSpecialty: ["general"] },
      { id: "geumgwang", label: "금광동", medicalSpecialty: ["general"] },
      { id: "hanam", label: "하대원동", medicalSpecialty: ["general"] },
      { id: "daewon", label: "대원동", medicalSpecialty: ["general"] },
    ],

    // 성남시 분당구
    bundang: [
      {
        id: "bundang",
        label: "분당동",
        medicalSpecialty: ["general", "dermatology", "plastic"],
      },
      {
        id: "sunae",
        label: "수내동",
        medicalSpecialty: ["general", "dermatology"],
      },
      {
        id: "yatap",
        label: "야탑동",
        medicalSpecialty: ["general", "orthopedics"],
      },
      {
        id: "jeongja",
        label: "정자동",
        medicalSpecialty: ["general", "dermatology"],
      },
      {
        id: "seohyeon",
        label: "서현동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "geumgok", label: "금곡동", medicalSpecialty: ["general"] },
      { id: "imae", label: "이매동", medicalSpecialty: ["general"] },
      {
        id: "pangyo",
        label: "판교동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "sampyeong", label: "삼평동", medicalSpecialty: ["general"] },
      { id: "baekhyeon", label: "백현동", medicalSpecialty: ["general"] },
      { id: "geumto", label: "금토동", medicalSpecialty: ["general"] },
      { id: "wirye", label: "위례동", medicalSpecialty: ["general"] },
    ],
  },

  // 경기도 고양시의 구별 동
  "gyeonggi.goyang": {
    // 고양시 덕양구
    deogyang: [
      { id: "haengsin", label: "행신동", medicalSpecialty: ["general"] },
      { id: "seongseo", label: "성사동", medicalSpecialty: ["general"] },
      { id: "wonseong", label: "원신동", medicalSpecialty: ["general"] },
      {
        id: "hwajeon",
        label: "화정동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "hyeon", label: "현천동", medicalSpecialty: ["general"] },
      { id: "daehwa", label: "대화동", medicalSpecialty: ["general"] },
      { id: "hwajeong", label: "화전동", medicalSpecialty: ["general"] },
      { id: "seongsan", label: "성사1동", medicalSpecialty: ["general"] },
      { id: "seongsa2", label: "성사2동", medicalSpecialty: ["general"] },
      { id: "gosan", label: "고양동", medicalSpecialty: ["general"] },
      { id: "dongsan", label: "벽제동", medicalSpecialty: ["general"] },
    ],

    // 고양시 일산동구
    ilsandong: [
      { id: "janghang", label: "장항동", medicalSpecialty: ["general"] },
      {
        id: "madu",
        label: "마두동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "baekseok", label: "백석동", medicalSpecialty: ["general"] },
      { id: "madulake", label: "마두2동", medicalSpecialty: ["general"] },
      { id: "seongma", label: "성석동", medicalSpecialty: ["general"] },
      { id: "jeongbalsan", label: "정발산동", medicalSpecialty: ["general"] },
      { id: "siksa", label: "식사동", medicalSpecialty: ["general"] },
      { id: "jungsan", label: "중산동", medicalSpecialty: ["general"] },
    ],

    // 고양시 일산서구
    ilsanseo: [
      { id: "daehwa", label: "대화동", medicalSpecialty: ["general"] },
      {
        id: "juyeop",
        label: "주엽동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "tanhyeon", label: "탄현동", medicalSpecialty: ["general"] },
      {
        id: "ilsan",
        label: "일산동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "gayang", label: "가좌동", medicalSpecialty: ["general"] },
      { id: "songpyeong", label: "송포동", medicalSpecialty: ["general"] },
      { id: "guwol", label: "송산동", medicalSpecialty: ["general"] },
    ],
  }, // 경기도 용인시의 구별 동
  "gyeonggi.yongin": {
    // 용인시 처인구
    cheoin: [
      { id: "jungbu", label: "중부동", medicalSpecialty: ["general"] },
      { id: "seobu", label: "역북동", medicalSpecialty: ["general"] },
      { id: "namsa", label: "남사면", medicalSpecialty: ["general"] },
      { id: "mohyeon", label: "모현읍", medicalSpecialty: ["general"] },
      {
        id: "pogok",
        label: "포곡읍",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "yangji", label: "양지면", medicalSpecialty: ["general"] },
      { id: "weonsam", label: "원삼면", medicalSpecialty: ["general"] },
      { id: "baegam", label: "백암면", medicalSpecialty: ["general"] },
      { id: "idong", label: "이동읍", medicalSpecialty: ["general"] },
    ],

    // 용인시 기흥구
    giheung: [
      { id: "giheung", label: "기흥동", medicalSpecialty: ["general"] },
      { id: "seonggok", label: "서농동", medicalSpecialty: ["general"] },
      { id: "guseong", label: "구성동", medicalSpecialty: ["general"] },
      {
        id: "dongbaek",
        label: "동백동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "maetan", label: "매탄동", medicalSpecialty: ["general"] },
      { id: "singal", label: "신갈동", medicalSpecialty: ["general"] },
      { id: "yeokbuk", label: "영덕동", medicalSpecialty: ["general"] },
      { id: "sanggal", label: "상갈동", medicalSpecialty: ["general"] },
      {
        id: "jukjeon",
        label: "죽전동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "eojeong", label: "어정동", medicalSpecialty: ["general"] },
      { id: "jukjeon1", label: "죽전1동", medicalSpecialty: ["general"] },
      { id: "jukjeon2", label: "죽전2동", medicalSpecialty: ["general"] },
    ],

    // 용인시 수지구
    suji: [
      {
        id: "suji",
        label: "수지동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "gwanggyoho", label: "광교동", medicalSpecialty: ["general"] },
      { id: "gima", label: "풍덕천동", medicalSpecialty: ["general"] },
      {
        id: "sanghyeon",
        label: "상현동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "seongbok", label: "성복동", medicalSpecialty: ["general"] },
      { id: "sindong", label: "신봉동", medicalSpecialty: ["general"] },
      { id: "dongcheon", label: "동천동", medicalSpecialty: ["general"] },
      { id: "jukjeon", label: "죽전동", medicalSpecialty: ["general"] },
      { id: "sanghyeon1", label: "상현1동", medicalSpecialty: ["general"] },
      { id: "sanghyeon2", label: "상현2동", medicalSpecialty: ["general"] },
    ],
  },

  // 경기도 부천시의 동
  "gyeonggi.bucheon": [
    { id: "simgok", label: "심곡동", medicalSpecialty: ["general"] },
    { id: "bucheon", label: "부천동", medicalSpecialty: ["general"] },
    { id: "ojeong", label: "오정동", medicalSpecialty: ["general"] },
    { id: "sosa", label: "소사동", medicalSpecialty: ["general", "internal"] },
    { id: "jung", label: "중동", medicalSpecialty: ["general", "dermatology"] },
    { id: "sangdong", label: "상동", medicalSpecialty: ["general"] },
    { id: "songjung", label: "송내동", medicalSpecialty: ["general"] },
    { id: "yeokgok", label: "역곡동", medicalSpecialty: ["general"] },
    { id: "dodong", label: "도당동", medicalSpecialty: ["general"] },
    { id: "songnae", label: "송내1동", medicalSpecialty: ["general"] },
    { id: "songnae2", label: "송내2동", medicalSpecialty: ["general"] },
    { id: "simgok1", label: "심곡1동", medicalSpecialty: ["general"] },
    { id: "simgok2", label: "심곡2동", medicalSpecialty: ["general"] },
    { id: "songjung1", label: "송중동", medicalSpecialty: ["general"] },
    { id: "songjung2", label: "춘의동", medicalSpecialty: ["general"] },
  ],

  // 경기도 안산시의 구별 동
  "gyeonggi.ansan": {
    // 안산시 상록구
    sangnok: [
      { id: "seonbu", label: "본오동", medicalSpecialty: ["general"] },
      { id: "bonoh", label: "부곡동", medicalSpecialty: ["general"] },
      { id: "bugok", label: "사동", medicalSpecialty: ["general"] },
      { id: "sa", label: "사이동", medicalSpecialty: ["general"] },
      { id: "sai", label: "월피동", medicalSpecialty: ["general"] },
      { id: "wolpi", label: "이동", medicalSpecialty: ["general"] },
      { id: "ee", label: "일동", medicalSpecialty: ["general"] },
      { id: "il", label: "장상동", medicalSpecialty: ["general"] },
      { id: "hail", label: "해양동", medicalSpecialty: ["general"] },
      {
        id: "seongan",
        label: "성포동",
        medicalSpecialty: ["general", "internal"],
      },
    ],

    // 안산시 단원구
    danwon: [
      { id: "danwon", label: "단원동", medicalSpecialty: ["general"] },
      {
        id: "gocheon",
        label: "고잔동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "gojan", label: "초지동", medicalSpecialty: ["general"] },
      { id: "choji", label: "원곡동", medicalSpecialty: ["general"] },
      { id: "wongok", label: "선부동", medicalSpecialty: ["general"] },
      { id: "seonbu", label: "와동", medicalSpecialty: ["general"] },
      { id: "wa", label: "신길동", medicalSpecialty: ["general"] },
      { id: "singil", label: "대부동", medicalSpecialty: ["general"] },
      { id: "siheung", label: "호수동", medicalSpecialty: ["general"] },
      { id: "banwol", label: "반월동", medicalSpecialty: ["general"] },
    ],
  },

  // 경기도 안양시의 구별 동
  "gyeonggi.anyang": {
    // 안양시 동안구
    "gyeonggi.anyang": {
      // 안양시 만안구 (이어서)
      manan: [
        {
          id: "anyang",
          label: "안양동",
          medicalSpecialty: ["general", "internal"],
        },
        { id: "bisan", label: "비산동", medicalSpecialty: ["general"] },
        { id: "bakdal", label: "박달동", medicalSpecialty: ["general"] },
        { id: "seoksu", label: "석수동", medicalSpecialty: ["general"] },
        { id: "hogye", label: "호계동", medicalSpecialty: ["general"] },
        { id: "anyang1", label: "안양1동", medicalSpecialty: ["general"] },
        { id: "anyang2", label: "안양2동", medicalSpecialty: ["general"] },
        { id: "anyang3", label: "안양3동", medicalSpecialty: ["general"] },
        { id: "anyang4", label: "안양4동", medicalSpecialty: ["general"] },
        { id: "anyang5", label: "안양5동", medicalSpecialty: ["general"] },
        { id: "anyang6", label: "안양6동", medicalSpecialty: ["general"] },
        { id: "anyang7", label: "안양7동", medicalSpecialty: ["general"] },
        { id: "anyang8", label: "안양8동", medicalSpecialty: ["general"] },
        { id: "anyang9", label: "안양9동", medicalSpecialty: ["general"] },
      ],
    },

    // 경기도 화성시의 동/읍/면
    "gyeonggi.hwaseong": [
      {
        id: "dongtan",
        label: "동탄동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "balan", label: "발안동", medicalSpecialty: ["general"] },
      { id: "banwol", label: "반월동", medicalSpecialty: ["general"] },
      { id: "byeongjeom", label: "병점동", medicalSpecialty: ["general"] },
      { id: "hwaseong", label: "화성시청", medicalSpecialty: ["general"] },
      {
        id: "dongtan1",
        label: "동탄1동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "dongtan2", label: "동탄2동", medicalSpecialty: ["general"] },
      { id: "dongtan3", label: "동탄3동", medicalSpecialty: ["general"] },
      { id: "dongtan4", label: "동탄4동", medicalSpecialty: ["general"] },
      { id: "jeongnam", label: "정남면", medicalSpecialty: ["general"] },
      { id: "paltan", label: "팔탄면", medicalSpecialty: ["general"] },
      { id: "ujung", label: "우정읍", medicalSpecialty: ["general"] },
      { id: "yangsan", label: "향남읍", medicalSpecialty: ["general"] },
      { id: "bongdam", label: "봉담읍", medicalSpecialty: ["general"] },
      { id: "maesong", label: "매송면", medicalSpecialty: ["general"] },
      { id: "hyangnam", label: "향남읍", medicalSpecialty: ["general"] },
    ],

    // 경기도 남양주시의 동/읍/면
    "gyeonggi.namyangju": [
      { id: "jinjeop", label: "진접읍", medicalSpecialty: ["general"] },
      { id: "wolgye", label: "별내동", medicalSpecialty: ["general"] },
      { id: "byeollae", label: "별내읍", medicalSpecialty: ["general"] },
      { id: "hwado", label: "화도읍", medicalSpecialty: ["general"] },
      { id: "onam", label: "오남읍", medicalSpecialty: ["general"] },
      { id: "pyeongnae", label: "평내동", medicalSpecialty: ["general"] },
      {
        id: "wabu",
        label: "와부읍",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "jigeum", label: "지금동", medicalSpecialty: ["general"] },
      { id: "dochon", label: "도농동", medicalSpecialty: ["general"] },
      { id: "gongse", label: "금곡동", medicalSpecialty: ["general"] },
      { id: "yangjeong", label: "양정동", medicalSpecialty: ["general"] },
      { id: "jingwan", label: "진건읍", medicalSpecialty: ["general"] },
      { id: "choan", label: "조안면", medicalSpecialty: ["general"] },
      { id: "namyangju", label: "남양주시청", medicalSpecialty: ["general"] },
    ],

    // 경기도 의정부시의 동
    "gyeonggi.uijeongbu": [
      {
        id: "uijeongbu",
        label: "의정부동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "howon", label: "호원동", medicalSpecialty: ["general"] },
      { id: "singok", label: "신곡동", medicalSpecialty: ["general"] },
      { id: "Jangam", label: "장암동", medicalSpecialty: ["general"] },
      { id: "nokyang", label: "녹양동", medicalSpecialty: ["general"] },
      { id: "ganeung", label: "가능동", medicalSpecialty: ["general"] },
      { id: "minrak", label: "민락동", medicalSpecialty: ["general"] },
      { id: "nakyang", label: "낙양동", medicalSpecialty: ["general"] },
      { id: "singok1", label: "신곡1동", medicalSpecialty: ["general"] },
      { id: "singok2", label: "신곡2동", medicalSpecialty: ["general"] },
      { id: "howon1", label: "호원1동", medicalSpecialty: ["general"] },
      { id: "howon2", label: "호원2동", medicalSpecialty: ["general"] },
    ],

    // 경기도 평택시의 동/읍/면
    "gyeonggi.pyeongtaek": [
      { id: "songtan", label: "송탄동", medicalSpecialty: ["general"] },
      { id: "pyeongtaek", label: "평택동", medicalSpecialty: ["general"] },
      { id: "anjung", label: "안중읍", medicalSpecialty: ["general"] },
      { id: "jisan", label: "지산동", medicalSpecialty: ["general"] },
      { id: "jije", label: "진위면", medicalSpecialty: ["general"] },
      { id: "godeok", label: "고덕면", medicalSpecialty: ["general"] },
      {
        id: "seojeong",
        label: "서정동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "songjuk", label: "송북동", medicalSpecialty: ["general"] },
      { id: "paengseong", label: "팽성읍", medicalSpecialty: ["general"] },
      { id: "jangan", label: "장안동", medicalSpecialty: ["general"] },
      { id: "poseung", label: "포승읍", medicalSpecialty: ["general"] },
      { id: "hyeondeok", label: "현덕면", medicalSpecialty: ["general"] },
      { id: "oseong", label: "오성면", medicalSpecialty: ["general"] },
      { id: "cheongbuk", label: "청북읍", medicalSpecialty: ["general"] },
    ],

    // 경기도 시흥시의 동
    "gyeonggi.siheung": [
      {
        id: "jeongwang",
        label: "정왕동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "neunggok", label: "능곡동", medicalSpecialty: ["general"] },
      { id: "dangsang", label: "대야동", medicalSpecialty: ["general"] },
      { id: "mokgam", label: "신천동", medicalSpecialty: ["general"] },
      { id: "sincheon", label: "신현동", medicalSpecialty: ["general"] },
      { id: "sinhyeon", label: "목감동", medicalSpecialty: ["general"] },
      { id: "daeyami", label: "과림동", medicalSpecialty: ["general"] },
      { id: "gurim", label: "매화동", medicalSpecialty: ["general"] },
      { id: "maehwa", label: "은행동", medicalSpecialty: ["general"] },
      { id: "eunhaeng", label: "군자동", medicalSpecialty: ["general"] },
      { id: "gunja", label: "연성동", medicalSpecialty: ["general"] },
      { id: "jeongwang1", label: "정왕1동", medicalSpecialty: ["general"] },
      { id: "jeongwang2", label: "정왕2동", medicalSpecialty: ["general"] },
      { id: "jeongwang3", label: "정왕3동", medicalSpecialty: ["general"] },
      { id: "jeongwang4", label: "정왕4동", medicalSpecialty: ["general"] },
    ],
  },
};
