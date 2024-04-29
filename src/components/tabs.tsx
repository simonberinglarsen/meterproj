import { useState } from "react";
import styled from "styled-components";

interface Props {
    tabs: string[],
    selectedTab: string,
    onTabSelect: (tab: string) => void;
}
const Tabs = (props: Props) => {
    const { tabs, selectedTab, onTabSelect } = props;

    const onClick = (tab: string) => {
        onTabSelect(tab);
    }

    return (
        <Container>
            {tabs.map((tab) => (
                <Tab
                    key={tab}
                    selected={tab === selectedTab}
                    onClick={() => onClick(tab)}>
                    {tab === selectedTab ? <strong>{tab}</strong> : <>{tab}</>}
                </Tab>
            ))}
        </Container>
    );
}

export default Tabs;

const Tab = styled.div<{ selected?: boolean }>`
border-top: 2px solid black;
border-left: 2px solid black;
border-right: 2px solid black;
border-top-left-radius: 0.25rem;
border-top-right-radius: 0.25rem;
width:10rem;
padding:0.25rem;
background-color:#eee;
 ${(props) => props.selected ? 'background-color: #fd0;' : ''};
cursor: pointer;
`;
const Container = styled.div`
padding-left:1rem;
border-bottom: 2px solid black;
flex-direction:row;
display:flex;
background-color:#fff;
`;