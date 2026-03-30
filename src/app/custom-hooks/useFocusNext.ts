import { useRef, useCallback } from 'react'

export default function useFocusNext(){
  const controls = useRef<any>([]);

  function nextFieldHandler(e:any){
    if (e.keyCode === 13) {
      controls.current = controls.current.filter((control:any)=>document.body.contains(control))
      .sort((a:any,b:any)=>a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
      const index = controls.current.indexOf(e.target)
      const next = controls.current[index+1]
      next && next.focus()
      e.preventDefault()
    }
  }
  const onFocusNextRef = useCallback((element:any)=>{
    if (element && !controls.current.includes(element)) {
      controls.current.push(element)
      element.addEventListener("keydown",nextFieldHandler)
    }
  }, [])

  return {onFocusNextRef,controls}
}
