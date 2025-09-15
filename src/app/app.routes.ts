import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Books } from './pages/books/books';
import { Skills } from './pages/skills/skills';
import { BookDetail } from './pages/book-detail/book-detail';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'login',
    component:Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'books',
        component: Books
      },
      {
        path: 'skills',
        component: Skills
      }
    ]
  },
  {
    path: 'books/:id',
    component: BookDetail
  }
];
