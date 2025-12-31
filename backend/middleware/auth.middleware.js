import jwt from 'jsonwebtoken'
import User from '../models/usermodel.js'

export const protectRoute = async (req, res, next) => {
  console.log('🔍 ALL COOKIES:', req.cookies);  // ← SHARE THIS OUTPUT
  console.log('🔍 JWT specifically:', req.cookies.jwt);
  try {
    const token = req.cookies.jwt;
    // console.log(token);
    if (!token) {
      res.status(401).json({ message: "Unauthorized : no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized : Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });

    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect router server ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }

}


