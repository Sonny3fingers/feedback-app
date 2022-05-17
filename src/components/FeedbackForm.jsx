import React, { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(4);

  const { addFeedbackHandler, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const changeTextHandler = ({ target: { value } }) => {
    if (value === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (value !== "" && value.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedbackHandler(newFeedback);
      }
    }
    setBtnDisabled(true); // 👈  add this line to reset disabled
    setRating(5); //👈 add this line to set rating back to 5
    setText("");
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          // select={(rating) => {
          //   setRating(rating);
          // }}
          select={setRating}
          selected={rating}
        />
        <div className="input-group">
          <input
            onChange={changeTextHandler}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
