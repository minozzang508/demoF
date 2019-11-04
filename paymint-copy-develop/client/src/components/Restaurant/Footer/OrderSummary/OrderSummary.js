import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import menuImage from "../../../../assets/images/jimingod.jpg";

import NumberFormat from "react-number-format";
import Transition from "../../../UI/Transition/Transition";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

import { Divider } from "@material-ui/core";

// OrderButton ( parchase method ) -> click 시 Dialog open
// Dialog에서는 주문 내역이 보여야함 .
const S = {
  AppbarTitle: styled.div`
    color: ${props => (props.fontColor ? "#f95e58" : "#333333")};
  `,
  OrderButton: styled.div`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  `,
  Ul: styled.ul`
    display: flex;
    height: 30px;
    margin-bottom: 20px;
    margin-top: 10px;
  `,

  ButtonList: styled.li`
    display: table;
    text-align: center;
    border-radius: 3.3px;
    border: solid 0.8px #979797;
    background-color: #ffffff;
  `,
  IconButton: styled.div`
    color: #ffffff;
    background-color:#9b9b9b;
    border-radius:3.3px;
    padding:0;
    width: 30px;
    height: 30px;
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
`,
  Count: styled.span`
    width: 40px;
    height: 30px;
    display: table-cell;
    vertical-align: middle;
  `,
  PriceDiv: styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    text-align: right;
  `,
  ItemNameSpan: styled.span`
    font-size: 13px;
    font-weight: bold;
    color: #333333;
  `,
  DeleteIcon: styled.div`
    font-size: 12px;
    text-align: right;
    padding-bottom: 15px;
    color: #333333;
    opacity: 0.7;
  `,
  PayButton: styled.div`
    text-align: center;
  `,
  AddButton: styled.div`
    width: 70%;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #d5d5d5;
    color: #333333;
    text-align: center;
  `,
  TotalDiv: styled.div`
    justify-content: space-between;
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 0;
    z-index: 2;
    background-color: #ffffff;
  `,
  Price: styled.div`
    font-size: 18px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.51px;
    color: #333333;
  `
};

const styles = theme => ({
  appBar: {
    background: "#ffffff"
  },
  toolbar: {
    justifyContent: "space-between",
    padding: "0px 0px 0px 24px"
  },
  closeButton: {
    color: "#333333",
    padding: "0"
  },
  listItemAvatar: {
    marginRight: "16px"
  },
  list: {
    // marginTop: "90px",
    // marginBottom: "20px"
    margin:"90px 0px 20px 0px",
  
  },
  payButton: {
    width: "100%",
    height: "55px",
    backgroundColor: "#F9715D",
    color: "#FFFFFF",
    borderRadius: 0
  },
  dialogAction: {
    padding: "0",
    justifyContent: "center",
    marginBottom:"100px",
  },
  leftItem: {
    marginTop: "18px"
  },
  rightItem: {
    margin: 0
  }
});

class OrderSummary extends Component {
  state = {
    isOpen: false
  };

  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({
      ...this.state,
      isOpen: true
    });
  }

  handleClose() {
    this.setState({
      ...this.state,
      count: 1,
      isOpen: false
    });
  }

  render() {
    const {
      classes,
      selectedItems,
      onTake,
      increaseQuantity,
      removeItem,
      showTotal,
      restaurantName
    } = this.props;

    const renderBasketList = selectedItems.map(item => (
      <Fragment key={item.name+item.price}>
        <ListItem>
          <ListItemAvatar className={classes.listItemAvatar}>
            <img style={{ width: "65px" }} alt="Food" src={menuImage} />
          </ListItemAvatar>
          <ListItemText
            className={classes.leftItem}
            disableTypography={true}
            primary={<S.ItemNameSpan>{item.name}</S.ItemNameSpan>}
            secondary={
              <div>
                <S.Ul>
                  <S.ButtonList>
                    <S.IconButton onClick={() => onTake(item.name, item.price)}>
                      <Remove style={{ paddingTop: "5" }} />
                    </S.IconButton>

                    <S.Count>{item.count}</S.Count>
                    <S.IconButton
                      onClick={() => increaseQuantity(item.name, item.price)}
                    >
                      <Add style={{ paddingTop: "5" }} />
                    </S.IconButton>
                  </S.ButtonList>
                </S.Ul>
              </div>
            }
          />
          <ListItemText
            className={classes.rightItem}
            disableTypography={true}
            primary={
              <S.DeleteIcon onClick={() => removeItem(item.name, item.price)}>
                삭제
              </S.DeleteIcon>
            }
            secondary={
              <S.PriceDiv>
                <NumberFormat
                  value={item.price * item.count}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" 원"}
                />
              </S.PriceDiv>
            }
          ></ListItemText>
        </ListItem>
        <Divider />
      </Fragment>
    ));

    const OrderLink = React.forwardRef((props, ref) => (
      <Link innerRef={ref} to="/order" {...props} />
    ));

    return (
      <div>
        <S.OrderButton onClick={this.handleClickOpen}>
          <div style={{ fontSize: 15, color: "#9b9b9b" }}>결제금액</div>
          <div style={{ color: "#F9715D", textAlign: "right" }}>
            {showTotal} >{" "}
          </div>
        </S.OrderButton>
        <Dialog
          fullScreen
          open={this.state.isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} position="fixed">
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">
                <S.AppbarTitle fontColor="#f95e58">테이블 2번의 </S.AppbarTitle>
                <S.AppbarTitle>주문내역을 확인하세요.</S.AppbarTitle>
              </Typography>
              <Button
                className={classes.closeButton}
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
                {/* close 버튼  */}
              </Button>
            </Toolbar>
          </AppBar>

          <List className={classes.list}>
            <Typography style={{paddingLeft:16}} variant="caption">{restaurantName}</Typography>
            {renderBasketList}
          </List>
          <DialogActions className={classes.dialogAction}>
            <S.AddButton onClick={this.handleClose}>
              <p style={{ paddingTop: "8px" }}>+ 메뉴 추가하기</p>
            </S.AddButton>
          </DialogActions>
          <S.TotalDiv>
            <Button className={classes.payButton}  variant="contained" color="secondary" component={OrderLink}>
              {showTotal} 결제하기
            </Button>
          </S.TotalDiv>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(OrderSummary);
