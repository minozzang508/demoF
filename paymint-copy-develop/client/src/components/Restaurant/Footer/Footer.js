import React, { Component } from "react";
import OrderSummary from "./OrderSummary/OrderSummary";

import styled from "styled-components";
import NumberFormat from "react-number-format";

// OrderButton ( parchase method ) -> click 시 Dialog open
// Dialog에서는 주문 내역이 보여야함 .

const S = {
  FooterContainer: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 88px;
    background-color: #ffffff;
  `,
  FooterUl: styled.ul`
    display: flex;
    justify-content: space-around;
    height:100%
  `,
  FooterLi: styled.li`
    align-items: center;
    width:50%;
    height:100%;
    background-color: ${props => props.backgroundColor ? "#fceaea" : "#ffffff"} ;
  `,
  // #fefcfc
  Content: styled.div`
    align-items: center;
    padding:20px 15px 0px 15px;
    @media(max-width:360px){
      padding: 20px 5px 0px 5px;
    }
  `,
  Info: styled.div`
    display: block;
  `,
  Menu: styled.span`
    display: block;
    height: 21px;
    font-family: Noto Sans KR;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.51px;
    color: #333333;
    margin-bottom: 8px;
  `,
  OrderList: styled.span`
    width: 84px;
    height: 24px;
    font-family: Noto Sans KR;
    font-size: 15px;
    color: #9b9b9b;
  `
};

class Footer extends Component {

  render() {
    const {
      selectedItems,
      quantity,
      total,
      take,
      increaseQuantity,
      removeItem,
      restaurantName
    } = this.props;
    
    const menuInfo = selectedItems
      ? ( selectedItems[0].name.length >5 ? selectedItems[0].name.slice(0,5).concat('...') : selectedItems[0].name ) + " 외 " + quantity + "개"
      : null;
    const totalPrice = (
      <NumberFormat
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        suffix={" 원"}
      />
    );

    return (
      <S.FooterContainer>
        <S.FooterUl>
          <S.FooterLi>
            <S.Content>
              <S.Info>
                <S.OrderList>주문내역</S.OrderList>
                <S.Menu>{menuInfo}</S.Menu>
              </S.Info>
            </S.Content>
          </S.FooterLi>
          <S.FooterLi backgroundColor={"#FEFCFC"}>
            <S.Content>
                <OrderSummary
                  selectedItems={selectedItems}
                  showTotal={totalPrice}
                  onTake={take}
                  increaseQuantity={increaseQuantity}
                  removeItem={removeItem}
                  restaurantName={restaurantName}
                />
            </S.Content>
          </S.FooterLi>
        </S.FooterUl>
      </S.FooterContainer>
    );
  }
}

export default Footer;
