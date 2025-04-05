/**
 * 경상남도 주요 시/군별 동/읍/면 정보 및 제주특별자치도 세부지역 정보
 */
export const gyeongnamSubRegions = {
  // 경상남도 창원시의 구별 동/읍/면
  "gyeongnam.changwon": {
    // 창원시 의창구
    uichang: [
      { id: "uichang", label: "의창동", medicalSpecialty: ["general"] },
      { id: "sarim", label: "팔룡동", medicalSpecialty: ["general"] },
      { id: "pallyong", label: "명곡동", medicalSpecialty: ["general"] },
      { id: "myeonggok", label: "봉림동", medicalSpecialty: ["general"] },
      {
        id: "bongnim",
        label: "용지동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "yongji", label: "중앙동", medicalSpecialty: ["general"] },
      { id: "jungang", label: "상남동", medicalSpecialty: ["general"] },
      { id: "sangnam", label: "사림동", medicalSpecialty: ["general"] },
      { id: "sabuk", label: "북면", medicalSpecialty: ["general"] },
      { id: "buk", label: "동읍", medicalSpecialty: ["general"] },
      { id: "dongeup", label: "대산면", medicalSpecialty: ["general"] },
    ],

    // 창원시 성산구
    "gyeongnam.changwon": {
      // 창원시 성산구
      seongsan: [
        { id: "sangnam", label: "상남동", medicalSpecialty: ["general"] },
        { id: "sangdae", label: "성호동", medicalSpecialty: ["general"] },
        { id: "seongho", label: "웅남동", medicalSpecialty: ["general"] },
        { id: "ungnam", label: "가음정동", medicalSpecialty: ["general"] },
        {
          id: "gaeujeong",
          label: "성주동",
          medicalSpecialty: ["general", "internal"],
        },
        { id: "seongju", label: "대방동", medicalSpecialty: ["general"] },
        { id: "daebang", label: "반송동", medicalSpecialty: ["general"] },
        { id: "bansong", label: "산격동", medicalSpecialty: ["general"] },
        { id: "sangyeok", label: "반림동", medicalSpecialty: ["general"] },
        { id: "bannim", label: "중앙동", medicalSpecialty: ["general"] },
      ],

      // 창원시 마산합포구
      masanhappo: [
        { id: "odong", label: "완월동", medicalSpecialty: ["general"] },
        { id: "wanwol", label: "자산동", medicalSpecialty: ["general"] },
        { id: "jasan", label: "가포동", medicalSpecialty: ["general"] },
        { id: "gapo", label: "월영동", medicalSpecialty: ["general"] },
        { id: "woryeong", label: "문화동", medicalSpecialty: ["general"] },
        { id: "munhwa", label: "반월동", medicalSpecialty: ["general"] },
        {
          id: "banwol",
          label: "중앙동",
          medicalSpecialty: ["general", "internal"],
        },
        { id: "jungang", label: "완월동", medicalSpecialty: ["general"] },
        { id: "wanwol", label: "월영동", medicalSpecialty: ["general"] },
        { id: "woryeong", label: "구산면", medicalSpecialty: ["general"] },
        { id: "gusan", label: "진동면", medicalSpecialty: ["general"] },
        { id: "jindong", label: "진북면", medicalSpecialty: ["general"] },
        { id: "jinbuk", label: "진전면", medicalSpecialty: ["general"] },
      ],

      // 창원시 마산회원구
      masanhoewon: [
        { id: "hoewon", label: "석전동", medicalSpecialty: ["general"] },
        { id: "seokjeon", label: "회원1동", medicalSpecialty: ["general"] },
        { id: "hoewon1", label: "회원2동", medicalSpecialty: ["general"] },
        { id: "hoewon2", label: "양덕1동", medicalSpecialty: ["general"] },
        { id: "yangdeok1", label: "양덕2동", medicalSpecialty: ["general"] },
        {
          id: "yangdeok2",
          label: "합성1동",
          medicalSpecialty: ["general", "internal"],
        },
        { id: "hapseong1", label: "합성2동", medicalSpecialty: ["general"] },
        { id: "hapseong2", label: "구암1동", medicalSpecialty: ["general"] },
        { id: "guam1", label: "구암2동", medicalSpecialty: ["general"] },
        { id: "guam2", label: "봉암동", medicalSpecialty: ["general"] },
        { id: "bongam", label: "내서읍", medicalSpecialty: ["general"] },
      ],

      // 창원시 진해구
      jinhae: [
        { id: "jinhae", label: "충무동", medicalSpecialty: ["general"] },
        { id: "chungmu", label: "여좌동", medicalSpecialty: ["general"] },
        { id: "yeojwa", label: "태평동", medicalSpecialty: ["general"] },
        { id: "taepyeong", label: "경화동", medicalSpecialty: ["general"] },
        { id: "gyeonghwa", label: "병암동", medicalSpecialty: ["general"] },
        {
          id: "byeongam",
          label: "석동",
          medicalSpecialty: ["general", "internal"],
        },
        { id: "seok", label: "이동", medicalSpecialty: ["general"] },
        { id: "i", label: "자은동", medicalSpecialty: ["general"] },
        { id: "jaeun", label: "덕산동", medicalSpecialty: ["general"] },
        { id: "deoksan", label: "풍호동", medicalSpecialty: ["general"] },
        { id: "pungho", label: "웅천동", medicalSpecialty: ["general"] },
        { id: "ungcheon", label: "웅동1동", medicalSpecialty: ["general"] },
        { id: "ungdong1", label: "웅동2동", medicalSpecialty: ["general"] },
      ],
    },

    // 경상남도 진주시의 동/읍/면
    "gyeongnam.jinju": [
      { id: "jungang", label: "중앙동", medicalSpecialty: ["general"] },
      { id: "eui", label: "성북동", medicalSpecialty: ["general"] },
      { id: "seongbuk", label: "신안동", medicalSpecialty: ["general"] },
      { id: "sinan", label: "이현동", medicalSpecialty: ["general"] },
      { id: "ihyeon", label: "판문동", medicalSpecialty: ["general"] },
      {
        id: "panmun",
        label: "가호동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "gaho", label: "충무공동", medicalSpecialty: ["general"] },
      { id: "chungmugong", label: "상대동", medicalSpecialty: ["general"] },
      { id: "sangdae", label: "하대동", medicalSpecialty: ["general"] },
      { id: "hadae", label: "상평동", medicalSpecialty: ["general"] },
      { id: "sangpyeong", label: "초장동", medicalSpecialty: ["general"] },
      { id: "chojang", label: "평거동", medicalSpecialty: ["general"] },
      { id: "pyeonggeo", label: "신안동", medicalSpecialty: ["general"] },
      { id: "sinan", label: "이반성면", medicalSpecialty: ["general"] },
      { id: "ibanseong", label: "일반성면", medicalSpecialty: ["general"] },
      { id: "ilbanseong", label: "정촌면", medicalSpecialty: ["general"] },
      { id: "jeongchon", label: "금곡면", medicalSpecialty: ["general"] },
      { id: "geumgok", label: "진성면", medicalSpecialty: ["general"] },
      { id: "jinseong", label: "대곡면", medicalSpecialty: ["general"] },
      { id: "daegok", label: "금산면", medicalSpecialty: ["general"] },
      { id: "geumsan", label: "집현면", medicalSpecialty: ["general"] },
      { id: "jiphyeon", label: "미천면", medicalSpecialty: ["general"] },
      { id: "micheon", label: "명석면", medicalSpecialty: ["general"] },
      { id: "myeongseok", label: "대평면", medicalSpecialty: ["general"] },
      { id: "daepyeong", label: "수곡면", medicalSpecialty: ["general"] },
      { id: "sugok", label: "사봉면", medicalSpecialty: ["general"] },
      { id: "sabong", label: "지수면", medicalSpecialty: ["general"] },
      { id: "jisu", label: "남강동", medicalSpecialty: ["general"] },
    ],

    // 경상남도 김해시의 동/읍/면
    "gyeongnam.gimhae": [
      { id: "hoehyeon", label: "내외동", medicalSpecialty: ["general"] },
      { id: "naeoe", label: "북부동", medicalSpecialty: ["general"] },
      { id: "bukbu", label: "활천동", medicalSpecialty: ["general"] },
      { id: "hwalcheon", label: "삼안동", medicalSpecialty: ["general"] },
      { id: "saman", label: "부원동", medicalSpecialty: ["general"] },
      {
        id: "buwon",
        label: "동상동",
        medicalSpecialty: ["general", "internal"],
      },
      { id: "dongsang", label: "회현동", medicalSpecialty: ["general"] },
      { id: "hoehyeon", label: "부원동", medicalSpecialty: ["general"] },
      { id: "buwon", label: "내외동", medicalSpecialty: ["general"] },
      { id: "naeoe", label: "상동면", medicalSpecialty: ["general"] },
      { id: "sangdong", label: "대동면", medicalSpecialty: ["general"] },
      { id: "daedong", label: "주촌면", medicalSpecialty: ["general"] },
      { id: "juchon", label: "진례면", medicalSpecialty: ["general"] },
      { id: "jinnye", label: "진영읍", medicalSpecialty: ["general"] },
      { id: "jinyeong", label: "한림면", medicalSpecialty: ["general"] },
      { id: "hannim", label: "생림면", medicalSpecialty: ["general"] },
      { id: "saengnim", label: "상동면", medicalSpecialty: ["general"] },
      { id: "sangdong", label: "장유1동", medicalSpecialty: ["general"] },
      { id: "jangyu1", label: "장유2동", medicalSpecialty: ["general"] },
      { id: "jangyu2", label: "장유3동", medicalSpecialty: ["general"] },
    ],
  },
};
