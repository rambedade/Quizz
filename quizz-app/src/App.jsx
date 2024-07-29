import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Quiz from './components/Quiz';

function App() {
  return (
    <Box textAlign="center" p={5}>
      <Heading>AI-Powered Proctored Quiz</Heading>
      <Quiz />
    </Box>
  );
}

export default App;
