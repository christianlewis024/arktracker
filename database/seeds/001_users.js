exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "testuser1",
          password: "test123",
        },
        {
          username: "testuser2",
          password: "test123",
        },
        {
          username: "testuser3",
          password: "test123",
        },
      ]);
    });
};
