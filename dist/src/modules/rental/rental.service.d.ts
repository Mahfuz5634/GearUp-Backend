import { OrderStatus } from "../../../generated/prisma/enums";
export declare const RentalService: {
    createRentalOrderIntoDB: (customerId: string, payload: any) => Promise<{
        id: string;
        status: OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        gearId: string;
        startDate: Date;
        endDate: Date;
        customerId: string;
    }>;
    getCustomerRentalsFromDB: (customerId: string) => Promise<({
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
    getRentalByIdFromDB: (orderId: string, userId: string) => Promise<{
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
            provider: {
                id: string;
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
    }>;
    cancelRentalInDB: (orderId: string, customerId: string) => Promise<{
        id: string;
        status: OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        gearId: string;
        startDate: Date;
        endDate: Date;
        customerId: string;
    }>;
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
    updateOrderStatusInDB: (orderId: string, providerId: string, newStatus: OrderStatus) => Promise<any>;
};
//# sourceMappingURL=rental.service.d.ts.map