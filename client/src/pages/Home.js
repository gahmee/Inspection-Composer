import InspectionLists from "../components/InspectionLists"
import EditCategory from "../components/EditCategory"
import Navbar from "../components/Navbar"
import { CategoriesContext } from "../contexts/categoriesContext"
import { useEffect, useState, useContext } from 'react'
import CreateCategory from "../components/CreateCategory"


const Home = () => {
  const [editCategoryId, setEditCategoryId] = useState(null)
  const {categories, dispatch} = useContext(CategoriesContext)
  const [toggleNewCategory, setToggleNewCategory] = useState(false)

  useEffect(() => {
    const fetchLists = async () => {

        const response = await fetch('http://localhost:4000/api/inspection/')
        const json = await response.json()
        
        if (response.ok) {
            dispatch({type: 'SET_CATEGORIES', payload: json});
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

  return (
    <div>
        <Navbar/>
        {categories && categories.map((category) => (
          <>
          {editCategoryId === category._id ?
          <EditCategory category={category} handleToggleEdit={handleToggleEdit}/> :
          <InspectionLists category={category} handleToggleEdit={handleToggleEdit}/>       
          }
          </>
        ))}
        {toggleNewCategory && <CreateCategory />}
        <button onClick={handleToggleCategoryEdit}>New</button>
    </div>
  )
}

export default Home