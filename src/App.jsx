import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React from 'react';
import issues from "./issues";
import TableOriginal from "./TableOriginal";
import TableRefactorStep1 from "./TableRefactorStep1.jsx";
import TableRefactorStep2 from "./TableRefactorStep2.jsx";
import TableRefactorStep3 from "./TableRefactorStep3.jsx";
import TableRefactorFinal from "./TableRefactorFinal.jsx";


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
        <TableRefactorStep2 issues={issues} />
      </TabPanel>
      <TabPanel>
        <TableRefactorStep3 issues={issues}/>
      </TabPanel>
      <TabPanel>
        <TableRefactorFinal issues={issues}/>
      </TabPanel>
    </Tabs>
  );
};

export default App;
