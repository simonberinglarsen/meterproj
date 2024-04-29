import { useEffect, useState } from 'react';
import './App.css';
import Tabs from './components/tabs';
import SmileApi from './pages/SmileApi';
import SmileDHM from './pages/SmileDHM';
import WorkTaskService from './pages/WorkTaskService';
import WorkFrontend from './pages/WorkFrontend';
import WorkDatabase from './pages/WorkDatabase';
import styled from 'styled-components';

const App = () => {
  const tabs = [
    { name: 'Smile.Api', component: <SmileApi /> },
    { name: 'Smile.DHM', component: <SmileDHM /> },
    { name: 'Work.TaskService', component: <WorkTaskService /> },
    { name: 'Work.Frontend', component: <WorkFrontend /> },
    { name: 'Work.Database', component: <WorkDatabase /> },
  ];

  const [selectedTab, setSelectedTab] = useState<string>();
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };
  const renderComponent = () => {
    return tabs.find(t => t.name == selectedTab)?.component;
  };
  useEffect(() => {
    setSelectedTab(tabs[0].name);
  }, []);

  return (
    <>
      <Tabs selectedTab={selectedTab ?? ''} tabs={tabs.map(t => t.name)} onTabSelect={(tab) => { handleTabSelect(tab) }}></Tabs >
      <Page>
        {renderComponent()}
      </Page>
    </>
  );
}

export default App;

const Page = styled.div`
padding:1rem;
`;
