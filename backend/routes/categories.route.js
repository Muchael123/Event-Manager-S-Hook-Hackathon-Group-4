import { Router } from "express";
import FetchAllCategories from "../controllers/category/fetchcategories.js";

const router = Router()

router.get("/", FetchAllCategories)

export default router