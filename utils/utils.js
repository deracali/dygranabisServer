import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const secret = "kcnknakndnjnduuem"
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: '30d',
      }
    );
  };