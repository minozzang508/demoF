import React from "react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "8px 18px 8px 18px",
    border: "solid 1px #ececec",
    minHeight:"150px",
    
  },
  orderList: {
    padding: "0px 8px 0px 8px"
  }
}));

function BasketList(props) {
  const classes = useStyles();
  const { total, selectedItems } = props;

  const getOrderList =
    selectedItems.length > 0 ? (
      map(selectedItems, (item, index) => (
        <Grid
          key={item.name+item.price}
          item
          container
          justify={"space-between"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography variant="body2">
              {item.name}X{item.count}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline">
              <NumberFormat
                value={item.price * item.count}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" 원"}
              />
            </Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Grid item>아직 주문 내역이 없습니다.</Grid>
    );

  return (
      <Paper className={classes.paper} square={true}>
        <Grid container direction="column">
          <Grid
            item
            container
            justify={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs container>
              <Grid item>
                <Typography  variant="subtitle1">
                  총 결제 금액
                </Typography>
                <Typography style={{color:"#322D84"}} variant="h5">
                  {total}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link to="/">주문 변경</Link>
              </Typography>
            </Grid>
          </Grid>
          {getOrderList}
        </Grid>
      </Paper>
  );
}

export default BasketList;

// change from Paper to App bar
