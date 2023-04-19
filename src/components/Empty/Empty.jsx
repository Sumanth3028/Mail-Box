import React from 'react'
import { Link } from 'react-router-dom'

const Empty = () => {
  return (
    <>
    <div style={{display:'flex',justifyContent:'space-between',marginRight:'3rem'}} >
    <div>
     <h1>Welcome to Mail Box</h1>
    
    </div>
    <Link style={{fontSize:'2rem'}} to={'/mailbox'} >MAIL BOX</Link>
   
    </div>
    <div style={{border:'1px solid black'}}></div>
    </>
  )
}

export default Empty