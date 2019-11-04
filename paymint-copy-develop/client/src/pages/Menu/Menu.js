import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import CategoryTabs from "../../components/Restaurant/Menu/CategoryTabs/CategoryTabs";
import Footer from "../../components/Restaurant/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import Spinner from "../../components/UI/Spinner/Spinner";
import styled from "styled-components";

const Content = styled.div`
  margin-top: 104px;
  margin-bottom: 88px;
  height: "100%";
`;

@inject("restaurantStore", "menuStore", "categoryStore", "orderStore")
@observer
class Menu extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const id = 2;
    const { categoryStore, menuStore } = this.props;

    // restaurantStore.fetchRestaurantInfo(id);
    menuStore.fetchMenu(id);
    categoryStore.fetchCategories(id);
    

    this.setState({
      loading: true
    });
  }
  /*
      componentDidMount 에서 fetch 받아올 때 if 문으로 특정 값을 비교하여 특정 값이 다를 때만 다시 받아오게 변경 예정 
    */

  render() {
    const {
      selectedItems,
      quantity,
      total,
      put,
      take,
      increaseQuantity,
      removeItem,
      summaryOrder
    } = this.props.orderStore;
    const { menu } = this.props.menuStore;
    const { categories } = this.props.categoryStore;
    const { info } = this.props.restaurantStore;

    const restaurantName = info.name;

    let FooterComponent = null;
    // if(open && total>0){
    if (total > 0) {
      FooterComponent = (
        <Footer
          selectedItems={selectedItems}
          quantity={quantity}
          take={take}
          increaseQuantity={increaseQuantity}
          total={total}
          removeItem={removeItem}
          restaurantName={restaurantName}
          summaryOrder={summaryOrder}
        />
      );
    } else {
      FooterComponent = null;
    }
    const Category = this.state.loading ? (
      <CategoryTabs put={put} menu={menu} categories={categories} />
      
    ) : (
      <Spinner />
    );

    return (
      <Fragment>
        <Navigation />
        <hr />
        <Content>{Category}</Content>
        {FooterComponent}
      </Fragment>
    );
  }
}

export default Menu;
