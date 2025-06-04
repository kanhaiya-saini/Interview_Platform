import { useState, useRef } from "react";
import { Container, Typography, Button, Paper, Box, Select, MenuItem, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Navbar from "../components/Navbar";

export default function VideoRecording() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const roles = ["Software Developer", "Data Analyst", "UI/UX Designer"];
  const roleQuestions = {
    "Software Developer": [
      "Tell us about a challenging project you worked on and how you overcame the obstacles.",
      "How do you handle tight deadlines and prioritize tasks in a project?",
      "Can you describe a time you had to work with a difficult team member? How did you handle it?",
      "What are some of the most recent technologies you have worked with, and what do you think about them?",
      "How do you stay motivated and focused during long and complex tasks?"
    ],
    "Data Analyst": [
      "Describe a time you had to work with a messy dataset. How did you clean it?",
      "How do you approach communicating insights to non-technical stakeholders?",
      "What tools and technologies do you prefer for data analysis and why?",
      "Tell us about a data-driven decision you influenced.",
      "How do you handle missing or inconsistent data?"
    ],
    "UI/UX Designer": [
      "Describe your design process from start to finish.",
      "How do you balance user needs with business goals?",
      "Tell us about a time you improved the usability of a product.",
      "What tools do you use for wireframing and prototyping?",
      "How do you gather and incorporate user feedback?"
    ]
  };

  // Handle recording start and stop logic
  const startRecording = async () => {
    if (selectedQuestion === null) {
      alert("Please select a question first.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;

    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => chunks.push(event.data);

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const videoObjectURL = URL.createObjectURL(blob);
      const duration = Math.floor(blob.size / 10000); 
      setVideoDuration(duration);
      setVideoURL(videoObjectURL);
      setRecordedVideos((prev) => [
        ...prev,
        { question: selectedQuestion, videoURL: videoObjectURL, duration }
      ]);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    videoRef.current.srcObject?.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  const handleNextQuestion = () => {
    if (selectedQuestion === roleQuestions[selectedRole].length - 1) {
      setShowResults(true); // If it's the last question, show the results
    } else {
      setSelectedQuestion((prev) => prev + 1); // Move to the next question
    }
  };

  // Calculate score based on video duration (in seconds)
  const calculateScore = () => {
    let score = 0;
    recordedVideos.forEach((video) => {
      const durationInMinutes = video.duration / 60;
      if (durationInMinutes >= 1) score += 2; // For long enough video (1 min or more)
      else if (durationInMinutes >= 0.5) score += 1; // For shorter videos
    });
    return Math.min(score, 10); // Max score is 10
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#8E24AA" gutterBottom textAlign="center">
          Video Recording Interview Practice
        </Typography>

        <Paper elevation={3} sx={{ p: 3, bgcolor: "#F3E5F5", borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="#6A1B9A" gutterBottom>
            Select Job Role
          </Typography>
          <Select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setSelectedQuestion(null);
            }}
            displayEmpty
            sx={{ mb: 3, width: "100%", bgcolor: "#fff", borderRadius: 2 }}
          >
            <MenuItem value="">Select a job role</MenuItem>
            {roles.map((role, index) => (
              <MenuItem key={index} value={role}>{role}</MenuItem>
            ))}
          </Select>

          {selectedRole && (
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Paper elevation={2} sx={{ p: 2, bgcolor: "#EDE7F6", borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" color="#6A1B9A" gutterBottom>
                    Select a Question
                  </Typography>
                  {roleQuestions[selectedRole].map((question, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedQuestion(index)}
                      sx={{
                        p: 2,
                        my: 1,
                        cursor: "pointer",
                        bgcolor: selectedQuestion === index ? "#CE93D8" : "#fff",
                        borderRadius: 2,
                        transition: "0.3s",
                        '&:hover': { bgcolor: "#E1BEE7" }
                      }}
                    >
                      <Typography variant="body1" fontWeight={selectedQuestion === index ? "bold" : "normal"}>
                        {index + 1}. {question}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={7}>
                {selectedQuestion !== null && (
                  <Paper elevation={2} sx={{ p: 3, bgcolor: "#E1BEE7", borderRadius: 3, textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" color="#6A1B9A" gutterBottom>
                      Selected Question
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                      {roleQuestions[selectedRole][selectedQuestion]}
                    </Typography>
                    <video ref={videoRef} autoPlay className="w-full max-h-[400px] rounded-lg shadow" />

                    {/* Controls */}
                    <div className="mt-6 flex justify-center gap-4">
                      {recording ? (
                        <Button
                          onClick={stopRecording}
                          variant="contained"
                          sx={{
                            bgcolor: "#D81B60",
                            '&:hover': { bgcolor: "#AD1457" },
                            color: "white"
                          }}
                        >
                          Stop Recording
                        </Button>
                      ) : (
                        <Button
                          onClick={startRecording}
                          variant="contained"
                          sx={{
                            bgcolor: "#8E24AA",
                            '&:hover': { bgcolor: "#6A1B9A" },
                            color: "white"
                          }}
                        >
                          Start Recording
                        </Button>
                      )}
                    </div>

                    {/* Show recorded video next to the question */}
                    {videoURL && (
                      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body1" color="#6A1B9A" fontWeight="bold">
                          Recorded Answer:
                        </Typography>
                        <Box sx={{ width: "3cm", height: "3cm", overflow: "hidden" }}>
                          <video src={videoURL} controls className="w-full h-full object-cover" />
                        </Box>
                      </Box>
                    )}

                    {/* Next Question Button */}
                    <div className="mt-4">
                      <Button
                        onClick={handleNextQuestion}
                        variant="contained"
                        sx={{
                          bgcolor: "#8E24AA",
                          '&:hover': { bgcolor: "#6A1B9A" },
                          color: "white"
                        }}
                      >
                        Next Question
                      </Button>
                    </div>
                  </Paper>
                )}
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>

      {/* Display Results Dialog */}
      <Dialog open={showResults} onClose={() => setShowResults(false)}>
        <DialogTitle>Your Score</DialogTitle>
        <DialogContent>
          <Typography variant="h6">You scored {calculateScore()} out of 10!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResults(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
