exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {
          type: "trike saddle",
          quality: "ramshackle",
          armor: "32.9",
          cost: "174 fiber, 304 hide, 54 wood",
          user_id: 1,
        },
        {
          type: "flak leggings",
          quality: "journeyman",
          armor: "147",
          durability: "339",
          cost: "32 fiber, 77 hide, 103 metal",
          user_id: 1,
        },
        {
          type: "simple pistol",
          quality: "apprentice",
          durability: "130",
          damage: "148.2",
          cost: "59 hide, 239 metal, 19 wood",
          user_id: 1,
        },
        {
          type: "pump shotgun",
          quality: "journeyman",
          durability: "150",
          damage: "178.2",
          cost: "79 hide, 299 metal, 29 wood",
          user_id: 2,
        },
      ]);
    });
};
