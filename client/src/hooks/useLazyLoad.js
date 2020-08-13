import { useEffect, useCallback } from "react"

const useLazyLoad = (scrollRef, setCounter) => {
  const scrollObserver = useCallback(
    (node) =>
      new IntersectionObserver((entries) =>
        entries.forEach((element) => {
          if (element.isIntersecting) {
            setCounter((prevNum) => (prevNum += 2))
          }
        })
      ).observe(node),
    [setCounter]
  )

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current)
    }
  }, [scrollObserver, scrollRef])
}

export default useLazyLoad
