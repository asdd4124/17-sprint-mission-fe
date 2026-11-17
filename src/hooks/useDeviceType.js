import { useEffect, useState } from "react";

const PC_MIN_WIDTH = 1200;
const TABLET_MIN_WIDTH = 744;

// 화면 너비 → 기기 구간 ("pc" / "tablet" / "mobile")
function getDeviceType() {
  if (window.innerWidth >= PC_MIN_WIDTH) return "pc";
  if (window.innerWidth >= TABLET_MIN_WIDTH) return "tablet";
  return "mobile";
}

// 너비 대신 구간을 저장해서 구간이 바뀔 때만 다시 그리도록
function useDeviceType() {
  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
