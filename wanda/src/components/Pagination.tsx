import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Iprops{
    total: number
    callback: (num: number) => void
}

const Pagination: React.FC<Iprops> = ({ total, callback }) => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()

  const newArr  = [...Array(total)].map((_, i) => i + 1)

  const handlePagination = (num: number) => {
      navigate(`?page=${num}`)  
      callback(num)
  }

  useEffect(()=> {
      const num = location.search.slice(6) || 1
      setPage(Number(num))
  },[location.search, navigate])

  return (
    <div>
        {
            page > 1 && <span onClick={()=> handlePagination(page - 1)}> &lt;</span>
        }

        {
            newArr.map(num => (
                <span key={num} onClick={()=> handlePagination(num)}> {num}</span>
            ))
        }

        {
            page < 1 && <span onClick={()=> handlePagination(page + 1)}> &gt;</span>
        }    
    </div>


  )
}

export default Pagination