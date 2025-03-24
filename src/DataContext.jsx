import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({
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
