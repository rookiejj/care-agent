// 커뮤니티 카테고리 데이터

/**
 * 메인 커뮤니티 카테고리
 * 사용자가 글을 작성할 때 선택하는 주요 카테고리
 */
export const mainCommunityCategories = [
  {
    id: "general",
    label: "자유/잡담",
    description: "일상 대화와 자유로운 소통을 위한 공간입니다.",
    icon: "chat",
  },
  {
    id: "review",
    label: "후기/경험담",
    description: "시술, 병원, 의사에 대한 후기와 비포&애프터 공유 공간입니다.",
    icon: "star",
  },
  {
    id: "question",
    label: "질문/정보",
    description: "질문, 상담 요청 및 유용한 정보/팁 공유를 위한 공간입니다.",
    icon: "help-circle",
  },
  {
    id: "recommend",
    label: "추천/이벤트",
    description: "병원, 의사, 시술 추천 및 이벤트/프로모션 정보 공간입니다.",
    icon: "thumbs-up",
  },
  {
    id: "support",
    label: "응원/지지",
    description:
      "시술 중이거나 회복 중인 사람들을 위한 응원과 지지의 공간입니다.",
    icon: "heart",
  },
];

/**
 * 서브 커뮤니티 카테고리 (태그)
 * 글 작성시 추가적으로 선택할 수 있는 태그
 */
export const communityTags = {
  // 시술/진료 관련 태그 (기존 카테고리 활용)
  procedure: [
    { id: "tag-skin", label: "피부/미용" },
    { id: "tag-face", label: "얼굴 성형" },
    { id: "tag-body", label: "바디/다이어트" },
    { id: "tag-hair", label: "모발/탈모" },
    { id: "tag-dental", label: "치아 교정/미용" },
    { id: "tag-medical", label: "일반 의료" },
  ],

  // 진료과 관련 태그
  department: [
    { id: "tag-derm", label: "피부/성형" },
    { id: "tag-dental-clinic", label: "치과" },
    { id: "tag-oriental", label: "한의원" },
    { id: "tag-general", label: "일반의과" },
  ],

  // 경험 단계 태그
  stage: [
    { id: "tag-planning", label: "계획/상담 중" },
    { id: "tag-proceeding", label: "시술/치료 중" },
    { id: "tag-completed", label: "완료/회복 중" },
  ],

  // 지역 태그 (주요 지역으로 통합)
  region: [
    { id: "tag-seoul", label: "서울" },
    { id: "tag-gyeonggi", label: "경기/인천" },
    { id: "tag-metro", label: "광역시" },
    { id: "tag-other-region", label: "기타 지역" },
  ],
};

/**
 * 커뮤니티 글 정렬 옵션
 */
export const communitySortOptions = [
  { id: "latest", label: "최신순" },
  { id: "popular", label: "인기순" },
  { id: "comments", label: "댓글 많은순" },
];

/**
 * 커뮤니티 사용자 레벨
 */
export const communityUserLevels = [
  { level: 1, name: "새싹", minPoints: 0 },
  { level: 2, name: "일반", minPoints: 100 },
  { level: 3, name: "우수", minPoints: 500 },
  { level: 4, name: "전문가", minPoints: 2000 },
];

export default {
  mainCommunityCategories,
  communityTags,
  communitySortOptions,
  communityUserLevels,
};
