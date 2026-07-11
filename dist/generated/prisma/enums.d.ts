export declare const Role: {
    readonly CUSTOMER: 'CUSTOMER';
    readonly PROVIDER: 'PROVIDER';
    readonly ADMIN: 'ADMIN';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly PLACED: 'PLACED';
    readonly CONFIRMED: 'CONFIRMED';
    readonly PAID: 'PAID';
    readonly PICKED_UP: 'PICKED_UP';
    readonly RETURNED: 'RETURNED';
    readonly CANCELLED: 'CANCELLED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: 'PENDING';
    readonly COMPLETED: 'COMPLETED';
    readonly FAILED: 'FAILED';
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
//# sourceMappingURL=enums.d.ts.map