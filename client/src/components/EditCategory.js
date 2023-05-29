import { useState } from "react"

const EditCategory = ({category, handleToggleEdit}) => {
    const [title, setTitle] = useState(category.title)
    const [list, setList] = useState(category.list)

    const handleInputChange = (value, index) => {
        const updatedList = [...list]
        updatedList[index] = value

        setList([...updatedList])
    }

    const handleSubmit = async (event) => {


        const updatedCategory = {title, list}

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
        }
    }

    return (
        <div>
            <h1>Editing {category.title}</h1>
            {list.map((item, index) => 
                <div>
                    <input 
                        type="text" 
                        value={list[index]} 
                        onChange={(e) => handleInputChange(e.target.value, index)}>
                    </input>
                </div>
            )}
            <button onClick={(event) => handleSubmit(event)}>Submit</button>
            <button onClick={(event) => handleToggleEdit(event, category)}>Cancel</button>
        </div>
    )
}

export default EditCategory