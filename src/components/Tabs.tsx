import { useState } from 'react';
import styled from 'styled-components';

const Tab = styled.div<{ active?: boolean }>`
  padding: 10px;
  cursor: pointer;
  border-bottom: ${({ active }) => active ? '2px solid #007bff' : 'none'};
`;

export default function Tabs({ tabs, onChange }: { tabs: string[], onChange: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onChange(tab);
  };

  return (
    <div style={{ display: 'flex' }}>
      {tabs.map(tab => (
        <Tab key={tab} active={activeTab === tab} onClick={() => handleTabClick(tab)}>
          {tab}
        </Tab>
      ))}
    </div>
  );
}
