import { WorkDatabaseService } from "../services/WorkDatabaseService";

const WorkDatabase = () => {


    return (
        <pre>
            {JSON.stringify(WorkDatabaseService.getInstance().getStorage(), null, 2)}
        </pre>
    );
}

export default WorkDatabase;
