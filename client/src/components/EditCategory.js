import { useContext, useState } from "react"
import { CategoriesContext } from "../contexts/categoriesContext"
import { IconButton, Button, TextField, InputAdornment } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
            <TextField
                id="title-input"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                label="Category Title"
            >
            </TextField>
            {list.map((item, index) =>
                <div>
                    <TextField
                        type="text"
                        value={list[index]}
                        onChange={(e) => handleListChange(e.target.value, index)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={(e) => handleRemoveListItem(list[index])}>
                                        <DeleteIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>
                    {/* <IconButton color="primary" onClick={(e) => handleRemoveListItem(list[index])}><DeleteIcon /></IconButton> */}
                </div>
            )}
            <IconButton color="success" onClick={(event) => handleAdd(event)}><AddCircleIcon /></IconButton>
            <div>
                <Button variant="contained" color="success" onClick={(event) => handleSubmit(event)}>Submit</Button>
                <Button variant="outlined" onClick={(event) => handleToggleEdit(event, category)}>Cancel</Button>
                <Button variant="outlined" color="error" onClick={(event) => handleDelete(event)}>Delete</Button>
            </div>
        </div>
    )
}

export default EditCategory