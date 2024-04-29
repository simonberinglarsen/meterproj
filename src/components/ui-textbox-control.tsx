import styled from "styled-components";
import { InstallMeterControl, TextboxControl } from "../services/WorkTaskServiceService";
import { useState } from "react";

interface Props {
    control?: TextboxControl;
}
const UITextboxControl = (props: Props) => {
    const { control } = props;
    const [value, setValue] = useState<string>();
    const updateValue = (newValue: string) => {
        setValue(newValue);
        if (!control) return;
        control.value = newValue;
    }
    return (
        <Textbox>
            <label>{control?.data?.label}</label>
            <input
                id="work-task-id"
                type="text"
                defaultValue={control?.data?.defaultValue}
                value={control?.value}
                onChange={(e) => updateValue(e.target.value)}
            />
        </Textbox>
    );
}

export default UITextboxControl;

const Textbox = styled.div`
border: 1px solid black;
border-radius:0.25rem;
margin: 1rem;
padding: 1rem;
display: flex;
align-items: center;
gap: 10px; /* Adjust the gap value as per your preference */
`;