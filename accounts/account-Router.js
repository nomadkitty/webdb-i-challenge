const express = require("express");

const db = require("../data/dbConfig");

// import middleware
const validateId = require("../middleware/validateId.js");
const validateAccount = require("../middleware/validateAccount.js");

const router = express.Router();

// get all the accounts
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get one account by id
router.get("/:id", validateId, (req, res) => {
  db.select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// post an account
router.post("/", validateAccount, (req, res) => {
  const newAccount = req.body;
  db.insert(newAccount, "id")
    .into("accounts")
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update one account by id
router.put("/:id", validateId, validateAccount, (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete one account by id
router.delete("/:id", validateId, (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
