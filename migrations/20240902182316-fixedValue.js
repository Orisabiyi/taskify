module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db
      .collection("tasks")
      .updateMany(
        { categories: { $nin: ["work", "personal", "urgent", "other"] } },
        { $set: { categories: "other" } }
      );

    await db
      .collection("tasks")
      .updateMany(
        {
          status: { $nin: ["pending", "in-progress", "completed", "archived"] },
        },
        { $set: { status: "pending" } }
      );

    await db
      .collection("tasks")
      .updateMany(
        { status: { $nin: [1, 2, 3, 4] } },
        { $set: { priority: 1 } }
      );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection("albums").updateMany({}, { $set: { priority: "" } });
  },
};
