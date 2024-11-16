import { useEffect, useState } from 'react'
import './App.css'
import dayjs from 'dayjs'


const transactions = [{
  Transaction:"",
  ID:123, 
  Date: Date.now(), 
  Description: "sdasdas", 
  Amount: 123.45, 
},
{
  Transaction:"",
  ID:123, 
  Date: Date.now(), 
  Description: "sdasdas", 
  Amount: 123.45, 
},
{
  Transaction:"",
  ID:123, 
  Date: Date.now(), 
  Description: "sdasdas", 
  Amount: 123.45, 
}]

function App() {
  const [data, setData] = useState(null)
  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()
  const [error, setError] = useState(null)

  const formatAmmount =(value)=>{
    return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(
      value,
    )
  }
  useEffect(()=>{
    if(data) return
    setTimeout(() => {
      try {
        setData(transactions)        
      } catch (error) {
        console.log(error)
        setError(error)
      }

    }, 2000);
  },[data])

  const renderData = ()=>{
    if(!data) return <p>Loading...</p>
    if(error) return  <p>Something went wrong</p>
    return data.map((entry, index)=>{
      return<section key={index}>
        <h1>{entry.ID} | {entry.Transaction}</h1>
        <p>{entry.Date}</p>
        <p>{entry.Description}</p>
        <p>{formatAmmount(entry.Amount)}</p>
      </section>
    })
  }
  const filterByDate = ()=>{
    debugger
    const min = dayjs(minDate).format('YYYY-MM-DD');
    const max = dayjs(maxDate).format('YYYY-MM-DD')
    const newData = data.filter(entry=>{
      return dayjs(entry.Date).isBefore(max) && dayjs(entry.Date).isAfter(min)
    })
    setData(newData)

  }
  const renderFilter= ()=>{
    return(
      <section>
      <input type="date" name="" id="" onChange={event=>setMinDate(event?.currentTarget.value)}/>
      <input type="date" name="" id="" onChange={event=>setMaxDate(event?.currentTarget.value)}/>
      <button onClick={filterByDate}>Filter</button>
      </section>
    )
  }
  return (
    <>
      {renderFilter()}
      {renderData()}
    </>
  )
}

export default App
