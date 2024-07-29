// src/components/Proctoring.js

import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import { useDisclosure } from '@chakra-ui/react';
import AlertModal from './AlertModal';

const URL = 'YOUR_MODEL_URL';
let model, webcam, maxPredictions;

const Proctoring = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    loadModel();
  }, []);

  async function loadModel() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById('webcam-container').appendChild(webcam.canvas);
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    
    // Assuming checkIfUserLookedAway is a function that returns true if user looked away
    if (checkIfUserLookedAway(prediction)) {
      setAlertCount((prev) => prev + 1);
      onOpen();
      if (alertCount >= 2) {
        // Stop the quiz and save progress
      }
    }
  }

  function checkIfUserLookedAway(prediction) {
    // Add your logic here to determine if the user looked away based on the prediction
    // Example logic:
    return prediction.some(pred => pred.className === 'LookedAway' && pred.probability > 0.8);
  }

  return (
    <div>
      <div id="webcam-container"></div>
      <AlertModal isOpen={isOpen} onClose={onClose} alertCount={alertCount} />
    </div>
  );
};

export default Proctoring;
