/**
 * 전국 시/도별, 시/군/구별 동/읍/면 정보를 담은 통합 세부지역 데이터
 */

import { seoulSubRegions } from "./subregions-seoul";
import { busanSubRegions } from "./subregions-busan";
import { daeguSubRegions } from "./subregions-daegu";
import { incheonSubRegions } from "./subregions-incheon";
import { gwangjuSubRegions } from "./subregions-gwangju";
import { daejeonSubRegions } from "./subregions-daejeon";
import { ulsanSubRegions } from "./subregions-ulsan";
import { sejongSubRegions } from "./subregions-sejong";
import { gyeonggiSubRegions } from "./subregions-gyeonggi";
import { gangwonSubRegions } from "./subregions-gangwon";
import { chungbukSubRegions } from "./subregions-chungbuk";
import { chungnamSubRegions } from "./subregions-chungnam";
import { jeonbukSubRegions } from "./subregions-jeonbuk";
import { jeonnamSubRegions } from "./subregions-jeonnam";
import { gyeongbukSubRegions } from "./subregions-gyeongbuk";
import { gyeongnamSubRegions } from "./subregions-gyeongnam";
import { jejuSubRegions } from "./subregions-jeju";

/**
 * 각 지역별 세부 데이터를 통합하여 전체 subRegions 객체 생성
 */
export const subRegions = {
  // 서울특별시
  ...seoulSubRegions,

  // 부산광역시
  ...busanSubRegions,

  // 대구광역시
  ...daeguSubRegions,

  // 인천광역시
  ...incheonSubRegions,

  // 광주광역시
  ...gwangjuSubRegions,

  // 대전광역시
  ...daejeonSubRegions,

  // 울산광역시
  ...ulsanSubRegions,

  // 세종특별자치시
  ...sejongSubRegions,

  // 경기도
  ...gyeonggiSubRegions,

  // 강원도
  ...gangwonSubRegions,

  // 충청북도
  ...chungbukSubRegions,

  // 충청남도
  ...chungnamSubRegions,

  // 전라북도
  ...jeonbukSubRegions,

  // 전라남도
  ...jeonnamSubRegions,

  // 경상북도
  ...gyeongbukSubRegions,

  // 경상남도
  ...gyeongnamSubRegions,

  // 제주도
  ...jejuSubRegions,
};

export default subRegions;
