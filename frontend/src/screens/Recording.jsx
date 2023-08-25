import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import url from '../config';

function ScreenRecording() {
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = async (event) => {
        const formData = new FormData();
        formData.append('video', event.data, 'recorded-video.webm');
        try {
          const response = await fetch(`${url}/record/recording`, {
            method: 'POST',
            body: formData,
          });
          console.log('response: ', response);
        } catch (err) {
          console.log('my error: ', err);
        }
      };

      recorder.onstop = async () => {
        setRecording(false);
      };

      setStream(stream);
      setRecorder(recorder);
      setRecording(true);
      recorder.start();
    } catch (error) {
      console.error('Permission denied or error:', error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
    }
    toast.success('Video saved successfully.');
  };

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h2>Welcome to video recording App</h2>
          <div className="d-flex">
            {!recording ? (
              <Button
                variant="primary"
                className="me-3"
                onClick={startRecording}
              >
                Start Rocording
              </Button>
            ) : (
              <Button
                variant="primary"
                className="me-3"
                onClick={stopRecording}
              >
                Stop Rocording
              </Button>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default ScreenRecording;
