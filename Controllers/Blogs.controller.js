import mongoose from "mongoose";
import blogs from "../Models/Blog.Schema.js";
import users from "../Models/User.Schema.js";
import jwt from "jsonwebtoken";
import { format } from "date-fns";


export const getAllBlogs= async(req, res)=>{
   try {
    const blogsData= await blogs.find();
    res.status(200).json({blogsData});
   } catch (error) {
    res.status(500).json({message:"Internal server error"})
   }
}

export const createBlog = async (req, res) => {
    try {
        const { title, category, content} = req.body;
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

        const newBlog = new blogs({
            title,
            category,
            content,
            image: req.file ? req.file.path : null, 
            author:  user.name,
            userId: user._id
        });
 await newBlog.save();
        res.status(201).json({ message: "Blog created successfully" , blog:newBlog });
    } catch (error) {
        res.status(500).json({ message: " cc Internal server error", error });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, category, content, id } = req.body;
        console.log(title, category, content, id)

        // ✅ Validate ID format before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await blogs.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // ✅ Update fields while ensuring the previous image remains
        blog.title = title;
        blog.category = category;
        blog.content = content;
        blog.image = req.file?.path || blog.image;
        blog.updatedAt = format(new Date(), 'yyyy-MM-dd')

        await blog.save();
        res.status(200).json({ message: "Blog updated successfully", blog });
    } catch (error) {
        console.error("Error updating blog:", error); // ✅ Debugging improvement
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogs.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
