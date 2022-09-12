const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json({ message: "Failed to GET data." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryMatch = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    // if there is no matching category
    if (!categoryMatch) {
      res.status(404).json({ message: "No category found with that id." });
    }
    // return the matching category data
    res.status(200).json(categoryMatch);
  } catch {
    res.status(500).json({ message: "Failed to GET data." });
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    // req.body should be {"category_name": "____"}
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch {
    res.status(500).json({ message: "Failed to create category." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryMatch = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // if no category matches...
    if (!categoryMatch) {
      res.status(404).json({ message: "No category found with that id." });
    }
    res.status(200).json(categoryMatch);
  } catch {
    res.status(500).json({ message: "Failed to update category." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryMatch = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryMatch) {
      res.status(404).json({ message: "No category found with that id." });
    }
    res.status(200).json(categoryMatch);
  } catch {
    res.status(500).json({ message: "Failed to DELETE category." });
  }
});

module.exports = router;
