import Joi from "joi";
import ctrlWrapper from "../helpers/ctrlWrapper.mjs";
import { Archive, archiveAdd } from "../models/archive.mjs";

const getAllSongs = async (req, res) => {
  const artists = await Archive.find({}, "-updatedAt -createdAt");
  res.json(artists);
};

const addSong = async (req, res) => {
  const { error } = archiveAdd.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newArtist = new Archive(req.body);
  await newArtist.save();
  res.status(201).json(newArtist);
};

const addSongs = async (req, res) => {
  try {
    const schema = Joi.array().items(
      Joi.object({
        artist: Joi.string().required(),
        song: Joi.string().required(),
      })
    );

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newArchives = await Archive.insertMany(req.body);
    res.status(201).json(newArchives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getAllSongs: ctrlWrapper(getAllSongs),
  addSong: ctrlWrapper(addSong),
  addSongs: ctrlWrapper(addSongs),
};
