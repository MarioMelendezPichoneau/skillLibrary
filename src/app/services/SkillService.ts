import { Injectable } from '@angular/core';
import { Skill } from '../pages/model/skill';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
    private storageKey = 'skills';

    constructor(){
if (this.isBrowser() && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
    }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
    getSkills(): Skill[] {
    if (this.isBrowser()) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
  getSkillById(id: number): Skill | undefined {
    return this.getSkills().find(s => s.id === id);
  }
}
 