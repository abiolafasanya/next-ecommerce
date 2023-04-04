import React from 'react'

interface Iprops {
    progress: number;
}

export const Progress = ({progress}: Iprops) => {
  return (
    <div className={'h-3 bg-gray-300'}>
        <div className={`h-3 bg-yellow-500`} style={{width: progress+'%'}}></div>
    </div>
  )
}
