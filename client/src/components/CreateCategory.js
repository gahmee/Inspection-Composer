import { CategoriesContext } from "../contexts/categoriesContext"
import { useState, useContext } from "react"

const CreateCategory = () => {
    const [title, setTitle] = useState('Title')
    const [list, setList] = useState(['List Item 1', 'List Item 2', 'List Item 3'])
    const {dispatch} = useContext(CategoriesContext)

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleListChange = (value, index) => {
        const updatedList = [...list]
        updatedList[index] = value

        setList([...updatedList])
    }

    const handleSubmit = async (event) => {

        const updatedCategory = {title, list}

        const response = await fetch('http://localhost:4000/api/inspection/', {
            method: 'POST',
            body: JSON.stringify(updatedCategory),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            console.log('created new product', json)
            dispatch({type: 'CREATE_CATEGORY', payload: json})
        }
    }

  return (
    <div>
        CreateCategory
        <div>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => handleTitleChange(e.target.value)}>
            </input>
        </div>

        {list.map((item, index) => 
            <div>
                <input 
                    type="text" 
                    value={list[index]} 
                    onChange={(e) => handleListChange(e.target.value, index)}>
                </input>
            </div>
            )}

        <button onClick={handleSubmit}>Submit</button>       
    </div>
  )
}

export default CreateCategory