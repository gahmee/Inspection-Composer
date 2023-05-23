import React from 'react'

const InspectionLists = ({category}) => {

  return (
    <div>
      <h1>{category.title}</h1>
      {category.list.map((i) => <div>{i}</div>)}
    </div>
  )
}

export default InspectionLists
