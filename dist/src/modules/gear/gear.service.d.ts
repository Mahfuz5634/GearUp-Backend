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
        model: string | null;
        condition: string | null;
        features: string[];
        imageUrl: string | null;
        categoryId: string;
        providerId: string;
        isDeleted: boolean;
    })[]>;
    getSingleGearFromDB: (id: string) => Promise<({
        rentals: {
            status: import("../../../generated/prisma/enums").OrderStatus;
            startDate: Date;
            endDate: Date;
        }[];
        reviews: ({
            customer: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            rating: number;
            comment: string;
            customerId: string;
            gearId: string;
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
        model: string | null;
        condition: string | null;
        features: string[];
        imageUrl: string | null;
        categoryId: string;
        providerId: string;
        isDeleted: boolean;
    }) | null>;
};
//# sourceMappingURL=gear.service.d.ts.map