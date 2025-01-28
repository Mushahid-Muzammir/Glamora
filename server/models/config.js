import { Sequelize } from "sequelize";

const instance  = new Sequelize("glamora", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default instance;