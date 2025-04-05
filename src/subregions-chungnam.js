/**
 * 충청남도 주요 시/군별 동/읍/면 정보
 */
export const chungnamSubRegions = {
  // 충청남도 천안시의 구별 동/읍/면
  "chungnam.cheonan": {
    // 천안시 동남구
    dongnam: [
      { id: "moonhwa", label: "문화동", medicalSpecialty: ["general"] },
      { id: "yakmok", label: "목천읍", medicalSpecialty: ["general"] },
      { id: "mokcheon", label: "병천면", medicalSpecialty: ["general"] },
      { id: "byeongcheon", label: "동면", medicalSpecialty: ["general"] },
      {
        id: "dong",
        label: "중앙동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "jungang", label: "원성동", medicalSpecialty: ["general"] },
      { id: "weonsung", label: "북일면", medicalSpecialty: ["general"] },
      { id: "bugil", label: "성거읍", medicalSpecialty: ["general"] },
      { id: "seongeo", label: "수신면", medicalSpecialty: ["general"] },
      { id: "susin", label: "광덕면", medicalSpecialty: ["general"] },
      { id: "gwangdeok", label: "풍세면", medicalSpecialty: ["general"] },
      { id: "pungse", label: "삼룡동", medicalSpecialty: ["general"] },
      { id: "namseong", label: "남산동", medicalSpecialty: ["general"] },
      {
        id: "namsan",
        label: "신부동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "sinbu", label: "청수동", medicalSpecialty: ["general"] },
    ],

    // 천안시 서북구
    seobuk: [
      { id: "bono", label: "성환읍", medicalSpecialty: ["general"] },
      { id: "seonghwan", label: "성거읍", medicalSpecialty: ["general"] },
      { id: "seongeo", label: "직산읍", medicalSpecialty: ["general"] },
      { id: "jiksan", label: "입장면", medicalSpecialty: ["general"] },
      {
        id: "ipjang",
        label: "성정동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "seongjeong", label: "쌍용동", medicalSpecialty: ["general"] },
      { id: "ssangyong", label: "백석동", medicalSpecialty: ["general"] },
      {
        id: "baekseok",
        label: "불당동",
        medicalSpecialty: ["general", "dermatology"],
      },
      { id: "buldang", label: "두정동", medicalSpecialty: ["general"] },
      { id: "dujeong", label: "부성동", medicalSpecialty: ["general"] },
      { id: "buseong", label: "일봉동", medicalSpecialty: ["general"] },
    ],
  },

  // 충청남도 공주시의 동/읍/면
  "chungnam.gongju": [
    { id: "gongjueup", label: "공주읍", medicalSpecialty: ["general"] },
    { id: "woongjin", label: "웅진동", medicalSpecialty: ["general"] },
    { id: "geumseong", label: "금성동", medicalSpecialty: ["general"] },
    {
      id: "singwan",
      label: "신관동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "jeongan", label: "중학동", medicalSpecialty: ["general"] },
    { id: "junghak", label: "옥룡동", medicalSpecialty: ["general"] },
    { id: "uglyong", label: "금학동", medicalSpecialty: ["general"] },
    { id: "geumhak", label: "신풍면", medicalSpecialty: ["general"] },
    { id: "sungpung", label: "계룡면", medicalSpecialty: ["general"] },
    { id: "gyeryong", label: "반포면", medicalSpecialty: ["general"] },
    { id: "banpo", label: "의당면", medicalSpecialty: ["general"] },
    { id: "yuidang", label: "정안면", medicalSpecialty: ["general"] },
    { id: "jeongan", label: "유구읍", medicalSpecialty: ["general"] },
    { id: "yugu", label: "이인면", medicalSpecialty: ["general"] },
    { id: "iin", label: "탄천면", medicalSpecialty: ["general"] },
    { id: "tancheon", label: "광정동", medicalSpecialty: ["general"] },
  ],

  // 충청남도 보령시의 동/읍/면
  "chungnam.boryeong": [
    { id: "deungjeong", label: "대천동", medicalSpecialty: ["general"] },
    { id: "daecheon", label: "동대동", medicalSpecialty: ["general"] },
    { id: "dongdae", label: "무창포", medicalSpecialty: ["general"] },
    { id: "muchangpo", label: "명천동", medicalSpecialty: ["general"] },
    { id: "myeongcheon", label: "웅천읍", medicalSpecialty: ["general"] },
    { id: "ungcheon", label: "주포면", medicalSpecialty: ["general"] },
    { id: "jupo", label: "주산면", medicalSpecialty: ["general"] },
    { id: "jusan", label: "미산면", medicalSpecialty: ["general"] },
    { id: "misan", label: "성주면", medicalSpecialty: ["general"] },
    { id: "seongju", label: "오천면", medicalSpecialty: ["general"] },
    { id: "ocheon", label: "천북면", medicalSpecialty: ["general"] },
    { id: "cheonbuk", label: "청소면", medicalSpecialty: ["general"] },
    { id: "cheongso", label: "청라면", medicalSpecialty: ["general"] },
    { id: "cheongna", label: "남포면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 아산시의 동/읍/면
  "chungnam.asan": [
    { id: "baebang", label: "배방읍", medicalSpecialty: ["general"] },
    {
      id: "eonyang",
      label: "온양동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "ongcheon", label: "온천동", medicalSpecialty: ["general"] },
    { id: "eumbong", label: "음봉면", medicalSpecialty: ["general"] },
    { id: "tangjeong", label: "탕정면", medicalSpecialty: ["general"] },
    { id: "dunpo", label: "둔포면", medicalSpecialty: ["general"] },
    { id: "sinchang", label: "신창면", medicalSpecialty: ["general"] },
    { id: "dogo", label: "도고면", medicalSpecialty: ["general"] },
    { id: "seonjang", label: "선장면", medicalSpecialty: ["general"] },
    { id: "yeomchi", label: "염치읍", medicalSpecialty: ["general"] },
    { id: "asan", label: "아산시청", medicalSpecialty: ["general"] },
    { id: "baebang1", label: "배방1동", medicalSpecialty: ["general"] },
    { id: "baebang2", label: "배방2동", medicalSpecialty: ["general"] },
    { id: "baebang3", label: "배방3동", medicalSpecialty: ["general"] },
  ],

  // 충청남도 서산시의 동/읍/면
  "chungnam.seosan": [
    { id: "buseong", label: "부춘동", medicalSpecialty: ["general"] },
    { id: "seosaneup", label: "동문동", medicalSpecialty: ["general"] },
    { id: "dongmoon", label: "석남동", medicalSpecialty: ["general"] },
    { id: "seongnam", label: "석남동", medicalSpecialty: ["general"] },
    { id: "unsan", label: "운산면", medicalSpecialty: ["general"] },
    { id: "daegot", label: "해미면", medicalSpecialty: ["general"] },
    { id: "haemi", label: "고북면", medicalSpecialty: ["general"] },
    { id: "gobuk", label: "부석면", medicalSpecialty: ["general"] },
    { id: "buseok", label: "팔봉면", medicalSpecialty: ["general"] },
    { id: "palbong", label: "지곡면", medicalSpecialty: ["general"] },
    { id: "jigok", label: "대산읍", medicalSpecialty: ["general"] },
    { id: "daesan", label: "성연면", medicalSpecialty: ["general"] },
    { id: "seongyeon", label: "음암면", medicalSpecialty: ["general"] },
    { id: "umam", label: "인지면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 논산시의 동/읍/면
  "chungnam.nonsan": [
    { id: "ganggyeong", label: "강경읍", medicalSpecialty: ["general"] },
    { id: "yeonmu", label: "연무읍", medicalSpecialty: ["general"] },
    {
      id: "nonsaneup",
      label: "취암동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "chuiam", label: "부창동", medicalSpecialty: ["general"] },
    { id: "buchang", label: "채운동", medicalSpecialty: ["general"] },
    { id: "chaeun", label: "광석면", medicalSpecialty: ["general"] },
    { id: "gwangseok", label: "노성면", medicalSpecialty: ["general"] },
    { id: "noseong", label: "상월면", medicalSpecialty: ["general"] },
    { id: "sangwol", label: "부적면", medicalSpecialty: ["general"] },
    { id: "bujeok", label: "연산면", medicalSpecialty: ["general"] },
    { id: "yeonsan", label: "벌곡면", medicalSpecialty: ["general"] },
    { id: "beolgok", label: "양촌면", medicalSpecialty: ["general"] },
    { id: "yangchon", label: "가야곡면", medicalSpecialty: ["general"] },
    { id: "gayagok", label: "은진면", medicalSpecialty: ["general"] },
    { id: "eunjin", label: "성동면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 계룡시의 동/면
  "chungnam.gyeryong": [
    { id: "eomsa", label: "엄사면", medicalSpecialty: ["general"] },
    { id: "gonam", label: "두마면", medicalSpecialty: ["general"] },
    { id: "duma", label: "신도안면", medicalSpecialty: ["general"] },
    { id: "sindoan", label: "금암동", medicalSpecialty: ["general"] },
  ],

  // 충청남도 당진시의 동/읍/면
  "chungnam.dangjin": [
    {
      id: "dangjin",
      label: "당진읍",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "hapdeok", label: "합덕읍", medicalSpecialty: ["general"] },
    { id: "songak", label: "송악읍", medicalSpecialty: ["general"] },
    { id: "sinpyeong", label: "신평면", medicalSpecialty: ["general"] },
    { id: "godae", label: "고대면", medicalSpecialty: ["general"] },
    { id: "sunseong", label: "순성면", medicalSpecialty: ["general"] },
    { id: "wontong", label: "우강면", medicalSpecialty: ["general"] },
    { id: "ugang", label: "정미면", medicalSpecialty: ["general"] },
    { id: "jeongmi", label: "면천면", medicalSpecialty: ["general"] },
    { id: "myeoncheon", label: "석문면", medicalSpecialty: ["general"] },
    { id: "seongmun", label: "대호지면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 금산군의 읍/면
  "chungnam.geumsan": [
    { id: "geumsan", label: "금산읍", medicalSpecialty: ["general"] },
    { id: "geumgwang", label: "금성면", medicalSpecialty: ["general"] },
    { id: "geumseong", label: "제원면", medicalSpecialty: ["general"] },
    { id: "jewon", label: "부리면", medicalSpecialty: ["general"] },
    { id: "buri", label: "군북면", medicalSpecialty: ["general"] },
    { id: "gunbuk", label: "남일면", medicalSpecialty: ["general"] },
    { id: "namil", label: "남이면", medicalSpecialty: ["general"] },
    { id: "nami", label: "진산면", medicalSpecialty: ["general"] },
    { id: "jinsan", label: "복수면", medicalSpecialty: ["general"] },
    { id: "boksu", label: "추부면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 부여군의 읍/면
  "chungnam.buyeo": [
    { id: "buyeo", label: "부여읍", medicalSpecialty: ["general"] },
    { id: "guji", label: "규암면", medicalSpecialty: ["general"] },
    { id: "geuam", label: "은산면", medicalSpecialty: ["general"] },
    { id: "eunsan", label: "외산면", medicalSpecialty: ["general"] },
    { id: "oesan", label: "내산면", medicalSpecialty: ["general"] },
    { id: "naesan", label: "구룡면", medicalSpecialty: ["general"] },
    { id: "guryong", label: "홍산면", medicalSpecialty: ["general"] },
    { id: "hongsan", label: "옥산면", medicalSpecialty: ["general"] },
    { id: "oksan", label: "충화면", medicalSpecialty: ["general"] },
    { id: "chunghwa", label: "양화면", medicalSpecialty: ["general"] },
    { id: "yanghwa", label: "임천면", medicalSpecialty: ["general"] },
    { id: "imcheon", label: "장암면", medicalSpecialty: ["general"] },
    { id: "jangam", label: "세도면", medicalSpecialty: ["general"] },
    { id: "sedo", label: "석성면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 서천군의 읍/면
  "chungnam.seocheon": [
    { id: "seocheon", label: "서천읍", medicalSpecialty: ["general"] },
    { id: "maseo", label: "마서면", medicalSpecialty: ["general"] },
    { id: "handong", label: "화양면", medicalSpecialty: ["general"] },
    { id: "hwayang", label: "기산면", medicalSpecialty: ["general"] },
    { id: "gisan", label: "한산면", medicalSpecialty: ["general"] },
    { id: "hansan", label: "마산면", medicalSpecialty: ["general"] },
    { id: "masan", label: "시초면", medicalSpecialty: ["general"] },
    { id: "sicho", label: "문산면", medicalSpecialty: ["general"] },
    { id: "munsan", label: "판교면", medicalSpecialty: ["general"] },
    { id: "pangyo", label: "종천면", medicalSpecialty: ["general"] },
    { id: "jongcheon", label: "비인면", medicalSpecialty: ["general"] },
    { id: "biin", label: "서면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 청양군의 읍/면
  "chungnam.cheongyang": [
    { id: "cheongyang", label: "청양읍", medicalSpecialty: ["general"] },
    { id: "unmun", label: "운곡면", medicalSpecialty: ["general"] },
    { id: "ungok", label: "대치면", medicalSpecialty: ["general"] },
    { id: "daechi", label: "정산면", medicalSpecialty: ["general"] },
    { id: "jeongsan", label: "목면", medicalSpecialty: ["general"] },
    { id: "mok", label: "청남면", medicalSpecialty: ["general"] },
    { id: "cheongnam", label: "장평면", medicalSpecialty: ["general"] },
    { id: "jangpyeong", label: "남양면", medicalSpecialty: ["general"] },
    { id: "namyang", label: "화성면", medicalSpecialty: ["general"] },
    { id: "hwaseong", label: "비봉면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 홍성군의 읍/면
  "chungnam.hongseong": [
    {
      id: "hongseong",
      label: "홍성읍",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "gwangcheon", label: "광천읍", medicalSpecialty: ["general"] },
    { id: "hongdong", label: "홍동면", medicalSpecialty: ["general"] },
    { id: "gilsang", label: "장곡면", medicalSpecialty: ["general"] },
    { id: "janggok", label: "은하면", medicalSpecialty: ["general"] },
    { id: "eunha", label: "결성면", medicalSpecialty: ["general"] },
    { id: "gyeolseong", label: "서부면", medicalSpecialty: ["general"] },
    { id: "seobu", label: "갈산면", medicalSpecialty: ["general"] },
    { id: "galsan", label: "신봉면", medicalSpecialty: ["general"] },
    { id: "sinbong", label: "부산면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 예산군의 읍/면
  "chungnam.yesan": [
    { id: "yesan", label: "예산읍", medicalSpecialty: ["general"] },
    { id: "deoksan", label: "삽교읍", medicalSpecialty: ["general"] },
    { id: "sabgyo", label: "대술면", medicalSpecialty: ["general"] },
    { id: "daesul", label: "신양면", medicalSpecialty: ["general"] },
    { id: "sinyang", label: "광시면", medicalSpecialty: ["general"] },
    { id: "gwangsi", label: "대흥면", medicalSpecialty: ["general"] },
    { id: "daeheung", label: "응봉면", medicalSpecialty: ["general"] },
    { id: "eungbong", label: "덕산면", medicalSpecialty: ["general"] },
    { id: "deoksan", label: "봉산면", medicalSpecialty: ["general"] },
    { id: "bongsan", label: "고덕면", medicalSpecialty: ["general"] },
    { id: "godeok", label: "신암면", medicalSpecialty: ["general"] },
    { id: "sinam", label: "오가면", medicalSpecialty: ["general"] },
  ],

  // 충청남도 태안군의 읍/면
  "chungnam.taean": [
    { id: "taean", label: "태안읍", medicalSpecialty: ["general"] },
    { id: "anmyeon", label: "안면읍", medicalSpecialty: ["general"] },
    { id: "gonam", label: "고남면", medicalSpecialty: ["general"] },
    { id: "nam", label: "남면", medicalSpecialty: ["general"] },
    { id: "geunheung", label: "근흥면", medicalSpecialty: ["general"] },
    { id: "sowon", label: "소원면", medicalSpecialty: ["general"] },
    { id: "wonbuk", label: "원북면", medicalSpecialty: ["general"] },
    { id: "iwon", label: "이원면", medicalSpecialty: ["general"] },
  ],
};
