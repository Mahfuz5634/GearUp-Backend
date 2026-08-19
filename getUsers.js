const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: { email: true, role: true, name: true }
  });
  console.log("USERS:", users);
  
  const gears = await prisma.gearItem.findMany({ take: 2 });
  console.log("GEARS:", gears);
}

main().catch(console.error).finally(() => prisma.$disconnect());
