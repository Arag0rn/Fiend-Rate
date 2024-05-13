import { UsersState } from "./slice";

export const activeUsers = (state: { users: UsersState }) => state.users.users;