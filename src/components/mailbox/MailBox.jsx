import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mailAction } from "../../store/MailSlice";
import JoditEditor from "jodit-react";

const MailBox = () => {
  const [show, setShow] = useState(false);
  const [successful,setIsSuccessful]=useState(false)
  const toEMail = useRef();
  const areaRef = useRef();
  const dispatch = useDispatch();
  const email = useSelector((store) => {
    return store.auth.email;
  });

  const handleCOmpose = () => {
    setShow(!show);
  };

  const handleSend = async () => {
    const to = toEMail.current.value;
    const body = areaRef.current.value;
    const fromMail = email.replace("@", "").replace(".", "");
    
    const toMail = to.replace("@", "").replace(".", "");
    
    const obj = {
      to: to,
      body: body,
    };
    try {
      let res = await axios.post(
        `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${fromMail}/sent.json`,
        obj
      );
      dispatch(
        mailAction.mailSent({
          id: res.data.name,
          mail: { to: to, body: body },
        })
      );
      setIsSuccessful(true)
    } catch (error) {
        setIsSuccessful(false)
      alert(error.message);
    }

    const obj2 = {
        from: email,
        body: body,
        read: false,
      };

    
    try {
       
        let res = await axios.post(
          `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${toMail}/inbox.json`,
          obj2
        );
        // dispatch(mailAction.sent({}));
        
    
      } catch (error) {
     
        console.log("error:", error);
      }
    
  };

  


  return (
    <div>
      <div style={{ padding: "40px",display: "flex", flexDirection: "column"}}>
        <div style={{  }}>
          <button

            onClick={handleCOmpose}
            className="btn"
            style={{ float: "left", width: "30%" ,background:'skyblue',padding:'1rem',marginRight:'4rem'}}
          >
            Compose
          </button>
          
          <Link to={"/inbox"}>
            <button className="btn" style={{ float: "left", width: "30%" ,background:'yellow',padding:'1rem',marginRight:'4rem'}}>
              Your Inbox
            </button>
          </Link>
          <Link to={"/sent"}>
            <button className="btn" style={{ float: "left", width: "30%",background:'pink',padding:'1rem' }}>
              Sent Inbox
            </button>
          </Link>
         
        </div>
        <div style={{border:'1px solid black',marginTop:'1rem'}}></div>
        {!show && <h1 style={{textAlign:'center'}}>Click On Compose To Send Email's 💌</h1>}
          {show && (
            <div>
              <h1 style={{ color: "grey" }}>
                Connect With Your Friends And Family 👪
              </h1>
              <div className="mail">
                <div>
                    <label style={{marginRight:'1rem'}} >To:</label>
                  <input type="text" placeholder="enter email id" ref={toEMail} />
                </div>
                <JoditEditor ref={areaRef} />
              </div>
              <button className="btn" style={{background:'blue',borderRadius:'10px', marginTop:'0.5rem'}} onClick={handleSend}>
                Send
              </button>
            </div>
          )}
           {successful && <p style={{fontSize:'2rem',marginLeft:'0rem'}}>Message Sent Successfully</p>}
      </div>
     
    </div>
  );
};

export default MailBox;
