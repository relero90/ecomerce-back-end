const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json({ message: "Failed to GET data." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagMatch = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    if (!tagMatch) {
      res.status(404).json({ message: "No tag found with that id." });
    }
    res.status(200).json(tagMatch);
  } catch {
    res.status(500).json({ message: "Failed to GET data." });
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagMatch = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagMatch) {
      res.status(404).json({ message: "No tag found with that id." });
    }
    res.status(200).json(tagMatch);
  } catch {
    res.status(500).json({ message: "Failed to DELETE tag." });
  }
});

module.exports = router;
