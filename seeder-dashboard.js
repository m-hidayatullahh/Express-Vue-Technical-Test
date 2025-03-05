import { sequelize } from "./config/db.js";
import Dashboard from "./models/Dashboard.js";
import Grafik from "./models/Grafik.js";
import fs from "fs";

const seedDashboard = async () => {
  try {
    await sequelize.sync({ force: true });
    const data = JSON.parse(fs.readFileSync("./data/Test Fullstack API Response.json", "utf8"));
    
    for (const dashboardData of data) {
      const { grafik, ...dashboardInfo } = dashboardData;
      const dashboard = await Dashboard.create(dashboardInfo);
      
      if (grafik && grafik.length > 0) {
        for (const grafikData of grafik) {
          await Grafik.create({ ...grafikData, dashboardId: dashboard.id });
        }
      }
    }
    console.log("Seeding Dashboard & Grafik selesai.");
    process.exit();
  } catch (error) {
    console.error("Seeding gagal:", error);
    process.exit(1);
  }
};

seedDashboard();