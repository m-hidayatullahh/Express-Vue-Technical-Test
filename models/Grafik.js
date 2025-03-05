import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Grafik = sequelize.define("Grafik", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dashboardId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Dashboards",
      key: "id"
    }
  },
  level_wilayah: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  show: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING,
  },
  model_chart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  row: {
    type: DataTypes.INTEGER,
  },
  column: {
    type: DataTypes.INTEGER,
  },
  column_size: {
    type: DataTypes.INTEGER,
  },
  variabel: {
    type: DataTypes.JSON,
    allowNull: false,
  }
});

export default Grafik;