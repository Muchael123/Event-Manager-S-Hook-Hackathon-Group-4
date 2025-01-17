import { Router } from "express";
import FetchAllCategories from "../controllers/fetchcategories.js";

const router = Router()

router.get("/", FetchAllCategories)

export default router