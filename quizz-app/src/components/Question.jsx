import React from 'react';
import { Box, RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';

function Question({ question, onAnswer, answer }) {
  return (
    <Box>
      <Text>{question.question}</Text>
      <RadioGroup onChange={(val) => onAnswer(question.id, val)} value={answer}>
        <Stack>
          {question.options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}

export default Question;
