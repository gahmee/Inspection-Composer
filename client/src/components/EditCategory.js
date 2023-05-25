import { useState } from "react"

const EditCategory = ({category, handleToggleEdit}) => {
    const [listItem, setListItem] = useState(category)

    return (
        <div>
            <h1>Editing {category.title}</h1>
            {category.list.map((i) => <div>{i}</div>)}
            <button onClick={(event) => handleToggleEdit(event, category)}>Cancel</button>
        </div>
    )
}

export default EditCategory