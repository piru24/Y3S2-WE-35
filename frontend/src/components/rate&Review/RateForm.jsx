import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import swal from 'sweetalert';
import { useParams } from "react-router-dom";

const RateForm = () => {
  const [rateType, setRateType] = useState("product");
  const [rateId, setRateId] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [review, setReview] = useState("");

  const {id} = useParams();

  useEffect(()=>{
    setRateId(id)

  }, [id])

  useEffect(()=>{
    document.getElementById("rateHead").innerHTML = 
    `
    Rate ${rateType} <br />
    ${rateType}Id: ${rateId}
    `;
  },[rateType, rateId]);

  useEffect(()=>{
    document.getElementById("rateValue").innerHTML = 
      `
        Rate for: ${rateType} <br />
        Rating: ${rateValue} <br />
        Review: ${review}
      `;
  },[rateType, rateId, rateValue, review])

  const submitData = async (event)=>{
    event.preventDefault();

    if(rateValue !== 0){
      const reviewData = {
        product_id:id,
        rate: rateValue,
        reviews: review
      }
      const response = await axios.post("http://localhost:8079/review/addReview", reviewData, {
        withCredentials: true
      });
      if(response.status === 201){
        swal({
          title: "SuccessFul",
          text: "Rate and Review was added Sucessfully",
          icon: "success"
        });
      }else{
        console.log("error");
        swal({
          title: "Error",
          text: "Rate posting failed",
          icon: "error"
        });
      }
    }else{
      console.log("Rate cannot be null");
      swal({
        title: "Invalid",
        text: "Rate is Required. Please select from stars",
        icon: "warning"
      });
    }
  };

  return(
    <div className="m-5 p-5">
      <h2 id="rateHead" className="px-3">Rate</h2>
      <p id="rateValue"></p>
      <form onSubmit={submitData}>
        <ReactStars
          count={5}
          value={rateValue}
          onChange={(value) => setRateValue(value)}
          size={50}
          activeColor="#ffd700"

        /><h4>Add comment!</h4><br />
        <textarea 
          style={{height: '200px', width: "80%"}}
          onChange={(event) => setReview(event.target.value)}
        /> <br />
        <button type="submit"  style={{ marginTop: '20px',  width: '200px',marginLeft: '50px',fontSize: '20px',  }}>Submit</button>
      </form>
    </div>
  );
}
export default RateForm;