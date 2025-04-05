/**
 * 서울특별시 구별 동 정보
 */
export const seoulSubRegions = {
  // 서울 강남구의 동
  "seoul.gangnam": [
    {
      id: "apgujeong",
      label: "압구정동",
      medicalSpecialty: ["plastic", "dermatology"],
    },
    {
      id: "sinsa",
      label: "신사동",
      medicalSpecialty: ["plastic", "dermatology"],
    },
    {
      id: "cheongdam",
      label: "청담동",
      medicalSpecialty: ["plastic", "dermatology"],
    },
    { id: "nonhyeon", label: "논현동", medicalSpecialty: ["general"] },
    {
      id: "daechi",
      label: "대치동",
      medicalSpecialty: ["general", "pediatrics"],
    },
    {
      id: "yeoksam",
      label: "역삼동",
      medicalSpecialty: ["general", "internal"],
    },
    {
      id: "samsung",
      label: "삼성동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "dogok", label: "도곡동", medicalSpecialty: ["general"] },
    { id: "gaepo", label: "개포동", medicalSpecialty: ["general"] },
    { id: "ilwon", label: "일원동", medicalSpecialty: ["general", "hospital"] },
    { id: "suseo", label: "수서동", medicalSpecialty: ["general"] },
  ],

  // 서울 강동구의 동
  "seoul.gangdong": [
    {
      id: "cheonho",
      label: "천호동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "amsa", label: "암사동", medicalSpecialty: ["general"] },
    { id: "gangil", label: "강일동", medicalSpecialty: ["general"] },
    { id: "godeok", label: "고덕동", medicalSpecialty: ["general"] },
    { id: "myeongil", label: "명일동", medicalSpecialty: ["general"] },
    { id: "gil", label: "길동", medicalSpecialty: ["general"] },
    { id: "sangil", label: "상일동", medicalSpecialty: ["general"] },
    { id: "dunchon", label: "둔촌동", medicalSpecialty: ["general"] },
  ],

  // 서울 강북구의 동
  "seoul.gangbuk": [
    { id: "mia", label: "미아동", medicalSpecialty: ["general"] },
    { id: "suyu", label: "수유동", medicalSpecialty: ["general"] },
    { id: "ui", label: "우이동", medicalSpecialty: ["general"] },
    { id: "beon", label: "번동", medicalSpecialty: ["general"] },
    { id: "songbuk", label: "송북동", medicalSpecialty: ["general"] },
    { id: "songjung", label: "송중동", medicalSpecialty: ["general"] },
    { id: "samgaksan", label: "삼각산동", medicalSpecialty: ["general"] },
    { id: "insu", label: "인수동", medicalSpecialty: ["general"] },
  ],

  // 서울 강서구의 동
  "seoul.gangseo": [
    { id: "banghwa", label: "방화동", medicalSpecialty: ["general"] },
    { id: "gonghang", label: "공항동", medicalSpecialty: ["general"] },
    { id: "gayang", label: "가양동", medicalSpecialty: ["general"] },
    { id: "deungchon", label: "등촌동", medicalSpecialty: ["general"] },
    {
      id: "hwagok",
      label: "화곡동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "balsan", label: "발산동", medicalSpecialty: ["general"] },
    { id: "ujangsan", label: "우장산동", medicalSpecialty: ["general"] },
    { id: "naebalsan", label: "내발산동", medicalSpecialty: ["general"] },
  ],

  // 서울 관악구의 동
  "seoul.gwanak": [
    { id: "bongcheon", label: "봉천동", medicalSpecialty: ["general"] },
    { id: "sinrim", label: "신림동", medicalSpecialty: ["general"] },
    { id: "seorim", label: "서림동", medicalSpecialty: ["general"] },
    { id: "namhyeon", label: "남현동", medicalSpecialty: ["general"] },
    { id: "seowon", label: "서원동", medicalSpecialty: ["general"] },
    { id: "cheongnyong", label: "청룡동", medicalSpecialty: ["general"] },
    { id: "jowon", label: "조원동", medicalSpecialty: ["general"] },
    { id: "haengun", label: "행운동", medicalSpecialty: ["general"] },
  ],

  // 서울 광진구의 동
  "seoul.gwangjin": [
    { id: "jayang", label: "자양동", medicalSpecialty: ["general"] },
    { id: "junggok", label: "중곡동", medicalSpecialty: ["general"] },
    { id: "gunja", label: "군자동", medicalSpecialty: ["general"] },
    { id: "gwangjang", label: "광장동", medicalSpecialty: ["general"] },
    { id: "hwayang", label: "화양동", medicalSpecialty: ["general", "dental"] },
    { id: "neung", label: "능동", medicalSpecialty: ["general"] },
    { id: "mojeon", label: "모전동", medicalSpecialty: ["general"] },
  ],

  // 서울 구로구의 동
  "seoul.guro": [
    { id: "guro", label: "구로동", medicalSpecialty: ["general", "internal"] },
    { id: "garibong", label: "가리봉동", medicalSpecialty: ["general"] },
    { id: "gocheok", label: "고척동", medicalSpecialty: ["general"] },
    { id: "siheung", label: "시흥동", medicalSpecialty: ["general"] },
    { id: "oryu", label: "오류동", medicalSpecialty: ["general"] },
    { id: "sugung", label: "수궁동", medicalSpecialty: ["general"] },
    { id: "gaebong", label: "개봉동", medicalSpecialty: ["general"] },
    { id: "cheonwang", label: "천왕동", medicalSpecialty: ["general"] },
    { id: "hang", label: "항동", medicalSpecialty: ["general"] },
  ],

  // 서울 금천구의 동
  "seoul.geumcheon": [
    { id: "gasan", label: "가산동", medicalSpecialty: ["general"] },
    { id: "doksan", label: "독산동", medicalSpecialty: ["general"] },
    { id: "siheung1", label: "시흥1동", medicalSpecialty: ["general"] },
    { id: "siheung2", label: "시흥2동", medicalSpecialty: ["general"] },
    { id: "siheung3", label: "시흥3동", medicalSpecialty: ["general"] },
    { id: "siheung4", label: "시흥4동", medicalSpecialty: ["general"] },
    { id: "siheung5", label: "시흥5동", medicalSpecialty: ["general"] },
  ],

  // 서울 노원구의 동
  "seoul.nowon": [
    { id: "wolgye", label: "월계동", medicalSpecialty: ["general"] },
    { id: "gongneung", label: "공릉동", medicalSpecialty: ["general"] },
    {
      id: "sanggye",
      label: "상계동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "junggye", label: "중계동", medicalSpecialty: ["general"] },
    { id: "hagye", label: "하계동", medicalSpecialty: ["general"] },
    { id: "wolgye2", label: "월계2동", medicalSpecialty: ["general"] },
    { id: "wolgye3", label: "월계3동", medicalSpecialty: ["general"] },
  ],

  // 서울 도봉구의 동
  "seoul.dobong": [
    { id: "dobong", label: "도봉동", medicalSpecialty: ["general"] },
    { id: "banghak", label: "방학동", medicalSpecialty: ["general"] },
    { id: "ssangmun", label: "쌍문동", medicalSpecialty: ["general"] },
    { id: "chang", label: "창동", medicalSpecialty: ["general", "internal"] },
    { id: "banghak1", label: "방학1동", medicalSpecialty: ["general"] },
    { id: "banghak2", label: "방학2동", medicalSpecialty: ["general"] },
    { id: "banghak3", label: "방학3동", medicalSpecialty: ["general"] },
  ],

  // 서울 동대문구의 동
  "seoul.dongdaemun": [
    { id: "jeonnong", label: "전농동", medicalSpecialty: ["general"] },
    {
      id: "jegi",
      label: "제기동",
      medicalSpecialty: ["general", "traditional"],
    },
    { id: "yongdu", label: "용두동", medicalSpecialty: ["general"] },
    { id: "hwagok", label: "화곡동", medicalSpecialty: ["general"] },
    {
      id: "cheongnyangni",
      label: "청량리동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "hoegi", label: "회기동", medicalSpecialty: ["general"] },
    { id: "hwigyeong", label: "휘경동", medicalSpecialty: ["general"] },
    { id: "imun", label: "이문동", medicalSpecialty: ["general"] },
  ],

  // 서울 동작구의 동
  "seoul.dongjak": [
    { id: "noryangjin", label: "노량진동", medicalSpecialty: ["general"] },
    { id: "sangdo", label: "상도동", medicalSpecialty: ["general"] },
    {
      id: "sadang",
      label: "사당동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "daebang", label: "대방동", medicalSpecialty: ["general"] },
    { id: "sindaebang", label: "신대방동", medicalSpecialty: ["general"] },
    { id: "heukseok", label: "흑석동", medicalSpecialty: ["general"] },
    { id: "dongjak", label: "동작동", medicalSpecialty: ["general"] },
  ],

  // 서울 마포구의 동
  "seoul.mapo": [
    { id: "gongdeok", label: "공덕동", medicalSpecialty: ["general"] },
    { id: "yonggang", label: "용강동", medicalSpecialty: ["general"] },
    { id: "ahyeon", label: "아현동", medicalSpecialty: ["general"] },
    { id: "dohwa", label: "도화동", medicalSpecialty: ["general"] },
    { id: "sinsu", label: "신수동", medicalSpecialty: ["general"] },
    {
      id: "hapjeong",
      label: "합정동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "mangwon", label: "망원동", medicalSpecialty: ["general"] },
    { id: "seongsan", label: "성산동", medicalSpecialty: ["general"] },
    {
      id: "seogyo",
      label: "서교동",
      medicalSpecialty: ["general", "dermatology", "plastic"],
    },
    { id: "yeomni", label: "염리동", medicalSpecialty: ["general"] },
  ],

  // 서울 서대문구의 동
  "seoul.seodaemun": [
    { id: "chungjeongno", label: "충정로동", medicalSpecialty: ["general"] },
    { id: "bukgajwa", label: "북가좌동", medicalSpecialty: ["general"] },
    { id: "namgajwa", label: "남가좌동", medicalSpecialty: ["general"] },
    { id: "hongje", label: "홍제동", medicalSpecialty: ["general"] },
    { id: "yeonhui", label: "연희동", medicalSpecialty: ["general"] },
    {
      id: "sinchon",
      label: "신촌동",
      medicalSpecialty: ["general", "dental", "ophthalmology"],
    },
    { id: "hongeun", label: "홍은동", medicalSpecialty: ["general"] },
    { id: "bugahyeon", label: "북아현동", medicalSpecialty: ["general"] },
  ],

  // 서울 서초구의 동
  "seoul.seocho": [
    {
      id: "seocho",
      label: "서초동",
      medicalSpecialty: ["general", "dermatology"],
    },
    {
      id: "banpo",
      label: "반포동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "jamwon", label: "잠원동", medicalSpecialty: ["general"] },
    { id: "yangjae", label: "양재동", medicalSpecialty: ["general"] },
    { id: "umyeon", label: "우면동", medicalSpecialty: ["general"] },
    {
      id: "bangbae",
      label: "방배동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "naegok", label: "내곡동", medicalSpecialty: ["general"] },
    {
      id: "seochogwacheon",
      label: "서초과천IC",
      medicalSpecialty: ["general"],
    },
  ],

  // 서울 성동구의 동
  "seoul.seongdong": [
    { id: "wangsimni", label: "왕십리동", medicalSpecialty: ["general"] },
    { id: "haengdang", label: "행당동", medicalSpecialty: ["general"] },
    { id: "majang", label: "마장동", medicalSpecialty: ["general"] },
    { id: "sageun", label: "사근동", medicalSpecialty: ["general"] },
    { id: "geumho", label: "금호동", medicalSpecialty: ["general"] },
    { id: "ogsu", label: "옥수동", medicalSpecialty: ["general"] },
    {
      id: "seongsu",
      label: "성수동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "yongdap", label: "용답동", medicalSpecialty: ["general"] },
  ],

  // 서울 성북구의 동
  "seoul.seongbuk": [
    { id: "seongbukdong", label: "성북동", medicalSpecialty: ["general"] },
    { id: "dongseon", label: "동선동", medicalSpecialty: ["general"] },
    { id: "bomun", label: "보문동", medicalSpecialty: ["general"] },
    { id: "jeongneung", label: "정릉동", medicalSpecialty: ["general"] },
    { id: "jongam", label: "종암동", medicalSpecialty: ["general"] },
    {
      id: "anam",
      label: "안암동",
      medicalSpecialty: ["general", "internal", "hospital"],
    },
    { id: "donam", label: "돈암동", medicalSpecialty: ["general"] },
    { id: "gileum", label: "길음동", medicalSpecialty: ["general"] },
    { id: "seokwan", label: "석관동", medicalSpecialty: ["general"] },
  ],

  // 서울 송파구의 동
  "seoul.songpa": [
    {
      id: "jamsil",
      label: "잠실동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "shincheon", label: "신천동", medicalSpecialty: ["general"] },
    { id: "songpa", label: "송파동", medicalSpecialty: ["general"] },
    { id: "bangi", label: "방이동", medicalSpecialty: ["general"] },
    { id: "ogeum", label: "오금동", medicalSpecialty: ["general"] },
    { id: "macheon", label: "마천동", medicalSpecialty: ["general"] },
    { id: "garak", label: "가락동", medicalSpecialty: ["general"] },
    { id: "munjeong", label: "문정동", medicalSpecialty: ["general"] },
    { id: "geoyeo", label: "거여동", medicalSpecialty: ["general"] },
    { id: "wirye", label: "위례동", medicalSpecialty: ["general"] },
    { id: "pungnap", label: "풍납동", medicalSpecialty: ["general"] },
  ],

  // 서울 양천구의 동
  "seoul.yangcheon": [
    {
      id: "mok",
      label: "목동",
      medicalSpecialty: ["general", "pediatrics", "internal"],
    },
    { id: "sinwol", label: "신월동", medicalSpecialty: ["general"] },
    { id: "sinjeong", label: "신정동", medicalSpecialty: ["general"] },
    { id: "mok1", label: "목1동", medicalSpecialty: ["general"] },
    { id: "mok2", label: "목2동", medicalSpecialty: ["general"] },
    { id: "mok3", label: "목3동", medicalSpecialty: ["general"] },
    { id: "mok4", label: "목4동", medicalSpecialty: ["general"] },
    { id: "mok5", label: "목5동", medicalSpecialty: ["general"] },
  ],

  // 서울 영등포구의 동
  "seoul.yeongdeungpo": [
    {
      id: "yeouido",
      label: "여의도동",
      medicalSpecialty: ["general", "internal", "dermatology"],
    },
    { id: "dangsan", label: "당산동", medicalSpecialty: ["general"] },
    { id: "munrae", label: "문래동", medicalSpecialty: ["general"] },
    {
      id: "yeongdeungpo",
      label: "영등포동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "singil", label: "신길동", medicalSpecialty: ["general"] },
    { id: "daelim", label: "대림동", medicalSpecialty: ["general"] },
    { id: "dorim", label: "도림동", medicalSpecialty: ["general"] },
    { id: "yangpyeong", label: "양평동", medicalSpecialty: ["general"] },
  ],

  // 서울 용산구의 동
  "seoul.yongsan": [
    { id: "huam", label: "후암동", medicalSpecialty: ["general"] },
    { id: "yongsan", label: "용산동", medicalSpecialty: ["general"] },
    {
      id: "hannam",
      label: "한남동",
      medicalSpecialty: ["general", "dermatology"],
    },
    {
      id: "itaewon",
      label: "이태원동",
      medicalSpecialty: ["general", "dermatology"],
    },
    { id: "haebangchon", label: "해방촌", medicalSpecialty: ["general"] },
    { id: "bogwang", label: "보광동", medicalSpecialty: ["general"] },
    { id: "seobinggo", label: "서빙고동", medicalSpecialty: ["general"] },
    { id: "ichon", label: "이촌동", medicalSpecialty: ["general"] },
    { id: "namyeong", label: "남영동", medicalSpecialty: ["general"] },
    { id: "cheongpa", label: "청파동", medicalSpecialty: ["general"] },
  ],

  // 서울 은평구의 동
  "seoul.eunpyeong": [
    { id: "eunpyeong", label: "은평동", medicalSpecialty: ["general"] },
    { id: "bulgwang", label: "불광동", medicalSpecialty: ["general"] },
    { id: "daejo", label: "대조동", medicalSpecialty: ["general"] },
    { id: "yeokchon", label: "역촌동", medicalSpecialty: ["general"] },
    { id: "sinsa", label: "신사동", medicalSpecialty: ["general"] },
    { id: "galhyeon", label: "갈현동", medicalSpecialty: ["general"] },
    { id: "jeungsan", label: "증산동", medicalSpecialty: ["general"] },
    { id: "susaek", label: "수색동", medicalSpecialty: ["general"] },
    { id: "jingeon", label: "진관동", medicalSpecialty: ["general"] },
  ],

  // 서울 종로구의 동
  "seoul.jongno": [
    {
      id: "sajik",
      label: "사직동",
      medicalSpecialty: ["general", "traditional"],
    },
    { id: "samcheong", label: "삼청동", medicalSpecialty: ["general"] },
    { id: "gahoe", label: "가회동", medicalSpecialty: ["general"] },
    {
      id: "jongno",
      label: "종로1~4가동",
      medicalSpecialty: ["ophthalmology", "dental"],
    },
    { id: "jongno5", label: "종로5·6가동", medicalSpecialty: ["traditional"] },
    { id: "ihwa", label: "이화동", medicalSpecialty: ["general"] },
    {
      id: "hyehwa",
      label: "혜화동",
      medicalSpecialty: ["general", "internal"],
    },
    { id: "pyeongchang", label: "평창동", medicalSpecialty: ["general"] },
    {
      id: "jongno1",
      label: "종로1가",
      medicalSpecialty: ["ophthalmology", "dental"],
    },
    { id: "gwancheol", label: "관철동", medicalSpecialty: ["dental"] },
    { id: "gyonam", label: "교남동", medicalSpecialty: ["general"] },
  ],

  // 서울 중구의 동
  "seoul.jung": [
    { id: "sogong", label: "소공동", medicalSpecialty: ["general"] },
    { id: "hoehyeon", label: "회현동", medicalSpecialty: ["general"] },
    {
      id: "myeongdong",
      label: "명동",
      medicalSpecialty: ["dental", "ophthalmology"],
    },
    {
      id: "euljiro",
      label: "을지로동",
      medicalSpecialty: ["general", "oriental"],
    },
    { id: "jungnim", label: "중림동", medicalSpecialty: ["general"] },
    { id: "cheonggyecheon", label: "청계천로", medicalSpecialty: ["dental"] },
    { id: "pil", label: "필동", medicalSpecialty: ["general"] },
    { id: "jangchung", label: "장충동", medicalSpecialty: ["general"] },
    { id: "sindang", label: "신당동", medicalSpecialty: ["general"] },
    { id: "dongja", label: "동자동", medicalSpecialty: ["general"] },
  ],

  // 서울 중랑구의 동
  "seoul.jungnang": [
    { id: "junghwa", label: "중화동", medicalSpecialty: ["general"] },
    { id: "sangbong", label: "상봉동", medicalSpecialty: ["general"] },
    { id: "myeonmok", label: "면목동", medicalSpecialty: ["general"] },
    { id: "sinnae", label: "신내동", medicalSpecialty: ["general"] },
    { id: "mangubon", label: "망우본동", medicalSpecialty: ["general"] },
    { id: "myeonmok1", label: "면목1동", medicalSpecialty: ["general"] },
    { id: "myeonmok2", label: "면목2동", medicalSpecialty: ["general"] },
    { id: "myeonmok3", label: "면목3.8동", medicalSpecialty: ["general"] },
  ],
};
