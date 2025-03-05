import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Grafik from "./Grafik.js";

const Dashboard = sequelize.define("Dashboard", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  path_user: {
    type: DataTypes.STRING,
  },
  grid: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  variabel: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  show: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  icon: {
    type: DataTypes.STRING,
  }
});

Dashboard.hasMany(Grafik, { foreignKey: "dashboardId", as: "grafik" });
Grafik.belongsTo(Dashboard, { foreignKey: "dashboardId", as: "dashboard" });

export default Dashboard;