import { Injectable } from '@angular/core';
import { Skill } from '../pages/model/skill';
@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private storageKey = 'skills';

  constructor() {
    if (this.isBrowser() && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
<<<<<<< HEAD
=======

  private saveSkills(skills: Skill[]): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(skills));
    }
  }

>>>>>>> acbeedb9042ad4574239d3e816995e91249ca574
  getSkills(): Skill[] {
    if (this.isBrowser()) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
  getSkillById(id: number): Skill | undefined {
    return this.getSkills().find((s) => s.id === id);
  }

  addSkill(skill: Skill): void {
    const skills= this.getSkills();
    //esto es para generar un id unico 
    const newId= skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
    skill.id = newId;
    skills.push(skill);
    this.saveSkills(skills);
  }

  updateSkill(updateSkill: Skill): void {
    let skills = this.getSkills();
    skills = skills.map(s => s.id === updateSkill.id ? updateSkill : s);  
    this.saveSkills(skills);
  }

  deleteSkill(id: number): void {
    let skills = this.getSkills();
    skills = skills.filter(s => s.id !== id);
    this.saveSkills(skills);
  }
}
