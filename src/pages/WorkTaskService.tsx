import { useState } from "react";
import { WorkTaskServiceService } from "../services/WorkTaskServiceService";
import styled from "styled-components";

const WorkTaskService = () => {
    const [workTaskId, setWorkTaskId] = useState<number>(0);
    const onCommit = (workTaskId: number) => {
        WorkTaskServiceService.getInstance().commitDraft(workTaskId);
    };

    return (
        <>
            <FormGroup>
                <label>WorkTaskId: </label>
                <input
                    id="work-task-id"
                    type="text"
                    defaultValue={workTaskId}
                    onChange={(e) => setWorkTaskId(Number(e.target.value))}
                />
                <button onClick={() => onCommit(workTaskId)}>Afslut Opgave</button>
            </FormGroup>
            <pre>
                {WorkTaskServiceService.getInstance().getEventLog()}
            </pre >
        </>
    );
}

export default WorkTaskService;

const FormGroup = styled.div`
display: flex;
align-items: center;
gap: 10px; /* Adjust the gap value as per your preference */
`;
