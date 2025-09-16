import {Injectable }from '@angular/core';
import {Activity} from '../pages/model/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
private storageKey = 'activities';

constructor() { 
    if (this.isBrowser() && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
}
private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
}
getActivities(): Activity[] {
    if(this.isBrowser()) {
        const data= localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }
    return [];
}
   getActivitiesbySkill(skillId: number): Activity[] {
    return this.getActivities().filter(a => a.skillId === skillId);
   }
addActivity(activity: Activity): void {
    const activities = this.getActivities();
    activity.id=activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    activities.push(activity);
        localStorage.setItem(this.storageKey, JSON.stringify(activities));
}
    updateActivity(updatedActivity: Activity): void {
    const activities = this.getActivities();
    const index = activities.findIndex(a => a.id === updatedActivity.id);
    if (index !== -1) {
        activities[index] = updatedActivity;
        localStorage.setItem(this.storageKey, JSON.stringify(activities));
    }
}

    deleteActivity(activityId: number): void {
    let activities = this.getActivities();
    activities = activities.filter(a => a.id !== activityId);
    localStorage.setItem(this.storageKey, JSON.stringify(activities));
    }
}