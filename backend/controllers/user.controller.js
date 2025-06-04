
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;
         
        if (!name || !email || !phoneNumber || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user without profile image if no file is uploaded
        const newUser = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            profile: {
                bio: "",
                skills: []
            }});

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Fetch user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }
        if (user.Blocked) {
            return res.status(400).json({
            message: "Account is blocked.",
            success: false
            });
        }
        

        // Check if the account is blocked
        if (user.Blocked) {
            return res.status(400).json({
                message: "Account is blocked.",
                success: false
            });
        }

        // Update last login time
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare user data to send in response
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
            resume: user.resume
        };

        // Return response with token and user data
        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.name}`,
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber, bio, skills } = req.body;
        console.log(req.body);
       


        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        

        await user.save();

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const saveTestResult = async (req, res) => {
    try {
        const { userId, questions } = req.body;

        if (!userId || !questions || questions.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid test data." });
        }

        let totalScore = 0;

        // Calculate total score from question attempts
        const questionAttempts = questions.map(q => {
            totalScore += q.score;
            return {
                questionId: q.questionId,
                userAnswer: q.userAnswer,
                correctAnswer: q.correctAnswer,
                score: q.score
            };
        });

        // Update user test history
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        user.testHistory.push({ score: totalScore, questionsAttempted: questionAttempts });
        await user.save();

        res.json({ success: true, message: "Test results saved successfully.", score: totalScore });
    } catch (error) {
        console.error("Error saving test results:", error);
        res.status(500).json({ success: false, message: "Error saving test results." });
    }
};



export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getTestHistory = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate("testHistory.questionsAttempted.questionId");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, testHistory: user.testHistory });
    } catch (error) {
        console.error("Error fetching test history:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



