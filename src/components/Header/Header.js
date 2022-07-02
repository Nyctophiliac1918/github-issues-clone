import React, { useState } from 'react';
import './Header.css'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { tabs } from './tabs';
import TabsIcons from './../Icons/TabsIcons';
import RepoDetails from './RepoDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => tabs.map( (tab, index) => 
    <Tab
      id={`scrollable-tab-${index}`}
      aria-controls={`scrollable-tabpanel-${index}`}
      key={tab.icon}
      icon={<TabsIcons type={tab.icon} />}
      label={tab.text}
    />
  )

  return (
    <div className='header'>
      <RepoDetails />
      <div className={classes.root}>
        <AppBar position="static" elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
          { renderTabs() }
          </Tabs>
        </AppBar>
      </div>
    </div>
  );
}