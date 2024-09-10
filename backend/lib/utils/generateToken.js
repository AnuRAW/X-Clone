import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    {
      _id: userId,
    },
    process.env.JWT_SECRET,{
        expiresIn: '15d'
    }
  );
  res.cookie("jwt", token, {
    maxAge: 15*24*60*60*1000, // 15 days//MS
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== 'development', //only send over HTTPS, //only send over HTTPS
    sameSite: "strict", //prevent CSRF attacks  
  });
};