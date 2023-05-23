import InspectionLists from "../components/InspectionLists"
import EditCategory from "../components/EditCategory"
import Navbar from "../components/Navbar"
import { useEffect } from 'react'
import { useState } from 'react'


const Home = () => {
  const [lists, setLists] = useState()
  const [toggleEdit, setToggleEdit] = useState(false)

  const handleToggleEdit = () => {
    setToggleEdit(!toggleEdit)
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
        {lists && toggleEdit && lists.map((list) => <InspectionLists category={list}/>)}
        {lists && !toggleEdit && lists.map((list) => <EditCategory category={list}/>)}
        <button onClick={handleToggleEdit}>Edit</button>
    </div>
  )
}

export default Home