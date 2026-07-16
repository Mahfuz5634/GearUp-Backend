export declare const GearService: {
    getAllGearFromDB: (query: any) => Promise<({
        category: {
            id: string;
            name: string;
        };
        provider: {
            name: string;
            email: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        brand: string;
        stock: number;
        categoryId: string;
        providerId: string;
        isDeleted: boolean;
    })[]>;
    getSingleGearFromDB: (id: string) => Promise<({
        reviews: ({
            customer: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            gearId: string;
            customerId: string;
            rating: number;
            comment: string;
        })[];
        category: {
            id: string;
            name: string;
        };
        provider: {
            name: string;
            email: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        brand: string;
        stock: number;
        categoryId: string;
        providerId: string;
        isDeleted: boolean;
    }) | null>;
};
//# sourceMappingURL=gear.service.d.ts.map