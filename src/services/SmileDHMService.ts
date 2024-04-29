import { generateUUID } from "../types/UUID";
import { WorkTaskServiceService } from "./WorkTaskServiceService";

export class SmileDHMService {
    private static instance: SmileDHMService | null = null;

    private constructor() { }
    static getInstance(): SmileDHMService {
        if (!SmileDHMService.instance) {
            SmileDHMService.instance = new SmileDHMService();
        }
        return SmileDHMService.instance;
    }

    public createNewWorkOrder(): void {
        WorkTaskServiceService.getInstance().createNewWorkOrder(
            {
                meterId: generateUUID()
            }
        );
    }

}