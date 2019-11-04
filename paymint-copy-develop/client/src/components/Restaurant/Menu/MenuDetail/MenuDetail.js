import React, { Component } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";

import menuImage from "../../../../assets/images/jimingod.jpg";

import Transition from '../../../UI/Transition/Transition';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Clear } from "@material-ui/icons/";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";

const S = {
  Ul: styled.ul`
    display: flex;
    margin-bottom: 20px;
    padding: 8px 24px 8px 24px;
  `,
  List: styled.li``,
  ButtonList: styled.li`
    display: table;
    text-align: center;
    border-radius: 3.3px;
    border: solid 0.8px #979797;
    background-color: #ffffff;
  `,
  IconButton: styled.span`
      color: #ffffff;
      background-color:#9b9b9b;
      border-radius:3.3px;
      padding:0;
      width: 45px;
      height: 40px;
      display: table-cell;
      vertical-align: middle;
     
    `,
  Count: styled.span`
    width: 70px;
    height: 40px;
    display: table-cell;
    vertical-align: middle;
    font-size:18px
  `
};

const styles = theme => ({
  
  dialog: {
    height: "100%",
    margin: "auto"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  actions: {
    padding:0
  },
  onSubmitButton: {
    width: "100%",
    height: "55px",
    backgroundColor:"#F9715D",
    color:"#FFFFFF",
    borderRadius:0
  }
});


class MenuDetail extends Component {
  render() {
    const {
      classes,
      handleClose,
      isOpen,
      name,
      price,
      normalPriceInput,
      discountInput,
      increaseCount,
      decreaseCount,
      count,
      handlePut
    } = this.props;

    return (
      <Dialog
        className={classes.dialog}
        fullScreen={true}
        onClose={handleClose}
        open={isOpen}
        TransitionComponent={Transition}
      >
        <GridList spacing={1}>
          <GridListTile>
            <img src={menuImage} alt="상세메뉴 사진" />
            <GridListTileBar
              titlePosition="top"
              actionIcon={
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <Clear />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            ></GridListTileBar>
          </GridListTile>
        </GridList>

        <S.Ul>
          <S.List>
            <div>
              <h2>{name}</h2>
            </div>
            <div>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" 원"}
              />
            </div>
            <div>
              메뉴 설명 넣어야 함
            </div>
          </S.List>
         
        </S.Ul>
        <S.Ul>
          <S.ButtonList>
            <S.IconButton onClick={decreaseCount}>
              <Remove />
            </S.IconButton>
            <S.Count>{count}</S.Count>
            <S.IconButton onClick={increaseCount}>
              <Add />
            </S.IconButton>
          </S.ButtonList>
        </S.Ul>
        <Divider />
        <DialogContent>
          옵션 선택
          <br/>
          {normalPriceInput}
          <br />
          {discountInput}
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Button
            className={classes.onSubmitButton}
            disabled={count === 0}
            onClick={handlePut}
          >
            {count}개 메뉴 담기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MenuDetail);
