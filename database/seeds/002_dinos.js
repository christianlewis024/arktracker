exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("dinos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("dinos").insert([
        {
          species: "pteranodon",
          baselvl: "217",
          gender: "female",
          name: "dar",
          health: "1700",
          stamina: "700",
          oxygen: "630",
          food: "8776",
          weight: "600",
          melee: "319",
          speed: "163",
          torp: "2010",
          user_id: 2,
        },
        {
          species: "tek quetzal",
          baselvl: "260",
          gender: "male",
          name: "n/a",
          health: "9.3k",
          stamina: "3k",
          oxygen: "780",
          food: "6037",
          weight: "1.5k",
          melee: "338",
          speed: "165",
          torp: "31265",
          user_id: 2,
        },
        {
          species: "pteranodon",
          baselvl: "215",
          gender: "male",
          name: "other user's ptera",
          health: "1200",
          stamina: "600",
          oxygen: "530",
          food: "6776",
          weight: "400",
          melee: "219",
          speed: "163",
          torp: "1010",
          user_id: 1,
        },
      ]);
    });
};
