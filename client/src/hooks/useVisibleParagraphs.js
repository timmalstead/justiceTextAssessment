import { useEffect, useCallback, useRef } from "react"

// hook that accepts three arguments:
//  1) a CSS selector to target a nodeList to attach refs to
//  2) paragraph data fetched from Express API
//  3) a state setting function used to set each paragraph into state, thus rendering, or filter it out of state, thus making it not render.
const useVisibleParagraphs = (
  nodeListIdent,
  paragraphData,
  setVisibleParagraphs
) => {
  // ref that will later be used to attach to node list
  const paragraphsRef = useRef(null)

  // IntersectionObserver browser api attached to be attached to refs. IntersectionObserver is a browser API used to attach callbacks to DOM nodes, or in our case refs to DOM nodes, that fire whenever a condition is met regarding viewport intersection. Simply put, I will be using it to fire a callback to add a paragraph to a list of paragraphs that are allowed to render and run the expensive highlighting calculation when they are on screen. This will help make the rendering and highlighting run much more efficently, sometimes seeming almost instant.
  // Because we are wrapping this in a useCallback hook, it will know to not to run on every render but only when anything in its dependency array changes
  const paragraphObserver = useCallback(
    (node) => {
      const intObs = new IntersectionObserver((entries) =>
        //attaching a callback to be fired upon viewport intersection
        entries.forEach((entry) => {
          const paragraphId = entry.target.id
          // isIntersecting is a boolean on each IntersectionObserver
          if (entry.isIntersecting)
            // if isIntersecting evaluates to true, fire a callback adding the visible paragraph to the visibleParagraph array
            // I change it to a Set and back again to prevent my array being filled up with multiple instances of the same id
            setVisibleParagraphs((prevState) => [
              ...new Set([...prevState, paragraphId]),
            ])
          // if isIntersecting evaluates to false, fire a callback returning a copy of the previous state with the id filtered out
          else
            setVisibleParagraphs((prevState) =>
              prevState.filter((id) => id !== paragraphId)
            )
        })
      )
      //adds node to list of elements being watch by IntersectionObserver
      intObs.observe(node)
    },
    [setVisibleParagraphs]
  )

  // useEffect hook used to apply the IntersectionObserver object we have created to each node in a nodeList
  useEffect(() => {
    // query selector used to find each instance of the identifier we have supplied, in this case .full-paragraph
    paragraphsRef.current = document.querySelectorAll(nodeListIdent)
    //if the ref has a .current property, and is thus ready, attach the intersection observer to the ref
    if (paragraphsRef.current) {
      paragraphsRef.current.forEach((node) => paragraphObserver(node))
    }
  }, [
    paragraphObserver,
    paragraphsRef,
    paragraphData.paragraphs,
    nodeListIdent,
  ])
}

export default useVisibleParagraphs
