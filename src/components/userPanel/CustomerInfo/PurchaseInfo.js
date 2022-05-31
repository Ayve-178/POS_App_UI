import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fireDB from "../../../fireConfig";

function PurchaseInfo() {
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, [products]);

  const getBillingInfo = () => {
    let x = 0,
      y = 0,
      z = 0,
      t = 0;
    products.map((product) => {
      return (
        (x += product.price * product.quantity).toFixed(2),
        (y +=
          product.quantity *
          (product.price * (product.tax / 100.0)).toFixed(2)),
        (z +=
          product.quantity *
          (product.price * (product.discount / 100.0)).toFixed(2)),
        (t += product.quantity)
      );
    });
    setSubTotal(x);
    setTax(y);
    setDiscount(z);
    setTotalProduct(t);
  };

  useEffect(() => {
    getBillingInfo();
  }, [products]);

  const getData = async () => {
    try {
      const myProducts = await getDocs(collection(fireDB, "purchaseList"));
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

  const deleteItem = async (product) => {
    try {
      await deleteDoc(doc(fireDB, "purchaseList", product.id));
      toast.success("Product Deleted!");
      getData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const decreaseQuantity = async (product) => {
    if (product.quantity > 1) {
      const updatedProduct = {
        itemName: product.itemName,
        price: product.price,
        tax: product.tax,
        discount: product.discount,
        quantity: product.quantity - 1,
        totalPrice: product.price * (product.quantity - 1),
      };
      try {
        await setDoc(doc(fireDB, "purchaseList", product.id), updatedProduct);
        getData();
      } catch (error) {
        toast.error("Failed");
      }
    }
  };

  const increaseQuantity = async (product) => {
    const updatedProduct = {
      itemName: product.itemName,
      price: product.price,
      tax: product.tax,
      discount: product.discount,
      quantity: product.quantity + 1,
      totalPrice: product.price * (product.quantity + 1),
    };
    try {
      await setDoc(doc(fireDB, "purchaseList", product.id), updatedProduct);
      getData();
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <div className="purchaseInfo">
      <div className="itemList">
        <table>
          <tbody>
            {products.map((product) => {
              return (
                <tr className="tableRow">
                  <td className="editIcon">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </td>
                  <td className="tableData">{product.itemName}</td>
                  <td className="tableData">${product.price.toFixed(2)}</td>
                  <td
                    onClick={() => decreaseQuantity(product)}
                    className="btnMinus tableData"
                  >
                    <i class="fa-solid fa-circle-minus"></i>
                  </td>
                  <td className="tableData">{product.quantity}</td>
                  <td
                    onClick={() => increaseQuantity(product)}
                    className="btnPlus tableData"
                  >
                    <i class="fa-solid fa-circle-plus"></i>
                  </td>
                  <td className="tableData">${product.totalPrice.toFixed(2)}</td>
                  <td
                    className="deleteIcon"
                    onClick={() => deleteItem(product)}
                  >
                    <i class="fa-regular fa-trash-can delIcon"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="billingInfo">
        <hr className="line" />

        <div className="billingItem">
          <p className="billingDesc">Sub Total</p>
          <p className="billingAmount">${subTotal.toFixed(2)}</p>
        </div>

        <hr className="line" />

        <div className="billingItem">
          <p className="billingDesc">TAX</p>
          <p className="billingAmount">${tax.toFixed(2)}</p>
        </div>

        <hr className="line" />

        <div className="billingItem">
          <p className="billingDesc">Shipping</p>
          <p className="billingAmount">$0.00</p>
        </div>

        <hr className="line" />

        <div className="billingItem">
          <p className="billingDesc discount">Discount</p>
          <p className="billingAmount">${discount.toFixed(2)}</p>
        </div>
      </div>
      <div className="totalBill">
        <p className="productsCount">Products Count ({totalProduct})</p>
        <div className="total">
          <p>Total</p>
          <p>${(subTotal + tax - discount).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseInfo;
