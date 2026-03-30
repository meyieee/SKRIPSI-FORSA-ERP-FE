import {useRef,useCallback} from 'react'

export default function useFocusItem() {
  const itemControl = useRef<any>([]);

  function nextFieldHandler(e: any) {
    if (e.keyCode === 13) {
      itemControl.current = itemControl.current.filter((control: any) => document.body.contains(control))
      .sort((a: any,b: any) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
      const index = itemControl.current.indexOf(e.target)
      const next = itemControl.current[index+1]
      next && next.focus()
      e.preventDefault()
    }
  }

  const onFocusNextItem = useCallback((element: any) => {
    if (element && !itemControl.current.includes(element)) {
      itemControl.current.push(element)
      element.addEventListener("keydown",nextFieldHandler)
    }
  }, [])

  return {onFocusNextItem,itemControl}
}
