import { useState, useEffect } from "react";

type useInfiniteScrollCallback = () => void;

/**
 * Infinite Scroll custom hook
 * @dev hook to capture an event when scroll touches bottom
 * @param { function } callback callback function
 * @return { [boolean, function] } return value to get/set fetching status
 */
const useInfiniteScroll = (callback: useInfiniteScrollCallback) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // event listening
  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  // calling back callback
  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  // scroll event callback
  function isScrolling() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return setIsFetching;
};

export default useInfiniteScroll;
