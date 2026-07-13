declare const createRentalOrderIntoDB: (customerId: string, payload: any) => Promise<{
    id: string;
    customerId: string;
    gearId: string;
    startDate: Date;
    endDate: Date;
    status: import("../../../generated/prisma/enums").OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getCustomerRentalsFromDB: (customerId: string) => Promise<({
    gear: {
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
    };
    payment: {
        id: string;
        transactionId: string;
        rentalOrderId: string;
        amount: number;
        method: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
    } | null;
} & {
    id: string;
    customerId: string;
    gearId: string;
    startDate: Date;
    endDate: Date;
    status: import("../../../generated/prisma/enums").OrderStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getProviderOrdersFromDB: (providerId: string) => Promise<({
    customer: {
        email: string;
        name: string;
    };
    gear: {
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
    };
} & {
    id: string;
    customerId: string;
    gearId: string;
    startDate: Date;
    endDate: Date;
    status: import("../../../generated/prisma/enums").OrderStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const updateOrderStatusInDB: (orderId: string, status: any) => Promise<{
    id: string;
    customerId: string;
    gearId: string;
    startDate: Date;
    endDate: Date;
    status: import("../../../generated/prisma/enums").OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const RentalService: {
    createRentalOrderIntoDB: typeof createRentalOrderIntoDB;
    getCustomerRentalsFromDB: typeof getCustomerRentalsFromDB;
    getProviderOrdersFromDB: typeof getProviderOrdersFromDB;
    updateOrderStatusInDB: typeof updateOrderStatusInDB;
};
export {};
//# sourceMappingURL=rental.service.d.ts.map