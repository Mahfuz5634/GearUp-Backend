declare const registerUserDB: (payload: any) => Promise<{
    id: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const loginUser: (payload: any) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    };
    accessToken: string;
}>;
export declare const AuthService: {
    registerUserDB: typeof registerUserDB;
    loginUser: typeof loginUser;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map