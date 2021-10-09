import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import {
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Navbar from "./Navbar";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    fontSize: "15px",
  },
})(MuiTableCell);
const LTableCell = withStyles({
  root: {
    borderBottom: "none",
    borderTop: "1px solid #adb5bd",
    fontSize: "15px",
  },
})(MuiTableCell);

const Cart = () => {
  const [item, setItem] = useState([]);
  const [Total, setTotal] = useState("");
  const [noOfItem, setNoOfItem] = useState("");

  useEffect(() => {
    let _item = JSON.parse(localStorage.getItem("cart"));
    setItem(_item);
    let total = 0;
    if (_item) {
      _item.map((ite) => {
        total += ite.quantity * ite.final_price;
      });
      total += 7;
      setTotal(total);
      setNoOfItem(_item.length);
    }
  }, []);
  return (
    <>
      <div className="cart">
        <Navbar itemCount={noOfItem} />
        <header className="cart-title">
          Order Summary({item && item.length} items )
        </header>
        <div className="cart-detail">
          <div className="cart-items-list">
            <Card
              style={{
                margin: "0px 25px 25px 0px",
                backgroundColor: "#FAFAFA",
              }}
            >
              <CardHeader title="Product Details" />
              <CardContent>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      {item ? (
                        <>
                          <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Quantity</TableCell>
                          </TableRow>

                          {item.map((_item) => {
                            return (
                              <TableRow>
                                <TableCell>{_item.id}</TableCell>
                                <TableCell>{_item.name}</TableCell>
                                <TableCell>{_item.quantity}</TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell>Please select product</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
          <div className="cart-items-price">
            <Card
              style={{
                margin: "0px 25px 25px 0px",
                backgroundColor: "#EDF2F5",
              }}
            >
              <CardHeader title="Price Details" />
              <CardContent>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>Price</TableCell>
                      </TableRow>
                      {item &&
                        item.map((_item) => {
                          return (
                            <TableRow>
                              <TableCell>
                                {_item.quantity} X $ {_item.final_price}.00
                              </TableCell>
                              <TableCell>
                                $ {_item.quantity * _item.final_price}.00
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      <TableRow>
                        <LTableCell>Delivery Fee</LTableCell>
                        <LTableCell>{item && "$ 5.00"}</LTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taxes and Charges</TableCell>
                        <TableCell>{item && "$ 2.00"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <LTableCell>To Pay</LTableCell>
                        <LTableCell>{item && "$ " + Total}</LTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    maxWidth: "100%",
                    minHeight: "40px",
                    minWidth: "100%",
                  }}
                >
                  CheckOut
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
