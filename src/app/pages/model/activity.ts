export interface Activity {
    id: number;
    skillId: number;
    title:string;
    description?: string;
    date: Date;
    duration: number;
    completed: boolean;
}