/**
 * 진료과목(specialty)과 증상 카테고리(category) 간의 매핑 정보
 */
export const categoryToSpecialtyMapping = {
  head: ["neurology", "pain", "psychiatry", "internal", "family"],
  cold: ["pulmonology", "ent", "internal", "family", "allergy"],
  stomach: ["gastroenterology", "internal", "surgery", "family"],
  skin: ["dermatology", "allergy", "family"],
  joint: ["orthopedics", "rehabilitation", "pain", "family"],
  chest: ["cardiology", "pulmonology", "internal", "family"],
  sleep: ["neurology", "psychiatry", "pulmonology", "family"],
  eye: ["ophthalmology", "family"],
  ear: ["ent", "family"],
  mental: ["psychiatry", "neurology", "family"],
  allergy: ["allergy", "dermatology", "pulmonology", "ent", "family"],
  fever: ["internal", "allergy", "pulmonology", "gastroenterology", "family"],
};

/**
 * 진료과목 한글명 매핑
 */
export const specialtyKoreanNames = {
  neurology: "신경과",
  cardiology: "심장내과",
  dermatology: "피부과",
  orthopedics: "정형외과",
  gastroenterology: "소화기내과",
  ophthalmology: "안과",
  ent: "이비인후과",
  psychiatry: "정신건강의학과",
  pulmonology: "호흡기내과",
  internal: "내과",
  family: "가정의학과",
  pain: "통증의학과",
  allergy: "알레르기내과",
  surgery: "외과",
  pediatrics: "소아과",
  obgyn: "산부인과",
  urology: "비뇨기과",
  rehabilitation: "재활의학과",
  dentistry: "치과",
  oriental: "한의원",
  endocrinology: "내분비내과",
  plastic: "성형외과",
};

/**
 * 진료과목에 따른 태그 스타일 클래스 결정
 */
export const getSpecialtyTagClass = (specialty) => {
  const specialtyClasses = {
    neurology: "neurology",
    cardiology: "cardiology",
    dermatology: "dermatology",
    orthopedics: "orthopedics",
    gastroenterology: "gastroenterology",
    ophthalmology: "ophthalmology",
    ent: "ent",
    psychiatry: "psychiatry",
    pulmonology: "pulmonology",
  };

  return specialtyClasses[specialty] || "default";
};

/**
 * doctorsData가 다양한 형태로 제공될 수 있을 때 적절히 필터링하는 함수
 *
 * @param {Object|Array} doctorsData - 의사 데이터 (객체 또는 배열)
 * @param {Object} filters - 필터 조건
 * @param {string} filters.specialty - 진료과목 (예: "neurology")
 * @param {string} filters.mainCategory - 메인 카테고리 (예: "head")
 * @param {string} filters.subCategory - 서브 카테고리 (예: "head-pain")
 * @returns {Array} - 필터링된 의사 목록
 */
export const filterDoctors = (
  doctorsData,
  { specialty, mainCategory, subCategory }
) => {
  let results = [];

  // 데이터가 없는 경우
  if (!doctorsData) {
    console.warn("doctorsData is undefined");
    return [];
  }

  // 1. specialty로 직접 필터링 (전문 과목 기준)
  if (specialty) {
    // A. doctorsData가 배열인 경우
    if (Array.isArray(doctorsData)) {
      results = doctorsData.filter((doctor) => doctor.specialty === specialty);
    }
    // B. doctorsData가 객체인 경우 (전문 과목별로 의사 목록이 그룹화된 경우)
    else if (typeof doctorsData === "object") {
      // 1. specialty가 직접 키로 존재하는 경우 (예: doctorsData.neurology)
      if (doctorsData[specialty] && Array.isArray(doctorsData[specialty])) {
        results = doctorsData[specialty];
      }
      // 2. specialty가 한글 키일 수 있는 경우 (예: doctorsData.신경과)
      else {
        const koreanName = Object.entries(specialtyKoreanNames).find(
          ([engName, korName]) => engName === specialty
        )?.[1];

        if (
          koreanName &&
          doctorsData[koreanName] &&
          Array.isArray(doctorsData[koreanName])
        ) {
          results = doctorsData[koreanName];
        }
        // 3. 다른 구조일 경우 모든 의사 데이터에서 필터링 시도
        else {
          const allDoctors = Object.values(doctorsData)
            .flat()
            .filter((item) => item);
          results = allDoctors.filter(
            (doctor) => doctor.specialty === specialty
          );
        }
      }
    }
  }
  // 2. 메인 카테고리와 서브 카테고리로 필터링 (증상 기준)
  else if (mainCategory) {
    // 메인 카테고리에 대응하는 진료과목 가져오기
    const relevantSpecialties = categoryToSpecialtyMapping[mainCategory] || [];

    // A. doctorsData가 배열인 경우
    if (Array.isArray(doctorsData)) {
      // 관련 전문 과목을 가진 의사만 필터링
      results = doctorsData.filter((doctor) =>
        relevantSpecialties.includes(doctor.specialty)
      );

      // 서브 카테고리가 있으면 추가 필터링
      if (subCategory && results.length > 0) {
        results = results.filter(
          (doctor) =>
            doctor.subSpecialty && doctor.subSpecialty.includes(subCategory)
        );
      }
    }
    // B. doctorsData가 객체인 경우 (전문 과목별로 의사 목록이 그룹화된 경우)
    else if (typeof doctorsData === "object") {
      // 관련된 모든 전문 과목의 의사 목록 합치기
      relevantSpecialties.forEach((spec) => {
        // 1. 영문 키로 시도
        if (doctorsData[spec] && Array.isArray(doctorsData[spec])) {
          let doctorsInSpecialty = doctorsData[spec];

          // 서브 카테고리가 있으면 필터링
          if (subCategory) {
            doctorsInSpecialty = doctorsInSpecialty.filter(
              (doctor) =>
                doctor.subSpecialty && doctor.subSpecialty.includes(subCategory)
            );
          }

          results = [...results, ...doctorsInSpecialty];
        }
        // 2. 한글 키로 시도
        else {
          const koreanName = specialtyKoreanNames[spec];
          if (
            koreanName &&
            doctorsData[koreanName] &&
            Array.isArray(doctorsData[koreanName])
          ) {
            let doctorsInSpecialty = doctorsData[koreanName];

            // 서브 카테고리가 있으면 필터링
            if (subCategory) {
              doctorsInSpecialty = doctorsInSpecialty.filter(
                (doctor) =>
                  doctor.subSpecialty &&
                  doctor.subSpecialty.includes(subCategory)
              );
            }

            results = [...results, ...doctorsInSpecialty];
          }
        }
      });

      // 3. 결과가 없거나 doctorsData 구조가 예상과 다른 경우
      if (results.length === 0) {
        try {
          // 모든 의사 데이터 추출 시도
          const allDoctors = Object.values(doctorsData)
            .filter(Array.isArray)
            .flat()
            .filter((doctor) => doctor && typeof doctor === "object");

          // 추출된 데이터로 필터링 시도
          if (allDoctors.length > 0) {
            results = allDoctors.filter((doctor) =>
              relevantSpecialties.includes(doctor.specialty)
            );

            if (subCategory && results.length > 0) {
              results = results.filter(
                (doctor) =>
                  doctor.subSpecialty &&
                  doctor.subSpecialty.includes(subCategory)
              );
            }
          }
        } catch (e) {
          console.error("Error extracting all doctors:", e);
        }
      }
    }
  }
  // 3. 아무 필터도 없으면 모든 의사 표시
  else {
    if (Array.isArray(doctorsData)) {
      results = doctorsData;
    } else if (typeof doctorsData === "object") {
      try {
        // Object.values + flat 방식으로 모든 의사 데이터 추출
        results = Object.values(doctorsData)
          .filter(Array.isArray)
          .flat()
          .filter((item) => item && typeof item === "object");
      } catch (e) {
        console.error("Error extracting all doctors:", e);
        results = [];
      }
    }
  }

  return results;
};
