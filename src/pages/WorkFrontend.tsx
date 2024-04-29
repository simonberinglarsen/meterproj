import styled from "styled-components";
import { ContainerControl, Control, Template, WorkTaskServiceService } from "../services/WorkTaskServiceService";
import { useState } from "react";
import UIControl from "../components/ui-control";
import { Container } from "react-dom";
import WorkDatabase from "./WorkDatabase";
import { WorkDatabaseService } from "../services/WorkDatabaseService";
import DraftItem from "../types/DraftItem";

const WorkFrontend = () => {
    const [workTaskId, setWorkTaskId] = useState<number>(0);
    const [template, setTemplate] = useState<Template | null>(null);

    const onOpenClick = () => {
        let template: Template = WorkTaskServiceService.getInstance().getTemplateById(workTaskId);
        setTemplate(template);
    };

    const onSaveClick = () => {
        let foundValues: DraftItem[] = [];
        const findValues = (root: Control) => {
            if (root.value) {
                foundValues.push({ id: root.id, value: root.value });
            }
            let children = (root as ContainerControl)?.children;
            children?.forEach(t => findValues(t));
        };
        template?.forEach(t => findValues(t));
        WorkDatabaseService.getInstance().saveDraft(workTaskId, foundValues);
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
                <button onClick={() => onOpenClick()}>Åbn datafane</button>
            </FormGroup>
            <UITemplate>
                {template && template.map(c => <UIControl key={c.id} control={c as Control}></UIControl>)}
                <button onClick={() => onSaveClick()}>Gem</button>
                <JsonView>
                    {JSON.stringify(template, null, 2)}
                </JsonView>
            </UITemplate>

        </>
    );
}

export default WorkFrontend;

const FormGroup = styled.div`
display: flex;
align-items: center;
gap: 10px; /* Adjust the gap value as per your preference */
`;

const UITemplate = styled.div`
width: 50rem;
`;

const JsonView = styled.pre`
background-color: #222;
color: #0a0;
padding: 1rem;
border-radius:0.5rem;
`;