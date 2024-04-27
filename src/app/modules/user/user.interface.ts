

export type IUserFilterRequest = {
    searchTerm?: string | undefined;
    email?: string | undefined;
    status?:undefined;
};

export type IUser = {
    id: string;
    email: string;
    role: string;
    needPasswordChange: boolean;
    status: undefined;
    createdAt: Date;
    updatedAt: Date;
}