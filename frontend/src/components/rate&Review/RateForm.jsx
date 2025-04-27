import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const RateForm = () => {
  const [rateType, setRateType] = useState("product");
  const [rateId, setRateId] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [review, setReview] = useState("");

  const { id } = useParams();

  useEffect(() => {
    setRateId(id);
  }, [id]);

  useEffect(() => {
    document.getElementById("rateHead").innerHTML = `
      Rate ${rateType} <br />
      ${rateType}Id: ${rateId}
    `;
  }, [rateType, rateId]);

  useEffect(() => {
    document.getElementById("rateValue").innerHTML = `
      Rate for: ${rateType} <br />
      Rating: ${rateValue} <br />
      Review: ${review}
    `;
  }, [rateType, rateId, rateValue, review]);

  const submitData = async (event) => {
    event.preventDefault();

    if (rateValue !== 0) {
      const reviewData = {
        product_id: id,
        rate: rateValue,
        reviews: review,
      };
      const response = await axios.post(
        "http://localhost:8079/review/addReview",
        reviewData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        swal({
          title: "Successful",
          text: "Rate and Review was added successfully",
          icon: "success",
        });
      } else {
        console.log("error");
        swal({
          title: "Error",
          text: "Rate posting failed",
          icon: "error",
        });
      }
    } else {
      console.log("Rate cannot be null");
      swal({
        title: "Invalid",
        text: "Rate is required. Please select from stars",
        icon: "warning",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <h2
            id="rateHead"
            className="text-2xl font-bold text-gray-800 mb-4 text-center"
          >
            Rate
          </h2>
          <p id="rateValue" className="text-gray-600 text-center mb-4"></p>
          <form onSubmit={submitData} className="space-y-6">
            {/* Rating Stars */}
            <div className="flex justify-center">
              <ReactStars
                count={5}
                value={rateValue}
                onChange={(value) => setRateValue(value)}
                size={50}
                activeColor="#ffd700"
              />
            </div>

            {/* Comment Section */}
            <div>
              <label
                htmlFor="review"
                className="block text-gray-700 font-medium mb-2"
              >
                Add Comment
              </label>
              <textarea
                id="review"
                name="review"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Write your review here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RateForm;