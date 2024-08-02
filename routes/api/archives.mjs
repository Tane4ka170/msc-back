import express from "express";
import ctrl from "../../controllers/archives.mjs";
import { archiveAdd } from "../../models/archive.mjs";
import isEmptyBody from "../../middlewares/isEmptyBody.mjs";
import validateBody from "../../middlewares/validateBody.mjs";

const router = express.Router();

router.get("/", ctrl.getAllSongs);
router.post("/", isEmptyBody, validateBody(archiveAdd), ctrl.addSong);
router.post("/bulk", isEmptyBody, ctrl.addSongs);
router.get("/filter", ctrl.getFilteredSongs);
router.get("/warmup", (req, res) => {
  res.status(200).send("Server is awake");
});

export default router;
