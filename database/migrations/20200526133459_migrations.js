exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();
      table.string("username", 24).notNullable().unique().index();
      table.string("password", 36).notNullable();
    })
    .createTable("dinos", (table) => {
      table.increments();
      table.string("species").notNullable().index();
      table.string("baselvl", 244);
      table.string("gender", 244).notNullable();
      table.string("name", 244);
      table.string("health", 244);
      table.string("stamina", 244);
      table.string("oxygen", 244);
      table.string("food", 244);
      table.string("weight", 244);
      table.string("melee", 244);
      table.string("speed", 244);
      table.string("torp", 244);

      //foreign key linking to user
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("items", (table) => {
      table.increments();
      table.string("type").notNullable().index();
      table.string("quality", 244).notNullable();
      table.string("armor", 244);
      table.string("durability", 244);
      table.string("damage", 244);
      table.string("cost", 244);

      //foreign key linking to user
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {};
