// lib/auth.js

// 👇 Start with NO authenticated user
export let currentUser = null;

// Simulated user database
export const users = [
  { id: 'user-1', name: 'Alex Morgan', email: 'alex@estateflow.com', password: '123', role: 'agent' },
  { id: 'user-2', name: 'Thabo Nkosi', email: 'thabo@estateflow.com', password: '123', role: 'agent' },
  { id: 'user-3', name: 'Lerato van Niekerk', email: 'lerato@estateflow.com', password: '123', role: 'client' },
  { id: 'user-4', name: 'Sipho Dlamini', email: 'sipho@estateflow.com', password: '123', role: 'admin' },
];

// Function to simulate login
export const login = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: null,
    };
    return { success: true, user: currentUser };
  }
  return { success: false, message: 'Invalid email or password' };
};

// Function to simulate signup
export const signup = (name, email, password, role = 'client') => {
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already exists' };
  }

  const newUser = {
    id: `user-${users.length + 1}`,
    name,
    email,
    password,
    role,
  };

  users.push(newUser);

  currentUser = {
    id: newUser.id,
    name,
    email,
    role,
    avatar: null,
  };

  return { success: true, user: currentUser };
};