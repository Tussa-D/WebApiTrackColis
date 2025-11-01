// Modèle pour le login
export interface LoginModel {
  username: string;
  password: string;
}

// Modèle pour le register
export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}

// Réponse du login
export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
}

// Réponse générique
export interface Response {
  status: string;
  message: string;
}

// Informations de l'utilisateur connecté
export interface User {
  username: string;
  email: string;
  roles: string[];
}