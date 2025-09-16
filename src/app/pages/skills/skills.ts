import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { SkillService } from '../../services/SkillService';
import { Skill } from '../model/skill';
import { FormsModule } from '@angular/forms';

import {Activities} from '../activities/activities'
@Component({
  selector: 'app-skills',
  imports: [CommonModule, FormsModule, Activities],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  skills: Skill[] = [];
  newSkill: Skill = this.resetSkill();
  editSkillData: Skill | null = null;

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }
  loadSkills() {
    this.skills = this.skillService.getSkills();
  }
  resetSkill(): Skill {
    return {
      id: 0,
      name: '',
      category: 'Otros',
      goal: '',
      progress: 0,
      status: 'Por empezar',
      description: '',
      books: [],
    };
  }

  addSkill(){
    if(!this.newSkill.name || this.newSkill.name.trim().length < 3){
      alert('El nombre de la habilidad es obligatorio y debe tener al menos 3 caracteres.');
      return;
    }
    if(!this.newSkill.category || this.newSkill.category.trim().length < 3){
      alert('La categoría de la habilidad es obligatoria y debe tener al menos 3 caracteres.');
      return;
    }
    if (this.newSkill.progress < 0 || this.newSkill.progress > 100) {
      alert('El progreso debe estar entre 0 y 100');
      return;
    }
    if (this.newSkill.goal && this.newSkill.goal.trim().length < 3) {
      alert('La meta debe tener al menos 3 caracteres si se especifica.');
      return;
    }
    this.skillService.addSkill(this.newSkill);
    this.loadSkills();
    alert('Habilidad agregada correctamente');
    this.newSkill = this.resetSkill();
    (document.getElementById('closeAddModal') as HTMLElement)?.click();
}

openEditModal(skill: Skill){
    this.editSkillData = { ...skill };
  }
  updateSkill(){
    if (this.editSkillData) {
      if (!this.editSkillData.name || this.editSkillData.name.trim().length < 3) {
        alert('El nombre no puede estar vacío y debe tener al menos 3 caracteres');
        return;
      }
      if (!this.editSkillData.category || this.editSkillData.category.trim().length < 3) {
        alert('La categoría no puede estar vacía y debe tener al menos 3 caracteres');
        return;
      }
      if (this.editSkillData.progress < 0 || this.editSkillData.progress > 100) {
        alert('El progreso debe estar entre 0 y 100');
        return;
      }
      if (this.editSkillData.goal && this.editSkillData.goal.trim().length < 3) {
        alert('La meta debe tener al menos 3 caracteres si se especifica.');
        return;
      }
      this.skillService.updateSkill(this.editSkillData);
      this.loadSkills();
      alert('Habilidad actualizada correctamente');
      this.editSkillData = null;
      (document.getElementById('closeEditModal') as HTMLElement)?.click();
    }
  }
  deleteSkill(id: number){
    const confirmDelete = confirm('¿Estás seguro? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      this.skillService.deleteSkill(id);
      this.loadSkills();
      alert('La habilidad fue eliminada');
    }
  }
  selectedSkill: Skill | null = null;

openActivitiesModal(skill: Skill) {
  this.selectedSkill = skill;
}
}
