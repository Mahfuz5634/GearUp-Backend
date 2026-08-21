import "dotenv/config";
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
    update: { name: "GearUp Admin", password: adminPassword },
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
    update: { name: "John Provider", password: providerPassword },
    create: {
      name: "John Provider",
      email: "provider@gearup.com",
      password: providerPassword,
      role: "PROVIDER",
      status: "ACTIVE",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@gearup.com" },
    update: { name: "Jane Customer", password: customerPassword },
    create: {
      name: "Jane Customer",
      email: "customer@gearup.com",
      password: customerPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  });

  const reviewer2 = await prisma.user.upsert({
    where: { email: "alex@gearup.com" },
    update: {},
    create: {
      name: "Alex Rahman",
      email: "alex@gearup.com",
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

  const img = (id: string) =>
    `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

  const gearItems = [
    {
      name: "Mountain Bike Pro",
      description: "Full suspension mountain bike, 29-inch wheels, 21-speed gear system",
      price: 45,
      brand: "Trek",
      model: "Fuel EX 8",
      stock: 5,
      condition: "Excellent",
      features: ["Full suspension", "Hydraulic disc brakes", "Helmet included"],
      imageUrl: img("photo-1541625602330-2277a4c46182"),
      category: "Cycling",
    },
    {
      name: "Road Bike Elite",
      description: "Lightweight carbon fiber road bike, ideal for long distance rides",
      price: 55,
      brand: "Giant",
      model: "TCR Advanced",
      stock: 3,
      condition: "Excellent",
      features: ["Carbon frame", "Drop handlebars", "Clipless pedals"],
      imageUrl: img("photo-1485965120184-e220f721d03e"),
      category: "Cycling",
    },
    {
      name: "4-Person Camping Tent",
      description: "Waterproof 4-person tent with rainfly, easy setup",
      price: 30,
      brand: "Coleman",
      model: "Sundome 4",
      stock: 8,
      condition: "Good",
      features: ["Waterproof rainfly", "5-min setup", "Fits 4 people"],
      imageUrl: img("photo-1504280390367-361c6d9f38f4"),
      category: "Camping",
    },
    {
      name: "Camping Stove Set",
      description: "Portable propane camping stove with 2 burners",
      price: 15,
      brand: "Camp Chef",
      model: "Everest 2X",
      stock: 10,
      condition: "Good",
      features: ["2 burners", "Wind guards", "Fuel canister included"],
      imageUrl: img("photo-1478131143081-80f7f84ca84d"),
      category: "Camping",
    },
    {
      name: "Yoga Mat Premium",
      description: "Extra thick non-slip yoga mat, 6mm thickness",
      price: 8,
      brand: "Manduka",
      model: "Pro Lite",
      stock: 20,
      condition: "Excellent",
      features: ["Non-slip surface", "6mm cushioning", "Carry strap included"],
      imageUrl: img("photo-1544367567-0f2fcb009e0b"),
      category: "Fitness",
    },
    {
      name: "Adjustable Dumbbell Set",
      description: "Adjustable dumbbells 5-50 lbs, space-saving design",
      price: 12,
      brand: "Bowflex",
      model: "SelectTech 552",
      stock: 6,
      condition: "Excellent",
      features: ["5-50 lbs per hand", "Dial adjustment", "Space saving"],
      imageUrl: img("photo-1517836357463-d25dfeac3438"),
      category: "Fitness",
    },
    {
      name: "Single Kayak",
      description: "Single person sit-in kayak with paddle and life jacket",
      price: 40,
      brand: "Pelican",
      model: "Sentinel 100X",
      stock: 4,
      condition: "Good",
      features: ["Paddle included", "Life jacket included", "Storage hatch"],
      imageUrl: img("photo-1502680390469-be75c86b636f"),
      category: "Water Sports",
    },
    {
      name: "Stand Up Paddle Board",
      description: "Inflatable SUP board with pump, paddle, and leash",
      price: 35,
      brand: "Tower",
      model: "Adventurer 10'4\"",
      stock: 5,
      condition: "Excellent",
      features: ["Inflatable", "Pump included", "Non-slip deck"],
      imageUrl: img("photo-1544551763-46a013bb70d5"),
      category: "Water Sports",
    },
    {
      name: "Trekking Backpack 60L",
      description: "Durable 60L hiking backpack with rain cover and hip belt",
      price: 18,
      brand: "Osprey",
      model: "Kestrel 58",
      stock: 7,
      condition: "Excellent",
      features: ["Rain cover included", "Adjustable hip belt", "Hydration sleeve"],
      imageUrl: img("photo-1553062407-98eeb64c6a62"),
      category: "Camping",
    },
    {
      name: "Basketball Outdoor",
      description: "Official size outdoor basketball, all-surface grip",
      price: 6,
      brand: "Spalding",
      model: "Street 29.5",
      stock: 15,
      condition: "Good",
      features: ["Official size 7", "All-surface grip", "Pumped & ready"],
      imageUrl: img("photo-1546519638-68e109498ffc"),
      category: "Team Sports",
    },
    {
      name: "Soccer Ball Pro",
      description: "FIFA quality pro match soccer ball, size 5",
      price: 7,
      brand: "Adidas",
      model: "Al Rihla Pro",
      stock: 12,
      condition: "Excellent",
      features: ["FIFA Quality Pro", "Size 5", "Match grade"],
      imageUrl: img("photo-1431324155629-1a6deb1dec8d"),
      category: "Team Sports",
    },
    {
      name: "Snowboard with Bindings",
      description: "All-mountain snowboard with bindings, ideal for beginners and intermediates",
      price: 38,
      brand: "Burton",
      model: "Ripcord 155",
      stock: 4,
      condition: "Excellent",
      features: ["All-mountain shape", "Bindings included", "Waxed & tuned"],
      imageUrl: img("photo-1478700485868-972b69dc3fc4"),
      category: "Winter Sports",
    },
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
          model: gear.model,
          stock: gear.stock,
          condition: gear.condition,
          features: gear.features,
          imageUrl: gear.imageUrl,
          categoryId: createdCategories[gear.category]!,
          providerId: provider.id,
        },
      });
    }
  }

  const demoReviews: { gearName: string; reviews: { email: string; rating: number; comment: string }[] }[] = [
    {
      gearName: "Mountain Bike Pro",
      reviews: [
        { email: "customer@gearup.com", rating: 5, comment: "Amazing bike, smooth ride on the trails. Highly recommended!" },
        { email: "alex@gearup.com", rating: 4, comment: "Great condition and easy pickup. Brakes felt brand new." },
      ],
    },
    {
      gearName: "4-Person Camping Tent",
      reviews: [
        { email: "alex@gearup.com", rating: 5, comment: "Kept us dry through a rainy weekend. Setup took minutes." },
      ],
    },
    {
      gearName: "Single Kayak",
      reviews: [
        { email: "customer@gearup.com", rating: 4, comment: "Perfect for a lake day. Paddle and life jacket included, super convenient." },
      ],
    },
  ];

  for (const entry of demoReviews) {
    const gear = await prisma.gearItem.findFirst({
      where: { name: entry.gearName, providerId: provider.id },
    });
    if (!gear) continue;

    for (const review of entry.reviews) {
      const reviewer = review.email === "alex@gearup.com" ? reviewer2 : customer;
      const existing = await prisma.review.findFirst({
        where: { gearId: gear.id, customerId: reviewer.id },
      });
      if (!existing) {
        await prisma.review.create({
          data: {
            rating: review.rating,
            comment: review.comment,
            customerId: reviewer.id,
            gearId: gear.id,
          },
        });
      }
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
