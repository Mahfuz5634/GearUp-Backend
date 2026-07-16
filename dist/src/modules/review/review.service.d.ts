export declare const ReviewService: {
    createReviewIntoDB: (customerId: string, payload: any) => Promise<{
        id: string;
        createdAt: Date;
        gearId: string;
        customerId: string;
        rating: number;
        comment: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map