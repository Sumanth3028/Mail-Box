import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/MailSlice";
import { AiFillDelete } from "react-icons/ai";

import { Link } from "react-router-dom";
const Inbox = () => {
 
  const dispatch = useDispatch();
  const inbox = useSelector((store) => {
    return store.mail.inbox;
  });
  const email = useSelector((store) => {
    return store.auth.email;
  });
  const newEmail = email.replace("@", "").replace(".", "");
  const getMailData = async () => {
    try {
      let res = await axios.get(
        `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${newEmail}/inbox.json`
      );
      console.log(res);
      if (res.data) {
        dispatch(mailAction.inbox(res.data));
      }
    } catch (error) {
      alert("error:", error);
    }
  };

  const handleDelete = async (id) => {
    dispatch(mailAction.delete(id));
    try {
      let res = await axios.delete(
        `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${newEmail}/inbox/${id}.json`
      );
      console.log(res);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getMailData();
  }, []);

  let unread = 0;
  Object.keys(inbox).forEach((items) => {
    if (inbox[items].read === false) {
      unread++;
    }
  });

  return (
    <div style={{marginLeft:"3rem",marginTop:'3rem'}}>
        <div style={{display:'flex' ,justifyContent:'space-between'}}>
      <h1>
        Your Inbox has {unread} Unread Email's {unread > 0 ? "😍" : "😥"}
      </h1>
      <Link to='/mailbox' style={{fontSize:"2rem",marginRight:'2rem'}}>Go Back</Link>
      </div>
      <div>
        {Object.keys(inbox).length === 0 ? <p>Your Inbox Is Empty 😢</p> : ""}
      </div>
      <div className="inbox">
        {Object.keys(inbox).map((items) => {
          return (
            <div key={items} className="inbox-items">
              <AiFillDelete
                color="red"
                className="delete"
                onClick={() => handleDelete(items)}
              />
              <h4 style={{ display: "flex", gap: "10px" }}>
                <p>{!inbox[items].read && <>💎</>}</p>
                <p> From : {inbox[items].from}</p>
              </h4>
              <div style={{ display: "flex", gap: "10px" }}>
                <p>Message : </p>
                <p dangerouslySetInnerHTML={{ __html: inbox[items].body }}></p>
              </div>
              <Link className="read" to={`/inbox/${items}`}>
                Read Mail
              </Link>
              <div style={{border:'1px solid blue',width:'75%'}}></div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Inbox;
