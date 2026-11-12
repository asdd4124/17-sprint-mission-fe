import useWindowWidth from "./useWindowWidth";

const PC_MIN_WIDTH = 1200;
const TABLET_MIN_WIDTH = 744;

function usePageSize({ pc, tablet, mobile }) {
  const width = useWindowWidth();

  if (width >= PC_MIN_WIDTH) return pc;
  if (width >= TABLET_MIN_WIDTH) return tablet;
  return mobile;
}

export default usePageSize;
