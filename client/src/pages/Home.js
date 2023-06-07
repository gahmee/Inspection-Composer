import * as React from 'react'
import InspectionLists from "../components/InspectionLists"
import EditCategory from "../components/EditCategory"
import Navbar from "../components/Navbar"
import { CategoriesContext } from "../contexts/categoriesContext"
import { useEffect, useState, useContext } from 'react'
import CreateCategory from "../components/CreateCategory"


const Home = () => {
  const [editCategoryId, setEditCategoryId] = useState(null)
  const { categories, dispatch } = useContext(CategoriesContext)
  const [toggleNewCategory, setToggleNewCategory] = useState(false)
  const [composedInspection, setComposedInspection] = useState('')

  useEffect(() => {
    const fetchLists = async () => {

      const response = await fetch('http://localhost:4000/api/inspection/')
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
    navigator.clipboard.writeText(composedInspection)
  }

  return (
    <div className='home'>
      <Navbar />
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
      {toggleNewCategory && <CreateCategory />}
      {!toggleNewCategory ?
        <button onClick={handleToggleCategoryEdit}>New</button> :
        <button onClick={handleToggleCategoryEdit}>Cancel</button>
      }


      <div>{composedInspection}</div>
      <button onClick={handleCopyToClipBoard}>Copy</button>
    </div>
  )
}

export default Home