import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { Session } from './models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerUser = async (res, req, next) => {
  const { email, password, username } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const createSession = await req.session.create(user._id);
    setSessionCookies(res, createSession);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (res, req, next) => {
  const{email,password}=req.body;
  try{
const user = await User.findOne({email});
if(!user){
  throw createHttpError(401,'Invalid credentials');
}
const isValidPassword = await bcrypt.compare(password, user.password);
if(!isValidPassword){
  throw createHttpError(401,'Invalid credentials');
}
await Session.deleteOne({userId: user._id});
const newSession = await createSession(user._id);
setSessionCookies(res, newSession);
res.status(200).json(user);
  }catch(error){
    next(error);
  }
};

export const refreshUserSession = async(req,res, next) => {
  try{
    const session = await Session.findOne({
      _id : req.cookies.sessionId,
refreshToken : req.cookies.refreshToken,
    });
if(!session){
  createHttpError(401,'Session not found');
};
const isRefreshTokenExpired = new Date > new Date(session.refreshTokenUntil);
if(isRefreshTokenExpired){
    createHttpError(401,'Session token expired');
};
await Session.deleteOne({
  _id:req.cookies.sessionId,
  refreshToken: req.cookies.refreshToken,
});

const newSession = await createSession(session.userId);
setSessionCookies(res, newSession);
  res.status(200).json({
    message: 'Session refreshed',
  });
  }catch(error){next(error);}
};


export const logoutUser = async (res, req) => {
const {sessionId}= req.body;
if(sessionId){
await Session.deleteOne({_id: sessionId});
res.clearCookie('sessionId');
res.clearCookie('accessTocken');
res.clearCookie('refreschTocken');
res.status(204).send();
};
};
