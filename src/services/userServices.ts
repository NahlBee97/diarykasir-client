import type { User } from "../interfaces/authInterfaces";
import type { NewUser, SetPassword, UpdateUser } from "../interfaces/userInterfaces";
import api from "../lib/axios";

export async function getAllUsers() {
  const response = await api.get("/api/users");
  const users = response.data.users;
  const cashiers = users.filter((user: User) => user.role === "CASHIER");
  return cashiers;
}

export async function getUserById(userId: number) {
  const response = await api.get(`/api/users/${userId}`);
  return response.data.user;
}

export async function createUser(userData: NewUser) {
  const response = await api.post("/api/users", userData);
  return response.data.user;
}

export async function updateUser(userId: number, updateData: UpdateUser | SetPassword) {
  const response = await api.put(`/api/users/${userId}`, updateData);
  return response.data.user;
}
export async function deleteUser(userId: number) {
  await api.delete(`/api/users/${userId}`);
}
