import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

    // Check token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const dtoken = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Attach userId safely
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authDoctor;
