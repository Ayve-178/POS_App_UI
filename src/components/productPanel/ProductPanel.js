import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fireDB from "../../fireConfig";
import "./ProductPanel.css";

function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    getData();
  }, [products]);

  const handleShow = () => {
    setShow(!show);
  };

  const handleClick = (e) => {
    setFilterType(e.target.value);
    if (show === true) {
      setShow(!show);
    }
  };

  const categories = [
    "All Categories",
    "Electronics",
    "Home & Lifestyle",
    "Men Fashion",
    "Women Fashion",
    "Toys",
    "Kids Fashion",
    "Food & Beverage",
    "Mobiles",
    "Laptops",
    "Grocery",
    "Crockeries",
    "Shoes",
    "Makeup",
    "Skin Care",
    "Jewellery",
  ];

  const getData = async () => {
    try {
      const myProducts = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      myProducts.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      setProducts(productsArray);
    } catch (error) {
      toast.error("Data Loading Failed!");
    }
  };

  const addToPurchaseList = async (product) => {
    const purchasedItem = {
      itemName: product.itemName,
      price: Number(product.price),
      tax: Number(product.tax),
      discount: Number(product.discount),
      quantity: 1,
      totalPrice: Number(product.price) * 1,
    };
    try {
      await addDoc(collection(fireDB, "purchaseList"), purchasedItem);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="productPanel">
      {show === true ? (
        <div className="allCat">
          <div className="close">
            <i onClick={handleShow} class="fa-solid fa-xmark closeIcon"></i>
          </div>
          <div className="cats">
            <p className="catTitle">Categories</p>
            {categories.map((category) => {
              return (
                <button
                  className="catBtn"
                  value={category.toLowerCase()}
                  onClick={handleClick}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="searchBar">
            <input
              className="searchField"
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              placeholder="Search Products..."
            />
          </div>
          <div className="productItems">
            <div className="categories">
              <button className="catBtn" onClick={(e) => setFilterType([])}>
                All Categories
              </button>
              <button
                className="catBtn"
                value="electronics"
                onClick={(e) => setFilterType(e.target.value)}
              >
                Electronics
              </button>
              <button
                className="catBtn"
                value="home &#38; lifestyle"
                onClick={(e) => setFilterType(e.target.value)}
              >
                Home &#38; Lifestyle
              </button>
              <button
                className="catBtn"
                value="men fashion"
                onClick={(e) => setFilterType(e.target.value)}
              >
                Men Fashion
              </button>
              <button
                className="catBtn"
                value="women fashion"
                onClick={(e) => setFilterType(e.target.value)}
              >
                Women Fashion
              </button>
              <i onClick={handleShow} class="fas fa-ellipsis-v dots"></i>
            </div>

            <div className="products">
              {products
                .filter((obj) => obj.itemName.toLowerCase().includes(searchKey))
                .filter((obj) =>
                  obj.category.toLowerCase().includes(filterType)
                )
                .map((product) => {
                  return (
                    <div
                      className="product"
                      onClick={() => addToPurchaseList(product)}
                    >
                      <img
                        className="productImage"
                        src={product.imageURL}
                        alt="productImage"
                      />
                      <p className="productPrice">${product.price}</p>
                      <hr className="line" />
                      <p className="productName">{product.itemName}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPanel;
