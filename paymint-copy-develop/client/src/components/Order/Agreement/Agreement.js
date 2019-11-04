import React, { Component } from "react";

import Collection from "./Collection/Collection";
import Providing from "./Providing/Providing";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  title: {
    marginLeft: "18px",
    marginTop: "10px"
  },
  paper: {
    border: "solid 1px #ececec;",
    backgroundColor: "#ffffff",
    padding:"10px 0px 10px 18px"
  }
});

const S = {
  Content: styled.li`
    display: flex;
    justify-content: space-between;
    padding: 5px 15px 0px 9px;
  `
};

class Agreement extends Component {
  state = {
    totalAgreement: false,
    collectionAgreement: false,
    providingAgreement: false,
    collectionIsOpen: false,
    providingIsOpen: false
  };
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.onChangeTotalAgreement = this.onChangeTotalAgreement.bind(this);
    this.onChangeCollectionAgreement = this.onChangeCollectionAgreement.bind(this);
    this.onChangeProvidingAgreement = this.onChangeProvidingAgreement.bind(this);
    this.onClickRenderCollection = this.onClickRenderCollection.bind(this);
    this.onClickRenderProviding = this.onClickRenderProviding.bind(this);
  }
  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  onChangeTotalAgreement() {
    this.props.setAgreement(!this.state.totalAgreement);
    this.setState({
      ...this.state,
      totalAgreement: !this.state.totalAgreement
    },()=> {
      if(this.state.totalAgreement){
        this.setState({
          collectionAgreement:true,
          providingAgreement:true
        })
      }else{
        this.setState({
          collectionAgreement:false,
          providingAgreement:false
        })
      }
    
    });
   
  }
  onChangeCollectionAgreement(){
    this.setState({
      collectionAgreement:!this.state.collectionAgreement
    }, ()=> {
      if(this.state.collectionAgreement && this.state.providingAgreement){
        this.props.setAgreement(true);
        this.setState({
          totalAgreement:true
        });
      }else{
        this.props.setAgreement(false);
        this.setState({
          totalAgreement:false
        });
      }
    })
    
  }
  onChangeProvidingAgreement(){
    this.setState({
      providingAgreement:!this.state.providingAgreement
    }, ()=> {
      if(this.state.collectionAgreement && this.state.providingAgreement){
        this.props.setAgreement(true);
        this.setState({
          totalAgreement:true
        });
      }else{
        this.props.setAgreement(false);
        this.setState({
          totalAgreement:false
        });
      }
    })
  }

  onClickRenderCollection() {
    this.setState({
      ...this.state,
      collectionIsOpen: !this.state.collectionIsOpen
    });
  }
  onClickRenderProviding() {
    this.setState({
      ...this.state,
      providingIsOpen: !this.state.providingIsOpen
    });
  }

  render() {
    const { classes } = this.props;
    const { error } = this.props;
    if(error !== undefined){
      this.focusTextInput();
    }

    const renderCollection = this.state.collectionIsOpen ? (
      <li>
        <Collection />
      </li>
    ) : null;

    const renderProviding = this.state.providingIsOpen ? (
      <li>
        <Providing />
      </li>
    ) : null;
    return (
      <Paper className={classes.paper} square={true}>
        <div >약관 동의</div>
        <ul>
          <li>
            <Checkbox
              id="totalAgreement"
              checked={this.state.totalAgreement}
              color="default"
              onChange={this.onChangeTotalAgreement}
              value={this.state.totalAgreement}
              inputProps={{
                "aria-label": "Agreement CheckBox"
              }}
              inputRef={this.textInput}
            />
            <label htmlFor="totalAgreement">결제 진행 필수 동의</label>
          </li>
          <S.Content>
            <div>
              <Checkbox
                id="collectionAgreement"
                checked={this.state.collectionAgreement}
                color="default"
                onChange={this.onChangeCollectionAgreement}
                value={this.state.CollectionAgreement}
                inputProps={{
                  "aria-label": "collectionAgreement CheckBox"
                }}
              />
              <label htmlFor="collectionAgreement">개인 정보 수집 동의</label>
              
            </div>
            <Button onClick={this.onClickRenderCollection}>약관보기</Button>
          </S.Content>
          {renderCollection}
          <S.Content>
            <div>
              <Checkbox
                id="providingAgreement"
                checked={this.state.providingAgreement}
                color="default"
                onChange={this.onChangeProvidingAgreement}
                value={this.state.providingAgreement}
                inputProps={{
                  "aria-label": "Agreement CheckBox"
                }}
              />
              <label htmlFor="providingAgreement"> 개인 정보 서비스 약관 동의</label>
            </div>
            <Button onClick={this.onClickRenderProviding}>약관보기</Button>
          </S.Content>
          {renderProviding}
        </ul>
      </Paper>
    );
  }
}

export default withStyles(styles)(Agreement);
