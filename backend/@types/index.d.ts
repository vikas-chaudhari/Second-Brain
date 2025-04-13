import { UserModel } from "../src/db/user";

declare global {
  namespace Express {
    interface Request {
      username: UserModel;
    }
  }
}
