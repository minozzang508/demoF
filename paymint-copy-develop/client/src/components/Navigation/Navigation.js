import React, { Component } from "react";

import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const S = {
  RestaurantInfo: styled.span`
    
    height: 15px;
    opacity: 0.7;
    font-family: Roboto;
    font-size: 12px;
    color: #333333;
    text-align:center;
    @media(max-width:320px){
      font-size:8px;
    }
  `,
  RestaurantName: styled.span`
  {
    height: 21px;
    font-family: Roboto;
    font-size: 18px;
    color: #333333;
    margin-bottom:10px;
    margin-top:10px;
    @media(max-width:320px){
      font-size:15px
    }
  }
  `

};

const styles = {
  title: {
    color: "#333333",
    pdding:"0px"
  },
  appBar: {
    background: "#ffffff;",
    padding:'0px 10px'
  },
  button: {
    
    height: "21px",
    bordeRadius: "10.5px",
    border: "solid 1px #979797",
    backgroundColor: '#d8d8d8',
    marginBottom: '3px',
    padding:"0px 0px 0px 0px"
  },
  toolbar:{
      justifyContent:'space-between',
      padding:'0px'
  }
};

@inject("restaurantStore")
@observer
class Navigation extends Component {
  /*
  <li> <NavLink to="/"  exact > 메뉴 </NavLink></li>
                <li><NavLink to="/restaurant"  > 매장정보 </NavLink></li>
*/

  componentDidMount() {
    const id = 2;
    const { restaurantStore } = this.props;
    restaurantStore.fetchRestaurantInfo(id);
  }

  render() {
    const { classes } = this.props;
    const { info } = this.props.restaurantStore;

    const MainLink = React.forwardRef((props, ref) => (
      <Link innerRef={ref} to="/" {...props} />
    ));
    const RestaurantInfoLink = React.forwardRef((props, ref) => (
      <Link innerRef={ref} to="/restaurant" {...props} />
    ));

    return (
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          {/* <Logo /> */}
          <Typography className={classes.title} variant="h6">
            <Button component={MainLink}> 
            <S.RestaurantName>{info.name}</S.RestaurantName>
            </Button>
          <Button className={classes.button} component={RestaurantInfoLink}>
            <S.RestaurantInfo> 매장정보 </S.RestaurantInfo>
          </Button>
          </Typography>
          <Typography className={classes.title}>
              <span>테이블#2</span>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navigation);

// navigation 에다가 가게의 정보가 보여야 됨.
// ex) 가게 이름, 가게 메뉴, 가게 정보 ,영업 시간 ( 영업 중인지 아닌지? )
// commonStore 와 restaurantStore ( 가칭 )
