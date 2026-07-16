/// <reference types="node" />
/// <reference types="node" />
export declare const PaymentService: {
    createCheckoutSessionIntoDB: (customerId: string, rentalOrderId: string) => Promise<{
        checkoutUrl: string | null;
        transactionId: string;
        paymentId: string;
    }>;
    handleStripeWebhook: (rawBody: Buffer, signature: string) => Promise<{
        received: boolean;
    }>;
    confirmPaymentInDB: (transactionId: string) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        transactionId: string;
        rentalOrderId: string;
        amount: number;
        method: string;
        paidAt: Date | null;
    }>;
    getMyPaymentsFromDB: (userId: string) => Promise<({
        rentalOrder: {
            gear: {
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
        } & {
            id: string;
            status: import("../../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            gearId: string;
            startDate: Date;
            endDate: Date;
            customerId: string;
        };
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        transactionId: string;
        rentalOrderId: string;
        amount: number;
        method: string;
        paidAt: Date | null;
    })[]>;
    getPaymentByIdFromDB: (paymentId: string, userId: string) => Promise<{
        rentalOrder: {
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
        } & {
            id: string;
            status: import("../../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            gearId: string;
            startDate: Date;
            endDate: Date;
            customerId: string;
        };
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        transactionId: string;
        rentalOrderId: string;
        amount: number;
        method: string;
        paidAt: Date | null;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map