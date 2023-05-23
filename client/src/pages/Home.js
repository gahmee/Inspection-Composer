import InspectionLists from "../components/InspectionLists"
import Navbar from "../components/Navbar"
import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
  const [lists, setLists] = useState()

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
        {lists && lists.map((list) => <InspectionLists category={list}/>)}
    </div>
  )
}

export default Home