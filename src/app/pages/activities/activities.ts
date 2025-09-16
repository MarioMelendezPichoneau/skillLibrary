import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivityService } from '../../services/activityService';
import { Activity } from '../model/activity';
import { Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-activities',
  imports: [CommonModule, FormsModule],
  templateUrl: './activities.html',
  styleUrl: './activities.css'
})
export class Activities implements OnInit {
  @Input() skillId!: number;
  activities: Activity[] = [];

  newActivity: Activity = this.resetActivity();
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(){
    if(this.skillId){
      this.activities = this.activityService.getActivitiesbySkill(this.skillId);
    }
  }

  resetActivity(): Activity {
    return {
      id: 0,
      skillId: this.skillId,
      title: '',
      description: '',
      duration: 0,
      completed: false,
      date: new Date(),
    };
  }
 editMode: boolean = false;

editActivity(activity: Activity) {
  this.newActivity = { ...activity }; 
  this.editMode = true;
}

addActivity() {
    if (!this.newActivity.title || this.newActivity.title.trim().length < 3) {
      alert('El título debe tener al menos 3 caracteres.');
      return;
    }
    if (this.newActivity.duration <= 0) {
      alert('La duración debe ser mayor a 0.');
      return;
    }
    if (this.editMode) {
      this.activityService.updateActivity(this.newActivity);
      this.editMode = false;
      alert('Actividad actualizada');
    } else {
      this.newActivity.skillId = this.skillId;
      this.activityService.addActivity(this.newActivity);
      alert('Actividad agregada');
    }
    this.newActivity = this.resetActivity();
    this.loadActivities();
}

  deleteActivity(id: number) {
    const confirmDelete = confirm('¿Eliminar actividad? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      this.activityService.deleteActivity(id);
      this.loadActivities();
      alert('Actividad eliminada');
    }
  }
}
