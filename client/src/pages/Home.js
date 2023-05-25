import InspectionLists from "../components/InspectionLists"
import EditCategory from "../components/EditCategory"
import Navbar from "../components/Navbar"
import { useEffect } from 'react'
import { useState } from 'react'


const Home = () => {
  const [lists, setLists] = useState()
  const [editCategoryId, setEditCategoryId] = useState(null)

  const handleToggleEdit = (event, category) => {
    if (editCategoryId) {
      setEditCategoryId(null)
    } else {
      setEditCategoryId(category._id)
    }
    
  }

  

  useEffect(() => {
    const fetchLists = async () => {

        const response = await fetch('http://localhost:4000/api/inspection/')
        const json = await response.json()
        
        if (response.ok) {
            setLists(json);
        }
    }

    fetchLists();

  }, [])

  return (
    <div>
        <Navbar/>
        {lists && lists.map((list) => (
          <>
          {editCategoryId === list._id ?
          <EditCategory category={list} handleToggleEdit={handleToggleEdit}/> :
          <InspectionLists category={list} handleToggleEdit={handleToggleEdit}/>       
          }
          </>
        ))}
    </div>
  )
}

export default Home