import { useState } from "react";

export const useFeedbackModal = () => {
  const [feedback, setFeedback] = useState({
    open: false,
    title: "",
    message: "",
  });

  const showFeedback = (title, message) => {
    setFeedback({
      open: true,
      title,
      message,
    });
  };

  const closeFeedback = () => {
    setFeedback((current) => ({
      ...current,
      open: false,
    }));
  };

  return {
    feedback,
    showFeedback,
    closeFeedback,
  };
};
