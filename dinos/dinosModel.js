const db = require("../database/dbconfig.js");

module.exports = {
  findById,
  add,
  update,
  remove,
  getUsersDinos,
  getUsersById,
};
function findById(id) {
  return db("dinos").where({ id }).first();
}

function add(post) {
  return db("dinos").insert(post);
}
function update(change, id) {
  return db("dinos").where({ id }).update(change);
}
function remove(id) {
  return db("dinos").where({ id }).del();
}
function getUsersDinos(id) {
  return db("dinos as d")
    .select(
      "d.id",
      "d.species",
      "d.baselvl",
      "d.gender",
      "d.name",
      "d.health",
      "d.stamina",
      "d.oxygen",
      "d.food",
      "d.weight",
      "d.melee",
      "d.speed",
      "d.torp",
      "d.user_id"
    )
    .where("d.user_id", id)
    .orderBy("d.user_id", id);
}
function getUsersById(id) {
  return db("users").where({ id }).first();
}
