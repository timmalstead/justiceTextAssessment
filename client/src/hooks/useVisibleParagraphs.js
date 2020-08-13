import { useEffect, useCallback, useRef } from "react"

// hook that accepts three arguments:
//  1) a CSS selector to target a nodeList to attach refs to
//  2) paragraph data fetched from Express API
//  3) a state setting function used to set each paragraph into state, thus rendering, or filter it     out of state, thus meaning it won't render.
const useVisibleParagraphs = (
  nodeListIdent,
  paragraphData,
  setVisibleParagraphs
) => {
  // ref that will later be used to attach to node list
  const paragraphsRef = useRef(null)

  // IntersectionObserver browser api attached to be attached to refs. IntersectionObserver is a browser API used to attach callbacks to DOM nodes, or in our case refs to DOM nodes, that fire whenever a condition is met regarding viewport intersection. Simply put, I will be using it to fire a callback to add a paragraph to a list of paragraphs that are allowed to render and run the expensive highlighting calculation when they are on screen. This will help make the rendering and highlighting run much more efficently, sometimes seeming almost instant.
  // Because we are wrapping this in a useCallback hook, it will know to not to run on every render,
  const paragraphObserver = useCallback(
    (node) => {
      const intObs = new IntersectionObserver((entries) =>
        entries.forEach((entry) => {
          const paragraphId = entry.target.id
          if (entry.isIntersecting)
            setVisibleParagraphs((prevState) => [
              ...new Set([...prevState, paragraphId]),
            ])
          else
            setVisibleParagraphs((prevState) =>
              prevState.filter((id) => id !== paragraphId)
            )
        })
      )
      intObs.observe(node)
    },
    [setVisibleParagraphs]
  )

  useEffect(() => {
    paragraphsRef.current = document.querySelectorAll(nodeListIdent)
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
