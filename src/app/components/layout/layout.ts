import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {
  username: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Récupère le username depuis le JWT ou localStorage
    const userInfo = this.authService.getUserInfo();
    this.username = userInfo?.username || 'Utilisateur';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}