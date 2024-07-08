export declare const signToken: (payload: Record<string, any>, expiresIn: string) => Promise<string>;
export declare const verifyToken: (token: string) => Promise<Record<string, unknown>>;
