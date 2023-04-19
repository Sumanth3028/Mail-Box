import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Sent = () => {
    const [data,setData]=useState([])
     const email=useSelector((state)=>{ return state.auth.email})
     const newEmail=email.replace("@","").replace(".","")
    const sentData=async()=>{
        try {
            let res = await axios.get(
              `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${newEmail}/sent.json`
              
            );
            setData(res.data)
        }
        catch(error){
            alert(error.message)
        }
    }

    useEffect(()=>{
        sentData()
    },[])

    let items=[]
    for(let key in data)
    {
        items.push({id:key,...data[key]})
    }
  return (
    <div style={{marginLeft:"3rem",marginTop:'3rem'}}>
    <div style={{display:'flex' ,justifyContent:'space-between'}}>
    <h1>Total Mails 💌 Sent : {items.length}</h1>
    <Link to='/mailbox' style={{fontSize:"2rem",marginRight:'2rem'}}>Go Back</Link>
    </div>
    {items.map((sentMails) => {
      return (
        <div key={sentMails.id} className="inbox-items">
          <AiFillDelete
            color="red"
            className="delete"
            // onClick={() => handleDelete(sentMails.id)}
          />
          <p>To : {sentMails.to}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <p>Message : </p>
            <p dangerouslySetInnerHTML={{ __html: sentMails.body }}></p>
          </div>
          <Link style={{marginBottom:'1rem'}} className="read" to={`/sent/${sentMails.id}`}>
            Read Mail
          </Link>
          <div style={{border:'1px solid blue',width:'75%'}}></div>
        </div>
      );
     })} 
    </div>
  )
}

export default Sent