import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getHospitalImage, getCosmeticAdImage, getMedicalAdImage } from "./App";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({
    favoritesData: [],
    facilityInfo: {},
    gymReviews: [],
    gymData: {},
    trainerInfo: {},
    trainerReviews: [],
    trainerData: {},
    communityData: {},
    communityPosts: [], // 추가된 부분
    popularSearches: [], // 추가된 부분
    communityBanners: [], // 추가된 부분
    communityStats: {}, // 추가된 부분
  });

  useEffect(() => {
    setData({
      communityPosts: [
        {
          id: 1,
          type: "cosmetic", // 미용/성형 관련
          author: {
            id: "user123",
            nickname: "뷰티러버",
            profileImage: "/images/profiles/user1.jpg",
            level: 3, // 일반 레벨
            badges: ["정보제공왕", "인기작가"],
            isVerified: true, // 의사나 의료종사자 인증 여부
          },
          createdAt: "2025-04-01T14:30:00Z",
          updatedAt: "2025-04-01T15:45:00Z",
          category: "review", // 후기/경험담
          tags: ["tag-face", "tag-plastic", "tag-completed", "tag-seoul"],
          title: "눈매교정+안검하수 수술 3개월 후기 (비포&애프터 포함)",
          content:
            "안녕하세요! 3개월 전에 강남 미소성형외과에서 눈매교정+안검하수 수술을 받았는데요, 드디어 붓기가 가라앉아서 후기를 공유합니다.\n\n**수술 결정 이유**\n어릴 때부터 눈이 작고 항상 졸려 보인다는 말을 많이 들었어요. 특히 사진 찍을 때 눈이 반쯤 감겨 보이는 경우가 많았습니다. 상담 결과 경증 안검하수와 눈매 비대칭이 있다고 하더라고요.\n\n**수술 과정**\n국소마취로 진행했고, 생각보다 통증은 적었습니다. 약 1시간 정도 소요되었어요. 의사선생님이 매우 꼼꼼하게 설명해주셔서 안심하고 받을 수 있었습니다.\n\n**회복 과정**\n- 1주차: 붓기와 멍이 심했고, 실밥 제거 전까지 불편함이 있었어요\n- 2주차: 실밥 제거 후 붓기가 많이 가라앉았지만 아직 부자연스러움\n- 1개월: 일상생활에 지장 없고, 주변 사람들이 달라 보인다고 인지할 정도\n- 3개월: 거의 자연스러워졌고, 눈매가 또렷해져 만족스럽습니다\n\n**비용**\n눈매교정+안검하수 교정 총 220만원 (이벤트 할인 적용)\n\n**장점**\n- 눈이 확실히 또렷해지고 시원해짐\n- 화장이 훨씬 잘 받고 사진 찍을 때도 자신감 상승\n- 피곤해 보인다는 말을 더 이상 듣지 않게 됨\n\n**단점**\n- 회복 초기에는 비대칭이 있었으나 3개월 차에 자연스러워짐\n- 병원 내원이 여러 번 필요해서 시간 소요가 많았음\n\n궁금한 점 있으시면 편하게 댓글 남겨주세요! 사진은 첨부했습니다 :)",
          images: [
            "/images/community/before_after_1.jpg",
            "/images/community/before_after_2.jpg",
            "/images/community/recovery_process.jpg",
          ],
          hospitalInfo: {
            id: "hospital123",
            name: "미소성형외과",
            location: "서울시 강남구",
            doctor: "김민재 원장",
          },
          viewCount: 1243,
          likeCount: 87,
          isBookmarked: false,
          commentCount: 24,
          comments: [
            {
              id: "comment1",
              author: {
                id: "user456",
                nickname: "눈매고민중",
                profileImage: "/images/profiles/user2.jpg",
                level: 1,
              },
              content:
                "정말 자연스럽게 잘 된 것 같아요! 저도 고민 중인데, 병원 선택이 중요할 것 같아요. 혹시 다른 병원도 알아보셨나요?",
              createdAt: "2025-04-01T16:20:00Z",
              likeCount: 5,
              isAuthorReplied: true,
            },
            {
              id: "comment2",
              author: {
                id: "user123",
                nickname: "뷰티러버",
                profileImage: "/images/profiles/user1.jpg",
                level: 3,
              },
              content:
                "네! 총 3군데 상담받아봤는데, 의사선생님의 눈매 교정 전문성과 상담 친절도를 비교했어요. 가격대는 비슷했습니다!",
              createdAt: "2025-04-01T16:45:00Z",
              likeCount: 3,
              isReply: true,
              parentCommentId: "comment1",
            },
          ],
        },
        {
          id: 2,
          type: "cosmetic", // 미용/성형 관련
          author: {
            id: "user456",
            nickname: "피부맑음이",
            profileImage: "/images/profiles/user2.jpg",
            level: 4, // 우수 레벨
            badges: ["후기왕"],
          },
          createdAt: "2025-03-30T10:25:00Z",
          updatedAt: null,
          category: "question", // 질문/정보
          tags: ["tag-skin", "tag-laser", "tag-planning", "tag-gyeonggi"],
          title: "레이저 토닝 시술 전 꼭 알아야 할 것들 질문이요",
          content:
            "안녕하세요, 기미와 잡티가 심해져서 레이저 토닝 시술을 알아보고 있어요. 다음 주에 상담 예정인데 미리 알아두면 좋을 정보들이나 질문할 내용 있을까요?\n\n특히 궁금한 점은:\n1. 토닝과 피코슈어의 차이점\n2. 시술 횟수와 간격은 보통 어떻게 되나요?\n3. 시술 후 관리법\n4. 부작용이나 주의사항\n\n경험자분들 조언 부탁드립니다!",
          images: [],
          viewCount: 856,
          likeCount: 32,
          isBookmarked: true,
          commentCount: 15,
          comments: [
            {
              id: "comment3",
              author: {
                id: "doctor789",
                nickname: "김태영피부과의사",
                profileImage: "/images/profiles/doctor1.jpg",
                level: 5,
                isVerified: true,
              },
              content:
                "안녕하세요, 피부과 전문의입니다. 레이저 토닝과 피코슈어는 모두 색소 개선에 효과적이지만 차이가 있습니다. 토닝은 주로 기미, 잡티 등 전반적인 피부톤 개선에 좋고, 피코슈어는 더 짧은 맥동 시간으로 색소를 더 효과적으로 분해합니다. 보통 2-4주 간격으로 5-10회 정도 시술하며, 시술 후 자외선 차단제 꼭 발라주셔야 합니다. 상담 시 본인의 피부 타입과 원하는 결과를 명확히 말씀하시고, 과거 레이저 경험이나 알러지도 꼭 언급하세요.",
              createdAt: "2025-03-30T11:15:00Z",
              likeCount: 27,
              isAuthorReplied: true,
            },
          ],
        },
        {
          id: 3,
          type: "medical", // 의료/진료 관련
          author: {
            id: "user789",
            nickname: "건강지킴이",
            profileImage: "/images/profiles/user3.jpg",
            level: 2,
          },
          createdAt: "2025-03-29T09:10:00Z",
          updatedAt: "2025-03-29T09:15:00Z",
          category: "question", // 질문/정보 (정보 공유 목적)
          tags: ["tag-medical", "tag-general", "tag-seoul"],
          title: "건강검진 후 복부초음파에서 발견된 '지방간' 관리법 공유",
          content:
            "얼마 전 직장 건강검진에서 복부초음파 결과 '경도 지방간' 소견을 받았어요. 처음에는 굉장히 당황했는데, 의사 선생님 상담과 제가 찾아본 정보들을 공유합니다.\n\n**지방간이란?**\n간 세포에 지방이 5% 이상 축적된 상태를 말합니다. 초기에는 증상이 거의 없지만 방치하면 간염, 간경화로 진행될 수 있어요.\n\n**원인**\n- 과도한 알코올 섭취 (알코올성 지방간)\n- 비만, 당뇨병, 고지혈증 (비알코올성 지방간)\n- 잘못된 식습관과 운동 부족\n\n**관리 방법**\n1. 식이요법\n   - 탄수화물과 당류 섭취 줄이기\n   - 트랜스지방, 포화지방 제한\n   - 오메가3 풍부한 식품 섭취 (고등어, 연어 등)\n   - 식이섬유 풍부한 채소 섭취 늘리기\n\n2. 운동요법\n   - 주 3-5회, 회당 30-60분 유산소 운동\n   - 걷기, 수영, 자전거 등이 효과적\n\n3. 생활습관 교정\n   - 금주 또는 절주\n   - 규칙적인 수면 습관\n   - 스트레스 관리\n\n**효과**\n위 방법으로 약 3개월간 관리했더니 8kg 감량과 함께 지방간 수치가 정상으로 돌아왔어요. 무엇보다 평소 피로감이 많이 줄었습니다.\n\n건강은 잃고 나서야 소중함을 깨닫게 되더라고요. 증상이 없다고 방심하지 마시고, 건강검진에서 이상이 발견되면 꼭 관리하세요!",
          images: ["/images/community/health_chart.jpg"],
          viewCount: 1567,
          likeCount: 125,
          isBookmarked: false,
          commentCount: 18,
          comments: [],
        },
        {
          id: 4,
          type: "medical", // 의료/진료 관련
          author: {
            id: "user101",
            nickname: "치과공포증",
            profileImage: "/images/profiles/user4.jpg",
            level: 1,
          },
          createdAt: "2025-03-28T16:45:00Z",
          updatedAt: null,
          category: "support", // 응원/지지
          tags: ["tag-dental", "tag-dental-clinic", "tag-proceeding"],
          title: "임플란트 시술 중인데 너무 무서워요... 응원 부탁드려요",
          content:
            "안녕하세요, 어제 첫 임플란트 시술을 받았어요. 사실 치과 공포증이 심한데 어금니가 깨져서 어쩔 수 없이 하게 됐어요.\n\n어제 발치하고 뼈 이식까지 했는데, 시술 자체는 생각보다 덜 아팠지만 지금 붓기가 심하고 통증도 있네요. 무엇보다 앞으로 몇 개월간 여러 번 치과를 가야 한다는 사실이 너무 두려워요.\n\n비슷한 경험 있으신 분들, 어떻게 이 과정을 견디셨나요? 임플란트 회복 과정에서 도움되는 팁이나 마음가짐 있으면 공유해주세요. 정말 응원이 필요합니다...",
          images: [],
          viewCount: 743,
          likeCount: 67,
          isBookmarked: false,
          commentCount: 32,
          comments: [
            {
              id: "comment4",
              author: {
                id: "user202",
                nickname: "임플란트생존자",
                profileImage: "/images/profiles/user5.jpg",
                level: 3,
              },
              content:
                "저도 치과 공포증 심했는데 작년에 임플란트 2개 했어요! 초반이 제일 힘들고 시간 지나면 훨씬 나아져요. 붓기는 3-4일 지나면 많이 가라앉고, 통증은 처방약 잘 챙겨 드세요. 가장 중요한 건 마음가짐인데, 매 시술 때마다 '이제 한 단계 더 나아졌다'고 생각하니 조금씩 견딜만 했어요. 음식은 차가운 죽이나 부드러운 것으로 드시고, 다음 시술 직전에는 아로마 오일 맡거나 좋아하는 음악 들으면서 긴장 풀어보세요. 화이팅입니다!",
              createdAt: "2025-03-28T17:30:00Z",
              likeCount: 15,
            },
          ],
        },
        {
          id: 5,
          type: "cosmetic", // 미용/성형 관련
          author: {
            id: "user303",
            nickname: "피부관리중",
            profileImage: "/images/profiles/user6.jpg",
            level: 2,
          },
          createdAt: "2025-03-27T11:20:00Z",
          updatedAt: null,
          category: "recommend", // 추천/이벤트
          tags: ["tag-skin", "tag-derm", "tag-seoul"],
          title: "4월 피부과/피부관리 할인 정보 총정리 (가격정보 포함)",
          content:
            "안녕하세요! 4월에 진행되는 피부과/피부관리 클리닉 할인 정보를 총정리했어요.\n\n**강남 지역**\n\n1. 클리어 스킨 클리닉\n   - 기간: 4.1 - 4.30\n   - 내용: 여드름 케어 프로그램 30% 할인\n   - 가격: 300,000원 → 210,000원\n   - 특징: 첫 방문 고객 피부 분석 무료\n\n2. 에이스 피부과\n   - 기간: 4.5 - 5.5\n   - 내용: 색소 레이저 5회 패키지 40% 할인\n   - 가격: 750,000원 → 450,000원\n   - 특징: 홈케어 제품 증정\n\n**홍대 지역**\n\n3. 루미에르 클리닉\n   - 기간: 4.1 - 4.15\n   - 내용: 리쥬란 힐러 + 물광주사 콤보 할인\n   - 가격: 400,000원 → 280,000원\n   - 특징: 예약시 멤버십 추가 할인\n\n**건대 지역**\n\n4. 글로우 더마 클리닉\n   - 기간: 4월 한달간\n   - 내용: 모공 축소 프로그램 20% 할인\n   - 가격: 500,000원 → 400,000원\n   - 특징: 피부결 개선 마스크팩 증정\n\n**온라인 이벤트**\n\n5. 센트럴 메디 앱\n   - 기간: 4.10 - 4.20\n   - 내용: 앱 가입자 피부과 상담권 증정\n   - 참여방법: 앱 다운로드 후 회원가입\n\n실제 방문해본 1번과 3번은 의사선생님 실력이 좋고 과잉진료 없이 정직한 편이었어요. 할인 정보는 직접 전화로 확인했으니 예약하실 때 꼭 언급하세요!\n\n다른 좋은 정보 있으시면 댓글로 공유해주세요 :)",
          images: ["/images/community/event_info.jpg"],
          viewCount: 2145,
          likeCount: 142,
          isBookmarked: true,
          commentCount: 27,
          comments: [],
        },
        {
          id: 6,
          type: "medical", // 의료/진료 관련
          author: {
            id: "user404",
            nickname: "일상공유러",
            profileImage: "/images/profiles/user7.jpg",
            level: 2,
          },
          createdAt: "2025-03-26T18:15:00Z",
          updatedAt: null,
          category: "general", // 자유/잡담
          tags: [],
          title: "병원 진료받으러 갔다가 웃긴 일 있었어요ㅋㅋ",
          content:
            '오늘 목감기로 이비인후과에 갔는데요, 대기실에서 있었던 일을 공유합니다ㅋㅋ\n\n저보다 먼저 와계신 할머니께서 접수 창구에서 이러시더라고요.\n\n할머니: "선생님, 저 귀에서 계속 소리가 나요."\n간호사: "어떤 소리가 나시는데요?"\n할머니: "웅- 하고 계속 소리가 나."\n간호사: "네, 진료실에서 선생님께 말씀해주세요."\n할머니: "그런데 말이야... 그 소리가 여기 병원 에어컨 소리랑 똑같아."\n\n그 순간 대기실에 있던 모든 사람들이 귀를 기울였고... 정말 에어컨에서 \'웅-\' 소리가 나고 있었어요ㅋㅋㅋ\n\n할머니는 본인 귀에서 나는 소리인줄 알았는데, 알고보니 병원 에어컨 소리였던 거죠.\n\n간호사님도 웃음 참느라 진땀 빼시더라고요. 할머니도 결국 웃으시면서 "아이고, 나 바보같이..." 하시며 민망해 하셨답니다.\n\n병원 대기실이라 다들 긴장하고 있었는데, 이 해프닝 덕분에 분위기가 한결 밝아졌어요. 오늘의 소소한 웃음 한 조각이었습니다!',
          images: [],
          viewCount: 932,
          likeCount: 87,
          isBookmarked: false,
          commentCount: 14,
          comments: [],
        },
      ],
      popularSearches: [
        "눈매교정 후기",
        "강남 피부과 추천",
        "필러 부작용",
        "여드름 흉터 치료",
        "비염 병원 추천",
        "다이어트 시술",
        "라식 후기",
        "두통 병원",
        "치아 미백 방법",
        "탈모 치료",
      ],
      communityBanners: [
        {
          id: 1,
          title: "커뮤니티 이용 가이드",
          imageUrl: "/images/banners/community_guide.jpg",
          linkUrl: "/community/guide",
          startDate: "2025-03-01T00:00:00Z",
          endDate: "2025-06-30T23:59:59Z",
        },
        {
          id: 2,
          title: "4월 우수 후기 이벤트",
          imageUrl: "/images/banners/review_event.jpg",
          linkUrl: "/events/best-review",
          startDate: "2025-04-01T00:00:00Z",
          endDate: "2025-04-30T23:59:59Z",
        },
      ],
      communityStats: {
        totalPosts: 3578,
        totalMembers: 12463,
        activeMembersToday: 827,
        postsToday: 152,
        commentsToday: 943,
        mostActiveCategory: "review",
        fastestGrowingTag: "tag-skin",
        typeDistribution: {
          medical: 45,
          cosmetic: 55,
        },
        topContributor: {
          id: "user505",
          nickname: "뷰티전문가",
          postCount: 287,
          level: 6,
        },
      },
      favoritesData: [
        {
          id: 1,
          type: "medical",
          title: "서울 연세 내과",
          image: getMedicalAdImage("all", 1),
          subtitle: "심장내과 전문 병원",
          rating: 4.8,
          reviewCount: 124,
          description:
            "혈액검사, CT, 초음파, 암 표지자 검사까지 한번에! 건강한 삶을 위한 첫걸음, 지금 예약하세요.",
          tags: ["내과", "검진", "할인 이벤트"],
          price: "검진 비용 문의",
          location: "서울시 강남구",
          distance: "2.3km",
          isEvent: true,
          eventPeriod: "3.25 - 4.30",
          eventContent: "종합검진 패키지 특별 할인",
          originalPrice: "150,000원",
          discountPrice: "120,000원",
          discountRate: "20%",
          // 추가된 카테고리 정보
          mainCategory: "chest", // 가슴/심장 문제
          subCategory: "chest-pain", // 가슴이 아파요
          // 추가된 전문 과목 정보
          specialty: "cardiology", // 심장내과
          facilityType: "clinic", // 의원
        },
        {
          id: 2,
          type: "medical",
          title: "김연아 정형외과",
          image: getHospitalImage("all", 3),
          subtitle: "관절 전문",
          rating: 4.9,
          reviewCount: 213,
          description: "관절 통증이나 스포츠 손상에 특화된 클리닉. 예약 필수.",
          tags: ["정형외과", "관절", "스포츠"],
          price: "진료비 5,000원~",
          location: "서울시 서초구",
          distance: "3.7km",
          isEvent: false,
          // 추가된 카테고리 정보
          mainCategory: "joint", // 관절/근육 통증
          subCategory: "joint-knee", // 무릎이 아파요
          // 추가된 전문 과목 정보
          specialty: "orthopedics", // 정형외과
          facilityType: "clinic", // 의원
        },
        {
          id: 3,
          type: "cosmetic",
          title: "뷰티 클리닉 센터",
          image: getCosmeticAdImage("all", 1),
          subtitle: "피부 관리 전문",
          rating: 4.6,
          reviewCount: 86,
          description:
            "개인 맞춤형 피부 관리 프로그램. 첫 방문 고객 상담료 무료.",
          tags: ["피부 관리", "레이저", "할인 이벤트"],
          price: "시술 60,000원~",
          location: "서울시 마포구",
          distance: "1.5km",
          isEvent: true,
          eventPeriod: "3.15 - 4.15",
          eventContent: "첫 방문 고객 상담료 무료",
          originalPrice: "60,000원",
          discountPrice: "무료 (상담)",
          discountRate: "100%",
          mainCategory: "skin",
          subCategory: "skin-basic",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 4,
          type: "cosmetic",
          title: "라인 성형외과",
          image: getHospitalImage("all", 4),
          subtitle: "안면윤곽 전문",
          rating: 4.7,
          reviewCount: 156,
          description: "개인별 맞춤 안면윤곽 디자인. 상담 예약 후 방문 필수.",
          tags: ["성형외과", "안면윤곽"],
          price: "상담 무료",
          location: "서울시 강남구",
          distance: "0.8km",
          isEvent: false,
          // 추가된 카테고리 정보
          mainCategory: "face", // 얼굴 성형
          subCategory: "face-contour", // 얼굴 윤곽
          // 새로 추가된 정보
          specialty: "plastic", // 성형외과
          facilityType: "clinic", // 의원
        },
        {
          id: 5,
          type: "medical",
          title: "굿모닝 치과",
          image: getHospitalImage("all", 5),
          subtitle: "임플란트 전문",
          rating: 4.5,
          reviewCount: 178,
          description:
            "첨단 디지털 장비를 활용한 무통 임플란트. 3월 한정 스케일링 할인.",
          tags: ["치과", "임플란트", "스케일링"],
          price: "상담 무료",
          location: "서울시 송파구",
          distance: "4.2km",
          isEvent: true,
          eventPeriod: "3.01 - 3.31",
          eventContent: "스케일링 + 검진 패키지",
          originalPrice: "80,000원",
          discountPrice: "49,000원",
          discountRate: "38%",
          // 추가된 카테고리 정보
          mainCategory: "dental", // 치아 관련 (추가 카테고리로 가정)
          subCategory: "dental-implant", // 임플란트 (가정)
          // 새로 추가된 정보
          specialty: "dentistry", // 치과
          facilityType: "dental", // 치과
        },
        {
          id: 6,
          type: "medical",
          title: "힐링 한의원",
          image: getMedicalAdImage("all", 2),
          subtitle: "체질 분석 전문",
          rating: 4.7,
          reviewCount: 142,
          description:
            "개인 체질에 맞는 맞춤형 한방 치료와 침술. 첫 방문 체질 분석 검사 50% 할인 중.",
          tags: ["한의원", "침술", "체질 분석"],
          price: "진료비 15,000원~",
          location: "서울시 용산구",
          distance: "3.1km",
          isEvent: true,
          eventPeriod: "4.01 - 4.30",
          eventContent: "체질 분석 + 침술 패키지",
          originalPrice: "70,000원",
          discountPrice: "35,000원",
          discountRate: "50%",
          // 추가된 카테고리 정보
          mainCategory: "sleep", // 수면/피로
          subCategory: "sleep-energy", // 기운이 없어요
          // 새로 추가된 정보
          specialty: "oriental", // 한의원
          facilityType: "oriental", // 한의원
        },
        {
          id: 7,
          type: "cosmetic",
          title: "글로우 피부과",
          image: getCosmeticAdImage("all", 2),
          subtitle: "여드름 흉터 개선 전문",
          rating: 4.8,
          reviewCount: 203,
          description:
            "맞춤형 피부 리모델링으로 여드름 흉터 개선. 봄맞이 특별 프로모션 진행 중.",
          tags: ["피부과", "여드름", "흉터"],
          price: "상담 무료",
          location: "서울시 강동구",
          distance: "5.5km",
          isEvent: true,
          eventPeriod: "4.01 - 5.15",
          eventContent: "피부 리모델링 시술 할인",
          originalPrice: "250,000원",
          discountPrice: "180,000원",
          discountRate: "28%",
          // 추가된 카테고리 정보
          mainCategory: "scar", // 흉터/점 제거
          subCategory: "scar-acne", // 여드름 흉터
        },
        {
          id: 8,
          type: "medical",
          title: "맑은눈 안과",
          image: getHospitalImage("all", 2),
          subtitle: "노안/백내장 전문",
          rating: 4.9,
          reviewCount: 189,
          description:
            "최신 장비로 정밀한 시력 검사와 노안 교정. 60세 이상 시력 검사 무료 이벤트.",
          tags: ["안과", "노안", "백내장"],
          price: "진료비 10,000원~",
          location: "서울시 종로구",
          distance: "4.7km",
          isEvent: false,
          // 추가된 카테고리 정보
          mainCategory: "eye", // 눈 문제
          subCategory: "eye-vision", // 시력이 안 좋아졌어요
          // 새로 추가된 정보
          specialty: "ophthalmology", // 안과
          facilityType: "clinic", // 의원
        },
        {
          id: 9,
          type: "cosmetic",
          title: "에스테틱 클리닉",
          image: getCosmeticAdImage("all", 3),
          subtitle: "비수술 리프팅 전문",
          rating: 4.6,
          reviewCount: 167,
          description:
            "최신 고주파 장비를 이용한 비수술 리프팅. 5월까지 특별 할인 프로모션.",
          tags: ["리프팅", "안티에이징", "할인 이벤트"],
          price: "시술 150,000원~",
          location: "서울시 서초구",
          distance: "2.9km",
          isEvent: true,
          eventPeriod: "4.15 - 5.31",
          eventContent: "울쎄라 리프팅 특가",
          originalPrice: "450,000원",
          discountPrice: "320,000원",
          discountRate: "29%",
          // 추가된 카테고리 정보
          mainCategory: "antiaging", // 노화 방지
          subCategory: "antiaging-lifting", // 리프팅
        },
        {
          id: 10,
          type: "medical",
          title: "튼튼 소아과",
          image: getMedicalAdImage("all", 3),
          subtitle: "영유아 전문 의원",
          rating: 4.8,
          reviewCount: 231,
          description:
            "아이들을 위한 친환경 진료 환경과 최신 의료 시스템. 4월 예방접종 할인 이벤트.",
          tags: ["소아과", "예방접종", "소아 알레르기"],
          price: "진료비 8,000원~",
          location: "서울시a 노원구",
          distance: "6.3km",
          isEvent: true,
          eventPeriod: "4.01 - 4.30",
          eventContent: "영유아 건강검진 패키지",
          originalPrice: "120,000원",
          discountPrice: "89,000원",
          discountRate: "26%",
          // 추가된 카테고리 정보
          mainCategory: "allergy", // 알레르기
          subCategory: "allergy-respiratory", // 알레르기성 비염이 있어요
          // 새로 추가된 정보
          specialty: "pediatrics", // 소아과
          facilityType: "clinic", // 의원
        },
        // 머리두통 - 두통이 있어요 (5개)
        {
          id: 11,
          type: "medical",
          title: "두통케어 클리닉",
          image: getMedicalAdImage("all", 2),
          subtitle: "두통 전문 치료센터",
          rating: 4.7,
          reviewCount: 152,
          description:
            "편두통, 긴장성 두통, 군발성 두통 등 모든 유형의 두통 전문 진료와 맞춤형 치료.",
          tags: ["신경과", "두통", "편두통"],
          price: "진료비 20,000원~",
          location: "서울시 강남구",
          distance: "2.5km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "두통 종합검진 패키지 할인",
          originalPrice: "150,000원",
          discountPrice: "120,000원",
          discountRate: "20%",
          mainCategory: "head",
          subCategory: "head-pain",
          // 추가된 전문 과목 정보
          specialty: "neurology", // 신경과
          facilityType: "clinic", // 의원
        },
        {
          id: 12,
          type: "medical",
          title: "서울 두통 클리닉",
          image: getMedicalAdImage("all", 3),
          subtitle: "만성 두통 전문",
          rating: 4.9,
          reviewCount: 187,
          description:
            "만성 두통, 원인불명 두통 전문 치료. 최신 진단 장비와 다양한 치료법 보유.",
          tags: ["두통", "만성통증", "신경과"],
          price: "진료비 25,000원~",
          location: "서울시 서초구",
          distance: "3.2km",
          isEvent: false,
          mainCategory: "head",
          subCategory: "head-pain",
          // 추가된 전문 과목 정보
          specialty: "neurology", // 신경과
          facilityType: "clinic", // 의원
        },
        {
          id: 13,
          type: "medical",
          title: "뉴로 헤드 센터",
          image: getMedicalAdImage("all", 4),
          subtitle: "두통 및 신경통 전문",
          rating: 4.8,
          reviewCount: 165,
          description:
            "두통, 안면신경통, 삼차신경통 등 두경부 통증 전문 진료. 정확한 원인 진단과 치료.",
          tags: ["신경과", "두통", "신경통"],
          price: "진료비 22,000원~",
          location: "서울시 강남구",
          distance: "2.8km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "두통 집중 치료 프로그램",
          originalPrice: "300,000원",
          discountPrice: "240,000원",
          discountRate: "20%",
          mainCategory: "head",
          subCategory: "head-pain",
          // 추가된 전문 과목 정보
          specialty: "neurology", // 신경과
          facilityType: "clinic", // 의원
        },
        {
          id: 14,
          type: "medical",
          title: "편두통 스페셜 클리닉",
          image: getMedicalAdImage("all", 5),
          subtitle: "편두통 특화 진료",
          rating: 4.6,
          reviewCount: 143,
          description:
            "편두통, 군발성 두통 등 심한 두통에 특화된 진료. 예방 및 급성기 치료 모두 가능.",
          tags: ["편두통", "군발두통", "통증의학과"],
          price: "진료비 18,000원~",
          location: "서울시 송파구",
          distance: "4.5km",
          isEvent: false,
          mainCategory: "head",
          subCategory: "head-pain",
          // 추가된 전문 과목 정보
          specialty: "pain", // 통증의학과
          facilityType: "clinic", // 의원
        },
        {
          id: 15,
          type: "medical",
          title: "통증 없는 클리닉",
          image: getMedicalAdImage("all", 1),
          subtitle: "두통 및 만성통증 전문",
          rating: 4.7,
          reviewCount: 176,
          description:
            "두통, 경추성 두통, 긴장성 두통 등 모든 유형의 두통 진료. 비약물적 치료도 제공.",
          tags: ["통증의학과", "두통", "만성통증"],
          price: "진료비 20,000원~",
          location: "서울시 강남구",
          distance: "2.1km",
          isEvent: true,
          eventPeriod: "4.1 - 5.31",
          eventContent: "두통 치료 첫 방문 할인",
          originalPrice: "80,000원",
          discountPrice: "60,000원",
          discountRate: "25%",
          mainCategory: "head",
          subCategory: "head-pain",
          // 추가된 전문 과목 정보
          specialty: "pain", // 통증의학과
          facilityType: "clinic", // 의원
        },
        {
          id: 16,
          type: "medical",
          title: "굿슬립 수면의학센터",
          image: getMedicalAdImage("all", 4),
          subtitle: "수면장애 전문",
          rating: 4.6,
          reviewCount: 118,
          description:
            "불면증, 수면무호흡증, 코골이, 하지불안증후군 등 수면장애 전문 진료 및 치료.",
          tags: ["신경과", "수면장애", "불면증"],
          price: "진료비 20,000원~",
          location: "서울시 서초구",
          distance: "3.4km",
          isEvent: false,
          mainCategory: "sleep",
          subCategory: "sleep-insomnia",
          // 추가된 전문 과목 정보
          specialty: "neurology", // 신경과
          facilityType: "clinic", // 의원
        },
        {
          id: 17,
          type: "medical",
          title: "비전케어 안과",
          image: getMedicalAdImage("all", 5),
          subtitle: "시력교정 전문",
          rating: 4.9,
          reviewCount: 246,
          description:
            "시력저하, 백내장, 녹내장, 안구건조증 등 눈 질환 전문 진료. 최신 검사 장비 보유.",
          tags: ["안과", "시력검사", "안구건조증"],
          price: "진료비 15,000원~",
          location: "서울시 강남구",
          distance: "2.1km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "노안 검사 패키지 할인",
          originalPrice: "80,000원",
          discountPrice: "60,000원",
          discountRate: "25%",
          mainCategory: "eye",
          subCategory: "eye-vision",
          // 추가된 전문 과목 정보
          specialty: "ophthalmology", // 안과
          facilityType: "clinic", // 의원
        },
        {
          id: 18,
          type: "medical",
          title: "청각케어 이비인후과",
          image: getMedicalAdImage("all", 1),
          subtitle: "청력/귀 질환 전문",
          rating: 4.7,
          reviewCount: 132,
          description:
            "난청, 이명, 중이염, 외이도염 등 귀 질환 전문 진료. 청력 검사 당일 가능.",
          tags: ["이비인후과", "청력검사", "이명"],
          price: "진료비 12,000원~",
          location: "서울시 송파구",
          distance: "4.8km",
          isEvent: false,
          mainCategory: "ear",
          subCategory: "ear-hearing",
          // 추가된 전문 과목 정보
          specialty: "ent", // 이비인후과
          facilityType: "clinic", // 의원
        },
        {
          id: 19,
          type: "medical",
          title: "마인드케어 정신건강의학과",
          image: getMedicalAdImage("all", 2),
          subtitle: "정신건강 전문",
          rating: 4.8,
          reviewCount: 157,
          description:
            "우울증, 불안장애, 공황장애, ADHD 등 정신건강 전문 진료. 비밀보장, 상담 예약 필수.",
          tags: ["정신건강의학과", "우울증", "상담"],
          price: "진료비 25,000원~",
          location: "서울시 서초구",
          distance: "3.5km",
          isEvent: true,
          eventPeriod: "4.1 - 5.31",
          eventContent: "초기 상담 패키지 할인",
          originalPrice: "120,000원",
          discountPrice: "90,000원",
          discountRate: "25%",
          mainCategory: "mental",
          subCategory: "mental-depression",
          // 추가된 전문 과목 정보
          specialty: "psychiatry", // 정신건강의학과
          facilityType: "clinic", // 의원
        },
        {
          id: 20,
          type: "medical",
          title: "알레르기 전문 클리닉",
          image: getMedicalAdImage("all", 3),
          subtitle: "알레르기 질환 전문",
          rating: 4.7,
          reviewCount: 184,
          description:
            "식품 알레르기, 피부 알레르기, 알레르기성 비염, 천식 등 전문 진료 및 검사.",
          tags: ["알레르기내과", "천식", "아토피"],
          price: "진료비 15,000원~",
          location: "서울시 강남구",
          distance: "2.6km",
          isEvent: false,
          mainCategory: "allergy",
          subCategory: "allergy-respiratory",
          // 추가된 전문 과목 정보
          specialty: "allergy", // 알레르기내과
          facilityType: "clinic", // 의원
        },
        {
          id: 21,
          type: "medical",
          title: "감염내과 클리닉",
          image: getMedicalAdImage("all", 4),
          subtitle: "감염질환 전문",
          rating: 4.8,
          reviewCount: 146,
          description:
            "감염성 질환, 열, 원인불명 염증, 면역질환 전문 진료. 신속한 진단과 치료.",
          tags: ["감염내과", "발열", "면역질환"],
          price: "진료비 20,000원~",
          location: "서울시 서초구",
          distance: "3.7km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "면역력 검사 패키지 할인",
          originalPrice: "150,000원",
          discountPrice: "120,000원",
          discountRate: "20%",
          mainCategory: "fever",
          subCategory: "fever-high",
          // 추가된 전문 과목 정보
          specialty: "internal", // 내과
          facilityType: "clinic", // 의원
        },
        // Adding more cosmetic category entries
        {
          id: 22,
          type: "cosmetic",
          title: "더마 스킨 클리닉",
          image: getCosmeticAdImage("all", 4),
          subtitle: "피부관리 전문",
          rating: 4.7,
          reviewCount: 198,
          description:
            "기본 피부관리부터 심화 트리트먼트까지 개인 맞춤형 피부관리 프로그램을 제공합니다.",
          tags: ["피부관리", "모공관리", "수분공급"],
          price: "시술 50,000원~",
          location: "서울시 강남구",
          distance: "2.2km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "첫 방문 고객 기본 관리 할인",
          originalPrice: "80,000원",
          discountPrice: "50,000원",
          discountRate: "37%",
          mainCategory: "skin",
          subCategory: "skin-pore",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 23,
          type: "cosmetic",
          title: "뷰티 페이스 성형외과",
          image: getCosmeticAdImage("all", 5),
          subtitle: "얼굴 성형 전문",
          rating: 4.9,
          reviewCount: 257,
          description:
            "눈, 코, 윤곽 등 얼굴 성형 맞춤 디자인. 상담부터 수술 후 관리까지 완벽한 케어.",
          tags: ["성형외과", "쌍꺼풀", "코성형"],
          price: "상담 무료",
          location: "서울시 강남구",
          distance: "1.5km",
          isEvent: false,
          mainCategory: "face",
          subCategory: "face-eye",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 24,
          type: "cosmetic",
          title: "슬림바디 컨투어 클리닉",
          image: getCosmeticAdImage("all", 1),
          subtitle: "바디라인 전문",
          rating: 4.6,
          reviewCount: 163,
          description:
            "지방흡입, 바디 리프팅, 셀룰라이트 제거 등 체형 교정 전문. 개인 맞춤 시술 제안.",
          tags: ["지방흡입", "바디컨투어링", "셀룰라이트"],
          price: "상담 무료",
          location: "서울시 서초구",
          distance: "3.2km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "지방흡입 패키지 할인",
          originalPrice: "3,000,000원",
          discountPrice: "2,400,000원",
          discountRate: "20%",
          mainCategory: "body",
          subCategory: "body-liposuction",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 25,
          type: "cosmetic",
          title: "헤어그로우 클리닉",
          image: getCosmeticAdImage("all", 2),
          subtitle: "모발/탈모 전문",
          rating: 4.7,
          reviewCount: 143,
          description:
            "탈모 예방, 두피 관리, 모발 이식 등 모든 모발 관련 시술. 개인 맞춤 프로그램.",
          tags: ["탈모", "두피관리", "모발이식"],
          price: "상담 무료",
          location: "서울시 강남구",
          distance: "2.4km",
          isEvent: false,
          mainCategory: "hair",
          subCategory: "hair-loss",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 26,
          type: "cosmetic",
          title: "타임리버스 안티에이징 센터",
          image: getCosmeticAdImage("all", 3),
          subtitle: "노화방지 전문",
          rating: 4.8,
          reviewCount: 176,
          description:
            "주름개선, 리프팅, 탄력강화 등 노화방지 전문 시술. 최신 장비와 기술 보유.",
          tags: ["안티에이징", "주름개선", "리프팅"],
          price: "시술 150,000원~",
          location: "서울시 강남구",
          distance: "1.9km",
          isEvent: true,
          eventPeriod: "4.1 - 5.30",
          eventContent: "안티에이징 패키지 특가",
          originalPrice: "450,000원",
          discountPrice: "350,000원",
          discountRate: "22%",
          mainCategory: "antiaging",
          subCategory: "antiaging-wrinkle",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 27,
          type: "cosmetic",
          title: "스마일 치과 미용센터",
          image: getCosmeticAdImage("all", 4),
          subtitle: "치아미용 전문",
          rating: 4.9,
          reviewCount: 215,
          description:
            "치아미백, 라미네이트, 치아교정 등 치아 미용 전문. 디지털 스캔으로 정확한 진단.",
          tags: ["치아미용", "미백", "라미네이트"],
          price: "상담 무료",
          location: "서울시 서초구",
          distance: "3.6km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "치아미백 프로모션",
          originalPrice: "300,000원",
          discountPrice: "200,000원",
          discountRate: "33%",
          mainCategory: "dental",
          subCategory: "dental-whitening",
          // 새로 추가된 정보
          specialty: "dentistry",
          facilityType: "dental",
        },
        {
          id: 28,
          type: "cosmetic",
          title: "인젝션 뷰티 센터",
          image: getCosmeticAdImage("all", 5),
          subtitle: "주사시술 전문",
          rating: 4.7,
          reviewCount: 189,
          description:
            "보톡스, 필러, 지방이식, 메조테라피 등 주사 시술 전문. 의료진의 섬세한 시술.",
          tags: ["보톡스", "필러", "메조테라피"],
          price: "시술 80,000원~",
          location: "서울시 강남구",
          distance: "2.1km",
          isEvent: false,
          mainCategory: "injectable",
          subCategory: "injectable-botox",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 29,
          type: "cosmetic",
          title: "립 아트 클리닉",
          image: getCosmeticAdImage("all", 1),
          subtitle: "입술 성형 전문",
          rating: 4.6,
          reviewCount: 142,
          description:
            "입술 필러, 입술 모양 교정, 입술 라인 개선 등 입술 전문 시술. 자연스러운 볼륨감.",
          tags: ["입술성형", "필러", "입술문신"],
          price: "시술 150,000원~",
          location: "서울시 강남구",
          distance: "2.3km",
          isEvent: true,
          eventPeriod: "4.1 - 5.15",
          eventContent: "입술 필러 프로모션",
          originalPrice: "250,000원",
          discountPrice: "180,000원",
          discountRate: "28%",
          mainCategory: "lip",
          subCategory: "lip-plump",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 30,
          type: "cosmetic",
          title: "클리어 스킨 스튜디오",
          image: getCosmeticAdImage("all", 2),
          subtitle: "흉터/점 제거 전문",
          rating: 4.8,
          reviewCount: 164,
          description:
            "여드름 흉터, 수술 흉터, 점 제거 등 흉터 개선 전문. 맞춤형 치료로 최적의 효과.",
          tags: ["흉터제거", "점제거", "레이저"],
          price: "시술 100,000원~",
          location: "서울시 강남구",
          distance: "2.5km",
          isEvent: false,
          mainCategory: "scar",
          subCategory: "scar-surgical",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 31,
          type: "cosmetic",
          title: "눈썹 디자인 살롱",
          image: getCosmeticAdImage("all", 3),
          subtitle: "눈썹/속눈썹 전문",
          rating: 4.7,
          reviewCount: 152,
          description:
            "눈썹 문신, 속눈썹 연장, 눈썹 리프팅 등 눈썹 관련 모든 시술. 맞춤 디자인.",
          tags: ["눈썹문신", "속눈썹연장", "반영구"],
          price: "시술 80,000원~",
          location: "서울시 강남구",
          distance: "2.2km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "눈썹 문신 할인",
          originalPrice: "250,000원",
          discountPrice: "180,000원",
          discountRate: "28%",
          mainCategory: "eyebrow",
          subCategory: "eyebrow-tattoo",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 32,
          type: "cosmetic",
          title: "눈썹 디자인 살롱",
          image: getCosmeticAdImage("all", 3),
          subtitle: "눈썹/속눈썹 전문",
          rating: 4.7,
          reviewCount: 152,
          description:
            "눈썹 문신, 속눈썹 연장, 눈썹 리프팅 등 눈썹 관련 모든 시술. 맞춤 디자인.",
          tags: ["눈썹문신", "속눈썹연장", "반영구"],
          price: "시술 80,000원~",
          location: "서울시 강남구",
          distance: "2.2km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "눈썹 문신 할인",
          originalPrice: "250,000원",
          discountPrice: "180,000원",
          discountRate: "28%",
          mainCategory: "eyebrow",
          subCategory: "eyebrow-tattoo",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 33,
          type: "cosmetic",
          title: "슬림 다이어트 클리닉",
          image: getCosmeticAdImage("all", 5),
          subtitle: "다이어트/체중 전문",
          rating: 4.6,
          reviewCount: 178,
          description:
            "체중 관리, 부분 체중 감량, 영양 요법 등 다이어트 전문 프로그램. 개인 맞춤 계획.",
          tags: ["다이어트", "체중관리", "지방분해"],
          price: "프로그램 200,000원~",
          location: "서울시 강남구",
          distance: "2.7km",
          isEvent: true,
          eventPeriod: "4.15 - 5.31",
          eventContent: "다이어트 프로그램 특가",
          originalPrice: "500,000원",
          discountPrice: "350,000원",
          discountRate: "30%",
          mainCategory: "weight",
          subCategory: "weight-management",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        // Filling in remaining sub-categories
        {
          id: 34,
          type: "medical",
          title: "두통 완화 클리닉",
          image: getMedicalAdImage("all", 1),
          subtitle: "두통, 어지럼증 전문",
          rating: 4.5,
          reviewCount: 126,
          description:
            "만성 두통, 어지럼증, 현기증 등 두통 관련 증상 전문 진료와 치료.",
          tags: ["신경과", "두통", "어지럼증"],
          price: "진료비 18,000원~",
          location: "서울시 강남구",
          distance: "2.8km",
          isEvent: false,
          mainCategory: "head",
          subCategory: "head-dizziness",
          // 추가된 전문 과목 정보
          specialty: "neurology", // 신경과
          facilityType: "clinic", // 의원
        },
        {
          id: 35,
          type: "medical",
          title: "가람 호흡기 클리닉",
          image: getMedicalAdImage("all", 2),
          subtitle: "호흡기 질환 전문",
          rating: 4.7,
          reviewCount: 163,
          description:
            "기침, 가래, 비염, 콧물 등 호흡기 질환 전문 진료. 알레르기 검사도 가능합니다.",
          tags: ["호흡기내과", "기침", "알레르기"],
          price: "진료비 15,000원~",
          location: "서울시 송파구",
          distance: "4.3km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "호흡기 종합검진 할인",
          originalPrice: "120,000원",
          discountPrice: "90,000원",
          discountRate: "25%",
          mainCategory: "cold",
          subCategory: "cold-cough",
          // 추가된 전문 과목 정보
          specialty: "pulmonology", // 호흡기내과
          facilityType: "clinic", // 의원
        },
        {
          id: 36,
          type: "medical",
          title: "위장 편안 내과",
          image: getMedicalAdImage("all", 3),
          subtitle: "소화기 질환 전문",
          rating: 4.6,
          reviewCount: 145,
          description:
            "위장 통증, 복통, 메스꺼움, 구토 등 위장 관련 증상 전문 진료. 신속한 대응.",
          tags: ["소화기내과", "위장통증", "소화불량"],
          price: "진료비 18,000원~",
          location: "서울시 강남구",
          distance: "2.5km",
          isEvent: false,
          mainCategory: "stomach",
          subCategory: "stomach-nausea",
          // 추가된 전문 과목 정보
          specialty: "gastroenterology", // 소화기내과
          facilityType: "clinic", // 의원
        },
        {
          id: 37,
          type: "cosmetic",
          title: "화이트 스킨 클리닉",
          image: getCosmeticAdImage("all", 1),
          subtitle: "피부 미백 전문",
          rating: 4.8,
          reviewCount: 173,
          description:
            "피부 톤 개선, 미백 관리, 색소 침착 치료로 밝고 균일한 피부톤을 만들어 드립니다.",
          tags: ["미백", "색소치료", "톤업"],
          price: "시술 100,000원~",
          location: "서울시 강남구",
          distance: "2.1km",
          isEvent: true,
          eventPeriod: "4.1 - 5.15",
          eventContent: "미백 프로그램 특가",
          originalPrice: "300,000원",
          discountPrice: "200,000원",
          discountRate: "33%",
          mainCategory: "skin",
          subCategory: "skin-whitening",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 38,
          type: "cosmetic",
          title: "코성형 전문 클리닉",
          image: getCosmeticAdImage("all", 2),
          subtitle: "코 성형 전문",
          rating: 4.9,
          reviewCount: 248,
          description:
            "비절개, 절개, 매부리코, 콧대 등 다양한 코 성형 전문. 3D 시뮬레이션으로 미리 확인.",
          tags: ["코성형", "비절개", "콧대"],
          price: "상담 무료",
          location: "서울시 강남구",
          distance: "1.8km",
          isEvent: false,
          mainCategory: "face",
          subCategory: "face-nose",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 39,
          type: "cosmetic",
          title: "슬림 셀룰라이트 케어",
          image: getCosmeticAdImage("all", 3),
          subtitle: "셀룰라이트 전문",
          rating: 4.6,
          reviewCount: 156,
          description:
            "셀룰라이트 제거, 지방분해, 바디 라인 개선을 위한 맞춤형 프로그램을 제공합니다.",
          tags: ["셀룰라이트", "바디관리", "지방분해"],
          price: "시술 150,000원~",
          location: "서울시 서초구",
          distance: "3.4km",
          isEvent: true,
          eventPeriod: "4.15 - 5.31",
          eventContent: "셀룰라이트 관리 패키지",
          originalPrice: "450,000원",
          discountPrice: "350,000원",
          discountRate: "22%",
          mainCategory: "body",
          subCategory: "body-cellulite",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 40,
          type: "cosmetic",
          title: "헤어 트랜스플랜트 센터",
          image: getCosmeticAdImage("all", 4),
          subtitle: "모발 이식 전문",
          rating: 4.8,
          reviewCount: 162,
          description:
            "최신 FUE 방식의 자연스러운 모발 이식. 탈모 부위에 따른 맞춤형 디자인과 시술.",
          tags: ["모발이식", "탈모", "두피케어"],
          price: "상담 무료",
          location: "서울시 강남구",
          distance: "2.3km",
          isEvent: false,
          mainCategory: "hair",
          subCategory: "hair-transplant",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 41,
          type: "cosmetic",
          title: "네오 스킨 클리닉",
          image: getCosmeticAdImage("all", 5),
          subtitle: "탄력 강화 전문",
          rating: 4.7,
          reviewCount: 148,
          description:
            "콜라겐 촉진, 탄력 강화, 피부 리프팅을 위한 최신 시술. 노화 방지 효과 탁월.",
          tags: ["탄력강화", "콜라겐", "리프팅"],
          price: "시술 180,000원~",
          location: "서울시 강남구",
          distance: "2.4km",
          isEvent: true,
          eventPeriod: "4.1 - 5.31",
          eventContent: "탄력 케어 패키지 할인",
          originalPrice: "500,000원",
          discountPrice: "350,000원",
          discountRate: "30%",
          mainCategory: "antiaging",
          subCategory: "antiaging-tightening",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 42,
          type: "cosmetic",
          title: "스마일라인 치과",
          image: getCosmeticAdImage("all", 1),
          subtitle: "치아 교정 전문",
          rating: 4.9,
          reviewCount: 226,
          description:
            "투명 교정, 설측 교정, 부분 교정 등 다양한 치아 교정 방법. 개인별 맞춤 교정.",
          tags: ["치아교정", "투명교정", "스마일라인"],
          price: "상담 무료",
          location: "서울시 서초구",
          distance: "3.5km",
          isEvent: false,
          mainCategory: "dental",
          subCategory: "dental-alignment",
          // 새로 추가된 정보
          specialty: "dentistry",
          facilityType: "dental",
        },
        {
          id: 43,
          type: "cosmetic",
          title: "실루엣 메디컬 클리닉",
          image: getCosmeticAdImage("all", 2),
          subtitle: "실 리프팅 전문",
          rating: 4.8,
          reviewCount: 187,
          description:
            "최신 PDO, 콜라겐 실 등을 이용한 비수술 리프팅. 자연스러운 얼굴 윤곽 개선.",
          tags: ["실리프팅", "비수술", "콜라겐실"],
          price: "시술 250,000원~",
          location: "서울시 강남구",
          distance: "2.1km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "첫 방문 실 리프팅 할인",
          originalPrice: "450,000원",
          discountPrice: "350,000원",
          discountRate: "22%",
          mainCategory: "injectable",
          subCategory: "injectable-thread",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 44,
          type: "cosmetic",
          title: "립 볼륨 아트 클리닉",
          image: getCosmeticAdImage("all", 3),
          subtitle: "입술 볼륨 전문",
          rating: 4.7,
          reviewCount: 153,
          description:
            "입술 볼륨 필러, 입술 라인 교정으로 자연스럽고 매력적인 입술을 만들어 드립니다.",
          tags: ["입술필러", "볼륨", "입술라인"],
          price: "시술 180,000원~",
          location: "서울시 강남구",
          distance: "2.2km",
          isEvent: false,
          mainCategory: "lip",
          subCategory: "lip-volume",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 45,
          type: "cosmetic",
          title: "아큐어 흉터 클리닉",
          image: getCosmeticAdImage("all", 4),
          subtitle: "화상 흉터 전문",
          rating: 4.8,
          reviewCount: 142,
          description:
            "화상 흉터, 수술 흉터, 사고 흉터 등 다양한 흉터 치료. 최신 레이저 기술 활용.",
          tags: ["흉터치료", "화상흉터", "레이저"],
          price: "상담 무료",
          location: "서울시 서초구",
          distance: "3.6km",
          isEvent: true,
          eventPeriod: "4.1 - 5.31",
          eventContent: "흉터 치료 프로그램 할인",
          originalPrice: "500,000원",
          discountPrice: "400,000원",
          discountRate: "20%",
          mainCategory: "scar",
          subCategory: "scar-burn",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 46,
          type: "cosmetic",
          title: "아이브로우 디자인 살롱",
          image: getCosmeticAdImage("all", 5),
          subtitle: "눈썹 디자인 전문",
          rating: 4.6,
          reviewCount: 158,
          description:
            "눈썹 디자인, 눈썹 정리, 반영구 눈썹으로 얼굴형에 맞는 완벽한 눈썹을 찾아드립니다.",
          tags: ["눈썹", "눈썹정리", "반영구"],
          price: "시술 80,000원~",
          location: "서울시 강남구",
          distance: "2.3km",
          isEvent: false,
          mainCategory: "eyebrow",
          subCategory: "eyebrow-shape",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 47,
          type: "cosmetic",
          title: "베인 케어 클리닉",
          image: getCosmeticAdImage("all", 1),
          subtitle: "혈관 레이저 전문",
          rating: 4.7,
          reviewCount: 146,
          description:
            "실핏줄, 다리 정맥류, 홍조 등 혈관성 피부 문제 전문 치료. 정확한 타겟팅 레이저.",
          tags: ["혈관레이저", "정맥류", "홍조"],
          price: "시술 150,000원~",
          location: "서울시 서초구",
          distance: "3.4km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "혈관 레이저 패키지 할인",
          originalPrice: "350,000원",
          discountPrice: "280,000원",
          discountRate: "20%",
          mainCategory: "laser",
          subCategory: "laser-vein",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 48,
          type: "cosmetic",
          title: "근육 밸런스 클리닉",
          image: getCosmeticAdImage("all", 2),
          subtitle: "근육 강화 전문",
          rating: 4.8,
          reviewCount: 176,
          description:
            "비수술적 근육 강화, 체형 개선, 식이요법을 통한 건강한 다이어트 프로그램 제공.",
          tags: ["근육강화", "체형교정", "다이어트"],
          price: "프로그램 250,000원~",
          location: "서울시 강남구",
          distance: "2.5km",
          isEvent: false,
          mainCategory: "weight",
          subCategory: "weight-muscle",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 49,
          type: "cosmetic",
          title: "아큐어 흉터 클리닉",
          image: getCosmeticAdImage("all", 4),
          subtitle: "화상 흉터 전문",
          rating: 4.8,
          reviewCount: 142,
          description:
            "화상 흉터, 수술 흉터, 사고 흉터 등 다양한 흉터 치료. 최신 레이저 기술 활용.",
          tags: ["흉터치료", "화상흉터", "레이저"],
          price: "상담 무료",
          location: "서울시 서초구",
          distance: "3.6km",
          isEvent: true,
          eventPeriod: "4.1 - 5.31",
          eventContent: "흉터 치료 프로그램 할인",
          originalPrice: "500,000원",
          discountPrice: "400,000원",
          discountRate: "20%",
          mainCategory: "scar",
          subCategory: "scar-burn",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 50,
          type: "cosmetic",
          title: "아이브로우 디자인 살롱",
          image: getCosmeticAdImage("all", 5),
          subtitle: "눈썹 디자인 전문",
          rating: 4.6,
          reviewCount: 158,
          description:
            "눈썹 디자인, 눈썹 정리, 반영구 눈썹으로 얼굴형에 맞는 완벽한 눈썹을 찾아드립니다.",
          tags: ["눈썹", "눈썹정리", "반영구"],
          price: "시술 80,000원~",
          location: "서울시 강남구",
          distance: "2.3km",
          isEvent: false,
          mainCategory: "eyebrow",
          subCategory: "eyebrow-shape",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 51,
          type: "medical",
          title: "기억력 클리닉",
          image: getMedicalAdImage("all", 5),
          subtitle: "기억력/인지 전문",
          rating: 4.6,
          reviewCount: 121,
          description:
            "기억력 저하, 집중력 문제, 인지 기능 약화 등 기억 관련 치료 및 관리 프로그램.",
          tags: ["신경과", "기억력", "인지기능"],
          price: "진료비 25,000원~",
          location: "서울시 서초구",
          distance: "3.8km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "인지 기능 검사 할인",
          originalPrice: "150,000원",
          discountPrice: "100,000원",
          discountRate: "33%",
          mainCategory: "head",
          subCategory: "head-memory",
          // 새로 추가된 정보
          specialty: "neurology",
          facilityType: "clinic",
        },
        {
          id: 52,
          type: "medical",
          title: "호흡기 케어 의원",
          image: getMedicalAdImage("all", 1),
          subtitle: "호흡 곤란 전문",
          rating: 4.7,
          reviewCount: 158,
          description:
            "호흡 곤란, 숨참, 천식 등 호흡기 질환 전문 진료. 정확한 진단과 맞춤 치료.",
          tags: ["호흡기내과", "호흡곤란", "천식"],
          price: "진료비 18,000원~",
          location: "서울시 강남구",
          distance: "2.6km",
          isEvent: false,
          mainCategory: "cold",
          subCategory: "cold-hard-breath",
          // 새로 추가된 정보
          specialty: "pulmonology",
          facilityType: "clinic",
        },
        {
          id: 53,
          type: "medical",
          title: "벨리케어 소화기 클리닉",
          image: getMedicalAdImage("all", 2),
          subtitle: "복부 통증 전문",
          rating: 4.8,
          reviewCount: 173,
          description:
            "급성/만성 복통, 과민성 대장 증후군, 소화불량 등 복부 통증 전문 진료.",
          tags: ["소화기내과", "복통", "장염"],
          price: "진료비 20,000원~",
          location: "서울시 강남구",
          distance: "2.4km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "복부 초음파 검사 할인",
          originalPrice: "120,000원",
          discountPrice: "90,000원",
          discountRate: "25%",
          mainCategory: "stomach",
          subCategory: "stomach-pain",
          // 새로 추가된 정보
          specialty: "gastroenterology",
          facilityType: "clinic",
        },
        {
          id: 54,
          type: "medical",
          title: "클린 피부 클리닉",
          image: getMedicalAdImage("all", 3),
          subtitle: "피부 가려움증 전문",
          rating: 4.6,
          reviewCount: 138,
          description:
            "만성 가려움증, 피부 건조, 아토피, 알레르기성 피부염 등 전문 진료 및 치료.",
          tags: ["피부과", "가려움증", "아토피"],
          price: "진료비 15,000원~",
          location: "서울시 서초구",
          distance: "3.5km",
          isEvent: false,
          mainCategory: "skin",
          subCategory: "skin-itchy",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 55,
          type: "medical",
          title: "관절 모션 클리닉",
          image: getMedicalAdImage("all", 4),
          subtitle: "관절 강직 전문",
          rating: 4.7,
          reviewCount: 156,
          description:
            "관절 뻣뻣함, 움직임 제한, 관절염 등 관절 기능 장애 전문 진료 및 물리치료.",
          tags: ["정형외과", "관절강직", "물리치료"],
          price: "진료비 18,000원~",
          location: "서울시 강남구",
          distance: "2.7km",
          isEvent: true,
          eventPeriod: "4.1 - 4.30",
          eventContent: "관절 기능 회복 프로그램",
          originalPrice: "300,000원",
          discountPrice: "240,000원",
          discountRate: "20%",
          mainCategory: "joint",
          subCategory: "joint-stiffness",
          // 새로 추가된 정보
          specialty: "orthopedics",
          facilityType: "clinic",
        },
        {
          id: 56,
          type: "medical",
          title: "하트 리듬 클리닉",
          image: getMedicalAdImage("all", 5),
          subtitle: "심장 두근거림 전문",
          rating: 4.9,
          reviewCount: 187,
          description:
            "심장 두근거림, 부정맥, 심계항진 등 심장 리듬 관련 전문 진료 및 정밀 검사.",
          tags: ["심장내과", "부정맥", "심장검사"],
          price: "진료비 25,000원~",
          location: "서울시 강남구",
          distance: "2.2km",
          isEvent: false,
          mainCategory: "chest",
          subCategory: "chest-palpitation",
          // 새로 추가된 정보
          specialty: "cardiology",
          facilityType: "clinic",
        },
        {
          id: 57,
          type: "medical",
          title: "슬립 웰 클리닉",
          image: getMedicalAdImage("all", 1),
          subtitle: "수면 무호흡증 전문",
          rating: 4.7,
          reviewCount: 142,
          description:
            "수면 무호흡증, 코골이, 수면 중 호흡 장애 등 수면호흡장애 전문 진료 및 치료.",
          tags: ["수면의학과", "코골이", "수면무호흡"],
          price: "진료비 20,000원~",
          location: "서울시 서초구",
          distance: "3.4km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "수면다원검사 할인",
          originalPrice: "350,000원",
          discountPrice: "280,000원",
          discountRate: "20%",
          mainCategory: "sleep",
          subCategory: "sleep-apnea",
          // 새로 추가된 정보
          specialty: "neurology",
          facilityType: "clinic",
        },
        {
          id: 58,
          type: "medical",
          title: "아이케어 안과 클리닉",
          image: getMedicalAdImage("all", 2),
          subtitle: "안구 건조증 전문",
          rating: 4.8,
          reviewCount: 176,
          description:
            "안구 건조증, 눈물막 검사, 안구 표면 질환 등 눈 건조 관련 전문 진료 및 치료.",
          tags: ["안과", "안구건조증", "눈물검사"],
          price: "진료비 15,000원~",
          location: "서울시 강남구",
          distance: "2.5km",
          isEvent: false,
          mainCategory: "eye",
          subCategory: "eye-dry",
          // 새로 추가된 정보
          specialty: "ophthalmology",
          facilityType: "clinic",
        },
        {
          id: 59,
          type: "medical",
          title: "이어 클리닉 센터",
          image: getMedicalAdImage("all", 3),
          subtitle: "귀 이명 전문",
          rating: 4.7,
          reviewCount: 159,
          description:
            "이명, 귀 울림, 청력 장애 등 귀 관련 전문 진료. 최신 청력 검사 장비 보유.",
          tags: ["이비인후과", "이명", "청력검사"],
          price: "진료비 18,000원~",
          location: "서울시 서초구",
          distance: "3.6km",
          isEvent: true,
          eventPeriod: "4.1 - 5.31",
          eventContent: "이명 치료 프로그램 할인",
          originalPrice: "250,000원",
          discountPrice: "200,000원",
          discountRate: "20%",
          mainCategory: "ear",
          subCategory: "ear-ringing",
          // 새로 추가된 정보
          specialty: "ent",
          facilityType: "clinic",
        },
        {
          id: 60,
          type: "medical",
          title: "마인드 포커스 센터",
          image: getMedicalAdImage("all", 4),
          subtitle: "집중력 장애 전문",
          rating: 4.6,
          reviewCount: 132,
          description:
            "집중력 저하, ADHD, 학습 장애 등 집중력 관련 문제 진단 및 치료. 맞춤형 상담.",
          tags: ["정신건강의학과", "집중력", "ADHD"],
          price: "진료비 25,000원~",
          location: "서울시 강남구",
          distance: "2.4km",
          isEvent: false,
          mainCategory: "mental",
          subCategory: "mental-focus",
          // 새로 추가된 정보
          specialty: "psychiatry",
          facilityType: "clinic",
        },
        // 61-65번 추가 데이터
        {
          id: 61,
          type: "cosmetic",
          title: "아이브로우 디자인 살롱",
          image: getCosmeticAdImage("all", 3),
          subtitle: "눈썹 디자인 전문",
          rating: 4.6,
          reviewCount: 158,
          description:
            "눈썹 디자인, 눈썹 정리, 반영구 눈썹으로 얼굴형에 맞는 완벽한 눈썹을 찾아드립니다.",
          tags: ["눈썹", "눈썹정리", "반영구"],
          price: "시술 80,000원~",
          location: "서울시 강남구",
          distance: "2.3km",
          isEvent: false,
          mainCategory: "eyebrow",
          subCategory: "eyebrow-shape",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 62,
          type: "cosmetic",
          title: "베인 케어 클리닉",
          image: getCosmeticAdImage("all", 1),
          subtitle: "혈관 레이저 전문",
          rating: 4.7,
          reviewCount: 146,
          description:
            "실핏줄, 다리 정맥류, 홍조 등 혈관성 피부 문제 전문 치료. 정확한 타겟팅 레이저.",
          tags: ["혈관레이저", "정맥류", "홍조"],
          price: "시술 150,000원~",
          location: "서울시 서초구",
          distance: "3.4km",
          isEvent: true,
          eventPeriod: "4.15 - 5.15",
          eventContent: "혈관 레이저 패키지 할인",
          originalPrice: "350,000원",
          discountPrice: "280,000원",
          discountRate: "20%",
          mainCategory: "laser",
          subCategory: "laser-vein",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 63,
          type: "cosmetic",
          title: "근육 밸런스 클리닉",
          image: getCosmeticAdImage("all", 2),
          subtitle: "근육 강화 전문",
          rating: 4.8,
          reviewCount: 176,
          description:
            "비수술적 근육 강화, 체형 개선, 식이요법을 통한 건강한 다이어트 프로그램 제공.",
          tags: ["근육강화", "체형교정", "다이어트"],
          price: "프로그램 250,000원~",
          location: "서울시 강남구",
          distance: "2.5km",
          isEvent: false,
          mainCategory: "weight",
          subCategory: "weight-muscle",
          // 새로 추가된 정보
          specialty: "plastic",
          facilityType: "clinic",
        },
        {
          id: 64,
          type: "cosmetic",
          title: "에센셜 스킨케어",
          image: getCosmeticAdImage("all", 4),
          subtitle: "맞춤형 피부 진단 관리",
          rating: 4.6,
          reviewCount: 168,
          description:
            "피부 진단부터 클렌징, 각질 관리, 마사지, 팩까지 개인 피부 상태에 맞는 맞춤형 기본 관리를 제공합니다.",
          tags: ["피부진단", "맞춤관리", "기초케어"],
          price: "시술 90,000원~",
          location: "서울시 송파구",
          distance: "4.5km",
          isEvent: false,
          mainCategory: "skin",
          subCategory: "skin-basic",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
        {
          id: 65,
          type: "cosmetic",
          title: "내추럴 스킨 테라피",
          image: getCosmeticAdImage("all", 5),
          subtitle: "자연주의 피부 관리",
          rating: 4.8,
          reviewCount: 184,
          description:
            "천연 성분으로 만든 제품만을 사용하여 피부에 자극 없이 건강한 광채를 되찾는 기본 피부 관리 프로그램을 제공합니다.",
          tags: ["자연주의", "저자극", "기초관리"],
          price: "시술 95,000원~",
          location: "서울시 마포구",
          distance: "3.7km",
          isEvent: true,
          eventPeriod: "4.20 - 5.20",
          eventContent: "천연 성분 케어 패키지",
          originalPrice: "150,000원",
          discountPrice: "110,000원",
          discountRate: "27%",
          mainCategory: "skin",
          subCategory: "skin-basic",
          // 새로 추가된 정보
          specialty: "dermatology",
          facilityType: "clinic",
        },
      ],
      facilityInfo: {
        gym: {
          name: t("facility.examples.location1"),
          rating: 4.5,
          location: t("facility.examples.address1"),
          facilities: [
            t("facility.amenities.shower"),
            t("facility.amenities.uniform"),
            t("facility.amenities.locker"),
            t("facility.amenities.parking"),
          ],
          plans: [
            {
              duration: "3 " + t("common.units.monthCount"),
              monthlyPrice: 60000,
              totalPrice: 180000,
            },
            {
              duration: "6 " + t("common.units.monthCount"),
              monthlyPrice: 55000,
              totalPrice: 330000,
            },
            {
              duration: "12 " + t("common.units.monthCount"),
              monthlyPrice: 50000,
              totalPrice: 600000,
            },
          ],
        },
        pilates: {
          name: t("facility.examples.name2"),
          rating: 4.8,
          location: t("facility.examples.address1"),
          facilities: [
            t("facility.amenities.shower"),
            t("facility.amenities.uniform"),
            t("facility.amenities.locker"),
            t("facility.amenities.parking"),
          ],
          plans: [
            {
              duration: "3 " + t("common.units.monthCount"),
              monthlyPrice: 150000,
              totalPrice: 450000,
            },
            {
              duration: "6 " + t("common.units.monthCount"),
              monthlyPrice: 140000,
              totalPrice: 840000,
            },
            {
              duration: "12 " + t("common.units.monthCount"),
              monthlyPrice: 130000,
              totalPrice: 1560000,
            },
          ],
        },
        jiujitsu: {
          name: t("facility.examples.name3"),
          rating: 4.7,
          location: t("facility.examples.address1"),
          facilities: [
            t("facility.amenities.shower"),
            t("facility.amenities.uniform"),
            t("facility.amenities.locker"),
            t("facility.amenities.parking"),
          ],
          plans: [
            {
              duration: "3 " + t("common.units.monthCount"),
              monthlyPrice: 120000,
              totalPrice: 360000,
            },
            {
              duration: "6 " + t("common.units.monthCount"),
              monthlyPrice: 110000,
              totalPrice: 660000,
            },
            {
              duration: "12 " + t("common.units.monthCount"),
              monthlyPrice: 100000,
              totalPrice: 1200000,
            },
          ],
        },
      },
      gymReviews: [
        {
          id: 1,
          author: "WorkoutLover",
          date: "2024-02-10",
          rating: 5,
          content: t("review.gym.example_2.content"),
        },
        {
          id: 2,
          author: "Dieter",
          date: "2024-02-09",
          rating: 4,
          content: t("review.gym.example_3.content"),
        },
      ],
      gymData: {
        헬스: Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          name:
            i18n.language == "en"
              ? `${t("facility.examples.name1")} ${t(
                  "facility.branch.number"
                )} ${i + 1}`
              : `${t("facility.examples.name1")} ${i + 1}${t(
                  "facility.branch.number"
                )}`,
          location: t("facility.examples.address1"),
          rating: 4.5,
          price: "80,000",
          type: "gym",
        })),
        필라테스: Array.from({ length: 4 }, (_, i) => ({
          id: i + 1,
          name:
            i18n.language == "en"
              ? `${t("facility.examples.name2")} ${t(
                  "facility.branch.number"
                )} ${i + 1}`
              : `${t("facility.examples.name2")} ${i + 1}${t(
                  "facility.branch.number"
                )}`,
          location: t("facility.examples.address1"),
          rating: 4.8,
          price: "150,000",
          type: "pilates",
        })),
        주짓수: Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          name:
            i18n.language == "en"
              ? `${t("facility.examples.name3")} ${t(
                  "facility.branch.number"
                )} ${i + 1}`
              : `${t("facility.examples.name3")} ${i + 1}${t(
                  "facility.branch.number"
                )}`,
          location: t("facility.examples.address1"),
          rating: 4.7,
          price: "120,000",
          type: "jiujitsu",
        })),
      },
      trainerInfo: {
        gym: {
          name: t("trainer.examples.name1"),
          rating: 4.8,
          specialties:
            t("trainer.specialties.weightLoss") +
            ", " +
            t("trainer.specialties.bodybuilding"),
          experience: 5 + " " + t("common.year"),
          certifications: ["생활스포츠지도사 2급", "NSCA-CPT", "KATA-PTS"],
          plans: [
            {
              sessions: 30 + " " + t("trainer.sessions"),
              pricePerSession: "60,000",
              totalPrice: "1,800,000",
            },
            {
              sessions: 20 + " " + t("trainer.sessions"),
              pricePerSession: "70,000",
              totalPrice: "1,400,000",
            },
            {
              sessions: "10 " + t("trainer.sessions"),
              pricePerSession: "80,000",
              totalPrice: "800,000",
            },
          ],
        },
        pilates: {
          name: t("trainer.examples.name2"),
          rating: 4.9,
          specialties:
            t("trainer.specialties.posture") +
            ", " +
            t("trainer.specialties.rehabilitation"),
          experience: 7 + " " + t("common.year"),
          certifications: [
            "필라테스 지도자 자격증",
            "재활 트레이닝 전문가",
            "매트 필라테스 자격증",
          ],
          plans: [
            {
              sessions: 30 + " " + t("trainer.sessions"),
              pricePerSession: "70,000",
              totalPrice: "2,100,000",
            },
            {
              sessions: 20 + " " + t("trainer.sessions"),
              pricePerSession: "80,000",
              totalPrice: "1,600,000",
            },
            {
              sessions: "10 " + t("trainer.sessions"),
              pricePerSession: "90,000",
              totalPrice: "900,000",
            },
          ],
        },
        jiujitsu: {
          name: t("trainer.examples.name3"),
          rating: 4.7,
          specialties:
            t("trainer.specialties.jiujitsu") +
            ", " +
            t("trainer.specialties.grappling"),
          experience: "6년",
          certifications: [
            "주짓수 블랙벨트",
            "종합격투기 지도자 자격증",
            "퍼스널 트레이닝 자격증",
          ],
          plans: [
            {
              sessions: 30 + " " + t("trainer.sessions"),
              pricePerSession: "65,000",
              totalPrice: "1,950,000",
            },
            {
              sessions: 20 + " " + t("trainer.sessions"),
              pricePerSession: "75,000",
              totalPrice: "1,500,000",
            },
            {
              sessions: "10 " + t("trainer.sessions"),
              pricePerSession: "85,000",
              totalPrice: "850,000",
            },
          ],
        },
      },
      trainerReviews: [
        {
          id: 1,
          author: "PTWanna",
          date: "2024-02-10",
          rating: 5,
          content: t("review.gym.example_4.content"),
        },
        {
          id: 2,
          author: "Dieter",
          date: "2024-02-09",
          rating: 4,
          content: t("review.gym.example_5.content"),
        },
        // Add more reviews as needed
      ],
      trainerData: {
        헬스: Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          name: `${t("trainer.examples.name1")} ${i + 1}`,
          specialties: `${t("trainer.specialties.weightLoss")}, ${t(
            "trainer.specialties.bodybuilding"
          )}`, //"체중감량, 근력강화",
          rating: 4.8,
          price: "100,000",
          type: "gym",
        })),
        필라테스: Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          name: `${t("trainer.examples.name2")} ${i + 1}`,
          specialties: `${t("trainer.specialties.posture")}, ${t(
            "trainer.specialties.rehabilitation"
          )}`,
          rating: 4.9,
          price: "120,000",
          type: "pilates",
        })),
        주짓수: Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          name: `${t("trainer.examples.name3")} ${i + 1}`,
          specialties: `${t("trainer.specialties.jiujitsu")}, ${t(
            "trainer.specialties.grappling"
          )}`,
          rating: 4.7,
          price: "110,000",
          type: "jiujitsu",
        })),
      },
      communityData: {
        coach: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Dieter ${i + 1}`,
          title: `${t("community.gym.example3.title")}  ${i + 1}`,
          content: `${t("community.gym.example3.content")}  ${i + 1}`,
          comment: `${t("community.gym.example3.comment")}  ${i + 1}`,
          rating: 4.8,
          date: "2024-02-06",
          likeCount: 24,
          commentCount: 17,
        })),
        medical: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Dieter ${i + 1}`,
          title: `${t("community.medical.example3.title")}  ${i + 1}`,
          content: `${t("community.medical.example3.content")}  ${i + 1}`,
          comment: `${t("community.medical.example3.comment")}  ${i + 1}`,
          rating: 4.8,
          date: "2024-02-06",
          likeCount: 24,
          commentCount: 17,
        })),
        plastic: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Dieter ${i + 1}`,
          title: `${t("community.plastic.example3.title")}  ${i + 1}`,
          content: `${t("community.plastic.example3.content")}  ${i + 1}`,
          comment: `${t("community.plastic.example3.comment")}  ${i + 1}`,
          rating: 4.8,
          date: "2024-02-06",
          likeCount: 24,
          commentCount: 17,
        })),
      },
    });
  }, [t, i18n.language]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
