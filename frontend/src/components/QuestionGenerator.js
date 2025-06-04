import React, { useState } from "react";
import Navbar from "./Navbar";

const jobRoles = [
  "DSA", "Data Analyst", "Cloud Engineer",
  "Network Engineer", "System Administrator", "MERN Stack Developer"
];
const difficultyLevels = ["Easy", "Medium", "Hard"];

const predefinedQuestions = [
  {
    jobRole: "DSA",
    difficulty: "Easy",
    question: "What is a variable in programming?",
    correctAnswer: "A container that holds data.",
    options: [
      "A container that holds data.",
      "A type of loop.",
      "A function that returns a value.",
      "A data structure."
    ]
  },
  {
    jobRole: "DSA",
    difficulty: "Easy",
    question: "How many type of variable in programming?",
    correctAnswer: "5",
    options: [
      "4",
      "7",
      "5",
      "6"
    ]
  },
  {
    jobRole: "DSA",
    difficulty: "Easy",
    question: "What is an array?",
    correctAnswer: "A collection of elements stored in a single variable.",
    options: [
      "A collection of elements stored in a single variable.",
      "A single value.",
      "A type of loop.",
      "A function."
    ]
  },
  {
    jobRole: "DSA",
    difficulty: "Easy",
    question: "What is a function?",
    correctAnswer: "A reusable block of code that performs a task.",
    options: [
      "A reusable block of code that performs a task.",
      "A type of variable.",
      "A data structure.",
      "A collection of objects."
    ]
  },
  {
    jobRole: "DSA",
    difficulty: "Medium", 
    question: "What is the difference between synchronous and asynchronous programming?",
    options: [
        "Synchronous code executes sequentially, while asynchronous code allows execution without blocking.",
        "Asynchronous code is faster than synchronous code.",
        "Synchronous code is always better than asynchronous code.",
        "Asynchronous code only works with JavaScript."
    ],
    correctAnswer: "Synchronous code executes sequentially, while asynchronous code allows execution without blocking."
},
{
    jobRole: "DSA",
    difficulty: "Medium",
    question: "What is a closure in JavaScript?",
    options: [
        "A function that remembers the scope in which it was created.",
        "A function that executes immediately.",
        "A loop that keeps running indefinitely.",
        "A method to close a JavaScript application."
    ],
    correctAnswer: "A function that remembers the scope in which it was created."
},
{
    jobRole: "DSA",
    difficulty: "Medium",
    question: "What is memoization in programming?",
    options: [
        "An optimization technique that stores function results to avoid recomputation.",
        "A method to sort arrays quickly.",
        "A way to store data in a database.",
        "A technique used in machine learning."
    ],
    correctAnswer: "An optimization technique that stores function results to avoid recomputation."
},
{
    jobRole: "Data Analyst",
    difficulty: "Easy",
    question: "What is SQL?",
    options: [
        "SQL is a language for managing databases.",
        "SQL is a programming language like Python.",
        "SQL is only used in NoSQL databases.",
        "SQL stands for Structured Query Logic."
    ],
    correctAnswer: "SQL is a language for managing databases."
},
{
    jobRole: "Data Analyst",
    difficulty: "Easy",
    question: "What is a primary key?",
    options: [
        "A unique identifier for a row in a table.",
        "A key used to unlock databases.",
        "A special type of foreign key.",
        "A function in SQL that sorts data."
    ],
    correctAnswer: "A unique identifier for a row in a table."
},
{
    jobRole: "Data Analyst",
    difficulty: "Easy",
    question: "What is data visualization?",
    options: [
        "The graphical representation of data.",
        "A method of storing data in databases.",
        "A machine learning technique.",
        "A way to encrypt sensitive data."
    ],
    correctAnswer: "The graphical representation of data."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Easy",
  question: "What is cloud computing?",
  options: [
      "The delivery of computing services over the internet.",
      "A type of physical server located in a data center.",
      "A programming language for web applications.",
      "A software that controls network traffic."
  ],
  correctAnswer: "The delivery of computing services over the internet."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Easy",
  question: "What are the three main cloud service models?",
  options: [
      "IaaS, PaaS, SaaS",
      "HTTP, FTP, TCP",
      "SQL, NoSQL, GraphQL",
      "CPU, GPU, TPU"
  ],
  correctAnswer: "IaaS, PaaS, SaaS"
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Easy",
  question: "What is scalability in cloud computing?",
  options: [
      "The ability of a system to handle increased workload by adding resources.",
      "A security feature that encrypts cloud data.",
      "A method for reducing the cost of cloud services.",
      "A type of cloud storage format."
  ],
  correctAnswer: "The ability of a system to handle increased workload by adding resources."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Easy",
  question: "What is a public cloud?",
  options: [
      "A cloud computing model where services are available to multiple users over the internet.",
      "A cloud that is owned and used exclusively by a single company.",
      "A cloud service that can only be accessed from government networks.",
      "A type of cloud used for private data storage only."
  ],
  correctAnswer: "A cloud computing model where services are available to multiple users over the internet."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Easy",
  question: "What is a private cloud?",
  options: [
      "A cloud environment dedicated to a single organization.",
      "A cloud service that is freely available to all users.",
      "A storage system used by public institutions only.",
      "A cloud type that allows open-source contributions."
  ],
  correctAnswer: "A cloud environment dedicated to a single organization."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Medium",
  question: "What is cloud elasticity?",
  options: [
      "The ability of a cloud system to automatically scale resources based on demand.",
      "A feature that prevents unauthorized access to cloud data.",
      "A technique for reducing cloud service costs.",
      "A networking method used in cloud computing."
  ],
  correctAnswer: "The ability of a cloud system to automatically scale resources based on demand."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Medium",
  question: "What is the difference between vertical and horizontal scaling in cloud computing?",
  options: [
      "Vertical scaling increases the power of a single instance, while horizontal scaling adds more instances.",
      "Vertical scaling is cheaper than horizontal scaling.",
      "Horizontal scaling always requires serverless architecture.",
      "Vertical scaling is used only for storage, while horizontal scaling is for processing."
  ],
  correctAnswer: "Vertical scaling increases the power of a single instance, while horizontal scaling adds more instances."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Medium",
  question: "What is the Shared Responsibility Model in cloud computing?",
  options: [
      "A model that defines responsibilities between the cloud provider and the customer for security and maintenance.",
      "A cost-sharing agreement between different cloud providers.",
      "A framework for creating cloud-based applications.",
      "A strategy used by companies to avoid vendor lock-in."
  ],
  correctAnswer: "A model that defines responsibilities between the cloud provider and the customer for security and maintenance."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Medium",
  question: "What is a multi-cloud strategy?",
  options: [
      "A strategy where organizations use multiple cloud providers to avoid vendor lock-in and improve redundancy.",
      "A method for deploying cloud applications on multiple networks.",
      "A security technique used for cloud-based applications.",
      "A feature exclusive to hybrid cloud environments."
  ],
  correctAnswer: "A strategy where organizations use multiple cloud providers to avoid vendor lock-in and improve redundancy."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Medium",
  question: "What are containers in cloud computing?",
  options: [
      "Lightweight, standalone executable packages that include application code and dependencies.",
      "A type of virtual machine used exclusively for cloud storage.",
      "A security feature that encrypts cloud data.",
      "A networking protocol used for cloud applications."
  ],
  correctAnswer: "Lightweight, standalone executable packages that include application code and dependencies."
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Hard",
  question: "What is Chaos Engineering, and how is it applied in cloud computing?",
  options: [
    "A method for securing cloud environments from cyber threats",
    "A technique for optimizing cloud costs by reducing resource usage",
    "A discipline that helps build resilient systems by proactively testing failures in a controlled environment",
    "A process for monitoring cloud performance using AI-driven tools"
  ],
  correctAnswer: "A discipline that helps build resilient systems by proactively testing failures in a controlled environment",
  keywords: ["Chaos Engineering", "resilient systems", "failure testing", "controlled environment"]
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Hard",
  question: "How does Kubernetes handle high availability in a cloud environment?",
  options: [
    "By using a single master node with failover capabilities",
    "Through multiple master nodes, auto-scaling, and load balancing across worker nodes",
    "By running workloads on a dedicated server instead of a distributed cluster",
    "By relying solely on virtual machines without container orchestration"
  ],
  correctAnswer: "Through multiple master nodes, auto-scaling, and load balancing across worker nodes",
  keywords: ["Kubernetes", "high availability", "master nodes", "auto-scaling"]
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Hard",
  question: "What is a service mesh, and how does it enhance cloud networking?",
  options: [
    "A tool used for encrypting cloud network traffic",
    "A dedicated infrastructure layer that manages service-to-service communication, improving security, observability, and traffic control",
    "A method for deploying microservices without a container runtime",
    "A cloud security framework for compliance auditing"
  ],
  correctAnswer: "A dedicated infrastructure layer that manages service-to-service communication, improving security, observability, and traffic control",
  keywords: ["service mesh", "cloud networking", "service-to-service communication", "observability"]
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Hard",
  question: "What are the key security risks of multi-cloud environments?",
  options: [
    "Data inconsistency, API vulnerabilities, lack of centralized monitoring, and compliance challenges",
    "High latency and bandwidth issues due to data localization laws",
    "Inability to scale due to infrastructure limitations",
    "Cloud providers blocking access to other cloud services"
  ],
  correctAnswer: "Data inconsistency, API vulnerabilities, lack of centralized monitoring, and compliance challenges",
  keywords: ["multi-cloud", "security risks", "API vulnerabilities", "compliance challenges"]
},
{
  jobRole: "Cloud Engineer",
  difficulty: "Hard",
  question: "Explain the concept of FinOps in cloud cost management.",
  options: [
    "A practice that helps organizations optimize cloud costs through collaboration between finance, engineering, and operations teams",
    "A budgeting tool used by cloud providers to track customer spending",
    "A process of automatically shutting down cloud resources during non-peak hours",
    "A method for predicting cloud infrastructure failures"
  ],
  correctAnswer: "A practice that helps organizations optimize cloud costs through collaboration between finance, engineering, and operations teams",
  keywords: ["FinOps", "cloud cost management", "finance", "optimization"]
},

{
  jobRole: "Network Engineer",
  difficulty: "Hard",
  question: "What is networking?",
  options: [
    "A method of programming devices",
    "The practice of connecting computers and other devices to share resources and data.",
    "A way to design websites",
    "A type of computer hardware"
  ],
  correctAnswer: "The practice of connecting computers and other devices to share resources and data.",
  keywords: ["networking", "connect", "computers", "share data"]
},
{
  jobRole: "Network Engineer",
  difficulty: "Hard",
  question: "What is an IP address?",
  options: [
    "A network security feature",
    "A unique identifier assigned to each device on a network.",
    "A type of domain name",
    "A wireless communication protocol"
  ],
  correctAnswer: "A unique identifier assigned to each device on a network.",
  keywords: ["IP address", "identifier", "network", "device"]
},
{
  jobRole: "Network Engineer",
  difficulty: "Hard",
  question: "What is BGP hijacking, and how can it be prevented?",
  options: [
    "A way to optimize internet speed",
    "A protocol used to exchange routing information",
    "A malicious attack where a network misleads others about the best route for data. It can be prevented using RPKI, route filtering, and monitoring tools.",
    "A network encryption technique"
  ],
  correctAnswer: "A malicious attack where a network misleads others about the best route for data. It can be prevented using RPKI, route filtering, and monitoring tools.",
  keywords: ["BGP hijacking", "malicious attack", "RPKI", "route filtering"]
},
{ jobRole: "Network Engineer", difficulty: "Easy", question: "What is networking?", options: ["A type of programming", "The practice of connecting computers and other devices to share resources and data", "A method of hacking", "A database management system"], correctAnswer: "The practice of connecting computers and other devices to share resources and data." },
{ jobRole: "Network Engineer", difficulty: "Easy", question: "What is an IP address?", options: ["A physical address of a computer", "A unique identifier assigned to each device on a network", "A type of programming language", "A network protocol"], correctAnswer: "A unique identifier assigned to each device on a network." },
{ jobRole: "Network Engineer", difficulty: "Easy", question: "What is a router?", options: ["A device that forwards data packets between computer networks", "A type of firewall", "A method of data encryption", "A cloud storage service"], correctAnswer: "A device that forwards data packets between computer networks." },
{ jobRole: "Network Engineer", difficulty: "Easy", question: "What is the function of a switch in networking?", options: ["A switch connects devices within a network and forwards data to the correct destination", "A switch provides internet access", "A switch blocks unauthorized access", "A switch encrypts data"], correctAnswer: "A switch connects devices within a network and forwards data to the correct destination." },
{ jobRole: "Network Engineer", difficulty: "Easy", question: "What is the difference between IPv4 and IPv6?", options: ["IPv4 uses a 64-bit address scheme, whereas IPv6 uses a 128-bit address scheme", "IPv4 uses a 32-bit address scheme, whereas IPv6 uses a 128-bit address scheme", "IPv4 is used for private networks, while IPv6 is for public networks", "IPv4 supports unlimited addresses, whereas IPv6 has limitations"], correctAnswer: "IPv4 uses a 32-bit address scheme, whereas IPv6 uses a 128-bit address scheme." },
{ jobRole: "Network Engineer", difficulty: "Medium", question: "What is a subnet?", options: ["A segment of a network that improves performance and security", "A backup network", "A type of server", "A method of encrypting data"], correctAnswer: "A segment of a network that improves performance and security." },
{ jobRole: "Network Engineer", difficulty: "Medium", question: "What is a MAC address?", options: ["A unique hardware identifier assigned to network interfaces", "A type of network switch", "A protocol for wireless networks", "A security feature in routers"], correctAnswer: "A unique hardware identifier assigned to network interfaces." },
{ jobRole: "Network Engineer", difficulty: "Medium", question: "What is DNS (Domain Name System)?", options: ["A system that translates domain names into IP addresses", "A cloud storage service", "A type of firewall", "A method of data encryption"], correctAnswer: "A system that translates domain names into IP addresses." },
{ jobRole: "Network Engineer", difficulty: "Medium", question: "What is the difference between TCP and UDP?", options: ["TCP is connection-oriented and reliable, while UDP is connectionless and faster", "TCP is used only for emails, while UDP is used for web browsing", "TCP is for wired connections, while UDP is for wireless", "TCP is outdated, and UDP is the new standard"], correctAnswer: "TCP is connection-oriented and reliable, while UDP is connectionless and faster." },
{ jobRole: "Network Engineer", difficulty: "Medium", question: "What is a VLAN?", options: ["A Virtual Local Area Network that segments a network to improve efficiency and security", "A wireless access point", "A type of network firewall", "A method of encrypting data"], correctAnswer: "A Virtual Local Area Network that segments a network to improve efficiency and security." }
];

const QuestionGenerator = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleSelectRole = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : prev.length < 6 ? [...prev, role] : prev
    );
  };

  const generateQuestions = () => {
    if (selectedRoles.length === 0) {
      alert("Please select at least one job role.");
      return;
    }
    
    const filteredQuestions = predefinedQuestions.filter(q => 
      selectedRoles.includes(q.jobRole) && q.difficulty === difficulty
    );
    
    setQuestions(filteredQuestions);
    setUserAnswers(Array(filteredQuestions.length).fill(""));
    setScore(0);
  };

  const handleAnswerChange = (index, answer) => {
    setUserAnswers(prev => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  };

  const submitAnswers = () => {
    if (userAnswers.includes("")) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let totalScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        totalScore += 10;
      }
    });
    setScore(totalScore);
    alert(`Test completed! Your total score: ${totalScore}/50`);
  };

  return (
    <div className="bg-purple-200 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center p-8">
        <div className={`container mx-auto max-w-6xl grid gap-8 md:grid-cols-3`}>
          {/* Left Side: Job Roles & Difficulty Selection */}
          <div className={`bg-purple-400 p-8 rounded-lg shadow-lg transition-all duration-300 md:col-span-1`}>
            <div className="mb-8">
              <h3 className="text-3xl font-semibold mb-3">Select Job Roles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {jobRoles.map(role => (
                  <button 
                    key={role}
                    onClick={() => handleSelectRole(role)}
                    className={`px-4 py-2 rounded-lg transition font-medium
                      ${selectedRoles.includes(role) ? "bg-purple-400 text-purple" : "bg-gray-300 hover:bg-white-700"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Select Difficulty */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Difficulty</h3>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-400"
              >
                {difficultyLevels.map(level => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Right Side: Generate Questions */}
          <div className={`bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ${questions.length > 0 ? 'md:col-span-2' : 'md:col-span-2'}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Interview Questions</h2>
            <button
              onClick={generateQuestions}
              className="w-full px-6 py-3 font-semibold text-white rounded-lg bg-purple-600 hover:bg-purple-800 mb-6"
            >
              Generate Questions
            </button>
  
            {questions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Answer all questions:</h3>
                {questions.map((q, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-md bg-gray-100">
                    <p className="font-medium">{index + 1}. {q.question}</p>
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="mt-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={userAnswers[index] === option}
                            onChange={() => handleAnswerChange(index, option)}
                            className="form-radio h-4 w-4 text-purple-500"
                          />
                          <span>{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  onClick={submitAnswers}
                  className="w-full px-6 py-3 bg-purple-500 text-black rounded-lg mt-4 hover:bg-purple-700"
                >
                  Submit Answers
                </button>
              </div>
            )}
  
            {score > 0 && (
              <div className="mt-6 p-4 text-center bg-purple-200 text-purple-800 rounded-md font-semibold">
                Your Score: {score} / 50
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}  
export default QuestionGenerator;
