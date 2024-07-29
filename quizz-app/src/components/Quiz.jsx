import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Stack } from '@chakra-ui/react';
import Question from './Question';
import Timer from './Timer';
import Proctoring from './Proctoring';
import questions from '../questions';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [alerts, setAlerts] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handleProctoringAlert = () => {
    setAlerts(alerts + 1);
    if (alerts + 1 >= 3) {
      setQuizEnded(true);
    }
  };

  useEffect(() => {
    if (timeOver) {
      setQuizEnded(true);
    }
  }, [timeOver]);

  return (
    <Box p={5}>
      <Proctoring onAlert={handleProctoringAlert} />
      {quizEnded ? (
        <Text>Quiz Ended</Text>
      ) : (
        <>
          <Timer duration={300} onTimeOver={() => setTimeOver(true)} />
          <Stack spacing={4}>
            <Question
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              answer={answers[questions[currentQuestion].id]}
            />
            <Button onClick={nextQuestion} disabled={currentQuestion >= questions.length - 1}>
              Next Question
            </Button>
            <Text>Alerts: {alerts}</Text>
          </Stack>
        </>
      )}
    </Box>
  );
}

export default Quiz;
