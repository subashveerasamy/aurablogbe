import blogs from "../Models/Blog.Schema.js";
import users from "../Models/User.Schema.js";


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
        // const user = await users.findById(id);

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        const newBlog = new blogs({
            title,
            category,
            content,
            image: req.file ? req.file.path : null, 
            author:  "djd",
            userId: "7387348"
        });
 await newBlog.save();
        res.status(201).json({ message: "Blog created successfully" , filePath: `/uploads/${req.file.filename}`, blog:newBlog });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, category, content, id } = req.body;
        const blog = await blogs.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        blog.title = title;
        blog.category = category;
        blog.content = content;
        blog.image = req.file ? req.file.path : blog.image;
        blog.updatedAt = format(new Date(), 'yyyy-MM-dd');

        await blog.save();
        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await blogs.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
