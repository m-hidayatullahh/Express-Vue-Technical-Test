import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Dashboard from "../models/Dashboard.js";
import Grafik from "../models/Grafik.js";
import { sequelize } from "../config/db.js";

const router = express.Router();

router.get("/processed", authMiddleware, async (req, res) => {
  try {
    const dashboards = await Dashboard.findAll({
      include: [{ model: Grafik, as: "grafik" }]
    });

    const response = dashboards.map(dashboard => {
      return {
        id: dashboard.id,
        label: dashboard.label,
        role: dashboard.role,
        description: dashboard.description,
        path_user: dashboard.path_user,
        grid: dashboard.grid,
        variabel: dashboard.variabel,
        show: dashboard.show,
        icon: dashboard.icon,
        grafik: dashboard.grafik.map(grafik => ({
          id: grafik.id,
          dashboardId: grafik.dashboardId,
          level_wilayah: grafik.level_wilayah,
          show: grafik.show,
          label: grafik.label,
          deskripsi: grafik.deskripsi,
          model_chart: grafik.model_chart,
          row: grafik.row,
          column: grafik.column,
          column_size: grafik.column_size,
          variabel: grafik.variabel
        }))
      };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan.", error: error.message });
  }
});

export default router;