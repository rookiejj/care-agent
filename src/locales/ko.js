export default {
  common: {
    back: "뒤로",
    submit: "등록",
    cancel: "취소",
    delete: "삭제",
    edit: "수정",
    save: "저장",
    close: "닫기",
    viewAll: "전체보기",
    location: "지역 선택",
    symptoms: "증상 선택",
    pay: "결제하기",
    all: "전체",
    weekday: "평일",
    year: "년",
    month: "월",
    day: "일",
    perYear: "년",
    perMonth: "월",
    perDay: "일",
    units: {
      people: "명",
      items: "개",
      points: "점",
      pricePerMonth: "월",
      monthCount: "개월",
      totalPrice: "총",
      sessions: "회",
      sessionCount: "회",
    },
    share: "공유하기",
    copyLink: "링크 복사",
  },
  navigation: {
    gym: {
      home: "홈",
      gyms: "운동시설",
      trainers: "트레이너",
      community: "커뮤니티",
      mypage: "MY",
    },
    medical: {
      home: "홈",
      hospitals: "병원", // Changed from gyms: "운동시설"
      doctors: "의사", // Changed from trainers: "트레이너"
      community: "커뮤니티",
      mypage: "MY",
    },
    plastic: {
      home: "홈",
      hospitals: "병원", // Changed from gyms: "운동시설"
      doctors: "의사", // Changed from trainers: "트레이너"
      community: "커뮤니티",
      mypage: "MY",
    },
  },
  serviceSelect: {
    title: "슈퍼휴먼",
    name: "서비스 선택",
    exercisePT: {
      title: "몬짐 코치 (운동/PT)",
      description: "전문 트레이너와 함께하는 맞춤형 프로그램",
    },
    onlineCare: {
      title: "온라인 진료",
      description: "전문의와 함께하는 비대면 진료 서비스",
    },
    examination: {
      title: "시술/성형",
      description: "전문의와 상담하는 맞춤형 뷰티 케어",
    },
    stats: {
      facilities: "제휴시설",
      average: "평균 평점",
      users: "이용 회원",
      doctors: "전문의",
      appointments: "진료후기",
      reviews: "상담후기",
      partneredHospitals: "협력병원",
      affiliatedHospitals: "제휴병원",
    },
    recentFacilities: {
      title: "최근 인기 시설",
      sportani: "스포애니 강남점",
      gooddoctors: "굿닥터스 의원",
      raphael: "라포레 성형외과",
      type: {
        gym: "헬스/PT",
        internal: "내과",
        surgery: "뿌띠성형",
      },
      ratings: "개의 평점",
    },
  },
  main: {
    gym: {
      title: "몬짐 코치 (운동/PT)",
      stats: {
        users: "이용 회원",
        facilities: "제휴 시설",
        rating: "평균 평점",
      },
      sections: {
        recommendedGyms: "추천 운동시설",
        popularTrainers: "인기 트레이너",
        popularPosts: "인기 게시글",
      },
    },
    medical: {
      title: "온라인 진료",
      stats: {
        users: "방문 환자", // Changed from "이용 회원"
        facilities: "제휴 시설",
        rating: "평균 평점",
      },
      sections: {
        recommendedHospitals: "추천 병원", // Changed from recommendedGyms
        popularDoctors: "인기 의사", // Changed from popularTrainers
        popularPosts: "인기 게시글",
      },
      symptomsTitle: "증상",
      specialists: {
        digestive: "소화기내과전문의",
        respiratory: "호흡기내과전문의",
        eye: "안과전문의",
        dental: "치과전문의",
        dermatology: "피부과전문의",
      },
    },
    plastic: {
      title: "시술/성형",
      stats: {
        users: "방문 환자", // Changed from "이용 회원"
        affiliatedHospital: "제휴 병원",
        rating: "평균 평점",
      },
      sections: {
        recommendedHospitals: "추천 병원", // Changed from recommendedGyms
        popularDoctors: "인기 의사", // Changed from popularTrainers
        popularPosts: "인기 게시글",
      },
      treatmentArea: "부위",
      specialists: {
        acial: "안면성형 전문의",
        eye: "눈성형 전문의",
        nose: "코성형 전문의",
        breast: "가슴성형 전문의",
        body: "체형성형 전문의",
      },
    },
  },
  facility: {
    title: "운동시설 목록",
    types: {
      gym: "헬스",
      pilates: "필라테스",
      jiujitsu: "주짓수",
    },
    affiliatedFacilities: "소속 운동시설",
    affiliatedTrainers: "소속 트레이너",
    details: "상세",
    info: "시설 정보",
    location: "위치보기",
    membership: {
      title: "멤버십 요금",
      pilates: "수강권 요금",
      jiujitsu: "수련권 요금",
      pt: "PT 이용권",
    },
    amenities: {
      shower: "샤워실",
      uniform: "운동복 대여",
      locker: "개인 락커",
      parking: "주차장",
    },
    consultation: "상담신청",
    visitConsultation: "방문 상담",
    viewPrice: "요금보기",
    call: "전화걸기",
    filters: {
      price: "가격순",
      distance: "거리순",
      rating: "평점순",
    },
    examples: {
      location1: "스포애니 강남점",
      location2: "24핏 선릉점",
      address1: "강남구 역삼동",
      address2: "강남구 역삼동",
      name1: "스포애니",
      name2: "더바른필라테스",
      name3: "카르페디엠 주짓수",
    },
    branch: {
      number: "호점",
    },
  },
  hospital: {
    medical: {
      title: "병원 목록", // Changed from "의료기관 목록"
      types: {
        general: "종합병원",
        internal: "내과전문병원",
        surgical: "외과전문병원",
      },
      departments: {
        // 진료과목
        generalMedicine: "내과",
        pediatrics: "소아과",
        surgery: "외과",
      },
      details: "병원 상세정보", // Changed from "상세"
      info: "시설 정보",
      treatableDiseases: "진료 가능 질환",
      location: "위치보기",
      medicalFeesGuide: "진료비 안내",
      amenities: {
        parking: "주차가능",
        wheelchair: "휠체어 이용가능",
        english: "English available",
        endoscopy: "수면내시경",
        latest: "최신장비 보유",
        laser: "레이저 치료",
      },
      diseases: {
        digestive: {
          gastritis: "위염",
          colitis: "대장염",
          esophagitis: "식도염",
          constipation: "변비",
          diarrhea: "설사",
        },
        respiratory: {
          bronchitis: "기관지염",
          pneumonia: "폐렴",
          asthma: "천식",
          sinusitis: "부비동염",
          rhinitis: "비염",
        },
        eye: {
          myopia: "근시",
          hyperopia: "원시",
          astigmatism: "난시",
          cataract: "백내장",
          glaucoma: "녹내장",
        },
        dental: {
          cavity: "충치",
          periodontitis: "치주염",
          gingivitis: "잇몸염",
          toothache: "치통",
          wisdomTooth: "사랑니",
        },
        dermatology: {
          acne: "여드름",
          atopy: "아토피",
          eczema: "습진",
          freckles: "기미",
          spots: "잡티",
        },
      },
      fees: {
        basicConsultation: "기본 진찰료", // 건강보험수가 기준 용어
        note: "* 진료 내용에 따라 추가 비용이 발생할 수 있습니다",
      },
      feeGuide: {
        title: "진료비 안내",
        subtitle: "기본 진료 및 치료 비용 안내",
        consultation: "진찰료",
        treatment: "치료비",
        insurance: "건강보험 적용",
        nonInsurance: "비급여 항목",
        visitFee: "내원비",
        note: "* 환자 상태에 따라 진료비가 달라질 수 있습니다",
      },
      examination: {
        basic: "기본 검진",
        premium: "프리미엄 검진",
        special: "종합 검진",
        surgeryPrep: "수술 전 검진",
        laserTreatment: "레이저 치료",
        management: "종합 관리",
      },
      consultation: "상담신청",
      viewPrice: "요금보기",
      call: "전화걸기",
      filters: {
        price: "가격순",
        distance: "거리순",
        rating: "평점순",
      },
      examples: {
        location1: "서울아산병원 본원",
        location2: "삼성서울병원",
        address1: "송파구 풍납동",
        address2: "강남구 일원동",
        name1: "서울아산병원",
        name2: "삼성서울병원",
        // 소화기
        digestive: {
          location1: "서울아산병원 소화기내과",
          location2: "삼성서울병원 소화기내과",
          address1: "송파구 풍납동",
          address2: "강남구 일원동",
          name1: "서울아산병원",
          name2: "삼성소화기내과",
        },
        // 호흡기
        respiratory: {
          location1: "서울대병원 호흡기내과",
          location2: "세브란스병원 호흡기내과",
          address1: "종로구 연건동",
          address2: "서대문구 신촌동",
          name1: "서울대병원",
          name2: "세브란스병원",
        },
        // 안과
        eye: {
          location1: "김안과병원",
          location2: "성모안과병원",
          address1: "영등포구 영등포동",
          address2: "서초구 서초동",
          name1: "김안과",
          name2: "성모안과",
        },
        // 치과
        dental: {
          location1: "연세치과병원",
          location2: "서울대치과병원",
          address1: "서대문구 신촌동",
          address2: "종로구 연건동",
          name1: "연세치과",
          name2: "서울대치과",
        },
        // 피부과
        dermatology: {
          location1: "오라클피부과의원",
          location2: "아름다운나라피부과",
          address1: "강남구 청담동",
          address2: "서초구 서초동",
          name1: "오라클피부과",
          name2: "아름다운피부과",
        },
      },
      branch: {
        number: "호점",
      },
      review: {
        author1: "Reviewer1",
        author2: "Reviewer2",
        reviewContent1:
          "의료진이 친절하고 시설이 깨끗해요. 진료도 꼼꼼하게 봐주셔서 좋았습니다.",
        reviewContent2:
          "대기 시간이 조금 있었지만 전반적으로 만족스러웠어요. 특히 의사선생님의 설명이 자세했습니다.",
      },
    },
    plastic: {
      title: "병원 목록", // Changed from "의료기관 목록"
      types: {
        general: "종합병원",
        plastic: "성형외과",
        aesthetic: "미용성형센터",
      },
      departments: {
        facialSurgery: "안면성형",
        bodySurgery: "체형성형",
        reconstructive: "재건성형",
      },
      details: "병원 상세정보", // Changed from "상세"
      info: "시설 정보",
      availableProcedures: "시술 가능 항목",
      location: "위치보기",
      seasonalEventPrice: "시즌 이벤트 특가",
      amenities: {
        parking: "주차가능",
        wheelchair: "휠체어 이용가능",
        english: "English available",
        operatingRoom: "첨단 수술실",
        inpatientRoom: "개인 입원실",
        latest: "최신장비 보유",
      },
      treatableSymptoms: {
        eye: {
          doubleEyelid: "쌍꺼풀",
          eyeShape: "눈매교정",
          lateralCantho: "트임성형",
          lowerEyeFat: "눈밑지방",
          ptosis: "안검하수",
        },
        nose: {
          rhinoplasty: "코 성형",
          noseBridge: "콧대높임",
          noseTip: "코끝 교정",
          alarReduction: "콧볼 축소",
          nostrilReshape: "콧구멍 교정",
        },
        facial: {
          vlineSurgery: "V라인 성형",
          cheekboneReduction: "광대축소",
          jawlineContour: "턱선 교정",
          facialFatGraft: "얼굴 지방이식",
          dimpleplasty: "보조개 성형",
        },
        breast: {
          breastAug: "가슴 확대",
          breastLift: "가슴 리프팅",
          breastReduction: "가슴 축소",
          nippleCorrection: "유두 교정",
          breastReconstruction: "가슴 재건",
        },
        body: {
          liposuction: "지방흡입",
          tummyTuck: "복부성형",
          buttLift: "엉덩이 성형",
          bodyContour: "체형 교정",
          armLift: "팔 리프팅",
        },
        dermatology: {
          botox: "보톡스",
          fillers: "필러",
          laserResurfacing: "레이저 피부 재생",
          chemicalPeels: "화학적 필링",
          threadLift: "실리프팅",
        },
      },
      events: {
        // 눈 관련 이벤트
        eye1: {
          name: "겨울 맞이 쌍꺼풀 이벤트",
          description: "자연스러운 평행 쌍꺼풀",
        },
        eye2: {
          name: "눈매교정 스페셜",
          description: "눈매교정+트임 패키지",
        },
        eye3: {
          name: "눈밑지방 제거 특가",
          description: "눈밑지방 제거+리프팅",
        },

        // 코 관련 이벤트
        nose1: {
          name: "코 성형 프로모션",
          description: "자연스러운 코 라인 완성",
        },
        nose2: {
          name: "코끝 교정 특가",
          description: "섬세한 코끝 디자인",
        },
        nose3: {
          name: "콧대 성형 패키지",
          description: "높고 예쁜 콧대 완성",
        },

        // 얼굴 관련 이벤트
        face1: {
          name: "V라인 윤곽 이벤트",
          description: "갸름한 얼굴형을 위한 턱 라인 교정",
        },
        face2: {
          name: "페이스 컨투어링 패키지",
          description: "광대축소+턱 라인 정리",
        },
        face3: {
          name: "얼굴 지방이식 특가",
          description: "자연스러운 볼륨감으로 어려보이는 얼굴",
        },

        // 가슴 관련 이벤트
        breast1: {
          name: "가슴확대 이벤트",
          description: "프리미엄 보형물로 자연스러운 볼륨",
        },
        breast2: {
          name: "가슴 리프팅 특가",
          description: "처진 가슴 교정 및 탄력 개선",
        },
        breast3: {
          name: "맞춤형 가슴성형 패키지",
          description: "형태와 크기를 동시에 개선하는 맞춤 솔루션",
        },

        // 체형 관련 이벤트
        body1: {
          name: "지방흡입 프로모션",
          description: "부위별 맞춤 지방흡입으로 라인 개선",
        },
        body2: {
          name: "복부성형 특가",
          description: "탄탄하고 평평한 배 라인 완성",
        },
        body3: {
          name: "바디 컨투어링 패키지",
          description: "전신 균형 잡힌 비율을 위한 다부위 시술",
        },
      },
      eventEndDate: "이벤트 종료: ",
      consultation: "상담신청",
      call: "전화걸기",
      filters: {
        price: "가격순",
        distance: "거리순",
        rating: "평점순",
      },
      examples: {
        location1: "강남라인성형외과",
        location2: "청담유의원",
        address1: "강남구 신사동",
        address2: "강남구 청담동",
        name1: "강남라인성형외과",
        name2: "청담유의원",
        // 얼굴성형
        facial: {
          location1: "디에이성형외과 얼굴센터",
          location2: "더뷰티성형외과 안면윤곽센터",
          address1: "강남구 압구정동",
          address2: "강남구 신사동",
          name1: "디에이성형외과",
          name2: "더뷰티성형외과",
        },
        // 눈성형
        eye: {
          location1: "드림성형외과 눈성형센터",
          location2: "아이디병원 안성형센터",
          address1: "강남구 논현동",
          address2: "강남구 신사동",
          name1: "드림성형외과",
          name2: "아이디병원",
        },
        // 코성형
        nose: {
          location1: "원진성형외과 코성형센터",
          location2: "바노바기성형외과 코센터",
          address1: "강남구 신사동",
          address2: "강남구 청담동",
          name1: "원진성형외과",
          name2: "바노바기성형외과",
        },
        // 가슴성형
        breast: {
          location1: "티엠성형외과 가슴성형센터",
          location2: "리본성형외과 가슴성형센터",
          address1: "강남구 청담동",
          address2: "강남구 신사동",
          name1: "티엠성형외과",
          name2: "리본성형외과",
        },
        // 체형성형
        body: {
          location1: "365mc성형외과 지방흡입센터",
          location2: "유라인성형외과 바디라인센터",
          address1: "강남구 압구정동",
          address2: "서초구 서초동",
          name1: "365mc성형외과",
          name2: "유라인성형외과",
        },
      },
      branch: {
        number: "호점",
      },
      review: {
        author1: "Reviewer1",
        author2: "Reviewer2",
        reviewContent1:
          "의료진이 친절하고 시설이 깨끗해요. 진료도 꼼꼼하게 봐주셔서 좋았습니다.",
        reviewContent2:
          "대기 시간이 조금 있었지만 전반적으로 만족스러웠어요. 특히 의사선생님의 설명이 자세했습니다.",
      },
    },
  },
  trainer: {
    title: "트레이너 목록",
    detail: "트레이너 상세",
    experience: "경력",
    certifications: "자격증",
    consultationTime: "상담 가능 시간",
    lessonFees: "레슨 요금",
    sessions: "회",
    sessionCount: "회",
    specialties: {
      weightLoss: "체중감량",
      bodybuilding: "근력강화",
      rehabilitation: "재활운동",
      posture: "자세교정",
      diet: "식단관리",
      jiujitsu: "주짓수 입문",
      grappling: "그래플링",
    },
    filters: {
      experience: "경력순",
      price: "가격순",
      rating: "평점순",
    },
    examples: {
      name1: "김트레이너",
      name2: "이트레이너",
      name3: "박트레이너",
    },
  },
  doctor: {
    medical: {
      title: "의사 목록",
      detail: "의사 상세",
      experience: "경력",
      certifications: "자격증",
      education: "학력/경력",
      consultationTimeTitle: "진료 시간",
      filters: {
        experience: "경력순",
        price: "가격순",
        rating: "평점순",
      },
      specialties: {
        internalMedicine: "내과", // Changed from weightLoss
        surgery: "외과", // Changed from bodybuilding
        rehabilitation: "재활의학과",
        orthopedics: "정형외과", // Changed from posture
        nutrition: "영양학과", // Changed from diet
        emergency: "응급의학과", // Changed from jiujitsu
        generalPractice: "일반의", // Changed from grappling
        // 소화기과 관련
        digestive1: "소화기내과전문의",
        digestive2: "간담도내과전문의",

        // 호흡기과 관련
        respiratory1: "호흡기내과전문의",
        respiratory2: "알레르기내과전문의",

        // 안과 관련
        eye1: "안과전문의",
        eye2: "시력교정전문의",

        // 치과 관련
        dental1: "치과전문의",
        dental2: "치아교정전문의",

        // 피부과 관련
        dermatology1: "피부과전문의",
        dermatology2: "피부미용전문의",
      },
      examples: {
        // 소화기과
        name1: "김소화기내과의사",
        // 호흡기과
        name2: "이호흡기내과의사",
        // 안과
        name3: "박안과의사",
        // 치과
        name4: "최치과의사",
        // 피부과
        name5: "정피부과의사",
      },
      profiles: {
        digestive: {
          education1: "서울대학교 의과대학",
          education2: "서울대학교병원 전공의",
          education3: "미국 하버드대학교 연수",
          certification1: "내과 전문의",
          certification2: "소화기내과 세부전문의",
          certification3: "대한소화기내시경학회 인증의",
          consultationHours: "평일 09:00-18:00, 토요일 09:00-13:00",
        },
        respiratory: {
          education1: "연세대학교 의과대학",
          education2: "세브란스병원 전공의",
          education3: "미국 존스홉킨스대학교 연수",
          certification1: "내과 전문의",
          certification2: "호흡기내과 세부전문의",
          certification3: "대한결핵 및 호흡기학회 인증의",
          consultationHours: "평일 08:30-17:30, 토요일 09:00-12:00",
        },
        eye: {
          education1: "고려대학교 의과대학",
          education2: "김안과병원 전공의",
          education3: "미국 바스콤파머 안과연구소 연수",
          certification1: "안과 전문의",
          certification2: "대한안과학회 인증의",
          certification3: "시력교정 레이저 수술 전문의",
          consultationHours: "평일 09:30-18:30, 토요일 09:30-14:00",
        },
        dental: {
          education1: "서울대학교 치과대학",
          education2: "서울대학교치과병원 전공의",
          education3: "미국 뉴욕대학교 치과대학 연수",
          certification1: "치과 전문의",
          certification2: "대한치주과학회 인증의",
          certification3: "임플란트 전문의",
          consultationHours: "평일 10:00-19:00, 토요일 10:00-15:00",
        },
        dermatology: {
          education1: "성균관대학교 의과대학",
          education2: "삼성서울병원 전공의",
          education3: "미국 스탠퍼드대학교 의과대학 연수",
          certification1: "피부과 전문의",
          certification2: "대한피부과학회 인증의",
          certification3: "미용피부과 전문의",
          consultationHours: "평일 09:00-18:00, 토요일 09:00-13:00",
        },
      },
    },
    plastic: {
      title: "의사 목록",
      detail: "의사 상세",
      experience: "경력",
      certifications: "자격증",
      education: "학력/경력",
      consultationTimeTitle: "진료 시간",
      filters: {
        experience: "경력순",
        price: "가격순",
        rating: "평점순",
      },
      specialties: {
        // 얼굴 성형
        facialPlastic1: "안면성형 전문의",
        facialPlastic2: "안면윤곽 전문의",

        // 코 성형
        rhinoplasty1: "코성형 전문의",
        rhinoplasty2: "코 재건 전문의",

        // 눈 성형
        eyePlastic1: "눈성형 전문의",
        eyePlastic2: "눈매교정 전문의",

        // 가슴 성형
        breastSurgery1: "가슴성형 전문의",
        breastSurgery2: "유방재건 전문의",

        // 체형 성형
        bodyContouring1: "체형성형 전문의",
        bodyContouring2: "바디라인 전문의",

        // 지방 흡입
        liposuction1: "지방흡입 전문의",
        liposuction2: "지방제거 전문의",
      },
      examples: {
        // 얼굴 성형
        name1: "김민수 성형외과 의사",
        // 눈 성형
        name2: "이지원 눈 성형 전문의",
        // 코 성형
        name3: "박서연 코 성형 전문의",
        // 가슴 성형
        name4: "최준호 가슴 성형 전문의",
        // 체형 성형
        name5: "정유진 체형 성형 전문의",
      },
      profiles: {
        facial: {
          education1: "서울대학교 의과대학",
          education2: "서울대학교병원 성형외과 전공의",
          education3: "미국 존스홉킨스 안면성형센터 연수",
          certification1: "성형외과 전문의",
          certification2: "대한성형외과학회 정회원",
          certification3: "안면윤곽 전문의",
          consultationHours: "평일 09:00-18:00, 토요일 09:00-13:00",
        },
        eye: {
          education1: "연세대학교 의과대학",
          education2: "세브란스병원 성형외과 전공의",
          education3: "미국 UCLA 눈성형 연구소 연수",
          certification1: "성형외과 전문의",
          certification2: "대한미용성형외과학회 정회원",
          certification3: "눈성형 전문의",
          consultationHours: "평일 08:30-17:30, 토요일 09:00-12:00",
        },
        nose: {
          education1: "고려대학교 의과대학",
          education2: "고려대학교병원 성형외과 전공의",
          education3: "미국 시카고대학 코성형센터 연수",
          certification1: "성형외과 전문의",
          certification2: "대한성형외과학회 코성형연구회 정회원",
          certification3: "코 재건 전문의",
          consultationHours: "평일 09:30-18:30, 토요일 09:30-14:00",
        },
        breast: {
          education1: "서울대학교 의과대학",
          education2: "서울아산병원 성형외과 전공의",
          education3: "미국 클리블랜드 클리닉 유방성형 연수",
          certification1: "성형외과 전문의",
          certification2: "대한미용성형외과학회 정회원",
          certification3: "유방재건 전문의",
          consultationHours: "평일 10:00-19:00, 토요일 10:00-15:00",
        },
        body: {
          education1: "성균관대학교 의과대학",
          education2: "삼성서울병원 성형외과 전공의",
          education3: "미국 베벌리힐스 체형성형연구소 연수",
          certification1: "성형외과 전문의",
          certification2: "대한비만체형학회 정회원",
          certification3: "지방흡입 전문의",
          consultationHours: "평일 09:00-18:00, 토요일 09:00-13:00",
        },
      },
    },
  },
  community: {
    gym: {
      top_title: "커뮤니티",
      writePost: "글쓰기",
      editPost: "글 수정하기",
      title: "제목을 입력하세요 (필수)",
      content: "내용을 입력하세요(필수)",
      comments: "댓글",
      writeComment: "댓글을 입력하세요",
      likes: "좋아요",
      example: {
        title: "40대 직장인의 성공적인 다이어트 후기",
      },
      example2: {
        title: "PT 트레이너가 알려주는 식단 관리 팁",
      },
      example3: {
        title: "운동 초보자 PT 추천해주세요",
        content:
          "안녕하세요! 운동을 처음 시작하려고 하는데 PT를 받아보려고 합니다. 제가 사는 곳 근처에 헬스장이 몇 군데 있는데, 어떤 기준으로 PT 트레이너를 선택해야 할지 모르겠어요. 경험 있으신 분들의 조언 부탁드립니다!",
        comment:
          "초보자라면 기초 자세부터 꼼꼼히 봐주실 수 있는 트레이너를 추천드립니다. 경력도 중요하지만 수업 스타일도 고려해보세요!",
      },
      postDetail: {
        title: "게시글 상세",
        writer: "작성자",
        date: "작성일",
        views: "조회수",
        report: "신고하기",
        share: "공유하기",
      },
      commentDetail: {
        reply: "답글 달기",
        writeReply: "답글 작성하기",
        viewReplies: "답글 보기",
        hideReplies: "답글 숨기기",
      },
    },
    medical: {
      top_title: "커뮤니티",
      writePost: "글쓰기",
      title: "제목을 입력하세요 (필수)",
      content: "내용을 입력하세요(필수)",
      content_placeholder:
        "증상이나 문의사항을 자세히 설명해주세요. (필수)\n\n예시:\n- 언제부터 증상이 시작되었나요?\n- 어떤 증상이 있나요?\n- 평소 복용 중인 약이 있나요?\n- 관련된 기저질환이 있나요?",
      comments: "댓글",
      writeComment: "댓글을 입력하세요",
      category_selection: "카테고리 선택 (필수)",
      likes: "좋아요",
      example: {
        title: "갑자기 어지러움이 심해졌어요",
      },
      example2: {
        title: "전문의가 알려주는 위염 관리법",
      },
      example3: {
        title: "소화불량이 계속되는데 어느 병원이 좋을까요?",
        content:
          "안녕하세요! 최근 2주 동안 식사 후 계속 소화불량이 있어서 병원에 가보려고 합니다. 제 지역에 내과가 여러 곳 있는데, 어떤 기준으로 병원과 의사를 선택해야 할지 조언 부탁드립니다. 비슷한 증상으로 진료받으신 분들의 경험도 듣고 싶어요!",
        comment:
          "소화불량은 원인이 다양할 수 있어서 소화기내과 전문의가 계신 병원을 추천드려요. 최근 내시경 장비가 좋은 곳으로 가시면 정확한 진단에 도움이 됩니다!",
      },
      postDetail: {
        title: "게시글 상세",
        writer: "작성자",
        date: "작성일",
        views: "조회수",
        report: "신고하기",
        share: "공유하기",
      },
      categories: {
        medical_consultation: "진료 상담",
        hospital_review: "병원 후기",
        medication_consultation: "의약품 상담",
        health_information: "건강 정보",
        other_inquiries: "기타 문의",
      },
      guidelines: {
        title: "게시글 작성 시 유의사항",
        point1: "의료 상담은 참고용으로만 활용해주세요.",
        point2: "정확한 진단은 반드시 의료진과 상담하시기 바랍니다.",
        point3: "개인정보(연락처 등)는 공개하지 말아주세요.",
        point4: "비방, 홍보성 게시글은 관리자에 의해 삭제될 수 있습니다.",
      },
    },
    plastic: {
      top_title: "커뮤니티",
      writePost: "글쓰기",
      title: "제목을 입력하세요 (필수)",
      content: "내용을 입력하세요(필수)",
      content_placeholder:
        "증상이나 문의사항을 자세히 설명해주세요. (필수)\n\n예시:\n- 언제부터 증상이 시작되었나요?\n- 어떤 증상이 있나요?\n- 평소 복용 중인 약이 있나요?\n- 관련된 기저질환이 있나요?",
      comments: "댓글",
      writeComment: "댓글을 입력하세요",
      category_selection: "카테고리 선택 (필수)",
      likes: "좋아요",
      example: {
        title: "코 수술 후 2주가 지났는데 붓기가 안 빠져요",
      },
      example2: {
        title: "성형외과 전문의가 알려주는 레이저 시술 후 관리법",
      },
      example3: {
        title: "눈 쌍꺼풀 수술, 어느 병원이 좋을까요?",
        content:
          "안녕하세요! 쌍꺼풀 수술을 고민하고 있는데 제 지역에 성형외과가 여러 곳 있어서 어떤 기준으로 병원과 의사를 선택해야 할지 조언 부탁드립니다. 수술 경험이 있으신 분들의 후기도 듣고 싶어요!",
        comment:
          "쌍꺼풀 수술은 의사의 경험과 기술이 중요하기 때문에 시술 사례가 많은 성형외과 전문의를 추천해드려요. 상담 시 의사가 얼굴형에 맞는 디자인을 제안해주는 곳이 좋습니다!",
      },
      postDetail: {
        title: "게시글 상세",
        writer: "작성자",
        date: "작성일",
        views: "조회수",
        report: "신고하기",
        share: "공유하기",
      },
      categories: {
        procedure_consultation: "시술 상담",
        clinic_review: "성형외과 후기",
        aftercare_consultation: "수술 후 관리 상담",
        beauty_information: "미용 정보",
        other_inquiries: "기타 문의",
      },
      guidelines: {
        title: "게시글 작성 시 유의사항",
        point1: "의료 상담은 참고용으로만 활용해주세요.",
        point2: "정확한 진단은 반드시 의료진과 상담하시기 바랍니다.",
        point3: "개인정보(연락처 등)는 공개하지 말아주세요.",
        point4: "비방, 홍보성 게시글은 관리자에 의해 삭제될 수 있습니다.",
      },
    },
  },
  booking: {
    gym: {
      title: "방문 예약",
      visit_date: "방문 날짜",
      today: "오늘",
      tomorrow: "내일",
      visit_reason: "방문 목적",
      detailed_reason: "상담하고 싶은 내용을 입력해주세요",
    },
    medical: {
      action: "예약하기",
      title: "진료 예약",
      button: "지금 예약하기",
      treatment_date: "진료 날짜",
      today: "오늘",
      tomorrow: "내일",
      id_number: "주민등록번호 뒷자리",
      symptoms_category: "증상/과목",
      detailed_symptoms: "자세한 증상을 입력해주세요",
      example: "예시",
      example_1: "운동하다가 넘어져 발목을 다쳤어요",
      example_2: "목살 기운, 콧물, 고막힘이 심해요",
      example_3: "먹는 탈모약을 처방받고 싶어요",
      attach_photo: "증상과 관련된 사진을 첨부해보세요",
    },
  },
  payment: {
    gym: {
      title: "결제하기",
      product: "결제 상품",
      method: "결제 수단",
      methods: {
        card: "신용/체크카드",
        transfer: "무통장입금",
        kakaopay: "카카오페이",
      },
    },
    medical: {
      title: "결제하기",
      reservation_info: "예약 정보",
      method: "결제 수단",
      methods: {
        card: "신용/체크카드",
        transfer: "무통장입금",
        kakaopay: "카카오페이",
      },
      consultation_deposit: "진료비 예약금",
      fee_determination_notice: "실제 진료비는 진찰 후 책정됩니다.",
      deposit_deduction_notice: "예약금은 진료비에서 차감됩니다.",
      reservation: {
        notice_title: "예약 전 유의사항",
        deposit_deduction: "예약금은 진료비에서 차감됩니다.",
        cancellation_policy: "예약 취소는 진료 24시간 전까지 가능합니다.",
        same_day_cancellation: "당일 취소/노쇼 시 예약금은 환불되지 않습니다.",
        actual_fee_notice: "실제 진료비는 진찰 후 책정됩니다.",
      },
    },
    plastic: {
      title: "결제하기",
      product: "결제 상품",
      method: "결제 수단",
      methods: {
        card: "신용/체크카드",
        transfer: "무통장입금",
        kakaopay: "카카오페이",
      },
      payer: {
        title: "결제자 정보",
        name: "이름",
        namePlaceholder: "결제자 이름을 입력해주세요",
        phoneNumber: "휴대폰 번호",
        phonePlaceholder: "- 없이 입력해주세요",
      },
      reservation: {
        notice_title: "결제 전 유의사항",
        deposit_deduction: "예약금은 시술/수술 비용에서 차감됩니다.",
        cancellation_policy: "예약 취소는 상담 24시간 전까지 가능합니다.",
        same_day_cancellation: "당일 취소/노쇼 시 예약금은 환불되지 않습니다.",
        actual_fee_notice: "추가적인 시술이나 수술 비용은 상담 후 결정됩니다.",
      },
    },
  },
  consultation: {
    gym: {
      title: "상담 신청하기",
      name: {
        label: "이름",
        placeholder: "상담 받으실 분의 이름을 입력해주세요",
      },
      time: {
        label: "희망 상담 시간",
        placeholder: "예) 평일 오후 2시 이후, 주말 오전 등",
      },
      content: {
        label: "상담 내용",
        placeholder: "상담하고 싶으신 내용을 자유롭게 작성해주세요",
      },
      submit: "신청하기",
    },
    medical: {
      title: "상담 신청하기",
      name: {
        label: "이름",
        placeholder: "상담 받으실 분의 이름을 입력해주세요",
      },
      time: {
        label: "희망 상담 시간",
        placeholder: "예) 평일 오후 2시 이후, 주말 오전 등",
      },
      content: {
        label: "상담 내용",
        placeholder: "상담하고 싶으신 내용을 자유롭게 작성해주세요",
      },
      submit: "신청하기",
    },
    plastic: {
      title: "상담 신청하기",
      name: {
        label: "이름",
        placeholder: "상담 받으실 분의 이름을 입력해주세요",
      },
      time: {
        label: "희망 상담 시간",
        placeholder: "예) 평일 오후 2시 이후, 주말 오전 등",
      },
      content: {
        label: "상담 내용",
        placeholder: "상담하고 싶으신 내용을 자유롭게 작성해주세요",
      },
      submit: "신청하기",
    },
  },
  mypage: {
    gym: {
      title: "마이 페이지",
      profile: {
        edit: "프로필 수정",
      },
      menu: {
        membership: "내 이용권",
        payments: "결제 내역",
        reservations: "예약 내역",
        notice: "공지사항",
        faq: "자주 묻는 질문",
        inquiry: "1:1 문의",
      },
      logout: "로그아웃",
    },
    medical: {
      title: "마이 페이지",
      profile: {
        edit: "프로필 수정",
      },
      menu: {
        treatmentManagement: "진료 관리",
        appointmentHistory: "진료 예약 내역",
        medicalRecords: "진료 기록",
        prescriptionManagement: "처방전 관리",
        healthCheckupResults: "건강검진 결과",

        paymentManagement: "결제 관리",
        paymentDetails: "결제 내역",
        medicalCertificates: "진료비 영수증",
        medicalReports: "의료비 정산서",

        settings: "설정",
        alarmSettings: "알림 설정",
        personalInfoSettings: "개인정보 설정",
        termsOfUse: "이용약관",
        privacyPolicy: "공지사항",
        frequentlyAskedQuestions: "자주 묻는 질문",
        customerService: "고객센터",
      },
      logout: "로그아웃",
    },
    plastic: {
      title: "마이 페이지",
      profile: {
        edit: "프로필 수정",
      },
      menu: {
        appointmentManagement: "예약 관리",
        pendingAppointments: "진행중인 예약",
        pastAppointments: "지난 예약 내역",
        latestAppointmentHistory: "예약 취소 내역",

        reviewManagement: "후기 관리",
        availableReviews: "작성 가능한 후기",
        writtenReviews: "작성한 후기",

        settings: "설정",
        alarmSettings: "알림 설정",
        personalInfoSettings: "개인정보 설정",
        termsOfUse: "이용약관",
        privacyPolicy: "공지사항",
        frequentlyAskedQuestions: "자주 묻는 질문",
        customerService: "고객센터",
      },
      logout: "로그아웃",
    },
  },
  review: {
    gym: {
      title: "후기",
      detail: "후기 상세",
      writeReview: "후기 작성",
      placeholder: "후기를 입력해 주세요.",
      validation: "별점과 내용을 모두 입력해 주세요.",
      example_1: {
        content:
          "정말 만족스러운 경험이었습니다. 트레이너 선생님이 꼼꼼하게 지도해주시고, 운동 계획도 체계적으로 잘 짜주셨어요. 3개월 동안 목표했던 것보다 더 좋은 결과를 얻을 수 있었습니다. 시설도 깨끗하고 쾌적해서 운동하기 좋았어요. 특히 샤워실이 깔끔해서 좋았고, 운동 기구들도 관리가 잘 되어있었습니다.",
      },
      example_2: {
        content: "시설이 너무 깨끗하고 좋아요! 운동하기 정말 좋은 환경입니다.",
      },
      example_3: {
        content:
          "처음 시작하는 사람도 편하게 이용할 수 있어요. 트레이너분들도 친절하세요.",
      },
      example_4: {
        content: "정말 꼼꼼하게 지도해주시고 운동 계획도 잘 짜주셨어요.",
      },
      example_5: {
        content:
          "3개월 동안 목표했던 것보다 더 좋은 결과를 얻을 수 있었습니다.",
      },
    },
    medical: {
      title: "후기",
      detail: "후기 상세",
      writeReview: "후기 작성",
      placeholder: "후기를 입력해 주세요.",
      validation: "별점과 내용을 모두 입력해 주세요.",
      example_1: {
        content:
          "설명이 정말 자세하고 이해하기 쉽게 해주셨어요. 치료 과정과 예후에 대해서도 친절하게 설명해주셔서 안심이 되었습니다.",
      },
      example_2: {
        content:
          "전문적인 지식이 느껴졌고, 질문에도 친절하게 답변해주셨습니다. 꼼꼼한 진찰로 증상이 많이 호전되었어요.",
      },
    },
    plastic: {
      title: "후기",
      detail: "후기 상세",
      writeReview: "후기 작성",
      placeholder: "후기를 입력해 주세요.",
      validation: "별점과 내용을 모두 입력해 주세요.",
      example_1: {
        content:
          "설명이 정말 자세하고 이해하기 쉽게 해주셨어요. 치료 과정과 예후에 대해서도 친절하게 설명해주셔서 안심이 되었습니다.",
      },
      example_2: {
        content:
          "전문적인 지식이 느껴졌고, 질문에도 친절하게 답변해주셨습니다. 꼼꼼한 진찰로 증상이 많이 호전되었어요.",
      },
    },
  },
  report: {
    title: "신고하기",
    header: "신고 사유를 선택해주세요",
    target: "신고 대상",
    details: "기타 사유 (선택사항)",
    submit: "신고하기",
    options: {
      inappropriate: "부적절한 콘텐츠",
      spam: "스팸",
      offensive: "공격적인 표현",
      fake: "거짓 정보",
      other: "기타",
    },
    confirm: {
      title: "신고하기",
      message: "이 콘텐츠를 신고하시겠습니까?",
      yes: "신고하기",
      no: "취소",
    },
  },
  delete: {
    confirm: {
      title: "삭제 확인",
      message: "정말 삭제하시겠습니까?",
      no: "취소",
      yes: "삭제",
    },
  },
  search: {
    title: "검색하기",
    placeholder: "검색어를 입력하세요.",
    union_placeholder: "시설/트레이너 이름을 입력하세요.",
  },
};
