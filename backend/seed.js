import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/question.model.js";

dotenv.config();  // Load environment variables

const predefinedQuestions = [
  {
    jobRole: "Software Engineer",
    difficulty: "Easy",
    question: "What is a variable in programming?",
    correctAnswer: "A container that holds data.",
    choices: [
      "A container that holds data.",
      "A type of loop.",
      "A function that returns a value.",
      "A data structure."
    ],
    keywords: ["variable", "data", "container"]
  },
  {
    jobRole: "Software Engineer",
    difficulty: "Easy",
    question: "What is an array?",
    correctAnswer: "A collection of elements stored in a single variable.",
    choices: [
      "A collection of elements stored in a single variable.",
      "A single value.",
      "A type of loop.",
      "A function."
    ],
    keywords: ["array", "collection", "elements"]
  },
  {
    jobRole: "Software Engineer",
    difficulty: "Easy",
    question: "What is a function?",
    correctAnswer: "A reusable block of code that performs a task.",
    choices: [
      "A reusable block of code that performs a task.",
      "A type of variable.",
      "A data structure.",
      "A collection of objects."
    ],
    keywords: ["function", "block", "code"]
  }
];

const seedDB = async () => {
  try {
    // Wait for the connection to be established
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to the database!');
    });

    // Clear existing data
    console.log('Clearing existing questions...');
    await Question.deleteMany({});  // Clear existing data

    // Insert new predefined questions
    console.log('Inserting predefined questions...');
    await Question.insertMany(predefinedQuestions);

    console.log("Database seeded with predefined questions!");

    // Close the connection after seeding
    mongoose.connection.close();
  } catch (err) {
    console.error("Error during seeding:", err);
  }
};

// Start seeding process
mongoose.connect('mongodb+srv://kanhaiyasaini178:mockviews@cluster0.1ym2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000,  // 20 seconds timeout
})
.then(() => {
  seedDB(); // Call the seeding function once the connection is established
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
