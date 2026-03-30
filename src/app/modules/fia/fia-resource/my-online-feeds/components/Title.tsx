import React from 'react'
import '../scss/styles.scss'

interface TitleProps {
  text1?: string
  text2?: string
  style?: React.CSSProperties
  className?: string
}

/* Bisa dipilih mau memakai text1 atau text2 */
const Title: React.FC<TitleProps> = ({text1, text2, style, className}) => {
  return (
    <div>
      {text1 && (
        <h2 className={`title-container ${className}`} style={style}>
          {text1}
        </h2>
      )}

      {text2 && (
        <h2 className={`custom-title me-10 ${className}`} style={style}>
          {text2}
        </h2>
      )}
    </div>
  )
}

export default Title
