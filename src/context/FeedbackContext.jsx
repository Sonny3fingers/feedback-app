import React, { createContext, useState } from "react";
import { v4 as uuid4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 4,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 3,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 5,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  // Add feedback
  const addFeedbackHandler = (newFeedback) => {
    newFeedback.id = uuid4();
    setFeedback([newFeedback, ...feedback]);
  };
  // Delete feedback
  const feedbackDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  // Update feedback data
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );

    // Being able to submit new feedback after editing
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackDelete,
        addFeedbackHandler,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
