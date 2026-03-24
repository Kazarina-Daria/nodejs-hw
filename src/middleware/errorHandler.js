import {HttpError} from "http-errors";


export const errorHandler=(err, req, res, next)=> {
console.error(err);

if(err instanceof HttpError){
  return res.status(err.status).json({
    message: err.message || err.name,
  });
}

const isProduction = process.env.NODE_ENV === "production";

res.status(500).json({
  message : isProduction
  ? "Something went wrong"
  : err.message,
});
};
