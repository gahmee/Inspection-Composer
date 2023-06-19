import * as React from 'react'
import InspectionLists from "../components/InspectionLists"
import EditCategory from "../components/EditCategory"
import { CategoriesContext } from "../contexts/categoriesContext"
import { useEffect, useState, useContext } from 'react'
import CreateCategory from "../components/CreateCategory"
import { IconButton, Button, ClickAwayListener, Tooltip } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { API_URL } from '../config'



const Home = () => {
  const [editCategoryId, setEditCategoryId] = useState(null)
  const { categories, dispatch } = useContext(CategoriesContext)
  const [toggleNewCategory, setToggleNewCategory] = useState(false)
  const [composedInspection, setComposedInspection] = useState('')
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchLists = async () => {

      const response = await fetch(API_URL)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_CATEGORIES', payload: json });
      }
    }

    fetchLists();

  }, [dispatch])

  const handleToggleEdit = (event, category) => {
    if (editCategoryId) setEditCategoryId(null)
    else setEditCategoryId(category._id)
  }

  const handleToggleCategoryEdit = () => {
    setToggleNewCategory(!toggleNewCategory)
  }

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(composedInspection.toString().replaceAll(",", ", "))
    handleTooltipOpen();
  }

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
  }

  return (
    <div className='home'>
      {categories && categories.map((category, index) => (
        <React.Fragment key={category + index}>
          {editCategoryId === category._id ?
            <EditCategory category={category} handleToggleEdit={handleToggleEdit} key={'EditCategory' + index} /> :
            <InspectionLists
              category={category}
              handleToggleEdit={handleToggleEdit}
              composedInspection={composedInspection}
              setComposedInspection={setComposedInspection}
              key={'InspectionLists' + index}
            />
          }
        </React.Fragment>
      ))}
      {toggleNewCategory && <CreateCategory handleToggleCategoryEdit={handleToggleCategoryEdit} />}

      <IconButton id="add-button" color="success" onClick={handleToggleCategoryEdit} size="large" ><AddCircleIcon fontSize="inherit" /></IconButton>


      <div className='composed-container'>
        <div id="composed-title">Composed Inspection</div>
        <div id="composed-inspection-text">
          {composedInspection.toString().replaceAll(",", ", ")}
        </div>
        <div>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Text Copied"
              >
                <Button variant="contained" onClick={handleCopyToClipBoard}>Copy Text</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>

        </div>
      </div>

    </div>
  )
}

export default Home