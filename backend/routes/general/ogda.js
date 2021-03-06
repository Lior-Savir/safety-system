const express = require("express");
const router = express.Router();

const {
  create,
  find,
  update,
  remove,
  findById,
  findogdabyid,
  updatepikod,
  updatehativas,
  ogdasbypikodid,
} = require("../../controllers/general/ogda");

// find spec tipul
router.get("/ogda/:id", findById);
router.get("/ogda", find);
//add pikod
router.post("/ogda", create);
//update pikod
router.put("/ogda/:id", update);
//delete pikod
router.delete("/ogda/:id", remove);

router.post("/ogda/ogdabyid", findogdabyid);

router.post("/ogda/updatepikod", updatepikod);

router.post("/ogda/updatehativas", updatehativas);

router.post("/ogda/ogdasbypikodid", ogdasbypikodid);

module.exports = router;
