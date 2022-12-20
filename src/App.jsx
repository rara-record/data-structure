import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React from 'react';
import issues from "./issues";
import TableOriginal from "./TableOriginal";
import TableRefactorStep1 from "./TableRefactorStep1.jsx";


const App = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Original</Tab>
        <Tab>New Data Structure</Tab>
        <Tab>Use Derived State</Tab>
        <Tab>No document.getElementById()</Tab>
        <Tab>Final</Tab>
      </TabList>

      <TabPanel>
        <TableOriginal issues={issues} />
      </TabPanel>
      <TabPanel>
        <TableRefactorStep1 issues={issues} />
      </TabPanel>
      <TabPanel>

      </TabPanel>
      <TabPanel>

      </TabPanel>
      <TabPanel>

      </TabPanel>
    </Tabs>
  );
};

export default App;
