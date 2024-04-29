import styled from "styled-components";
import { InstallMeterControl } from "../services/WorkTaskServiceService";
import UIControl from "./ui-control";

interface Props {
    control?: InstallMeterControl;
}
const UIInstallMeterControl = (props: Props) => {
    const { control } = props;


    return (
        <InstallMeter>
            <h3>{control?.data?.name}</h3>
            {control?.children.map(child => <UIControl key={child.id} control={child}></UIControl>)}
        </InstallMeter>
    );
}

export default UIInstallMeterControl;
const InstallMeter = styled.div`
border: 1px solid black;
border-radius:0.25rem;
margin: 1rem;
padding: 1rem;
`;