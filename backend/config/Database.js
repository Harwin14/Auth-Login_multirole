import { Sequelize } from "sequelize";

const db = new Sequelize("auth_multirole_db", "harwin", "153426@Asu", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
