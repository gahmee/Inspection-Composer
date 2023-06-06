
const InspectionLists = ({category, handleToggleEdit, composedInspection, setComposedInspection}) => {

  const handleClick = (event, listItem) => {
    if (event.target.checked) {
      const newComposedInspection = [...composedInspection, listItem]
      setComposedInspection(newComposedInspection)
    } else {
      const newComposedInspection = composedInspection.filter((i) => i !== listItem)
      setComposedInspection(newComposedInspection)
    }
  }


  return (
    <div>
      <h1>{category.title}</h1>
      {category.list.map((listItem, index) => 
        <div key={listItem + index}>
          <input 
            type="checkbox" 
            name={"test" + index}
            id={listItem + index}
            onChange={(event) => handleClick(event, listItem)}
          />
          <label for={listItem + index}>
            {listItem}
          </label>
        </div>
      )}
      <button onClick={(event) => handleToggleEdit(event, category)}>Edit</button>
    </div>
  )
}

export default InspectionLists
