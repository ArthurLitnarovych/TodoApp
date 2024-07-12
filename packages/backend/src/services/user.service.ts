import { PrismaClient, User } from '@prisma/client';

const prismaUser = new PrismaClient();

export default class UserService {
	async create(user: Omit<User, 'id'>): Promise<void> {
		await prismaUser.user.create({
			data: user,
		});
	}

	async changePassword(email: string, password: string): Promise<void> {
		await prismaUser.user.update({
			where: { email },
			data: { password },
		});
	}

	async findById(id: string): Promise<User | null> {
		const user = await prismaUser.user.findFirst({
			where: { id },
		});
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prismaUser.user.findUnique({
			where: { email },
		});
		return user;
	}

	async delete(id: string): Promise<void> {
		await prismaUser.user.delete({
			where: { id },
		});
	}
}
