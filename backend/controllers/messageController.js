import express from 'express'
import User from '../models/usermodel.js'
import Message from '../models/messageModel.js'

const getUsersForSidebar = async (req, res) => {
    try {
        const { loginInUserId } = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loginInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}

const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find(
            {
                $or: [
                    { senderId: myId, receiverId: userToChatId },
                    { senderId: userToChatId, receiverId: myId },
                ],
            }
        );
    } catch (error) {
        console.log("Error in getMessage", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
export { getUsersForSidebar, getMessage, sendMessage };

