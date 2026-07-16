export declare const AuthService: {
    registerUserDB: (payload: any) => Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    loginUser: (payload: any) => Promise<{
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
    getMe: (userId: string) => Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map