import React, { Component, Fragment } from "react";
import * as moment from "moment";
import { inject, observer } from "mobx-react";

import Navigation from "../../components/Navigation/Navigation";
import Location from './Location/Location';

import testImg from '../../assets/images/jimingod.jpg';
import Typography from "@material-ui/core/Typography";
import { AccessTime, LocationOn, Phone } from "@material-ui/icons/";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
    marginTop: 56
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

@inject("restaurantStore")
@observer
class Restaurant extends Component {
  
  state= {
    isOpen: false
  }

  constructor(props){
    super(props);
    this.onClickOpenLocation = this.onClickOpenLocation.bind(this);
  }

  onClickOpenLocation(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const { info } = this.props.restaurantStore;

    const { classes } = this.props;

    const openTime = moment({ hour: info.openHour, minute: info.openMin }).format(
      "HH:mm"
    );
    const closeTime = moment({
      hour: info.closeHour,
      minute: info.closeMin
    }).format("HH:mm");

    const getLocation = this.state.isOpen ? <Location/> : false ;

    return (
      <Fragment>
        <Navigation/>
        <Paper className={classes.paper}>
         
              <Grid item xs container direction="column">
                <Grid item xs>
                  <Typography variant="subtitle1" gutterBottom>
                   <img style={{height:"180px"}} src={testImg} alt="Store" />
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {info.name}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {info.description}
                  </Typography>
                  <br/>
                  <br/>
                  <br/>
                  <hr/>
                  <Typography variant="subtitle1" gutterBottom>
                    <LocationOn onClick={this.onClickOpenLocation} />
                    {info.address}
                    {getLocation}
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    <Phone /> 
                    <a href={"tel:"+ info.phone} >{info.phone}</a>
                  </Typography>
                 
                  <Typography variant="subtitle1" gutterBottom>
                    <AccessTime /> 영업시간 {openTime} ~ {closeTime}
                  </Typography>
                </Grid>
         
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Restaurant);
