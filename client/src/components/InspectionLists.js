import React from 'react'

const InspectionLists = ({category, handleToggleEdit}) => {


  return (
    <div>
      <h1>{category.title}</h1>
      {category.list.map((i) => <div>{i}</div>)}
      <button onClick={(event) => handleToggleEdit(event, category)}>Edit</button>
    </div>
  )
}

export default InspectionLists
