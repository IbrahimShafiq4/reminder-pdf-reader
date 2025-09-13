import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user || !!localStorage.getItem('userToken');
    });

    if (localStorage.getItem('userToken')) {
      this.isAuthenticated = true;
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
