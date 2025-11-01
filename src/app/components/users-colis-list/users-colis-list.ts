import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersColisService } from '../../services/users-colis';
import { UsersColis } from '../../models/users-colis.model';

@Component({
  selector: 'app-users-colis-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-colis-list.html',
  styleUrl: './users-colis-list.css'
})
export class UsersColisListComponent implements OnInit {
  usersColis: UsersColis[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private usersColisService: UsersColisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersColisService.getAll().subscribe({
      next: (data) => {
        this.usersColis = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        this.isLoading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.usersColisService.delete(id).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.loadUsers(); // Recharger la liste
        },
        error: (error) => {
          console.error('Error deleting user', error);
          this.errorMessage = 'Erreur lors de la suppression';
        }
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/users-colis/edit', id]);
  }

  createNew(): void {
    this.router.navigate(['/users-colis/create']);
  }
}