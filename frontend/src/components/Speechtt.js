
import { useState } from "react";
import { Container, Typography, Button, Paper, Box, Select, MenuItem, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Navbar from "./Navbar"; // Importing the Navbar component

export default function SpeechAnalysis() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  let recognition = null;

  const handleStartRecording = () => {
    if (selectedQuestion === null) {
      alert("Please select a question first.");
      return;
    }

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition. Please use Chrome.");
      return;
    }

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setAnswers((prevAnswers) => {
        const updatedAnswers = { ...prevAnswers, [selectedQuestion]: speechText };
        if (Object.keys(updatedAnswers).length === questions[selectedJobRole].length) {
          setTimeout(() => setShowResults(true), 500);
        }
        return updatedAnswers;
      });
    };

    recognition.start();
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach((answer) => {
      if (answer.length > 20) score += 2; // Simple length-based scoring
      else if (answer.length > 10) score += 1;
    });
    return score;
  };

  const questions = {
    "Software Engineer": [
      "What programming languages are you proficient in?",
      "How do you approach debugging a complex issue?",
      "Describe a challenging software project you worked on.",
      "How do you ensure code quality and maintainability?",
      "What are your favorite development tools and why?"
    ],
    "Business Development": [
      "How do you identify new business opportunities?",
      "Describe a successful deal you closed and how you achieved it.",
      "What strategies do you use to build client relationships?",
      "How do you handle objections from potential clients?",
      "What metrics do you use to measure business success?"
    ]
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#8E24AA" gutterBottom textAlign="center">
          Speech-to-Text Interview Practice
        </Typography>

        <Paper elevation={3} sx={{ p: 3, bgcolor: "#F3E5F5", borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="#6A1B9A" gutterBottom>
            Select Job Role
          </Typography>
          <Select
            value={selectedJobRole}
            onChange={(e) => {
              setSelectedJobRole(e.target.value);
              setSelectedQuestion(null);
              setAnswers({});
            }}
            displayEmpty
            sx={{ mb: 3, width: "100%", bgcolor: "#fff", borderRadius: 2 }}
          >
            <MenuItem value="">Select a job role</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Business Development">Business Development</MenuItem>
          </Select>

          {selectedJobRole && (
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Paper elevation={2} sx={{ p: 2, bgcolor: "#EDE7F6", borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" color="#6A1B9A" gutterBottom>
                    Select a Question
                  </Typography>
                  {questions[selectedJobRole].map((question, index) => (
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
                      {questions[selectedJobRole][selectedQuestion]}
                    </Typography>
                    {answers[selectedQuestion] && (
                      <Typography variant="body2" color="green" mt={2}>
                        Answer: {answers[selectedQuestion]}
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        bgcolor: isRecording ? "#D81B60" : "#8E24AA",
                        '&:hover': { bgcolor: isRecording ? "#AD1457" : "#6A1B9A" },
                        color: "white"
                      }}
                      onClick={handleStartRecording}
                      disabled={isRecording || selectedQuestion === null}
                    >
                      {isRecording ? "Listening..." : "Start Speaking"}
                    </Button>
                  </Paper>
                )}
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>

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

