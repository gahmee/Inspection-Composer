import React from 'react'

const InspectionLists = ({category}) => {

  return (
    <div>
      <h1>{category.title}</h1>
      {category.list}
    </div>
  )
}

export default InspectionLists
