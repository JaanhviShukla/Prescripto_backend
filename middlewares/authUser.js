import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

    // Check token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId safely
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
