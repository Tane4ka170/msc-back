import { Schema, model } from "mongoose";
import Joi from "joi";

const archiveSchema = new Schema(
  {
    artist: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const archiveAdd = Joi.object({
  artist: Joi.string().required(),
  song: Joi.string().required(),
});

export const Archive = model("Archive", archiveSchema);
