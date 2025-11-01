import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersColisService } from '../../services/users-colis';
import { CreateUserColisRequest, UpdateUserColisRequest } from '../../models/users-colis.model';

@Component({
  selector: 'app-users-colis-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-colis-form.html',
  styleUrl: './users-colis-form.css'
})
export class UsersColisFormComponent implements OnInit {
  isEditMode: boolean = false;
  userId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  model: any = {
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    statut: 'Actif',
    cni: '',
    telephone: ''
  };

  constructor(
    private usersColisService: UsersColisService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Vérifier si on est en mode édition
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: number): void {
    this.isLoading = true;
    this.usersColisService.getById(id).subscribe({
      next: (data) => {
        this.model = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user', error);
        this.errorMessage = 'Erreur lors du chargement de l\'utilisateur';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    if (this.isEditMode && this.userId) {
      // Mode édition
      const updateRequest: UpdateUserColisRequest = {
        idUserColis: this.userId,
        ...this.model
      };

      this.usersColisService.update(this.userId, updateRequest).subscribe({
        next: (response) => {
          console.log('User updated', response);
          this.successMessage = 'Utilisateur mis à jour avec succès !';
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/users-colis']);
          }, 1500);
        },
        error: (error) => {
          console.error('Error updating user', error);
          this.errorMessage = 'Erreur lors de la mise à jour';
          this.isLoading = false;
        }
      });
    } else {
      // Mode création
      const createRequest: CreateUserColisRequest = this.model;

      this.usersColisService.create(createRequest).subscribe({
        next: (response) => {
          console.log('User created', response);
          this.successMessage = 'Utilisateur créé avec succès !';
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/users-colis']);
          }, 1500);
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.errorMessage = 'Erreur lors de la création';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users-colis']);
  }
}