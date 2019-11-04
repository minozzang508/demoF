import React, { Component, Fragment } from "react";
import { computed } from "mobx";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import MenuDetail from "./MenuDetail/MenuDetail";

import menuImage from "../../../assets/images/jimingod.jpg";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
   
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%"
  },
  put: {
    width: "321px",
    height: "48px",
    borderRadius: "4px",
    backgroundColor: "#3c4351"
  }
});

class MenuItem extends Component {
  state = {
    isOpen: false,
    menuPrice: 0,
    count: 1
  };
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.handlePut = this.handlePut.bind(this);
  }

  componentDidMount(){
    this.setState({
      menuPrice:this.props.price
    })
  }

  @computed
  get name() {
    return this.props.name;
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
  // Modal On or Off

  handlePrice(e) {
    this.setState({
      ...this.state,
      menuPrice: parseInt(e.target.value)
    });
  }
  // calculate Price if item have promotion

  handleLocation(e) {
    this.setState({
      ...this.state,
      location: e.target.value
    });
  }

  increaseCount() {
    this.setState({
      ...this.state,
      count: this.state.count + 1
    });
  }

  decreaseCount() {
    if (this.state.count > 1) {
      this.setState({
        ...this.state,
        count: this.state.count - 1
      });
    }
  }

  handlePut() {
    this.props.onPut(
      this.name,
      this.state.menuPrice,
      // this.state.location,
      this.state.count
    );
    this.handleClose();
  }

  render() {
    const { name, price, discount, classes } = this.props;

    let discountPrice = price - (price * discount) / 100;

    const discountPriceParseNumberFormat = (
      <NumberFormat
        value={discountPrice}
        displayType={"text"}
        thousandSeparator={true}
        suffix={" 원"}
      />
    );
    const normalPriceParseNumberFormat = (
      <NumberFormat
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        suffix={" 원"}
      />
    );

    // let discountTypography = !isNaN(discountPrice) ? (
    //   <Typography variant="caption" gutterBottom align="center">
    //     <b> {discount}% 할인중!!</b>
    //   </Typography>
    // ) : null;

    // Radio Button에서 버튼 없애려면 style display none 해제하면 됨. 
    let discountInput = !isNaN(discountPrice) ? (
      <Fragment>
        <Radio
          // style={{display:"none"}}
          id={discountPrice.toString()}
          checked={this.state.menuPrice === discountPrice}
          onChange={this.handlePrice}
          value={discountPrice}
          name="RadioGroup"
        />{" "}
        <label htmlFor={discountPrice}>
          할인가 {discountPriceParseNumberFormat}
        </label>
      </Fragment>
    ) : null;


    const normalPriceInput = (
      <Fragment>
        <Radio
          id={price.toString()}
          checked={this.state.menuPrice === price}
          onChange={this.handlePrice}
          value={price}
          name="RadioGroup"
        />{" "}
        <label htmlFor={price}>
          일반가 {normalPriceParseNumberFormat}
        </label>
      </Fragment>
    );

    return (
      // <div  onClick={() => onPut(name, price)} >
      <div className={classes.root}>
        <Paper
          square={true}
          className={classes.paper}
         
        >
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid  item >
              <ButtonBase >
                <img style={{ width: "65px" }} src={menuImage} alt="complex" />
              </ButtonBase>

              {/* <Avatar width="10" > {quantity}</Avatar> */}
            </Grid>
            <Grid item xs={9} sm container>
              <Grid item xs container direction="column">
                <Grid item xs>
                  <Typography gutterBottom align="justify" variant="subtitle1">
                    {name}
                  </Typography>
                  {/* {discountTypography} */}
                  <Typography gutterBottom align="justify" variant="subtitle2">
                  <NumberFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" 원"}
                  />
                  </Typography>
                 
                </Grid>
              </Grid>
               <Grid style={{ color:"#F9715D", marginTop: "12px",cursor:"pointer" }} item  onClick={this.handleClickOpen}>
                 + 담기
                 {/* 여기 아이콘 추가하고 폰트 컬러 변경 필요. */}
              </Grid> 
            </Grid>
          </Grid>
        </Paper>

        <MenuDetail
          handleClose={this.handleClose}
          isOpen={this.state.isOpen}
          name={name}
          price={price}
          normalPriceInput={normalPriceInput}
          discountInput={discountInput}
          increaseCount={this.increaseCount}
          decreaseCount={this.decreaseCount}
          count={this.state.count}
          handlePut={this.handlePut}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MenuItem);

MenuItem.propTypes = {
  menuPrice: PropTypes.number,
  price: PropTypes.number,
  discount: PropTypes.number,
  discountPrice: PropTypes.number,
  isOpen: PropTypes.bool,
  location: PropTypes.string,
  count: PropTypes.number
};
