import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from '../config/permissions';

const prisma = new PrismaClient();

export const seedPermissions = async () => {
    try {
        const permissions = Object.values(PERMISSIONS);

        for (const permission of permissions) {
            await prisma.permission.upsert({
                where: { name: permission },
                update: {},
                create: { name: permission },
            });
        }

        console.log('Permissions seeded successfully.');
    } catch (error) {
        console.error('Error seeding permissions:', error);
    } finally {
        await prisma.$disconnect();
    }
};

if (require.main === module) {
    seedPermissions();
}