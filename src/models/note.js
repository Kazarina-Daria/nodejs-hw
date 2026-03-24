import mongoose from "mongoose";
import {model} from "mongoose";

export const noteSchema = new mongoose.Schema(
  {
title : {
  type :String,
  required: true,
  trim :true,
},
content :{
  type: String,
  default : false,
  trim : true,
},
tag :{
  type : String,
  enum : ["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"],
  default : "Todo",
},
},
{
  timestamps : true,
},
);
export const Note = model("Note", noteSchema);
