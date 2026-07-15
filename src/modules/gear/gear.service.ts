import { prisma } from "../../lib/prisma"


const createGearIntoDB = async(providerId:string ,payload:any)=>{
    const result = await prisma.gearItem.create({
        data:{
            ...payload,
            providerId,
        },
    });
    return result;
}

//all gear
const getAllGearFromDB = async(query:any)=>{
    const {category,brand,minPrice,maxPrice} = query;
    
    const  whereConditions:any ={isDeleted:false};
     
    if(category) whereConditions.category = {name:category};
    if (brand) whereConditions.brand = brand;
    if (minPrice || maxPrice) {
    whereConditions.price = {};
    if (minPrice) whereConditions.price.gte = Number(minPrice);
    if (maxPrice) whereConditions.price.lte = Number(maxPrice);
  }

  const result = await prisma.gearItem.findMany({
    where: whereConditions,
    include:{
        category:true,
        provider:{select:{name:true,email:true}}
    }
});

return result;
}

const getSingleGearFromDB = async (id: string) => {
  return await prisma.gearItem.findUnique({
    where: { id, isDeleted: false },
    include: { category: true, provider: { select: { name: true, email: true } }, reviews: true }
  });
};

const updateGearInDB = async (providerId: string, id: string, payload: any) => {
  const gear = await prisma.gearItem.findUnique({ where: { id } });
  if (gear?.providerId !== providerId) throw new Error('You can only update your own gear');
  
  return await prisma.gearItem.update({ where: { id }, data: payload });
};

const deleteGearFromDB = async (providerId: string, id: string) => {
  const gear = await prisma.gearItem.findUnique({ where: { id } });
  if (gear?.providerId !== providerId) throw new Error('You can only delete your own gear');
  
 
  return await prisma.gearItem.update({ where: { id }, data: { isDeleted: true } });
};
export const GearService ={
    createGearIntoDB,
    getAllGearFromDB,
    getSingleGearFromDB,
    updateGearInDB,
    deleteGearFromDB
}