import jwt = require('express-jwt');

export const auth = jwt({ secret: process.env.JWT_SECRET as string });
