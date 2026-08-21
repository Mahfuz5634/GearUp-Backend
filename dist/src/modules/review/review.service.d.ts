export declare const ReviewService: {
    createReviewIntoDB: (customerId: string, payload: any) => Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        comment: string;
        customerId: string;
        gearId: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map