import { model, Schema } from "mongoose";

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const tagModel = model("Tag", tagSchema);
