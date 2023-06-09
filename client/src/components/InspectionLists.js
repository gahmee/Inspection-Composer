import { Checkbox, FormGroup, FormControlLabel } from "@mui/material"

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
      <div id="category-title">{category.title}</div>
      <FormGroup>
        {category.list.map((listItem, index) =>
          <div key={listItem + index} className="list-item-container">
            <FormControlLabel
              type="checkbox"
              name={"test" + index}
              id={listItem + index}
              onChange={(event) => handleClick(event, listItem)}
              className="list-item-checkbox"
              control={<Checkbox style={{
                color: "#90CAF9",
              }} />}
              label={listItem}
            />
          </div>
        )}
      </FormGroup>
      <button onClick={(event) => handleToggleEdit(event, category)} id="category-edit-button">Edit</button>
    </div>
  )
}

export default InspectionLists
