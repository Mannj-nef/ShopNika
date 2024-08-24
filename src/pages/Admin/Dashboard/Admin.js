/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import "../style.scss";
import { VectorMap } from "@south-paw/react-vector-maps";
import worldLowRes from "../world.json";
import { useSelector, useDispatch } from "react-redux";
import CardAnalytics from "../../../components/CardAnalytics";
import { actGetProductByFilter } from "../../../redux/actions/productAction";
import { Table } from "antd";
import "antd/dist/antd.css";
import { actGetAllOrder } from "../../../redux/actions/orderAction";
import { actGetAllUser } from "../../../redux/actions/userAction";
import { columnsAll } from "../../../common/table";
import Nation from "../../../components/Flag";
import Chart from "./chart";
import PieChart from "./pie";
export default function Admin() {
  const { listOrder } = useSelector((state) => state?.orderReducer);
  const { listUser } = useSelector((state) => state?.userReducer);
  const { listProducts } = useSelector((state) => state?.productReducer);
  const dispatch = useDispatch();

  let numOfOrder = 0;
  let numOfOrderPre = 0;
  let totalOfOrder = 0;
  let totalOfOrderPre = 0;
  let numOfUser = 0;
  let numOfProduct = 0;

  let percentOrder = 0;
  let percentTotal = 0;
  let nowMoth = new Date().getMonth() + 1;

  const calculateOrder = () => {
    listOrder.forEach((order) => {
      let monthOrder = new Date(order.dateAdd).getMonth() + 1;
      if (monthOrder === nowMoth) {
        numOfOrder++;
        totalOfOrder += order.total;
      } else if (monthOrder === nowMoth - 1) {
        numOfOrderPre++;
        totalOfOrderPre += order.total;
      }
    });
    if (numOfOrder >= numOfOrderPre) {
      percentOrder = (numOfOrder / numOfOrderPre) * 100;
    } else {
      percentOrder = -(100 - (numOfOrder / numOfOrderPre) * 100);
    }
    if (totalOfOrder >= totalOfOrderPre) {
      percentTotal = (totalOfOrder / totalOfOrderPre) * 100;
    } else {
      percentTotal = -((totalOfOrder / totalOfOrderPre) * 100);
    }

    percentOrder = percentOrder.toFixed(2);
    percentTotal = percentTotal.toFixed(2);
  };
  const calculateUser = () => {
    listUser.forEach((user) => {
      if (user.role === "user") {
        numOfUser++;
      }
    });
  };
  const calculateProduct = () => {
    listProducts.forEach((products) => {
      numOfProduct++;
    });
  };
  calculateOrder();
  calculateUser();
  calculateProduct();

  const columns = [
    {
      title: "Top",
      dataIndex: "top",
      key: "top",
      render: (_, record) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <>
          {record.id === listProducts[0].id ? (
            <img
              src="https://media.istockphoto.com/vectors/ranking-icon-vector-id1216125006?k=20&m=1216125006&s=170667a&w=0&h=0v83rnj98q85fhXrugFBiu00_4T49oWxzO6EwkbVoTk="
              style={{ width: "80px", height: "80px" }}
            ></img>
          ) : record.id === listProducts[1].id ? (
            <img
              src="https://thumbs.dreamstime.com/b/award-winner-icon-winner-flat-icon-win-medal-icon-award-illustration-reward-sign-symbol-winner-vector-achievement-sign-second-142719056.jpg"
              style={{ width: "80px", height: "80px" }}
            ></img>
          ) : record.id === listProducts[2].id ? (
            <img
              src="https://us.123rf.com/450wm/nerthuz/nerthuz1902/nerthuz190200248/117855494-top-3-on-podium-isolated.jpg?ver=6"
              style={{ width: "80px", height: "80px" }}
            ></img>
          ) : null}
        </>
      ),
    },
    ...columnsAll.columnProSort,
  ];
  useEffect(() => {
    dispatch(actGetProductByFilter({ _sort: "sold", _order: "desc" }));
    dispatch(actGetAllOrder());
    dispatch(actGetAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-xxl-5 d-flex">
          <div className="w-100">
            <div className="row">
              <div className="col-sm-6">
                <CardAnalytics
                  title={"Products"}
                  icon={<i className="fa-solid fa-truck"></i>}
                  value={numOfProduct}
                />
                <CardAnalytics
                  title={"Order"}
                  icon={<i className="fa-solid fa-cart-shopping"></i>}
                  value={numOfOrder}
                  percent={percentOrder}
                />
              </div>
              <div className="col-sm-6">
                <CardAnalytics
                  title={"Earning"}
                  icon={<i className="fa-solid fa-dollar-sign"></i>}
                  value={totalOfOrder + "$"}
                  percent={percentTotal}
                />
                <CardAnalytics
                  title={"Customer"}
                  icon={<i className="fa-solid fa-users"></i>}
                  value={numOfUser}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-7">
          <div className="card flex-fill w-100">
            <div className="card-body py-3">
              <div className="world-map">
                <div className="col-xl-6 col-xxl-8 col-md-8">
                  <VectorMap
                    {...worldLowRes}
                    style={{ height: "252px", width: "100%" }}
                    checkedLayers={["us", "jp", "vn", "cn", "th"]}
                  />
                </div>

                <div className="col-xl-6 col-xxl-4 mt-3 col-md-4">
                  <Nation
                    nationCode={"vn"}
                    nationName={"Viet Nam"}
                    percent={77}
                  />
                  <Nation nationCode={"cn"} nationName={"Chani"} percent={32} />
                  <Nation
                    nationCode={"us"}
                    nationName={"United States"}
                    percent={19}
                  />
                  <Nation
                    nationCode={"th"}
                    nationName={"Thailand"}
                    percent={30}
                  />
                  <Nation nationCode={"jp"} nationName={"Japan"} percent={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8 col-xxl-9 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Top Products Sales</h5>
              <Table
                columns={columns}
                dataSource={listProducts}
                rowKey="id"
                className="table-style"
                pagination={{ defaultPageSize: 6 }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-xxl-3 ">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Monthly Sales</h5>
            </div>
            <div className="card-body w-100 ">
              <Chart />
            </div>
          </div>
          <div className="card flex-fill w-100 ">
            <div className="card-body w-100 ">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
