import { useEffect, useCallback, useRef } from "react"

const useVisibleParagraphs = (
  nodeListIdent,
  paragraphData,
  visibleParagraphs,
  setVisibleParagraphs
) => {
  const paragraphsRef = useRef(null)

  const paragraphObserver = useCallback(
    (node) => {
      const intObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const paragraphId = entry.target.id
          if (entry.intersectionRatio > 0)
            setVisibleParagraphs((prevState) => ({
              ...prevState,
              [paragraphId]: true,
            }))
          else
            setVisibleParagraphs((prevState) => ({
              ...prevState,
              [paragraphId]: false,
            }))
        })
      })
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
