import React from 'react'

const Card = ({children , backGroundColor}) => {
  return (
    <div className={`${backGroundColor} p-6 rounded-lg shadow-md`}>
             {children}
            </div>
  )
}

export default Card