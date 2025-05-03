import { Request, Response } from "express";
import {
	createAlbumService,
	getAlbumsService,
	getAlbumByIdService,
	albumUpdateService,
	deleteAlbumService,
} from "../services/albumService";
import asyncHandler from "../utils/async.js";
import { NotFound, BadRequest } from "../utils/error.js";

export const createAlbum = asyncHandler(async (req: Request, res: Response) => {
	const album = await createAlbumService(req.body);
	res.status(201).json({ success: true, data: album, msg: "Album created successfully!" });
});

export const getAllAlbums = asyncHandler(async (_req: Request, res: Response) => {
	const albums = await getAlbumsService();
	res.status(200).json({ success: true, data: albums, msg: "Albums fetched successfully!" });
});

export const getAlbumById = asyncHandler(async (req: Request, res: Response) => {
	const id = parseInt(req.params.id, 10);
	if (isNaN(id)) throw new BadRequest("Invalid album ID");

	const album = await getAlbumByIdService(id);
	if (!album) throw new NotFound("Album not found");

	res.status(200).json({ success: true, data: album, msg: "Album fetched successfully!" });
});

export const updateAlbum = asyncHandler(async (req: Request, res: Response) => {
	const id = parseInt(req.params.id, 10);
	if (isNaN(id)) throw new BadRequest("Invalid album ID");

	const existingAlbum = await getAlbumByIdService(id);
	if (!existingAlbum) throw new NotFound("Album not found");

	const updatedAlbum = await albumUpdateService(id, req.body);
	res.status(200).json({ success: true, data: updatedAlbum, msg: "Album updated successfully!" });
});

export const deleteAlbum = asyncHandler(async (req: Request, res: Response) => {
	const id = parseInt(req.params.id, 10);
	if (isNaN(id)) throw new BadRequest("Invalid album ID");

	const existingAlbum = await getAlbumByIdService(id);
	if (!existingAlbum) throw new NotFound("Album not found");

	const deletedAlbum = await deleteAlbumService(id);
	res.status(200).json({ success: true, data: deletedAlbum, msg: "Album deleted successfully!" });
});
