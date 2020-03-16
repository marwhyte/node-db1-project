const express = require("express");
const router = express.Router();
const Db = require("../data/dbConfig");

//get request

router.get("/", (req, res) => {
  Db("accounts")
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(err => res.status(500).json({ message: "couldnt get accounts" }))

    .then(accounts => {
      res.status(200).json({ accounts });
    })
    .catch(err => {
      res.status(500).json({ message: "there was an error getting data" });
    });
});

router.get("/:id", (req, res) => {
  Db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(post => {
      if (!post) {
        res.status(400).json({ message: "post doesn't exist" });
      } else {
        res.status(200).json({ post });
      }
    });
});

router.post("/", (req, res) => {
  Db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ results: ids });
    })
    .catch(err => {
      res.status(500).json({
        Message: "couldnt post the data"
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "data updated" });
      } else {
        res.status(400).json({ message: "data not updated" });
      }
    })
    .catch(err => res.status(500).json({ message: "couldn't update data" }));
});

router.delete("/:id", (req, res) => {
  Db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "user has been deleted" });
      } else {
        res.status(400).json({ message: "user Doesnt exist" });
      }
    })
    .catch(err => res.status(500).json({ message: "user cant be deleted" }));
});
module.exports = router;
