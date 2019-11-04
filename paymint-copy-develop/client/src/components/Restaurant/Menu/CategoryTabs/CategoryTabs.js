import React, { Component, Fragment } from "react";
import MenuItem from "../MenuItem";
import PropTypes from "prop-types";
import { map } from 'lodash';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { computed } from "mobx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    marginTop: 56
  }
});

const CustomTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    color:'black',
    backgroundColor: "#ffffff",
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    height:3,
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 12,
      width: '100%',
      backgroundColor: '#F9715D',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);


const CustomTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      color: '#F9715D',
      opacity: 1,
    },
    '&$selected': {
      color: '#F9715D',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#F9715D',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);



class CategoryTabs extends Component {
  state = {
    value: 0
  };

  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, newValue){
    this.setState({
      value: newValue
    });
  };

  @computed
  get category(){
    return this.props.categories;
  }
  @computed
  get menu(){
    return this.props.menu;
  }


  render() {
    const { classes, put } = this.props;

    const TabArray = map(this.category,(category, index) => (
      <CustomTab key={category.id} label={category.name} {...a11yProps(index)} />
    ));


    const TabPanelArray = map(this.category, (category, index) =>(
      <TabPanel value={this.state.value} index={index} key={category.id}>
        {this.menu
          .filter(item => item.categoryId === category.id)
          .map(menuItem => (
            <MenuItem
              {...menuItem}
              onPut={put}
              key={menuItem.id}
            />
          ))}
      </TabPanel>
    ) )

    return (
      <Fragment>
        <AppBar className={classes.appBar} position="fixed" color="default">
          <CustomTabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable force tabs example"
          >
            {TabArray}
          </CustomTabs>
        </AppBar>
        {TabPanelArray}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryTabs);

CategoryTabs.propTypes ={
  put: PropTypes.func
}