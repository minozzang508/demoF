import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import Clear from "@material-ui/icons/Clear";
import Receipt from "@material-ui/icons/ReceiptOutlined";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

// 결제 취소 요청 , 추가주문하기 .
// 결제 내역 . ~~외 ~~개
// 결제 금액 및 결제 수단
// X ( clear ) 버튼 클릭시 orderStore 초기화 및 메뉴페이지 이동.
// jwt 로 인증을 못받았으면 리턴하게 만들기 .
// 결제 취소시 Dialog 를 활용해서 confirm or cancel 구현
//
@inject("paymentStore", "orderStore")
@observer
class PaymentCompleted extends Component {


  onClickCancelOrder= () => {
    this.props.paymentStore.cancelOrder().then(
      () => this.props.history.push("/")
    )
  }


  render() {
    const { order, changeOrder } = this.props.paymentStore;
    const {
      total,
      summaryOrder,
      paymentMethodName,
      reset
    } = this.props.orderStore;

    console.log(order);
    // 개발 후에는 order.id가 있을 때만 렌더링 되도록 변경
    const getOrderCompletedContent = true ? (
      <Box style={{ padding: "20px", backgroundColor: "#ffffff" }}>
        <div style={{ textAlign: "right" }}>
          <Link to="/">
            <Clear onClick={reset}/>
          </Link>
        </div>
        <div style={{ padding: "0px 25px 0px 25px" }}>
          <div style={{ marginBottom: "100px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{marginBottom:"10px", color: "#ff6060"}}>
                <Receipt fontSize="large" />
              </div>
              <Typography  variant="h5" style={{ color: "#ff6060",marginBottom:"20px" }}>
                테이블 2번
              </Typography>
              <Typography variant="h5">결제가 완료 되었습니다.</Typography>
              <Typography variant="caption">
                주문서가 카운터에 접수되기까지 1-2분이 소요됩니다.
              </Typography>
            </div>
          </div>

          <div style={{ marginBottom: "100px" }}>
            <Divider />
            <div style={{ textAlign: "left", margin: "20px 0px 20px 0px" }}>
              {summaryOrder}
            </div>
            <ul>
              <li style={{ display: "flex", justifyContent: "space-between" }}>
                <div>결제 금액:</div>
                <div>
                 
                  <NumberFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" 원"}
                  />
                </div>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between" }}>
                <div>결제 수단:</div>
                <div>{paymentMethodName}</div>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center"
          }}
        >
          <Button
            style={{ width: "47%", height: "60px",color:"ff6060" }}
            color="secondary"
            variant="outlined"
            onClick={this.onClickCancelOrder}
          >
            결제 취소요청
          </Button>
          <Button
            style={{ width: "47%", height: "60px", backgroundColor:"#ff6060" }}
            color="secondary"
            variant="contained"
            onClick={changeOrder}
          >
            + 추가 주문하기.
          </Button>
        </div>
      </Box>
    ) : (
      <div> 주문이 없군요?</div>
    );

    return <div>{getOrderCompletedContent}</div>;
  }
}

export default PaymentCompleted;
