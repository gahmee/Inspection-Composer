
const InspectionLists = ({ category, handleToggleEdit, composedInspection, setComposedInspection }) => {

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
    <div className="category-container">
      <h1>{category.title}</h1>
      {category.list.map((listItem, index) =>
        <div key={listItem + index} className="list-item-container">
          <input
            type="checkbox"
            name={"test" + index}
            id={listItem + index}
            onChange={(event) => handleClick(event, listItem)}
            className="list-item-checkbox"
          />
          <label htmlFor={listItem + index} className="list-item-label">
            {listItem}
          </label>
        </div>
      )}
      <button onClick={(event) => handleToggleEdit(event, category)} id="category-edit-button">Edit</button>
    </div>
  )
}

export default InspectionLists
