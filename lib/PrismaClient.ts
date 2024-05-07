import { PrismaClient } from "@prisma/client";

// biome-ignore lint/style/useConst: <explanation>
let prisma: PrismaClient;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}
prisma = globalForPrisma.prisma;

export default prisma;
