const express = require("express");
const router = express.Router();

const {
  create,
  find,
  update,
  remove,
  findById,
  findByQuestionId,
} = require("../../controllers/forum/answer");

// find spec
router.get("/answer/:id", findById);
//find all
router.get("/answer/:id", findByQuestionId);

router.get("/answer", find);
//add
router.post("/answer", create); /**/
//update
router.put("/answer/:id", update);
//delete
router.delete("/answer/:id", remove);

module.exports = router;
