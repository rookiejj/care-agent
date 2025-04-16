import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PageHeader, getProfileImage } from "./App";
import { useData } from "./DataContext";
import {
  MessageCircle,
  Heart,
  Eye,
  Share2,
  Send,
  MoreVertical,
  Clock,
  AlertTriangle,
  Copy,
  Smile,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { mainCommunityCategories } from "./communityCategoryData";
import { getSubSpecialtyKoreanName } from "./medicalCategoryData";
import "./CommunityDetailPage.css";

// 자주 사용하는 이모지 리스트
const EMOJI_LIST = [
  "👍",
  "❤️",
  "😂",
  "😍",
  "😊",
  "🙏",
  "👏",
  "🔥",
  "💯",
  "👌",
  "😁",
  "💕",
  "🥰",
  "😘",
  "🤔",
  "😔",
  "😭",
  "😢",
  "😉",
  "🤣",
  "😎",
  "👀",
  "👇",
  "🙄",
  "💪",
  "👋",
  "🤩",
  "😋",
  "💓",
  "🤭",
];

const CommunityDetailPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { communityPosts } = useData();

  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [expandedThreads, setExpandedThreads] = useState({});
  const [heartAnimations, setHeartAnimations] = useState({});
  const [commentsToShow, setCommentsToShow] = useState(5); // 초기에 표시할 댓글 수

  // 현재 댓글 입력 상태 (일반 댓글 or 답글)
  const [inputMode, setInputMode] = useState("comment"); // "comment" 또는 "reply"

  const commentInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const mentionDropdownRef = useRef(null);
  const contentRef = useRef(null); // 스크롤을 위한 컨텐츠 영역 ref
  const commentRefs = useRef({}); // 각 댓글 요소에 대한 ref 객체

  // 댓글 자동 높이 조절을 위한 ref
  const commentTextareaRef = useRef(null);

  useEffect(() => {
    // URL에서 가져온 ID와 일치하는 게시글을 찾거나 location.state에서 게시글 정보를 가져옴
    let currentPost = location.state?.post;

    if (!currentPost && communityPosts.length > 0) {
      currentPost = communityPosts.find(
        (p) => p.id === parseInt(id) || p.id === id
      );
    }

    if (currentPost) {
      setPost(currentPost);
      setLikeCount(currentPost.likeCount || 0);

      // 댓글 데이터 가져오기
      if (currentPost.comments && currentPost.comments.length > 0) {
        const processedComments = processComments(currentPost.comments);
        setComments(processedComments);
        // 처음 5개의 댓글만 표시하도록 설정
        setCommentsToShow(5);
        setVisibleComments(getVisibleComments(processedComments, 5));
      } else {
        // 더미 댓글 데이터 생성 - 더 많은 댓글과 대댓글 생성
        const dummyComments = generateDummyComments(
          currentPost.id,
          currentPost.commentCount || 15 // 더 많은 댓글 생성
        );
        const processedComments = processComments(dummyComments);
        setComments(processedComments);
        // 처음 5개의 댓글만 표시하도록 설정
        setCommentsToShow(5);
        setVisibleComments(getVisibleComments(processedComments, 5));
      }
    }

    // 클릭 이벤트 리스너 추가 (모달 외부 클릭 감지)
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.state, id, communityPosts]);

  // 각 댓글에 ref 할당
  useEffect(() => {
    // 댓글 컴포넌트 마운트 시 ref 객체 초기화
    commentRefs.current = {};
  }, []);

  // 댓글을 부모-자식 관계로 구성
  const processComments = (commentsArray) => {
    const parentComments = [];
    const childComments = {};

    // 먼저 부모 댓글과 자식 댓글을 분리
    commentsArray.forEach((comment) => {
      if (comment.isReply) {
        if (!childComments[comment.parentCommentId]) {
          childComments[comment.parentCommentId] = [];
        }
        childComments[comment.parentCommentId].push(comment);
      } else {
        parentComments.push({
          ...comment,
          replies: [],
        });
      }
    });

    // 부모 댓글에 자식 댓글 연결
    parentComments.forEach((parent) => {
      if (childComments[parent.id]) {
        parent.replies = childComments[parent.id].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
    });

    // 최신순으로 정렬 (부모 댓글만)
    return parentComments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // 표시할 댓글 목록 가져오기 (스레드 확장 상태 반영)
  const getVisibleComments = (processedComments, limit) => {
    // 처음 limit개의 댓글만 표시
    return processedComments.slice(0, limit);
  };

  const loadMoreComments = () => {
    const newLimit = commentsToShow + 5; // 5개씩 더 로드
    setCommentsToShow(newLimit);
    setVisibleComments(getVisibleComments(comments, newLimit));
  };

  // 모달 외부 클릭 감지 처리
  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }

    if (
      mentionDropdownRef.current &&
      !mentionDropdownRef.current.contains(event.target)
    ) {
      setShowMentionDropdown(false);
    }
  };

  // 지정된 수의 더미 댓글을 생성하는 함수
  const generateDummyComments = (postId, count = 5) => {
    const userNames = [
      "사용자1",
      "슈퍼맨임",
      "미용왕",
      "성형고수",
      "피부좋아",
      "건강지킴이",
      "의료인",
      "뷰티퀸",
    ];
    const profileImages = [getProfileImage()];
    const commentTexts = [
      "정말 좋은 정보 감사합니다! 저도 비슷한 경험이 있어요.",
      "어느 병원에서 받으셨어요? 저도 고민 중인데 추천해주실 수 있나요?",
      "효과가 얼마나 지속되나요? 부작용은 없었는지 궁금해요. 🤔",
      "가격대가 어떻게 되나요? 가능하면 알려주세요! 💰",
      "사진 좀 더 올려주실 수 있나요? 비포애프터가 궁금합니다. 👀",
      "선생님이 친절하셨나요? 상담은 어떻게 진행되었어요? ☺️",
      "통증은 어느 정도였나요? 견딜만 했나요? 😱",
      "회복 기간은 얼마나 걸렸어요? 일상생활하는데 불편함은 없었나요? 🤕",
      "저도 다음 주에 예약했어요! 팁 있으면 알려주세요. 🙏",
      "혹시 다른 곳과 비교해보셨나요? 왜 그곳을 선택하셨어요? 🧐",
    ];

    const dummyComments = [];

    // 메인 댓글 생성
    for (let i = 0; i < count; i++) {
      const randomUserIndex = Math.floor(Math.random() * userNames.length);
      const randomCommentIndex = Math.floor(
        Math.random() * commentTexts.length
      );
      const randomDaysAgo = Math.floor(Math.random() * 7) + 1;
      const randomLikes = Math.floor(Math.random() * 15);

      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - randomDaysAgo);

      dummyComments.push({
        id: `comment-${postId}-${i}`,
        author: {
          id: `user-${randomUserIndex}`,
          nickname: userNames[randomUserIndex],
          profileImage: profileImages[0],
          level: Math.floor(Math.random() * 4) + 1,
        },
        content: commentTexts[randomCommentIndex],
        createdAt: createdDate.toISOString(),
        likeCount: randomLikes,
        isLiked: Math.random() > 0.7,
        isReply: false,
      });
    }

    // 답글 생성 (각 댓글마다 0-3개의 답글)
    dummyComments.forEach((comment) => {
      const replyCount = Math.floor(Math.random() * 4); // 0-3개 답글

      for (let i = 0; i < replyCount; i++) {
        const randomUserIndex = Math.floor(Math.random() * userNames.length);
        const hoursLater = Math.floor(Math.random() * 24) + 1;
        const randomLikes = Math.floor(Math.random() * 8);

        // 답글 내용
        let replyContent;

        if (i === 0 && Math.random() > 0.5) {
          // 첫번째 답글은 종종 글쓴이가 작성
          const replyTexts = [
            `@${comment.author.nickname} 네 감사합니다. 더 궁금한 점 있으시면 물어보세요! 😊`,
            `@${comment.author.nickname} 안녕하세요, 제가 방문한 곳은 강남 미소성형외과에요. 의사선생님이 친절하고 시설도 깨끗했어요. ✨`,
            `@${comment.author.nickname} 약 3개월 정도 효과가 지속되었고, 부작용은 특별히 없었어요. 👍`,
            `@${comment.author.nickname} 가격은 시술 종류에 따라 다른데, 제가 받은 건 30만원 정도였어요. 💸`,
            `@${comment.author.nickname} 네, 나중에 추가 사진 올려드릴게요! 📸`,
          ];

          const randomReplyIndex = Math.floor(
            Math.random() * replyTexts.length
          );
          replyContent = replyTexts[randomReplyIndex];

          const replyCreatedDate = new Date(comment.createdAt);
          replyCreatedDate.setHours(replyCreatedDate.getHours() + hoursLater);

          dummyComments.push({
            id: `reply-${comment.id}-${i}`,
            author: {
              id: "post-author",
              nickname: post?.author?.nickname || "글쓴이",
              profileImage: post?.author?.profileImage || profileImages[0],
              level: post?.author?.level || 3,
              isAuthor: true,
            },
            content: replyContent,
            createdAt: replyCreatedDate.toISOString(),
            likeCount: randomLikes,
            isLiked: Math.random() > 0.7,
            isReply: true,
            parentCommentId: comment.id,
          });
        } else {
          // 다른 사용자의 답글
          const replyTexts = [
            `@${comment.author.nickname} 저도 같은 경험이 있어요! 👍`,
            `@${comment.author.nickname} 정말 유용한 정보네요, 감사합니다 🙏`,
            `@${comment.author.nickname} 혹시 가격이 어떻게 되나요? 저도 고민 중이에요 🤔`,
            `@${comment.author.nickname} 병원 이름이 어떻게 되나요? DM 부탁드려요 💌`,
            `@${comment.author.nickname} 추천해주신 제품 저도 구매했어요! 정말 좋네요 ❤️`,
          ];

          const randomReplyIndex = Math.floor(
            Math.random() * replyTexts.length
          );
          replyContent = replyTexts[randomReplyIndex];

          const replyCreatedDate = new Date(comment.createdAt);
          replyCreatedDate.setHours(replyCreatedDate.getHours() + hoursLater);

          dummyComments.push({
            id: `reply-${comment.id}-${i}`,
            author: {
              id: `user-${randomUserIndex}`,
              nickname: userNames[randomUserIndex],
              profileImage: profileImages[0],
              level: Math.floor(Math.random() * 4) + 1,
            },
            content: replyContent,
            createdAt: replyCreatedDate.toISOString(),
            likeCount: randomLikes,
            isLiked: Math.random() > 0.7,
            isReply: true,
            parentCommentId: comment.id,
          });
        }
      }
    });

    return dummyComments;
  };

  // 댓글 텍스트 영역 높이 자동 조절
  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
    }
  };

  useEffect(() => {
    if (commentTextareaRef.current) {
      adjustTextareaHeight(commentTextareaRef.current);
    }
  }, [comment]);

  // 댓글 영역으로 스크롤하는 함수
  const scrollToComment = (commentId) => {
    // 댓글 요소가 존재하는지 확인
    if (commentRefs.current[commentId]) {
      // 해당 댓글 요소의 위치 계산
      const commentElement = commentRefs.current[commentId];
      const commentRect = commentElement.getBoundingClientRect();

      // 현재 스크롤 위치 가져오기
      const contentElement = contentRef.current;

      if (contentElement) {
        // 댓글의 위치로 스크롤 (입력창 높이를 고려하여 일정 여백 추가)
        const commentInputHeight = 65; // 댓글 입력창의 높이 (대략적인 값)
        const scrollPosition =
          contentElement.scrollTop +
          commentRect.top -
          window.innerHeight +
          commentRect.height +
          commentInputHeight +
          30; // 추가 여백

        // 부드러운 스크롤 애니메이션
        contentElement.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // 댓글 입력모드 설정 및 스크롤 처리
  const setReplyMode = (comment) => {
    // 이미 선택된 댓글이면 취소
    if (replyingTo && replyingTo.id === comment.id) {
      setReplyingTo(null);
      setInputMode("comment");
      setComment("");
    } else {
      // 새로운 댓글에 답글 남기기
      setReplyingTo(comment);
      setInputMode("reply");

      // 댓글 초기화 (멘션 추가)
      const mentionText = `@${comment.author.nickname} `;
      setComment(mentionText);

      // 해당 댓글로 스크롤
      setTimeout(() => {
        scrollToComment(comment.id);

        // 댓글 입력창에 포커스 + 커서 위치 맨 뒤로 설정
        if (commentTextareaRef.current) {
          commentTextareaRef.current.focus();

          // 커서를 맨 뒤로 이동
          const length = mentionText.length;
          commentTextareaRef.current.setSelectionRange(length, length);
        }
      }, 100);
    }
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);

    // @ 감지하여 멘션 드롭다운 표시
    const lastAtIndex = value.lastIndexOf("@");
    if (
      lastAtIndex !== -1 &&
      (lastAtIndex === 0 || value[lastAtIndex - 1] === " ")
    ) {
      const query = value.substring(lastAtIndex + 1).split(" ")[0];
      if (query) {
        setMentionQuery(query);
        const suggestions = getSuggestedUsers(query);
        setMentionSuggestions(suggestions);
        setShowMentionDropdown(suggestions.length > 0);
      } else {
        setShowMentionDropdown(false);
      }
    } else {
      setShowMentionDropdown(false);
    }
  };

  // 멘션 추천 사용자 검색
  const getSuggestedUsers = (query) => {
    const allUsers = [];
    const seenUserIds = new Set(); // 이미 추가된 사용자 ID 추적
    const seenNicknames = new Set(); // 이미 추가된 닉네임 추적

    // 게시글 작성자 추가
    if (post?.author?.nickname) {
      allUsers.push({
        id: post.author.id,
        nickname: post.author.nickname,
        profileImage: post.author.profileImage || getProfileImage(),
        isAuthor: true,
      });
      seenUserIds.add(post.author.id);
      seenNicknames.add(post.author.nickname.toLowerCase()); // 대소문자 구분 없이 비교하기 위해 소문자로 변환
    }

    // 댓글 작성자들 추가
    comments.forEach((comment) => {
      if (
        !seenUserIds.has(comment.author.id) &&
        !seenNicknames.has(comment.author.nickname.toLowerCase())
      ) {
        allUsers.push({
          id: comment.author.id,
          nickname: comment.author.nickname,
          profileImage: comment.author.profileImage || getProfileImage(),
          isAuthor: comment.author.isAuthor,
        });
        seenUserIds.add(comment.author.id);
        seenNicknames.add(comment.author.nickname.toLowerCase());
      }

      // 답글 작성자들도 추가
      if (comment.replies) {
        comment.replies.forEach((reply) => {
          if (
            !seenUserIds.has(reply.author.id) &&
            !seenNicknames.has(reply.author.nickname.toLowerCase())
          ) {
            allUsers.push({
              id: reply.author.id,
              nickname: reply.author.nickname,
              profileImage: reply.author.profileImage || getProfileImage(),
              isAuthor: reply.author.isAuthor,
            });
            seenUserIds.add(reply.author.id);
            seenNicknames.add(reply.author.nickname.toLowerCase());
          }
        });
      }
    });

    // 필터링
    const filteredUsers = allUsers.filter((user) =>
      user.nickname.toLowerCase().includes(query.toLowerCase())
    );

    // 최대 5명만 반환
    return filteredUsers.slice(0, 5);
  };

  // 멘션 선택 처리
  const handleMentionSelect = (user) => {
    const inputValue = comment;
    const lastAtIndex = inputValue.lastIndexOf("@");

    if (lastAtIndex !== -1) {
      // 멘션 전과 후 텍스트 분리
      const beforeAt = inputValue.substring(0, lastAtIndex);
      const afterAt = inputValue.substring(lastAtIndex).split(" ");

      // @ 기호 다음부터 첫 번째 공백까지를 새 멘션으로 교체
      const newMention = `@${user.nickname} `;
      afterAt[0] = newMention;

      // 전체 문자열 다시 조합
      const newValue = beforeAt + afterAt.join(" ");
      setComment(newValue);

      // 드롭다운 닫기
      setShowMentionDropdown(false);

      // 포커스 돌려주고 커서 위치 조정
      setTimeout(() => {
        if (commentTextareaRef.current) {
          commentTextareaRef.current.focus();

          // 커서 위치 계산 - 새로 추가된 멘션 바로 뒤로 이동
          const cursorPosition = beforeAt.length + newMention.length;
          commentTextareaRef.current.setSelectionRange(
            cursorPosition,
            cursorPosition
          );
        }
      }, 0);
    }
  };

  // 이모지 선택 처리
  const handleEmojiSelect = (emoji) => {
    setComment((prev) => prev + emoji);
    setTimeout(() => commentTextareaRef.current?.focus(), 0);
    setShowEmojiPicker(false);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      if (inputMode === "comment") {
        // 일반 댓글 추가
        const newComment = {
          id: `comment-${Date.now()}`,
          author: {
            id: "current-user",
            nickname: "나",
            profileImage: getProfileImage(),
            level: 1,
          },
          content: comment,
          createdAt: new Date().toISOString(),
          likeCount: 0,
          isLiked: false,
          isReply: false,
          replies: [],
        };

        // 댓글 목록 업데이트
        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);

        // 새 댓글을 항상 표시하도록 표시 개수 증가
        const newCommentsToShow = commentsToShow + 1;
        setCommentsToShow(newCommentsToShow);
        setVisibleComments(
          getVisibleComments(updatedComments, newCommentsToShow)
        );
      } else if (inputMode === "reply" && replyingTo) {
        // 답글 추가
        // 항상 원래 부모 댓글 ID를 찾음 (대댓글에 답글 달더라도)
        const parentCommentId = replyingTo.isReply
          ? replyingTo.parentCommentId
          : replyingTo.id;

        const newReply = {
          id: `reply-${Date.now()}`,
          author: {
            id: "current-user",
            nickname: "나",
            profileImage: getProfileImage(),
            level: 1,
          },
          content: comment,
          createdAt: new Date().toISOString(),
          likeCount: 0,
          isLiked: false,
          isReply: true,
          parentCommentId: parentCommentId,
        };

        // 댓글 목록 업데이트 - 항상 원래 부모 댓글에 답글 추가
        const updatedComments = comments.map((comment) => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        });

        setComments(updatedComments);

        // 해당 스레드 자동 확장
        setExpandedThreads((prev) => ({ ...prev, [parentCommentId]: true }));

        setVisibleComments(getVisibleComments(updatedComments, commentsToShow));

        // 답글 모드 종료
        setReplyingTo(null);
        setInputMode("comment");
      }

      // 공통 처리
      setComment("");

      // 텍스트 영역 높이 리셋
      if (commentTextareaRef.current) {
        commentTextareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // 답글 모드 취소
  const cancelReplyMode = () => {
    setReplyingTo(null);
    setInputMode("comment");
    setComment("");

    // 텍스트 영역 높이 리셋
    if (commentTextareaRef.current) {
      commentTextareaRef.current.style.height = "auto";
    }
  };

  // 댓글 좋아요 토글
  const handleCommentLikeToggle = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        // 좋아요 애니메이션 트리거
        setHeartAnimations((prev) => ({ ...prev, [commentId]: true }));
        setTimeout(() => {
          setHeartAnimations((prev) => ({ ...prev, [commentId]: false }));
        }, 500);

        return {
          ...comment,
          isLiked: !comment.isLiked,
          likeCount: comment.isLiked
            ? comment.likeCount - 1
            : comment.likeCount + 1,
        };
      } else if (comment.replies) {
        // 답글에서 찾기
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === commentId) {
            // 좋아요 애니메이션 트리거
            setHeartAnimations((prev) => ({ ...prev, [commentId]: true }));
            setTimeout(() => {
              setHeartAnimations((prev) => ({ ...prev, [commentId]: false }));
            }, 500);

            return {
              ...reply,
              isLiked: !reply.isLiked,
              likeCount: reply.isLiked
                ? reply.likeCount - 1
                : reply.likeCount + 1,
            };
          }
          return reply;
        });

        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });

    setComments(updatedComments);
    setVisibleComments(getVisibleComments(updatedComments, commentsToShow));
  };

  // 답글 스레드 토글
  const toggleReplyThread = (commentId) => {
    // 현재 상태를 반전시킴
    setExpandedThreads((prev) => {
      const newState = { ...prev };
      newState[commentId] = !prev[commentId];
      return newState;
    });
  };

  const handleShare = () => {
    // 공유 기능 구현
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);

      // 툴팁 표시
      setShowShareTooltip(true);
      setTimeout(() => {
        setShowShareTooltip(false);
      }, 2000);
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  const formatTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();

    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return `${postDate.getMonth() + 1}월 ${postDate.getDate()}일`;
    }
  };

  // 카테고리 레이블 가져오기
  const getCategoryLabel = (categoryId) => {
    const category = mainCommunityCategories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.label : categoryId;
  };

  // 숫자 포맷팅 유틸리티 함수
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return Number(num).toLocaleString();
  };

  // 이미지 모달 열기
  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setShowImagesModal(true);
  };

  // 게시글 신고하기
  const handleReport = () => {
    setShowActionsMenu(false);
    alert("게시글이 신고되었습니다.");
  };

  // 댓글 메시지에서 멘션을 하이라이트 처리
  const renderCommentWithMentions = (content) => {
    if (!content) return "";

    // @사용자명 패턴 찾기
    const parts = content.split(/(@[가-힣a-zA-Z0-9_]+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        // 멘션만 파란색으로
        return (
          <span key={index} className="mention">
            {part}
          </span>
        );
      }
      // 나머지 텍스트는 일반 스타일로
      return <span key={index}>{part}</span>;
    });
  };

  if (!post) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            currentLocation={currentLocation}
            backButtonVisible={true}
            onBack={() => navigate(-1)}
          />
        </div>
        <div className="detail-page-content">
          <div className="no-detail-info">
            <p>게시글을 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={() => navigate(-1)}
          rightComponent={
            <button
              className="community-more-button"
              onClick={() => setShowActionsMenu(!showActionsMenu)}
            >
              <MoreVertical size={20} color="#666" />
            </button>
          }
        />

        {/* 액션 메뉴 (신고하기 등) */}
        {showActionsMenu && (
          <div className="community-actions-menu">
            <button className="community-action-item" onClick={handleReport}>
              <AlertTriangle size={16} />
              <span>게시글 신고</span>
            </button>
          </div>
        )}
      </div>

      <div className="community-detail-content" ref={contentRef}>
        {/* 게시글 헤더 */}
        <div className="community-detail-header">
          <div className="community-detail-tag-container">
            <span
              className={`community-detail-tag category ${
                post.type || "medical"
              }`}
            >
              #{getCategoryLabel(post.category)}
            </span>

            {post.hospitalInfo && (
              <span
                className={`community-detail-tag hospital ${
                  post.type || "medical"
                }`}
              >
                #{post.hospitalInfo.name}
              </span>
            )}

            {post.tags &&
              post.tags.length > 0 &&
              post.tags.map((tag, index) => (
                <span key={index} className="community-detail-tag tag">
                  #{getSubSpecialtyKoreanName(tag)}
                </span>
              ))}
          </div>
          <div className="community-detail-meta">
            <h1 className="community-detail-title">{post.title}</h1>

            <div className="community-detail-info">
              <div className="community-detail-author">
                <div className="community-detail-avatar">
                  {post.author?.profileImage ? (
                    <img
                      src={post.author.profileImage}
                      alt={post.author.nickname}
                    />
                  ) : (
                    <img
                      src={getProfileImage()}
                      alt={post.author?.nickname || "익명"}
                    />
                  )}
                </div>
                <div className="community-detail-author-info">
                  <span className="community-detail-author-name">
                    {post.author?.nickname || "익명"}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    {post.author?.level && (
                      <span className="community-detail-author-level">
                        Lv.{post.author.level}
                      </span>
                    )}
                    {post.author?.badges && post.author.badges.length > 0 && (
                      <span className="community-detail-author-badge">
                        {post.author.badges[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="community-detail-date">
                <Clock size={14} />
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="community-detail-body">
          <div
            className="community-detail-text"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br/>"),
            }}
          ></div>

          {/* 이미지 갤러리 */}
          {post.images && post.images.length > 0 && (
            <div className="community-detail-images">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="community-detail-image"
                  onClick={() => openImageModal(index)}
                >
                  <img src={image} alt={`${post.title} 이미지 ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* 이미지 모달 */}
          {showImagesModal && (
            <div
              className="community-image-modal"
              onClick={() => setShowImagesModal(false)}
            >
              <div className="community-image-modal-content">
                <button className="community-image-modal-close">×</button>
                <img
                  src={post.images[currentImageIndex]}
                  alt={`${post.title} 이미지 확대`}
                />
                <div className="community-image-modal-counter">
                  {currentImageIndex + 1} / {post.images.length}
                </div>
              </div>
            </div>
          )}

          {/* 게시글 통계 및 액션 */}
          <div className="community-detail-stats">
            <div className="community-detail-stats-left">
              <div className="community-detail-stat">
                <Eye size={16} />
                <span>{formatNumber(post.viewCount || 0)}</span>
              </div>
              <div className="community-detail-stat">
                <MessageCircle size={16} />
                <span>{formatNumber(comments.length)}</span>
              </div>
            </div>

            <div className="community-detail-actions">
              <button
                className={`community-detail-action ${isLiked ? "active" : ""}`}
                onClick={handleLikeToggle}
              >
                <Heart
                  size={20}
                  fill={isLiked ? "#ff4757" : "none"}
                  color={isLiked ? "#ff4757" : "#666"}
                />
                <span>{formatNumber(likeCount)}</span>
              </button>

              <div className="community-detail-share-wrapper">
                <button
                  className="community-detail-action"
                  onClick={handleShare}
                >
                  <Share2 size={20} color="#666" />
                </button>
                {showShareTooltip && (
                  <div className="community-detail-share-tooltip">
                    <Copy size={14} />
                    <span>링크가 복사되었습니다</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="community-detail-comments">
          <div className="community-detail-comments-header">
            <h3>댓글 {formatNumber(comments.length)}개</h3>
          </div>

          {/* 댓글 목록 (인스타그램 스타일) */}
          <div className="community-detail-comments-list">
            {visibleComments.map((comment) => (
              <React.Fragment key={comment.id}>
                <div
                  className="community-comment-item"
                  ref={(el) => (commentRefs.current[comment.id] = el)}
                >
                  <div className="community-comment-avatar">
                    <img
                      src={comment.author.profileImage || getProfileImage()}
                      alt={comment.author.nickname}
                    />
                  </div>

                  <div className="community-comment-content">
                    <div className="community-comment-text-wrapper">
                      <div className="community-comment-text">
                        <strong>{comment.author.nickname}</strong>{" "}
                        {renderCommentWithMentions(comment.content)}
                      </div>

                      <button
                        className={`community-comment-like-button ${
                          heartAnimations[comment.id] ? "heart-animation" : ""
                        }`}
                        onClick={() => handleCommentLikeToggle(comment.id)}
                      >
                        <Heart
                          size={16}
                          fill={comment.isLiked ? "#ff4757" : "none"}
                          color={comment.isLiked ? "#ff4757" : "#8e8e8e"}
                        />
                      </button>
                    </div>

                    <div className="community-comment-footer">
                      <span className="community-comment-time">
                        {formatTimeAgo(comment.createdAt)}
                      </span>

                      {comment.likeCount > 0 && (
                        <span className="community-comment-like-count">
                          좋아요 {comment.likeCount}개
                        </span>
                      )}

                      <button
                        className="community-comment-reply-button"
                        onClick={() => setReplyMode(comment)}
                      >
                        답글 달기
                      </button>
                    </div>
                  </div>
                </div>

                {/* 답글 표시 및 토글 */}
                {comment.replies && comment.replies.length > 0 && (
                  <>
                    {/* 답글이 2개 이상이고 확장되지 않은 경우에만 "답글 더보기" 버튼 표시 */}
                    {!expandedThreads[comment.id] &&
                      comment.replies.length > 1 && (
                        <div
                          className="reply-thread-indicator"
                          onClick={() => toggleReplyThread(comment.id)}
                        >
                          <div className="reply-thread-line"></div>
                          <span>답글 {comment.replies.length}개 보기</span>
                        </div>
                      )}

                    {/* 답글 목록 - 확장된 경우 모두 표시, 아니면 1개만 표시 */}
                    {(expandedThreads[comment.id]
                      ? comment.replies
                      : comment.replies.length > 0
                      ? [comment.replies[0]]
                      : []
                    ).map((reply) => (
                      <div
                        key={reply.id}
                        className="community-comment-item comment-reply"
                        ref={(el) => (commentRefs.current[reply.id] = el)}
                      >
                        <div className="community-comment-avatar">
                          <img
                            src={reply.author.profileImage || getProfileImage()}
                            alt={reply.author.nickname}
                          />
                        </div>

                        <div className="community-comment-content">
                          <div className="community-comment-text-wrapper">
                            <div className="community-comment-text">
                              <strong>{reply.author.nickname}</strong>{" "}
                              {renderCommentWithMentions(reply.content)}
                            </div>

                            <button
                              className={`community-comment-like-button ${
                                heartAnimations[reply.id]
                                  ? "heart-animation"
                                  : ""
                              }`}
                              onClick={() => handleCommentLikeToggle(reply.id)}
                            >
                              <Heart
                                size={16}
                                fill={reply.isLiked ? "#ff4757" : "none"}
                                color={reply.isLiked ? "#ff4757" : "#8e8e8e"}
                              />
                            </button>
                          </div>

                          <div className="community-comment-footer">
                            <span className="community-comment-time">
                              {formatTimeAgo(reply.createdAt)}
                            </span>

                            {reply.likeCount > 0 && (
                              <span className="community-comment-like-count">
                                좋아요 {reply.likeCount}개
                              </span>
                            )}

                            <button
                              className="community-comment-reply-button"
                              onClick={() => setReplyMode(reply)}
                            >
                              답글 달기
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* 스레드 축소 버튼 - 확장된 상태일 때만 표시 */}
                    {expandedThreads[comment.id] &&
                      comment.replies.length > 1 && (
                        <div
                          className="view-more-replies"
                          onClick={() => toggleReplyThread(comment.id)}
                        >
                          <span>답글 숨기기</span>
                        </div>
                      )}
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

          {visibleComments.length < comments.length && (
            <div className="view-more-comments" onClick={loadMoreComments}>
              댓글 더보기 ({comments.length - visibleComments.length}개)
            </div>
          )}
        </div>
      </div>

      {/* 인스타그램 스타일 댓글 입력창 (하단 고정) */}
      <div className="comment-container">
        {/* 답글 모드일 때 표시되는 부분 */}
        {inputMode === "reply" && replyingTo && (
          <div className="reply-indicator">
            <span className="reply-to-text">
              {replyingTo.author.nickname}에게 답글 남기는 중
            </span>
            <button className="cancel-reply-button" onClick={cancelReplyMode}>
              <X size={16} />
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="comment-input-wrapper">
            <textarea
              ref={commentTextareaRef}
              className="comment-input"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
              placeholder={
                inputMode === "reply" ? "답글 입력..." : "댓글을 입력하세요"
              }
              rows={1}
            />

            {/* 멘션 드롭다운 */}
            {showMentionDropdown && (
              <div className="mention-dropdown" ref={mentionDropdownRef}>
                {mentionSuggestions.map((user) => (
                  <div
                    key={user.id}
                    className="mention-item"
                    onClick={() => handleMentionSelect(user)}
                  >
                    <img
                      className="mention-avatar"
                      src={user.profileImage || getProfileImage()}
                      alt={user.nickname}
                    />
                    <span className="mention-name">{user.nickname}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="comment-actions">
            <button
              className="emoji-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={20} />
            </button>

            {/* 이모지 선택기 */}
            {showEmojiPicker && (
              <div className="emoji-picker-container" ref={emojiPickerRef}>
                <div className="emoji-list">
                  {EMOJI_LIST.map((emoji, index) => (
                    <div
                      key={index}
                      className="emoji-item"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className={`comment-submit-button ${
                comment.trim() ? "active" : ""
              }`}
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
            >
              게시
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
