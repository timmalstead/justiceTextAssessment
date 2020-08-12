import { useEffect, useCallback, useRef } from "react"

const useVisibleParagraphs = (
  nodeListIdent,
  paragraphData,
  setVisibleParagraphs
) => {
  const paragraphsRef = useRef(null)

  const paragraphObserver = useCallback(
    (node) => {
      const intObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio
          const paragraphId = entry.target.id
          if (ratio > 0)
            setVisibleParagraphs((prevState) => [
              ...new Set([...prevState, paragraphId]),
            ])
          else
            setVisibleParagraphs((prevState) =>
              prevState.filter((id) => id !== paragraphId)
            )
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
