import InstallMeterRequest from "../types/InstallMeterRequest";
import MeterTask from "../types/MeterTask";
import { SmileApiService } from "./SmileApiService";
import { WorkDatabaseService } from "./WorkDatabaseService";

export type SmileConfig = {
    endpoint: string,
    property: string,
    read: boolean,
    write: boolean
};
export type BaseControl = { type: string; id: number; value?: string, smile?: SmileConfig };
export type ContainerControl = BaseControl & { children: Control[]; };
export type InstallMeterControl = ContainerControl & { data: { name: string; }; };
export type ComponentControl = BaseControl & { data: { name: string; }; };
export type TextboxControl = BaseControl & {
    data: {
        label: string;
        defaultValue?: string;
    };
};
export type RegionControl = ContainerControl & { data: { name: string; }; };
export type Control = InstallMeterControl | ComponentControl | TextboxControl | RegionControl;
export type Template = Control[];

export class WorkTaskServiceService {
    commitDraft(workTaskId: number) {
        let smileapiCalls: any[] = [];
        let template = this.getTemplateById(workTaskId);
        const findSmileData = (root: Control) => {
            if (root.smile) {
                smileapiCalls.push([root.smile, root.value]);
            }
            let children = (root as ContainerControl)?.children;
            children?.forEach(t => findSmileData(t));
        };
        template?.forEach(t => findSmileData(t));
        smileapiCalls.forEach(call => {
            const smile: SmileConfig = call[0];
            const value: string = call[1];

            SmileApiService.getInstance().callApi(smile, value);
        });
    }
    private eventLog: string[] = [];
    private static instance: WorkTaskServiceService | null = null;

    getTemplateById(workTaskId: number): Template {
        let meterTask = WorkDatabaseService.getInstance().getMeterTask(workTaskId);
        if (!meterTask) return [];
        let smileTemplate: SmileConfig = {
            endpoint: "/somewhere",
            property: "p1",
            read: true,
            write: true
        };
        let template = [
            {
                id: 1,
                type: "InstallMeterControl",
                data: {
                    name: "🍇Installer Måler"
                },
                children: [{
                    id: 2,
                    type: "TextboxControl",
                    data: {
                        label: "test",
                        defaultValue: "1234-måler"
                    },
                    smile: { ...smileTemplate, endpoint: "/e1", property: "p1" },
                },
                {
                    id: 12,
                    type: "TextboxControl",
                    data: {
                        label: "test",
                        defaultValue: "1234-måler"
                    },
                    smile: { ...smileTemplate, endpoint: "/e3", property: "p4" },
                }]
            },
            {
                id: 3,
                type: "ComponentControl",
                data: {
                    name: "🍊Komponenter"
                }
            },
            {
                id: 4,
                type: "RegionControl",
                data: {
                    name: "🍉Klump"
                },
                children: [
                    {
                        id: 5,
                        type: "TextboxControl",
                        data: {
                            label: "test",
                            defaultValue: "klump-1"
                        },
                        smile: { ...smileTemplate, endpoint: "/e2", property: "p2" },
                    }, {
                        id: 6,
                        type: "TextboxControl",
                        data: {
                            label: "test",
                            defaultValue: "klump-2"
                        },
                    }]
            },

        ];
        let draft = WorkDatabaseService.getInstance().getDraft(workTaskId);
        if (draft) {
            const updateValues = (root: Control) => {
                let draftItem = draft.find(d => d.id == root.id);
                if (draftItem) {
                    root.value = draftItem.value;
                }
                let children = (root as ContainerControl)?.children;
                children?.forEach(t => updateValues(t));
            };
            template?.forEach(t => updateValues(t));
        }
        return template;
    }
    createNewWorkOrder(request: InstallMeterRequest) {
        this.log("received request");
        let meterTask = this.mapRequestToMeterTask();
        this.log("mapping request to metertask");
        WorkDatabaseService.getInstance().saveMeterTask(meterTask);
        this.log("saving metertask to database");
    }

    getEventLog(): string {
        return this.eventLog.join("\n");
    }

    private log(msg: string) {
        this.eventLog.push(new Date().toISOString() + ": " + msg);
    }

    private mapRequestToMeterTask(): MeterTask {
        return {
            workTaskId: 0,
            taskTypeId: 1,
        };
    }


    private constructor() { }

    static getInstance(): WorkTaskServiceService {
        if (!WorkTaskServiceService.instance) {
            WorkTaskServiceService.instance = new WorkTaskServiceService();
        }
        return WorkTaskServiceService.instance;
    }

}

