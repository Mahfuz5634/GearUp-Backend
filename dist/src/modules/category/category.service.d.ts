export declare const CategoryService: {
    createCategoryIntoDB: (payload: {
        name: string;
    }) => Promise<{
        id: string;
        name: string;
    }>;
    getAllCategoricalFromDB: () => Promise<{
        id: string;
        name: string;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map