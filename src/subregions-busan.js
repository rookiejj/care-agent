/**
 * 부산광역시 구/군별 동/읍/면 정보
 */
export const busanSubRegions = {
  // 부산 강서구의 동/읍/면
  "busan.gangseo": [
    { id: "myeongji", label: "명지동", medicalSpecialty: ["general"] },
    { id: "dadae", label: "다대동", medicalSpecialty: ["general"] },
    { id: "garak", label: "가락동", medicalSpecialty: ["general"] },
    { id: "jukrim", label: "죽림동", medicalSpecialty: ["general"] },
    { id: "noksan", label: "녹산동", medicalSpecialty: ["general"] },
    { id: "mieum", label: "미음동", medicalSpecialty: ["general"] },
    { id: "daejeo", label: "대저1동", medicalSpecialty: ["general"] },
    { id: "daejeo2", label: "대저2동", medicalSpecialty: ["general"] },
  ],

  // 부산 금정구의 동
  "busan.geumjeong": [
    { id: "seo", label: "서동", medicalSpecialty: ["general"] },
    { id: "bugok", label: "부곡동", medicalSpecialty: ["general"] },
    { id: "geumsa", label: "금사동", medicalSpecialty: ["general"] },
    { id: "namsan", label: "남산동", medicalSpecialty: ["general"] },
    { id: "geumsanam", label: "금사나미동", medicalSpecialty: ["general"] },
    {
      id: "jangjeon",
      label: "장전동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "cheongnyong", label: "청룡동", medicalSpecialty: ["general"] },
    { id: "geumjung", label: "금정동", medicalSpecialty: ["general"] },
    { id: "hoejin", label: "회진동", medicalSpecialty: ["general"] },
    { id: "onjung", label: "온정동", medicalSpecialty: ["general"] },
  ],

  // 부산 기장군의 읍/면
  "busan.gijang": [
    { id: "gijang", label: "기장읍", medicalSpecialty: ["general"] },
    { id: "jangan", label: "장안읍", medicalSpecialty: ["general"] },
    { id: "jeongja", label: "정관읍", medicalSpecialty: ["general"] },
    { id: "ilgwang", label: "일광읍", medicalSpecialty: ["general"] },
    { id: "cheolma", label: "철마면", medicalSpecialty: ["general"] },
  ],

  // 부산 남구의 동
  "busan.nam": [
    {
      id: "daeyeon",
      label: "대연동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "yongho", label: "용호동", medicalSpecialty: ["general"] },
    { id: "uam", label: "우암동", medicalSpecialty: ["general"] },
    { id: "munhyeon", label: "문현동", medicalSpecialty: ["general"] },
    { id: "gamman", label: "감만동", medicalSpecialty: ["general"] },
    { id: "yongdang", label: "용당동", medicalSpecialty: ["general"] },
    { id: "daeyeon1", label: "대연1동", medicalSpecialty: ["general"] },
    { id: "daeyeon3", label: "대연3동", medicalSpecialty: ["general"] },
    { id: "daeyeon5", label: "대연5동", medicalSpecialty: ["general"] },
  ],

  // 부산 동구의 동
  "busan.dong": [
    { id: "choryang", label: "초량동", medicalSpecialty: ["general"] },
    { id: "sujeong", label: "수정동", medicalSpecialty: ["general"] },
    {
      id: "beomil",
      label: "범일동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "jangjeon", label: "좌천동", medicalSpecialty: ["general"] },
    { id: "jwacheon", label: "좌천동", medicalSpecialty: ["general"] },
    { id: "bogudong", label: "복천동", medicalSpecialty: ["general"] },
    { id: "choryang1", label: "초량1동", medicalSpecialty: ["general"] },
    { id: "choryang2", label: "초량2동", medicalSpecialty: ["general"] },
    { id: "choryang3", label: "초량3동", medicalSpecialty: ["general"] },
  ],

  // 부산 동래구의 동
  "busan.dongnae": [
    {
      id: "oncheon",
      label: "온천동",
      medicalSpecialty: ["general", "orthopedics"],
    },
    { id: "myeongnyun", label: "명륜동", medicalSpecialty: ["general"] },
    { id: "sajik", label: "사직동", medicalSpecialty: ["general"] },
    { id: "bokcheon", label: "복천동", medicalSpecialty: ["general"] },
    { id: "sumin", label: "수민동", medicalSpecialty: ["general"] },
    { id: "anhyeon", label: "안락동", medicalSpecialty: ["general"] },
    { id: "seo", label: "서동", medicalSpecialty: ["general"] },
    {
      id: "oncheon1",
      label: "온천1동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "oncheon2", label: "온천2동", medicalSpecialty: ["general"] },
    { id: "oncheon3", label: "온천3동", medicalSpecialty: ["general"] },
  ],

  // 부산 부산진구의 동
  "busan.busanjin": [
    { id: "beomcheon", label: "범천동", medicalSpecialty: ["general"] },
    { id: "beomil", label: "범일동", medicalSpecialty: ["general"] },
    { id: "yangjeong", label: "양정동", medicalSpecialty: ["general"] },
    { id: "jwacheon", label: "좌천동", medicalSpecialty: ["general"] },
    { id: "bumin", label: "부민동", medicalSpecialty: ["general"] },
    {
      id: "jeonpo",
      label: "전포동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "choryang", label: "초량동", medicalSpecialty: ["general"] },
    { id: "yeonji", label: "연지동", medicalSpecialty: ["general"] },
    { id: "gaegeum", label: "개금동", medicalSpecialty: ["general"] },
    { id: "danggam", label: "당감동", medicalSpecialty: ["general"] },
    { id: "buam", label: "부암동", medicalSpecialty: ["general"] },
  ],

  // 부산 북구의 동
  "busan.buk": [
    { id: "gupo", label: "구포동", medicalSpecialty: ["general", "internal"] },
    { id: "hwamyeong", label: "화명동", medicalSpecialty: ["general"] },
    { id: "deokcheon", label: "덕천동", medicalSpecialty: ["general"] },
    { id: "mandeok", label: "만덕동", medicalSpecialty: ["general"] },
    { id: "gumgok", label: "금곡동", medicalSpecialty: ["general"] },
    { id: "hwamyeong1", label: "화명1동", medicalSpecialty: ["general"] },
    { id: "hwamyeong2", label: "화명2동", medicalSpecialty: ["general"] },
    { id: "hwamyeong3", label: "화명3동", medicalSpecialty: ["general"] },
  ],

  // 부산 사상구의 동
  "busan.sasang": [
    { id: "jurye", label: "주례동", medicalSpecialty: ["general"] },
    { id: "hakjang", label: "학장동", medicalSpecialty: ["general"] },
    { id: "gamjeon", label: "감전동", medicalSpecialty: ["general"] },
    { id: "moran", label: "모라동", medicalSpecialty: ["general"] },
    { id: "deokgam", label: "덕포동", medicalSpecialty: ["general"] },
    { id: "eulsukdo", label: "을숙도동", medicalSpecialty: ["general"] },
    { id: "hwamyeong", label: "화명동", medicalSpecialty: ["general"] },
    { id: "samnak", label: "삼락동", medicalSpecialty: ["general"] },
  ],

  // 부산 사하구의 동
  "busan.saha": [
    { id: "dadaepo", label: "다대포동", medicalSpecialty: ["general"] },
    { id: "sinpyeong", label: "신평동", medicalSpecialty: ["general"] },
    { id: "haeundae", label: "하단동", medicalSpecialty: ["general"] },
    { id: "jangrim", label: "장림동", medicalSpecialty: ["general"] },
    {
      id: "goejeong",
      label: "괴정동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "gamcheon", label: "감천동", medicalSpecialty: ["general"] },
    { id: "gupo", label: "구평동", medicalSpecialty: ["general"] },
  ],

  // 부산 서구의 동
  "busan.seo": [
    { id: "dongdaeshin", label: "동대신동", medicalSpecialty: ["general"] },
    { id: "seodaeshin", label: "서대신동", medicalSpecialty: ["general"] },
    { id: "bumin", label: "부민동", medicalSpecialty: ["general"] },
    { id: "amnam", label: "암남동", medicalSpecialty: ["general"] },
    { id: "chojang", label: "초장동", medicalSpecialty: ["general"] },
    { id: "nambumin", label: "남부민동", medicalSpecialty: ["general"] },
    { id: "dong1", label: "동1동", medicalSpecialty: ["general"] },
    { id: "dong2", label: "동2동", medicalSpecialty: ["general"] },
    { id: "dong3", label: "동3동", medicalSpecialty: ["general"] },
  ],

  // 부산 수영구의 동
  "busan.suyeong": [
    {
      id: "gwangan",
      label: "광안동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "millak", label: "민락동", medicalSpecialty: ["general"] },
    { id: "namcheon", label: "남천동", medicalSpecialty: ["general"] },
    { id: "suyeong", label: "수영동", medicalSpecialty: ["general"] },
    { id: "mangmi", label: "망미동", medicalSpecialty: ["general"] },
  ],

  // 부산 연제구의 동
  "busan.yeonje": [
    {
      id: "yeonsan",
      label: "연산동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "geoje", label: "거제동", medicalSpecialty: ["general"] },
    { id: "yeonsan1", label: "연산1동", medicalSpecialty: ["general"] },
    { id: "yeonsan2", label: "연산2동", medicalSpecialty: ["general"] },
    { id: "yeonsan3", label: "연산3동", medicalSpecialty: ["general"] },
    { id: "yeonsan4", label: "연산4동", medicalSpecialty: ["general"] },
    { id: "yeonsan5", label: "연산5동", medicalSpecialty: ["general"] },
    { id: "yeonsan6", label: "연산6동", medicalSpecialty: ["general"] },
    { id: "yeonsan8", label: "연산8동", medicalSpecialty: ["general"] },
    { id: "yeonsan9", label: "연산9동", medicalSpecialty: ["general"] },
  ],

  // 부산 영도구의 동
  "busan.yeongdo": [
    { id: "dongsam", label: "동삼동", medicalSpecialty: ["general"] },
    { id: "buseong", label: "부성동", medicalSpecialty: ["general"] },
    { id: "yeongseon", label: "영선동", medicalSpecialty: ["general"] },
    { id: "simgok", label: "심곡동", medicalSpecialty: ["general"] },
    { id: "cheongha", label: "청학동", medicalSpecialty: ["general"] },
    { id: "yeongil", label: "영일동", medicalSpecialty: ["general"] },
    { id: "dongsam1", label: "동삼1동", medicalSpecialty: ["general"] },
    { id: "dongsam2", label: "동삼2동", medicalSpecialty: ["general"] },
    { id: "dongsam3", label: "동삼3동", medicalSpecialty: ["general"] },
  ],

  // 부산 중구의 동
  "busan.jung": [
    { id: "choryang", label: "초량동", medicalSpecialty: ["general"] },
    { id: "jungang", label: "중앙동", medicalSpecialty: ["general", "dental"] },
    { id: "dongkwang", label: "동광동", medicalSpecialty: ["general"] },
    { id: "daecheong", label: "대청동", medicalSpecialty: ["general"] },
    { id: "yongdusan", label: "용두산동", medicalSpecialty: ["general"] },
    {
      id: "nampo",
      label: "남포동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "bosu", label: "보수동", medicalSpecialty: ["general"] },
    { id: "yeongju", label: "영주동", medicalSpecialty: ["general"] },
  ],

  // 부산 해운대구의 동
  "busan.haeundae": [
    {
      id: "haeundae",
      label: "해운대동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "songjeong", label: "송정동", medicalSpecialty: ["general"] },
    { id: "jwa", label: "좌동", medicalSpecialty: ["general"] },
    { id: "jung", label: "중동", medicalSpecialty: ["general"] },
    { id: "u", label: "우동", medicalSpecialty: ["general", "dermatology"] },
    { id: "banyeo", label: "반여동", medicalSpecialty: ["general"] },
    { id: "bansong", label: "반송동", medicalSpecialty: ["general"] },
    { id: "jwa1", label: "좌1동", medicalSpecialty: ["general"] },
    { id: "jwa2", label: "좌2동", medicalSpecialty: ["general"] },
    { id: "jwa3", label: "좌3동", medicalSpecialty: ["general"] },
    { id: "jwa4", label: "좌4동", medicalSpecialty: ["general"] },
    {
      id: "centum",
      label: "센텀시티",
      medicalSpecialty: ["general", "dermatology", "plastic"],
    },
  ],
};
