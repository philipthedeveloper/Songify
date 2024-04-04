export interface UserData {
  _id: string;
  userId: string;
  email: string;
  username: string;
  fullname: string;
  accountType:
    | "staff"
    | "admin"
    | "director"
    | "control"
    | "accountant"
    | "moderator";
  createdAt: string;
}
