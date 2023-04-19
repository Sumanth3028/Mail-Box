import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleSent = () => {
  const { id } = useParams();

  const email = useSelector((store) => {
    return store.auth.email;
  });
  const [data, setData] = useState({ to: ".", body: "." });
  const newEmail = email.replace("@", "").replace(".", "");

  const getSentSingleData = async () => {
    try {
      
      let res = await axios.get(
        `https://mail-box-fdd3d-default-rtdb.firebaseio.com/${newEmail}/sent/${id}.json`
      );
      
      setData(res.data);
      console.log(data)
      
    } catch (error) {
      
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getSentSingleData();
  }, []);

 

  return (
    <div className="inbox-items">
      <p>To : {data.to}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <p>Message : </p>
        <p dangerouslySetInnerHTML={{ __html: data.body }}></p>
      </div>
    </div>
  );
};

export default SingleSent;