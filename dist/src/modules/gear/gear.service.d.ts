declare const createGearIntoDB: (providerId: string, payload: any) => Promise<{
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    stock: number;
    categoryId: string;
    providerId: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllGearFromDB: (query: any) => Promise<({
    category: {
        id: string;
        name: string;
    };
    provider: {
        email: string;
        name: string;
    };
} & {
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    stock: number;
    categoryId: string;
    providerId: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const GearService: {
    createGearIntoDB: typeof createGearIntoDB;
    getAllGearFromDB: typeof getAllGearFromDB;
};
export {};
//# sourceMappingURL=gear.service.d.ts.map