import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const Lists = () => {
  const [list, setList] = useState()

  useEffect(() => {
    const fetchLists = async () => {

        const response = await fetch('http://localhost:4000/api/inspection/')
        const json = await response.json()

        console.log(json)


        if (response.ok) {
            setList(json);
        }
    }

    fetchLists();

}, [])

  return (
    <div>
      {list.map(list => list.title)}
    </div>
  )
}
