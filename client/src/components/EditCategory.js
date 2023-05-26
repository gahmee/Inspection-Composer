import { useState } from "react"

const EditCategory = ({category, handleToggleEdit}) => {
    const [list, setList] = useState(category.list)

    const handleInputChange = (value, index) => {
        const updatedList = [...list]
        updatedList[index] = value
        
        setList([...updatedList])
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
            <button onClick={(event) => handleToggleEdit(event, category)}>Cancel</button>
        </div>
    )
}

export default EditCategory