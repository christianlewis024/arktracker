const express = require("express");
const Dinos = require("./dinosModel");
const db = require("../database/dbconfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("dinos")
    .then((dinos) => {
      res.json(dinos);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to retrieve dinos" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Dinos.findById(id)
    .then((dino) => {
      if (dino) {
        res.json(dino);
      } else {
        res.status(404).json({ message: "Could not find dino with given id." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to get Dino" });
    });
});

router.post("/", (req, res) => {
  const dinosData = req.body;

  Dinos.add(dinosData)
    .then((dino) => {
      res.status(201).json(dino);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Failed to create new dino" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Dinos.findById(id)
    .then((dino) => {
      if (dino) {
        Dinos.update(changes, id).then((updatedDino) => {
          res.json(updatedDino);
        });
      } else {
        res.status(404).json({
          message:
            "ERROR:404 - Check the given id. Could not find dino with given id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "ERROR:500 - Failed to update dino" });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Dinos.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted, message: "successfully deleted dino!" });
      } else {
        res.status(404).json({
          message:
            "ERROR:404 - Check the given id. Could not find dino with given id",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to delete dino" });
    });
});

router.get("/:id/user", validateUserId, (req, res) => {
  const id = req.params.id;

  Dinos.getUsersDinos(id)
    .then((dinos) => {
      res.status(200).json(dinos);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "ERROR:500 - Server Failed to get dinos" });
    });
});
function validateUserId(req, res, next) {
  const id = req.params.id;
  Dinos.getUsersById(id)
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
