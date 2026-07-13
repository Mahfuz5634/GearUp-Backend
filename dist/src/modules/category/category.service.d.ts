declare const createCategoryIntoDB: (payload: {
    name: string;
}) => Promise<{
    id: string;
    name: string;
}>;
declare const getAllCategoricalFromDB: () => Promise<{
    id: string;
    name: string;
}[]>;
export declare const CategoryService: {
    createCategoryIntoDB: typeof createCategoryIntoDB;
    getAllCategoricalFromDB: typeof getAllCategoricalFromDB;
};
export {};
//# sourceMappingURL=category.service.d.ts.map