import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { SkillService } from '../../services/SkillService';
import { Skill } from '../model/skill';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-skills',
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
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
    return { id: 0, 
      name: '',
      category: 'Otros',
      goal: '',
      progress: 0,
      status: 'Por empezar',
      description: '',
      books: []
    };
  }

  addSkill(){
   if(!this.newSkill.name.trim()){
    Swal.fire('Error', 'El nombre de la habilidad es obligatorio.', 'error');
    return
   }
      if(!this.newSkill.category.trim()){
    Swal.fire('Error', 'La categoria de la habilidad es obligatoria.', 'error');
    return
   }
   if (this.newSkill.progress < 0 || this.newSkill.progress > 100) {
    Swal.fire('Error', 'El progreso debe estar entre 0 y 100', 'error');
    return;
  }

  this.skillService.addSkill(this.newSkill);
  this.loadSkills();
  Swal.fire('Éxito', 'Habilidad agregada correctamente', 'success');

  this.newSkill = this.resetSkill(); 
  (document.getElementById('closeAddModal') as HTMLElement)?.click(); 
}
 
openEditModal(skill: Skill){
    this.editSkillData = { ...skill };
  }
  updateSkill(){
     if (this.editSkillData) {
    if (!this.editSkillData.name.trim()) {
      Swal.fire('Error', 'El nombre no puede estar vacío', 'error');
      return;
    }
     if (!this.editSkillData.category.trim()) {
      Swal.fire('Error', 'La categoría no puede estar vacía', 'error');
      return;
    }

    if (this.editSkillData.progress < 0 || this.editSkillData.progress > 100) {
      Swal.fire('Error', 'El progreso debe estar entre 0 y 100', 'error');
      return;
    }

    this.skillService.updateSkill(this.editSkillData);
    this.loadSkills();
    Swal.fire('Éxito', 'Habilidad actualizada correctamente', 'success');

    this.editSkillData = null;
    (document.getElementById('closeEditModal') as HTMLElement)?.click();
  }
  }
  deleteSkill(id: number){
Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.skillService.deleteSkill(id);
      this.loadSkills();
      Swal.fire('Eliminado', 'La habilidad fue eliminada', 'success');
    }
  });
  }
}
