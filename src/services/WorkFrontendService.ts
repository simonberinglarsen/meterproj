export class WorkFrontendService {
    private static instance: WorkFrontendService | null = null;

    private constructor() { }

    static getInstance(): WorkFrontendService {
        if (!WorkFrontendService.instance) {
            WorkFrontendService.instance = new WorkFrontendService();
        }
        return WorkFrontendService.instance;
    }
}