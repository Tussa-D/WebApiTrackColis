export interface UsersColis {
  idUserColis: number;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  statut: string;
  cni: string;
  telephone: string;
}

export interface CreateUserColisRequest {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  statut: string;
  cni: string;
  telephone: string;
}

export interface UpdateUserColisRequest {
  idUserColis: number;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  statut: string;
  cni: string;
  telephone: string;
}