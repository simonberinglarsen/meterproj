import { SmileConfig } from "./WorkTaskServiceService";

export class SmileApiService {
    private calls: string[] = [];
    callApi(smile: SmileConfig, value: string) {
        this.calls.push(`ENDPOINT: ${smile.endpoint}, property ${smile.property} <--- "${value}"`);
    }
    getCalls() {
        return this.calls.join("\n");
    }
    private static instance: SmileApiService | null = null;

    private constructor() { }
    static getInstance(): SmileApiService {
        if (!SmileApiService.instance) {
            SmileApiService.instance = new SmileApiService();
        }
        return SmileApiService.instance;
    }
}