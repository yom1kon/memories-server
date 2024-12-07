import mongoose from "mongoose";
import PostMessage from "../modules/postMessage.js";


export const getPosts = async (req,res)=>{
    try {
        // const postMessage = await PostMessage.find();
        // console.log(postMessage);
        // res.status(200).json(postMessage);
         // 判断是否有 userId（通过身份验证中间件注入）
    const postMessage = await PostMessage.find(); // 未登录用户：返回所有帖子
    res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {      
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
   
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndDelete(id);

    res.json({message: 'Post deleted successfully'});

}

export const likePost = async (req, res) => {
    const {id} =req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});   

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((userId)=> userId=== String(req.userId));

    if(index===-1) {
        post.likes.push(req.userId);
    }else {
        post.likes = post.likes.filter((id)=>id!==String(req.userId))

    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json(updatedPost);
}

