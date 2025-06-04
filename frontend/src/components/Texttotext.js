import { useState } from "react";
import { Container, Typography, Paper, Select, MenuItem, Grid, Box, TextField, Button } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Texttotext() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]); // State to store answers
  const [score, setScore] = useState(null); // State for the score

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

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleDone = () => {
    if (selectedQuestion !== null) {
      const answer = answers[selectedQuestion] || "";
      const newAnswers = [...answers];
      newAnswers[selectedQuestion] = answer;
      setAnswers(newAnswers);

      if (selectedQuestion < roleQuestions[selectedRole].length - 1) {
        setSelectedQuestion(selectedQuestion + 1);
      }
    }
  };

  const generateScore = () => {
    const score = (answers.filter(answer => answer.trim().length > 0).length / roleQuestions[selectedRole].length) * 10;
    setScore(score.toFixed(1)); // Score out of 10
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#8E24AA" gutterBottom textAlign="center">
          Interview Question Practice
        </Typography>

        <Paper elevation={3} sx={{ p: 3, bgcolor: "#F3E5F5", borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="#6A1B9A" gutterBottom>
            Select Job Role
          </Typography>
          <Select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setSelectedQuestion(null); // Reset the question when role changes
              setAnswers([]); // Reset answers when role changes
              setScore(null); // Reset score
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
              <Grid item xs={12}>
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
                      {answers[index] && (
                        <Typography variant="body2" color="textSecondary" mt={1}>
                          Answer: {answers[index]}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Paper>
              </Grid>

              {selectedQuestion !== null && (
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, bgcolor: "#E1BEE7", borderRadius: 3 }}>
                    <Typography variant="h6" fontWeight="bold" color="#6A1B9A" gutterBottom>
                      Selected Question
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                      {roleQuestions[selectedRole][selectedQuestion]}
                    </Typography>

                    <TextField
                      label="Your Answer"
                      multiline
                      rows={4}
                      value={answers[selectedQuestion] || ""}
                      onChange={(e) => handleAnswerChange(selectedQuestion, e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />

                    <Button
                      variant="contained"
                      color="#6A1B9A"
                      onClick={handleDone} // Save the answer and move to the next question
                      sx={{ mt: 2 }}
                    >
                      Done
                    </Button>
                  </Paper>
                </Grid>
              )}

              {selectedQuestion === roleQuestions[selectedRole].length - 1 && (
                <Grid item xs={12} textAlign="center">
                  <Button
                    variant="contained"
                    color="#6A1B9A"
                    onClick={generateScore}
                    sx={{ mt: 2 }}
                  >
                    Generate Score
                  </Button>

                  {score !== null && (
                    <Paper elevation={2} sx={{ p: 3, bgcolor: "#F3E5F5", borderRadius: 3, mt: 3 }}>
                      <Typography variant="h6" fontWeight="bold" color="#6A1B9A">
                        Your Score: {score} / 10
                      </Typography>
                    </Paper>
                  )}
                </Grid>
              )}
            </Grid>
          )}
        </Paper>
      </Container>
    </>
  );
}
