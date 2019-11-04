import React from "react";
import jimingod from "../../../assets/images/jimingod.jpg";

import Transition from "../../UI/Transition/Transition";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Clear from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  button: {
    width: "300px",
    height: "48px",
    borderRadius: 4,
    backgroundColor: "#F95E58",
    color: "#ffffff",
    margin: "20px 0px 20px 0px"
  },
  paper: {
    textAlign: "center",
    border: "solid 1px #ececec"
  },
  dialog: {
    textAlign: "center",
   
  },
  title: {
    color: "#333333"
  },
  appBar: {
    background: "#ffffff;"
  }
}));

function OrderSubmit(props) {
  const classes = useStyles();

  const {
    total,
    clicked,
    isOpen,
    onClickOpenDialog,
    onClickCloseDialog,
    paymentMethodName
  } = props;

  return (
    <Paper className={classes.paper} square={true}>
      <Button className={classes.button} variant="contained" color="secondary" onClick={onClickOpenDialog}>
        {total} 결제하기
      </Button>

      <Dialog
        className={classes.dialog}
        fullScreen
        open={isOpen}
        onClose={onClickCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <div
              style={{ color: "black", marginRight: 15, marginTop: 5 }}
              onClick={onClickCloseDialog}
            >
              <ArrowBackIcon />
            </div>
            <Typography variant="h6" className={classes.title}>
              결제하기
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{display:"flex",justifyContent:"space-between", padding:"10px 20px 20px 20px"}}>
          <div><h3>{paymentMethodName}</h3></div>
          <div onClick={onClickCloseDialog}>
            <Clear fontSize="default"/>
          </div>
        </div>
        <div>
          <img
            style={{ width: "100px", height: "100px" }}
            src={jimingod}
            alt="Card"
          />
        </div>
        <div>
          <Button className={classes.button}  variant="contained" color="secondary" onClick={clicked}>
            {paymentMethodName} 앱으로 결제
          </Button>
        </div>
      </Dialog>
    </Paper>
  );
}

export default OrderSubmit;
