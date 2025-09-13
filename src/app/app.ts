import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./pages/navbar/navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('skillLibrary');
  private router = inject(Router);

  showNavbar = signal(false);
  //this.showNavbar.set(!this.router.url.startsWith('/dashboard'));

  constructor() {
    this.router.events.subscribe(() => {
      this.showNavbar.set(!this.router.url.startsWith('/dashboard'));
    });
  }

  /*showNavbar(): boolean {

    return !this.router.url.startsWith('dashboard');
  }*/

}
