import { UserRole } from '../schemas/user.schema';

export class User {
  username: string;
  email: string;
  password: string;
  address: string;
  isActive: string;
  user_role: UserRole;
}
