declare module "express" {
    interface Request {
        user?: {
            username: string;
            role: "user" | "moderator";
        }
    }
}

export { }