import { Button } from "@mui/material"
import { CategoriesContext } from "../contexts/categoriesContext"
import { useState, useContext } from "react"
import { TextField, IconButton, InputAdornment } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { API_URL } from '../config'

const CreateCategory = ({ handleToggleCategoryEdit }) => {
    const [title, setTitle] = useState('Title')
    const [list, setList] = useState(['List Item 1', 'List Item 2', 'List Item 3'])
    const { dispatch } = useContext(CategoriesContext)

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleListChange = (value, index) => {
        const updatedList = [...list]
        updatedList[index] = value

        setList([...updatedList])
    }

    const handleRemoveListItem = (listItem) => {
        setList(list.filter((i) => i !== listItem))
    }

    const handleAdd = () => {
        setList([...list, ''])
    }

    const handleSubmit = async (event) => {

        const updatedCategory = { title, list }

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(updatedCategory),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            console.log('created new product', json)
            dispatch({ type: 'CREATE_CATEGORY', payload: json })
        }
    }

    return (
        <div className="category-container">
            <div>
                <TextField
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    fullWidth
                >
                </TextField>
            </div>

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
                </div>
            )}
            <div>
                <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
                <Button variant="outlined" onClick={handleToggleCategoryEdit}>Cancel</Button>
            </div>
            <IconButton id="add-button" color="success" onClick={(event) => handleAdd(event)} size="large" ><AddCircleIcon fontSize="inherit" /></IconButton>
        </div>
    )
}

export default CreateCategory