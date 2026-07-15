import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 12);
  const providerPassword = await bcrypt.hash("provider123", 12);
  const customerPassword = await bcrypt.hash("customer123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@gearup.com" },
    update: {},
    create: {
      name: "GearUp Admin",
      email: "admin@gearup.com",
      password: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const provider = await prisma.user.upsert({
    where: { email: "provider@gearup.com" },
    update: {},
    create: {
      name: "John Provider",
      email: "provider@gearup.com",
      password: providerPassword,
      role: "PROVIDER",
      status: "ACTIVE",
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@gearup.com" },
    update: {},
    create: {
      name: "Jane Customer",
      email: "customer@gearup.com",
      password: customerPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  });

  const categories = ["Cycling", "Camping", "Fitness", "Water Sports", "Winter Sports", "Team Sports"];

  const createdCategories: Record<string, string> = {};
  for (const name of categories) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    createdCategories[name] = cat.id;
  }

  const gearItems = [
    { name: "Mountain Bike Pro", description: "Full suspension mountain bike, 29-inch wheels, 21-speed gear system", price: 45, brand: "Trek", stock: 5, category: "Cycling" },
    { name: "Road Bike Elite", description: "Lightweight carbon fiber road bike, ideal for long distance rides", price: 55, brand: "Giant", stock: 3, category: "Cycling" },
    { name: "4-Person Camping Tent", description: "Waterproof 4-person tent with rainfly, easy setup", price: 30, brand: "Coleman", stock: 8, category: "Camping" },
    { name: "Camping Stove Set", description: "Portable propane camping stove with 2 burners", price: 15, brand: "Camp Chef", stock: 10, category: "Camping" },
    { name: "Yoga Mat Premium", description: "Extra thick non-slip yoga mat, 6mm thickness", price: 8, brand: "Manduka", stock: 20, category: "Fitness" },
    { name: "Adjustable Dumbbell Set", description: "Adjustable dumbbells 5-50 lbs, space-saving design", price: 12, brand: "Bowflex", stock: 6, category: "Fitness" },
    { name: "Single Kayak", description: "Single person sit-in kayak with paddle and life jacket", price: 40, brand: "Pelican", stock: 4, category: "Water Sports" },
    { name: "Stand Up Paddle Board", description: "Inflatable SUP board with pump, paddle, and leash", price: 35, brand: "Tower", stock: 5, category: "Water Sports" },
  ];

  for (const gear of gearItems) {
    const existing = await prisma.gearItem.findFirst({
      where: { name: gear.name, providerId: provider.id },
    });
    if (!existing) {
      await prisma.gearItem.create({
        data: {
          name: gear.name,
          description: gear.description,
          price: gear.price,
          brand: gear.brand,
          stock: gear.stock,
          categoryId: createdCategories[gear.category]!,
          providerId: provider.id,
        },
      });
    }
  }

  console.log("Seed data created successfully!");
  console.log("  Admin:      admin@gearup.com / admin123");
  console.log("  Provider:   provider@gearup.com / provider123");
  console.log("  Customer:   customer@gearup.com / customer123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
