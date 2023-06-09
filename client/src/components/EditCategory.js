import { useContext, useState } from "react"
import { CategoriesContext } from "../contexts/categoriesContext"

const EditCategory = ({ category, handleToggleEdit }) => {
    const [title, setTitle] = useState(category.title)
    const [list, setList] = useState(category.list)
    const { dispatch } = useContext(CategoriesContext)

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleListChange = (value, index) => {
        const updatedList = [...list]
        updatedList[index] = value

        setList([...updatedList])
    }

    const handleSubmit = async (event) => {


        const updatedCategory = { title, list }

        const response = await fetch('http://localhost:4000/api/inspection/' + category._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedCategory),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            console.log('edited new product', json)
            handleToggleEdit(null)
            dispatch({ type: 'EDIT_CATEGORY', payload: json })
        }
    }

    const handleDelete = async (event) => {

        const response = await fetch('http://localhost:4000/api/inspection/' + category._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            console.log('Deleted new product', json)
            handleToggleEdit(null)
            dispatch({ type: 'DELETE_CATEGORY', payload: json })
        }
    }

    const handleAdd = () => {
        setList([...list, ''])
    }

    const handleRemoveListItem = (listItem) => {
        setList(list.filter((i) => i !== listItem))
    }

    return (
        <div className="category-container">
            <input
                id="title-input"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}>
            </input>
            {list.map((item, index) =>
                <div>
                    <input
                        type="text"
                        value={list[index]}
                        onChange={(e) => handleListChange(e.target.value, index)}>
                    </input>
                    <button onClick={(e) => handleRemoveListItem(list[index])}>X</button>
                </div>
            )}
            <button onClick={(event) => handleAdd(event)}>Add</button>
            <div>
                <button onClick={(event) => handleSubmit(event)}>Submit</button>
                <button onClick={(event) => handleToggleEdit(event, category)}>Cancel</button>
                <button onClick={(event) => handleDelete(event)}>Delete</button>
            </div>
        </div>
    )
}

export default EditCategory