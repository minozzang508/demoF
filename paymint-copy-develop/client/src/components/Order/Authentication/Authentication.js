import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  title: {
    marginRight: "29px",
    ['@media (max-width:320px)']: { // eslint-disable-line no-useless-computed-key
      marginRight: "15px"
    }
  },
  list: {
    backgroundColor: "#ffffff",
    border: "solid 1px #ececec"
  },
  changeButton: {
    opacity: "0.35",
    color: " #333333"
  },
  button: {
    borderRadius: "4px",
    border: "solid 1px #d5d5d5",
    height: "40px"
  }
});

const S = {
  Input: styled.input`
    width: 140px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #d5d5d5;
   
    @media(min-width:360px){
      width: 170px;
    }
    
    @media(min-width:768px){
      width: 500px;
    }
  `
};

class Authentication extends Component {
  state = {
      phoneNumber: '',
      authNumber: '',
  };

  constructor(props) {
    super(props);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeAuth = this.handleChangeAuth.bind(this);
  }

  handleChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }
  handleChangeAuth(e) {
    this.setState({
      authNumber: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    let phoneNumberButtonDisabled = true;
    let authButtonDisabled = true;

    console.log(this.state.phoneNumber);
    if(this.state.phoneNumber.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)){
      phoneNumberButtonDisabled =false;
      console.log(phoneNumberButtonDisabled);
    }

    return (
      <List className={classes.list}>
        <ListItem>
          <Typography className={classes.title} variant="h6">
            결제 인증
          </Typography>

          <ListItemSecondaryAction>
            <Button className={classes.changeButton}>번호변경</Button>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <Typography className={classes.title} variant="subtitle1">
            휴대전화
          </Typography>
          <S.Input type="text" placeholder="[-]을 제외한 전화번호를 입력해주세요." value={this.state.phoneNumber} onChange={this.handleChangePhoneNumber} />

          <ListItemSecondaryAction>
            <Typography align="center">
              <Button className={classes.button} disabled={phoneNumberButtonDisabled} >인증</Button>
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <Typography className={classes.title} variant="subtitle1">
            인증번호
          </Typography>
          <S.Input type="text" placeholder="인증번호 6자리를 입력하세요." readOnly />

          <ListItemSecondaryAction>
            <Typography align="center">
              <Button className={classes.button} disabled={authButtonDisabled}>
                완료
              </Button>
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(Authentication);
