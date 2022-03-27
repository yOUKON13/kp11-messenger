import { useEffect, useState } from 'react';

function useInfiniteScroll(
  scrollable: any,
  isLoading: boolean,
  onEndScroll: Function,
  isLastPage = false,
  toBottom = true
) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (scrollable) {
      scrollable.onscroll = getDataScroll;
    }
  }, [isLoading]);

  function getDataScroll() {
    let scrolled =
      scrollable.scrollTop + scrollable.offsetHeight ===
      scrollable.scrollHeight;

    if (!toBottom) {
      scrolled =
        -scrollable.scrollTop + scrollable.offsetHeight ===
        scrollable.scrollHeight;
    }

    if (scrolled && !isLoading && !isLastPage) {
      onEndScroll();
      setPage(page + 1);
      window.removeEventListener('scroll', getDataScroll);
    }
  }

  return [page, setPage, getDataScroll];
}

export default useInfiniteScroll;
