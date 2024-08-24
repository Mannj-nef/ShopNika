export default function useTotop() {
  const handleScrollToTop = (top = 0) => {
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return handleScrollToTop;
}
