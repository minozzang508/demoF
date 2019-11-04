import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import BasketList from "../../components/Order/BasketList/BasketList";
import OrderRequest from "../../components/Order/OrderRequest/OrderRequest";
import Authentication from "../../components/Order/Authentication/Authentication";
import Payment from "../../components/Order/Payment/Payment";
import Agreement from "../../components/Order/Agreement/Agreement";
import OrderSubmit from "../../components/Order/OrderSubmit/OrderSubmit";
import NumberFormat from "react-number-format";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Paper } from "@material-ui/core";
import { withSnackbar } from 'notistack';


@inject("orderStore", "restaurantStore")
@observer
class Order extends Component {
  state = {
    isOpen: false,
    errors: {}
  };
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput= this.focusTextInput.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onClickOrderSubmit = this.onClickOrderSubmit.bind(this);
    this.onClickOpenDialog = this.onClickOpenDialog.bind(this);
    this.onClickCloseDialog = this.onClickCloseDialog.bind(this);
  }

  focusTextInput(){
    this.textInput.current.focus();
  }

  goBack() {
    this.props.history.push("/");
  }

  valdation(){
    let errors={};
    let formIsValid =true;
    const paymentId= toString(this.props.orderStore.selectedPaymentId);
    const agreement = this.props.orderStore.agreement;
    // if(!this.props.orderStore.phone.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)){
    //   formIsValid=false;
    //   errors["phone"] = "* 번호를 다시한번 확인해주세요."
    // } // 추후 번호 연동 시 추가 예정

    if(paymentId.match(/^[1-4]{1}/)){
       formIsValid=false;
       errors["payment"]="결제 수단은 반드시 선택해주셔야합니다."
    }
    if(!agreement){
       formIsValid=false;
       errors["agreement"]="모든 약관에 동의해주셔야합니다."
    }
    this.setState({
      errors:errors
    });
    return formIsValid;

  }

  componentDidMount() {
    // order가 없으면 바로 접근하지 못하게 처리 .
    this.props.orderStore.fetchPaymentMethod();
    this.props.orderStore.errorMassage = "";
  }

  onClickOrderSubmit() {
      this.props.orderStore
        .postOrder()
        .then(() => this.props.history.push("/paymentcompleted"));
  }

  onClickOpenDialog() {
    if (!this.valdation()) {
      this.setState({
        isOpen: false
      });
      this.props.enqueueSnackbar('입력창을 확인해주세요!!',{variant:"error"});
      return ;
    } else {
      this.setState({
        isOpen: true
      });
      this.props.orderStore.errorMassage = "";
    }
  }

  onClickCloseDialog() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const {
      total,
      selectedItems,
      setSelectedPaymentId,
      setAgreement,
      paymentMethods,
      setOrderRequest,
      selectedPaymentId,
      paymentMethodName
    } = this.props.orderStore;
    const { info } = this.props.restaurantStore;



    const totalPrice = (
      <NumberFormat
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        suffix={" 원"}
      />
    );
    const getOrderContent =
      selectedItems.length > 0 ? (
        <div style={{ marginTop: "56px", height: "100%" }}>
          <BasketList
            selectedItems={selectedItems}
            total={totalPrice}
            info={info}
          />
          <Agreement setAgreement={setAgreement} error={this.state.errors.agreement} />
          <Paper square={true}>{this.state.errors.agreement}</Paper>
          <OrderRequest setOrderRequest={setOrderRequest} />
          <Authentication />
          <div>{this.state.errors.phone}</div>
          <Payment
            paymentMethods={paymentMethods}
            setSelectedPaymentId={setSelectedPaymentId}
            selectedPaymentId={selectedPaymentId}
            error={this.state.errors.payment}
          />
          <Paper square={true}>{this.state.errors.payment}</Paper>
          <OrderSubmit
            total={totalPrice}
            clicked={this.onClickOrderSubmit}
            isOpen={this.state.isOpen}
            onClickOpenDialog={this.onClickOpenDialog}
            onClickCloseDialog={this.onClickCloseDialog}
            paymentMethodName={paymentMethodName}
          />
        </div>
      ) : (
        <Paper style={{marginTop:"56px",height:"600px"}} square={true}>주문 내역이 없네요.</Paper>
      );

    return (
      <Box>
        <AppBar style={{backgroundColor:"#ffffff"}} position="fixed">
          <Toolbar>
            <div
              style={{ color: "black", marginRight: 15, marginTop: 5 }}
              onClick={this.goBack}
            >
              <ArrowBackIcon />
            </div>
            <Typography variant="h6" style={{ color: "#333333"}}>
              결제하기
            </Typography>
          </Toolbar>
        </AppBar>
        {getOrderContent}
      </Box>
    );
  }
}

export default withSnackbar(Order);

Order.propTypes = {
  total: PropTypes.number,
  selectedItems: PropTypes.array,
  setSelectedPaymentId: PropTypes.func,
  setAgreement: PropTypes.func,
  paymentMethods: PropTypes.array,
  setOrderRequest: PropTypes.func,
  selectedPaymentId: PropTypes.number
};
