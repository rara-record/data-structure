import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import issues from "./issues";

import React from 'react';

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

      </TabPanel>
      <TabPanel>

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
