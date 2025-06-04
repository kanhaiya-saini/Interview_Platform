import { useState } from "react";
import { Container, Typography, Button, Paper, TextField, Grid } from "@mui/material";
import { jsPDF } from "jspdf";
import Navbar from "./Navbar"; // Import the Navbar component

export default function ResumeBuilder() {
  const initialResumeData = {
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  };

  const [resumeData, setResumeData] = useState(initialResumeData);
  const [isPreview, setIsPreview] = useState(false);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setResumeData(initialResumeData);
    setIsPreview(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Resume", 90, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${resumeData.name}`, 20, 40);
    doc.text(`Email: ${resumeData.email}`, 20, 50);
    doc.text(`Phone: ${resumeData.phone}`, 20, 60);
    doc.text(`Education: ${resumeData.education}`, 20, 70);
    doc.text(`Experience: ${resumeData.experience}`, 20, 80);
    doc.text(`Skills: ${resumeData.skills}`, 20, 90);

    doc.save("Resume.pdf");
    resetForm(); // Clear the form after download
  };

  const handleDownloadWord = () => {
    const content = `
      Resume
      Name: ${resumeData.name}
      Email: ${resumeData.email}
      Phone: ${resumeData.phone}
      Education: ${resumeData.education}
      Experience: ${resumeData.experience}
      Skills: ${resumeData.skills}
    `;
    
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Resume.docx";
    link.click();
    URL.revokeObjectURL(link.href);

    resetForm(); // Clear the form after download
  };

  const handlePreview = () => {
    setIsPreview(true);
  };

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#8E24AA" textAlign="center" gutterBottom>
          Resume Builder
        </Typography>

        <Paper elevation={3} sx={{ p: 3, bgcolor: "#F3E5F5", borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={resumeData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={resumeData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={resumeData.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Education"
                name="education"
                value={resumeData.education}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experience"
                name="experience"
                value={resumeData.experience}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={resumeData.skills}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
            </Grid>
          </Grid>

          {/* Preview Section */}
          {isPreview && (
            <Paper sx={{ mt: 3, p: 3, bgcolor: "#E1BEE7", borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" color="#8E24AA" gutterBottom>
                Resume Preview
              </Typography>
              <Typography variant="body1"><strong>Name:</strong> {resumeData.name}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {resumeData.email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {resumeData.phone}</Typography>
              <Typography variant="body1"><strong>Education:</strong> {resumeData.education}</Typography>
              <Typography variant="body1"><strong>Experience:</strong> {resumeData.experience}</Typography>
              <Typography variant="body1"><strong>Skills:</strong> {resumeData.skills}</Typography>
            </Paper>
          )}

          {/* Buttons to trigger preview and download */}
          <Grid container spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
            <Grid item>
              <Button variant="contained" sx={{ bgcolor: "#8E24AA", color: "white" }} onClick={handlePreview}>
                Preview Resume
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ bgcolor: "#8E24AA", color: "white" }} onClick={handleDownloadPDF}>
                Download as PDF
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ bgcolor: "#6A1B9A", color: "white" }} onClick={handleDownloadWord}>
                Download as Word
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
