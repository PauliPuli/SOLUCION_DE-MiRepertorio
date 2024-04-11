import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname;
import db from "../config/db.js";
import {
  traerData,
  agregarData,
  deleteData,
  updateData,
} from "../controllers/consultas.js";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//Probamos si la database está siendo llamada correctamente
router.get("/date", async (req, res) => {
  const result = await db.query("select now()");
  res.send(result.rows);
});

router.get("/canciones", async (req, res) => {
  const result = await traerData();
//   console.log(result.rows);
  res.json(result);
});

router.post("/cancion", async (req, res) => {
  const { titulo, artista, tono } = req.body; //sacamos de la bolsa body los elementos que escribimos
  const cancion = [titulo, artista, tono];
//   console.log("canción", cancion);
  const result = await agregarData(cancion); //El row no va en la ruta, sinó en las consultas 💡
//   console.log("Nombre", result);
  res.json(result);
});

//Ruta de delete: no requiere un middleware urluncode porque el index las tiene(a menos que lo reconstruyas)
router.delete("/cancion", async (req, res) => {
  const { id } = req.query; //captura por url
  const result = await deleteData(id);
//   console.log("id", id);
  res.send("Eliminado");
});

router.put("/cancion/:id", async (req, res) => {
    const { id } = req.params;
  const { titulo, artista, tono } = req.body; //sacamos de la bolsa body los elementos que escribimos
  const cancion = [titulo, artista, tono, id];
const result = await updateData(cancion);
res.send('Cambio realizado')
});

export default router;
