import React, { Component, Fragment } from "react";

import { map } from "lodash";
import cardimage from "../../../assets/images/jimingod.jpg";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  title: {
    marginLeft: "18px",
    paddingTop: "8px"
  },
  paper: {
    height: "150px",
    border: "solid 1px #ececec;",
    backgroundColor: "#ffffff"
  },
  button: {
    width: "72px",
    height: "72px",
    borderRadius: "4px",
    border: "solid 1px #d5d5d5",
    margin: "15px 19px 26px 19px"
  },
  typo: {
    border: "solid 1px #3c4351",
    height: "72px",
    width: "72px"
  }
});

const S = {
  MethodsContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 14px 18px 20px 18px;
  `,
  CardLabel: styled.label`
    border: ${props =>
      props.cardId === props.labelId
        ? "solid 1px #3c4351"
        : " solid 1px #d5d5d5"};
    border-radius: 4px;
    height: 72px;
    width: 72px;
    text-align: center;
    display: flex;
    flex-direction: column;
    @media(max-width:360px){
      margin: 2px;
    }
  `,
  CardName: styled.div`
    height: 15px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    text-align: center;
    margin: auto;
    opacity: ${props => (props.cardId === props.labelId ? "1" : "0.36")};
  `,
  CardImg: styled.img`
    width: 24px;
    height: 24px;
    margin-top: 14px;
    opacity: ${props => (props.cardId === props.labelId ? "1" : "0.36")};
  `
};
class Payment extends Component {
  state = {
    backgroundColor: "white",
    cardId: 1,
    isOpen: false
  };

  constructor(props) {
    super(props);
    this.onChangeCardButton = this.onChangeCardButton.bind(this);
  }

  onChangeCardButton(e) {
    this.props.setSelectedPaymentId(parseInt(e.target.value));
    this.setState({
      cardId: parseInt(e.target.value),
      cardName: this.props.paymentMethods[parseInt(e.target.value)-1].name
    });
  }

  render() {
    const { classes, paymentMethods } = this.props;
    const { cardId, backgroundColor } = this.state;


    const methods = map(paymentMethods, paymentMethod => (
      <Fragment key={paymentMethod.id}>
        <input
          style={{ display: "none"}}
          id={paymentMethod.id}
          type="radio"
          name="cardGroup"
          checked={cardId === paymentMethod.id}
          value={paymentMethod.id}
          onChange={this.onChangeCardButton}
        />
        <S.CardLabel
          htmlFor={paymentMethod.id}
          cardId={this.state.cardId}
          labelId={paymentMethod.id}
          background={backgroundColor}
        >
          <div>
            <S.CardImg
              src={cardimage}
              alt="card"
              cardId={this.state.cardId}
              labelId={paymentMethod.id}
            />
          </div>
          <S.CardName cardId={this.state.cardId} labelId={paymentMethod.id}>
            {paymentMethod.name}
          </S.CardName>
        </S.CardLabel>
      </Fragment>
    ));
    return (
      <Paper className={classes.paper} square={true}>
        <Typography className={classes.title} variant="h6">
          결제수단 선택
        </Typography>
        <S.MethodsContainer>{methods}</S.MethodsContainer>
      </Paper>
    );
  }
}

export default withStyles(styles)(Payment);
