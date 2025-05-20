import users from "../Models/User.Schema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const name = username;
        const user = await users.findOne({ email: email });
        const uniqUserName = await users.findOne({ name: name });

        if (user) {
            return res.status(200).json({ message: "User already exists" });
        }

        if (uniqUserName) {
            return res.status(200).json({ message: "Username already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            name,
            email,
            password: hashPassword
        });

        
        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const userLogin= async(req, res) =>{
    try {
        const {email,password}=req.body;
        const user=await users.findOne({email:email}); 
        if(!user){
            res.status(200).json({message:"Email not found"})
        }
        else{
            console.log(email, password)
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(200).json({message:"Invalid credentials"})
           
                 }
            else{
                const token= jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"2h"});
            res.status(200).json({message:"Login successful", token:token});
            }
          
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
}
}

export const getUserByToken = async (req, res) => {
    try {
       
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const userId = decoded.id;
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        res.status(500).json({ message: "Internal server error", error });
    }
};  