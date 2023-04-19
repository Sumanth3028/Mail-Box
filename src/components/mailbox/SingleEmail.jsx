import { useOutlet, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/MailSlice";
import axios from "axios";

const SingleEmail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const [dataMail, setDataMail] = useState({
    from: ".",
    body: ".",
  });

  const email = useSelector((state) => {
    return state.auth.email;
  });

  const newEmail = email.replace("@", "").replace(".", "");

  const singleMail = async () => {
    try {
      let res = await axios.get(
        `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${newEmail}/inbox/${id}.json`
      );
      if (res.data) {
        dispatch(mailAction.mailRead({ id: id, mail: res.data }));
        setDataMail(res.data);
      }
      let res2 = await axios.put(
        `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${newEmail}/inbox/${id}.json`,
        { body: res.data.body, from: res.data.from, read: true }
      );
     
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    singleMail();
  }, []);

  return (
    <div className="inbox-items">
      <p>From : {dataMail.from}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <p>Message : </p>
        <p dangerouslySetInnerHTML={{ __html: dataMail.body }}></p>
      </div>
    </div>
  );
};

export default SingleEmail;
