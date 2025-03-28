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
  });

  useEffect(() => {
    setData({
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
