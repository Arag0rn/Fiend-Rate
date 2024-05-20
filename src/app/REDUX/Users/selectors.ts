import { UsersState } from "./slice";

export const activeUsers = (state: { users: UsersState }) => state.users.users;

export const usersNames = (state: { users: UsersState }) => state.users.userNames;