import express from "express";
import validators from "../validation/index";
import { handleValidations } from "../middlewares/handleValidation";
import { Application } from "express";
import { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum } from "../controllers/albumController";
import { PERMISSIONS } from "../config/permissions";
import { withAuthAndPermission } from "../middlewares/withAuthAndPermission";
import { authenticateToken } from "../middlewares/authenticate";

const router = express.Router();

router
	.route("/")
	.get(...withAuthAndPermission(PERMISSIONS.ALBUM_VIEW), getAllAlbums)
	.post(
		handleValidations((data: any) => validators.albumValidation(data)) as any,
		...withAuthAndPermission(PERMISSIONS.ALBUM_EDIT),
		createAlbum
	);

router.route("/:id").get(authenticateToken, getAlbumById).patch(...withAuthAndPermission(PERMISSIONS.ALBUM_EDIT), updateAlbum).delete(...withAuthAndPermission(PERMISSIONS.ALBUM_EDIT), deleteAlbum);

const configure = (app: Application) => {
	app.use("/api/album", router);
};

export default configure;
