import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { SkillService } from '../../services/SkillService';
import { Skill } from '../model/skill';
import { FormsModule } from '@angular/forms';
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
      category: '',
      goal: '',
      progress: 0,
      status: 'Por empezar',
      description: '',
      books: []
    };
  }
}

