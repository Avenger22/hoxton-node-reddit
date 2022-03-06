// #region "Database config"
import Database from "better-sqlite3";

export const db = new Database("./data.db", {
    verbose: console.log,
});
// #endregion