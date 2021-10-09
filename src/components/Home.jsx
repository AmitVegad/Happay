import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Data from "./Data";

const Home = () => {
  const [ids, setIds] = useState([]);
  const [noOfItem, setNoOfItem] = useState("");

  useEffect(() => {
    let id = [];
    let Item = JSON.parse(localStorage.getItem("cart"));
    if (Item) {
      Item.map((item) => {
        id.push({
          id: item.id,
          quantity: item.quantity ? item.quantity : 0,
        });
      });
      if (Item.length !== ids.length) setIds(id);
      setNoOfItem(Item.length);
    }
  }, [ids]);

  const addTocartHandler = (data) => {
    let Items = JSON.parse(localStorage.getItem("cart"));
    data.quantity = 1;
    if (Items) {
      Items.push(data);
      localStorage.setItem("cart", JSON.stringify(Items));
    } else {
      localStorage.setItem("cart", JSON.stringify([data]));
    }
    let id = [...ids];
    id.push({ id: data.id, quantity: 1 });
    setIds(id);
  };
  const increment = (Id) => {
    let sample = JSON.parse(localStorage.getItem("cart"));
    let newData = sample.map((_item) => {
      if (_item.id === Id) {
        _item.quantity = _item.quantity + 1;
      }
      return _item;
    });
    let newIDs = ids.map((idd) => {
      if (idd.id === Id) {
        idd.quantity++;
      }
      return idd;
    });
    setIds(newIDs);
    localStorage.setItem("cart", JSON.stringify(newData));
  };

  const decrement = (Id) => {
    let sample = JSON.parse(localStorage.getItem("cart"));
    let newData = sample.map((_item) => {
      if (_item.id === Id) {
        if (_item.quantity !== 1) _item.quantity = _item.quantity - 1;
      }
      return _item;
    });
    let newIDs = ids.map((idd) => {
      if (idd.id === Id) {
        if (idd.quantity !== 1) idd.quantity--;
      }
      return idd;
    });
    setIds(newIDs);
    localStorage.setItem("cart", JSON.stringify(newData));
  };

  return (
    <div>
      <Navbar itemCount={noOfItem} />
      <h2 className="home-heading">Most popular</h2>
      <div className="allItem">
        {Data.map((data) => {
          return (
            <div className="item" key={Math.random()}>
              {data.original_price && (
                <p className="item-discount">
                  {100 - (data.final_price * 100) / data.original_price}% OFF
                </p>
              )}
              <img className="item-image" src={data.img_url} alt="" />
              <div className="item-heading">
                <p className="item-name">{data.name}</p>
                {data.original_price && (
                  <p className="item-original_price">{data.original_price}</p>
                )}
                <p className="item-final_price">{data.final_price}</p>
              </div>
              <p className="item-description">{data.description}</p>
              {ids.find((idd) => data.id === idd.id) ? (
                <div className="item-added-quentity">
                  <button
                    className="add-to-item-increase"
                    onClick={() => {
                      increment(data.id);
                    }}
                  >
                    +
                  </button>
                  <input
                    type="number"
                    className="item-input"
                    defaultValue={
                      ids.find((_item) => _item.id === data.id)
                        ? ids.find((_item) => _item.id === data.id).quantity
                        : 0
                    }
                  />
                  <button
                    className="add-to-item-decrease"
                    onClick={() => {
                      decrement(data.id);
                    }}
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  className="add-to-cart"
                  onClick={() => {
                    addTocartHandler(data);
                  }}
                >
                  Add to cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
