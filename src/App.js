import { useEffect, useReducer } from "react";
import "./App.css";
import AnswerItem from "./components/AnswerItem/AnswerItem";
import Button from "./components/Button/Button";
import Result from "./components/Result/Result";

const URL =
  "https://quize-57337-default-rtdb.europe-west1.firebasedatabase.app//questions/capitals.json";
const TYPES = {
  SET_SHOW_RESULTS: "SET_SHOW_RESULTS",
  SET_NEXT_QUESTION: "SET_NEXT_QUESTION",
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_CORRECT_QUESTIONS_COUNT: "SET_CORRECT_QUESTIONS_COUNT",
  SET_CURRENT_ANSWER: "SET_CURRENT_ANSWER",
  RESET: "RESET",
};

const INITIAL_STATE = {
  questions: [],
  currentQuestionId: 0,
  currentAnswer: null,
  showResult: false,
  correctAnswerCount: 0,
};

const qReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_SHOW_RESULTS:
      return {
        ...state,
        showResult: true,
      };
    case TYPES.SET_NEXT_QUESTION:
      return {
        ...state,
        currentAnswer: null,
        currentQuestionId: state.currentQuestionId++,
      };
    case TYPES.SET_QUESTIONS:
      return { ...state, questions: payload };
    case TYPES.SET_CORRECT_QUESTIONS_COUNT:
      return {
        ...state,
        correctAnswerCount: state.correctAnswerCount + 1,
      };
    case TYPES.SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: payload,
      };
    case TYPES.RESET:
      return {
        ...state,
        currentQuestionId: 0,
        currentAnswer: null,
        showResult: false,
        correctAnswerCount: 0,
      };
  }
};

function App() {
  const [
    {
      questions,
      currentQuestionId,
      currentAnswer,
      showResult,
      correctAnswerCount,
    },
    dispatch,
  ] = useReducer(qReducer, INITIAL_STATE);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(URL);
    const data = await response.json();

    dispatch({ type: TYPES.SET_QUESTIONS, payload: data });
  };

  const setNextQuestionHandler = () => {
    if (currentQuestionId < questions.length - 1) {
      dispatch({
        type: TYPES.SET_NEXT_QUESTION,
      });
    } else {
      console.log("show");
      dispatch({
        type: TYPES.SET_SHOW_RESULTS,
      });
    }
  };

  const resetHandler = () => {
    dispatch({ type: TYPES.RESET });
  };

  const checkAnswerHandler = (currentAnswer) => {
    dispatch({
      type: TYPES.SET_CURRENT_ANSWER,
      payload: currentAnswer,
    });
    const correctAnswer = questions[currentQuestionId].correctAnswer;
    if (currentAnswer === correctAnswer) {
      dispatch({
        type: TYPES.SET_CORRECT_QUESTIONS_COUNT,
      });
    }
  };
  const points = ["A", "B", "C", "D"];
  return (
    <div className="container">
      <div className="content">
        {showResult && (
          <>
            <Result
              count={correctAnswerCount}
              total={questions.length}
            />
            <div className="action">
              <Button onClick={resetHandler} textContent="Еще раз" />
            </div>
          </>
        )}
        {!!questions.length && !showResult && (
          <>
            <div className="question">
              <p className="question_count">{`Вопрос ${
                currentQuestionId + 1
              } из ${questions.length}`}</p>
              <div>
                <img
                  src={questions[currentQuestionId].img}
                  alt="country_flag"
                />
                <p className="question_text">
                  {questions[currentQuestionId].question}
                </p>
              </div>
            </div>
            <ul className="answer_items">
              {questions[currentQuestionId].answers.map(
                (answer, index) => (
                  <AnswerItem
                    key={answer}
                    point={points[index]}
                    answer_text={answer}
                    clickHandler={checkAnswerHandler}
                    correctAnswer={
                      questions[currentQuestionId].correctAnswer
                    }
                    currentAnswer={currentAnswer}
                  />
                )
              )}
            </ul>
            <div className="action">
              {currentAnswer && (
                <Button
                  onClick={setNextQuestionHandler}
                  textContent="Дальше"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
