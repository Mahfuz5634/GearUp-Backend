export declare const AdminService: {
    getAllUsersFromDB: () => Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: string;
        createdAt: Date;
    }[]>;
    updateUserStatusInDB: (userId: string, status: string) => Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: string;
    }>;
    getAllGearsFromDB: () => Promise<({
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
    getAllRentalsFromDB: () => Promise<({
        customer: {
            name: string;
            email: string;
        };
        gear: {
            category: {
                id: string;
                name: string;
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
        };
        payment: {
            id: string;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            createdAt: Date;
            transactionId: string;
            rentalOrderId: string;
            amount: number;
            method: string;
            paidAt: Date | null;
        } | null;
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        gearId: string;
        startDate: Date;
        endDate: Date;
        customerId: string;
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map