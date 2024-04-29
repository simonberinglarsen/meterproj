import DraftItem from "../types/DraftItem";
import MeterTask from "../types/MeterTask";

export class WorkDatabaseService {
    getDraft(workTaskId: number): DraftItem[] {
        return this.storage.drafts[workTaskId] as DraftItem[];
    }
    saveDraft(workTaskId: number, draft: DraftItem[]) {
        this.storage.drafts[workTaskId] = draft;
    }
    getMeterTask(workTaskId: number) {
        let meterTask = this.storage.meterTasks[workTaskId];
        if (!meterTask) return null;
        return meterTask;
    }
    getStorage(): any {
        return this.storage;
    }
    private storage: any = {
        meterTasks: {},
        drafts: {}
    };
    private workTaskId: number = 24001000;

    saveMeterTask(meterTask: MeterTask) {
        if (meterTask.workTaskId === 0) {
            meterTask.workTaskId = this.workTaskId++;
        }
        this.storage.meterTasks[meterTask.workTaskId] = meterTask;
    }
    private static instance: WorkDatabaseService | null = null;

    private constructor() { }
    static getInstance(): WorkDatabaseService {
        if (!WorkDatabaseService.instance) {
            WorkDatabaseService.instance = new WorkDatabaseService();
        }
        return WorkDatabaseService.instance;
    }
}