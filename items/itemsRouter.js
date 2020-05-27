const express = require("express");
const Items = require("./itemsModel");
const db = require("../database/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("items")
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to retrieve items" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Could not find item with given id." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to get Item" });
    });
});

router.post("/", (req, res) => {
  const itemsData = req.body;

  Items.add(itemsData)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Failed to create new item" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Items.findById(id)
    .then((item) => {
      if (item) {
        Items.update(changes, id).then((updatedItem) => {
          res.json(updatedItem);
        });
      } else {
        res.status(404).json({
          message:
            "ERROR:404 - Check the given id. Could not find item with given id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "ERROR:500 - Failed to update item" });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Items.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted, message: "successfully deleted item." });
      } else {
        res.status(404).json({
          message:
            "ERROR:404 - Check the given id. Could not find item with given id",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to delete item" });
    });
});

router.get("/:id/user", validateUserId, (req, res) => {
  const id = req.params.id;

  Items.getUsersItems(id)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to get items" });
    });
});
function validateUserId(req, res, next) {
  const id = req.params.id;
  Items.getUsersById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
}
module.exports = router;
