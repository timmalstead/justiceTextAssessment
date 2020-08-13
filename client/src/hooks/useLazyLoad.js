import { useEffect, useCallback } from "react"

// hook that accepts two arguments:
//  1) a ref to attach an IntersectionObserver to
//  2) a state setting function used to increase the pagination counter
const useLazyLoad = (scrollRef, setCounter) => {
  // IntersectionObserver browser api attached to be attached to a ref. IntersectionObserver is a browser API used to attach callbacks to DOM nodes, or in our case refs to DOM nodes, that fire whenever a condition is met regarding viewport intersection. Here I will be using it to increase the counter whenever the ref intersects with the viewport
  const scrollObserver = useCallback(
    (node) =>
      //attaching a callback to be fired upon viewport intersection
      new IntersectionObserver(
        (entries) =>
          entries.forEach((element) => {
            // isIntersecting is a boolean on each IntersectionObserver
            if (element.isIntersecting) {
              // if isIntersecting evaluates to true, fire a callback adding 2 to the pagination counter
              setCounter((prevNum) => (prevNum += 2))
            }
          })
        //adds node to list of elements being watch by IntersectionObserver
      ).observe(node),
    [setCounter]
  )

  // useEffect hook used to apply the IntersectionObserver object to supplied ref
  useEffect(() => {
    if (scrollRef.current) {
      //if the ref has a .current property, and is thus ready, attach the intersection observer to the ref
      scrollObserver(scrollRef.current)
    }
  }, [scrollObserver, scrollRef])
}

export default useLazyLoad
