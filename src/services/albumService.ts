import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAlbumService = async (payload: any) => {
	const result = await prisma.album.create({
		data: payload,
	});
	return result;
};

export const getAlbumsService = async () => {
	const albums = await prisma.album.findMany({
		where: { deletedAt: null }, // Avoid soft deleted entries
	});

	return albums;
};

export const getAlbumByIdService = async (id: number) => {
	const album = await prisma.album.findFirst({
		where: { id: id, deletedAt: null },
	});

	return album;
};

export async function albumUpdateService(id: number, payload: any) {
	const album = await prisma.album.update({
		where: { id: id },
		data: {
			...payload,
		},
	});

	return album;
}

export async function deleteAlbumService(albumId: number) {
	const result = await prisma.album.update({
		where: { id: albumId },
		data: {
			deletedAt: new Date(),
		},
	});

	return result;
}
