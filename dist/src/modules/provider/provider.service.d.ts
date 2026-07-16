import { OrderStatus } from "../../../generated/prisma/enums";
export declare const ProviderService: {
    createGearIntoDB: (providerId: string, payload: any) => Promise<{
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
    }>;
    updateGearInDB: (providerId: string, gearId: string, payload: any) => Promise<{
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
    }>;
    deleteGearFromDB: (providerId: string, gearId: string) => Promise<{
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
    }>;
    getMyGearFromDB: (providerId: string) => Promise<({
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
    })[]>;
    getProviderOrdersFromDB: (providerId: string) => Promise<({
        customer: {
            id: string;
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
        status: OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        gearId: string;
        startDate: Date;
        endDate: Date;
        customerId: string;
    })[]>;
    updateOrderStatusInDB: (orderId: string, providerId: string, status: string) => Promise<any>;
};
//# sourceMappingURL=provider.service.d.ts.map