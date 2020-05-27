const db = require("../database/dbconfig.js");

module.exports = {
  findById,
  add,
  update,
  remove,
  getUsersItems,
  getUsersById,
};
function findById(id) {
  return db("items").where({ id }).first();
}

function add(post) {
  return db("items").insert(post);
}
function update(change, id) {
  return db("items").where({ id }).update(change);
}
function remove(id) {
  return db("items").where({ id }).del();
}
function getUsersItems(id) {
  return db("items as i")
    .select(
      "i.id",
      "i.type",
      "i.quality",
      "i.armor",
      "i.durability",
      "i.damage",
      "i.cost",
      "i.user_id"
    )
    .where("i.user_id", id)
    .orderBy("i.user_id", id);
}
function getUsersById(id) {
  return db("users").where({ id }).first();
}
