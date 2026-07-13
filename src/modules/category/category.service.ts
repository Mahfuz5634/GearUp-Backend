import { prisma } from "../../lib/prisma"


const createCategoryIntoDB = async(payload:{name:string})=>{
    const result = await prisma.category.create({data:payload});

    return result;
}

const getAllCategoricalFromDB = async()=>{
     return await prisma.category.findMany();
}

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoricalFromDB
}
