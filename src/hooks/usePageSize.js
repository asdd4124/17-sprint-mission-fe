import useDeviceType from "./useDeviceType";

// 기기 구간에 맞는 개수 고르기 (sizes: { pc, tablet, mobile })
function usePageSize(sizes) {
  const deviceType = useDeviceType();
  return sizes[deviceType];
}

export default usePageSize;
