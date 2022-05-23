import React, { useState } from "react";

import "./AnswerItem.css";

const AnswerItem = ({
  point,
  answer_text,
  clickHandler,
  correctAnswer,
  currentAnswer,
}) => {
  const [isChecked, setisChecked] = useState(false);

  const onClickHandler = () => {
    if (!currentAnswer) {
      clickHandler(answer_text);
      setisChecked(true);
    }
  };
  let style = "uncheck";

  if (currentAnswer) {
    if (answer_text === correctAnswer) style = "correct";
    else {
      style = isChecked ? "uncorrect" : "";
    }
  }

  return (
    <li className={` answer_item ${style}`} onClick={onClickHandler}>
      <p className="point">{point}</p>
      <p className="answer_text">{answer_text}</p>
    </li>
  );
};

export default AnswerItem;
