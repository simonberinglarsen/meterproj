import styled from "styled-components";
import { ComponentControl } from "../services/WorkTaskServiceService";

interface Props {
    control?: ComponentControl;
}
const UIComponentControl = (props: Props) => {
    const { control } = props;

    return (
        <Component>
            <h3>{control?.data?.name}</h3>
        </Component>
    );
}

export default UIComponentControl;

const Component = styled.div`
border: 1px solid black;
border-radius:0.25rem;
margin: 1rem;
padding: 1rem;
`;