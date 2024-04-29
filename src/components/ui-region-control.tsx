import styled from "styled-components";
import { RegionControl } from "../services/WorkTaskServiceService";
import UIControl from "./ui-control";

interface Props {
    control?: RegionControl;
}
const UIRegionControl = (props: Props) => {
    const { control } = props;


    return (
        <Region>
            <h3>{control?.data?.name}</h3>
            {control?.children.map(child => <UIControl key={child.id} control={child}></UIControl>)}
        </Region>
    );
}

export default UIRegionControl;

const Region = styled.div`
border: 1px solid black;
border-radius:0.25rem;
margin: 1rem;
padding: 1rem;
`;