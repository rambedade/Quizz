import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function Timer({ duration, onTimeOver }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeOver();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return <Text>Time Left: {timeLeft}s</Text>;
}

export default Timer;
