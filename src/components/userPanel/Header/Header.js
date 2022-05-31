import 'bootstrap/dist/css/bootstrap.css';
import {
  addDoc,
  collection
} from "firebase/firestore";
import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import fireDB from '../../../fireConfig';
import "./Header.css";

function Header() {
  const [show, setShow] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [product, setProduct] = useState({
    imageURL: "",
    itemName: "",
    description: "",
    category: "",
    price: 0,
    quantity: 0,
    discount: 0,
    tax: 0
  });
  const [showNote, setShowNote] = useState(false);
  const [ShowShipping, setShowShipping] = useState(false);
  const [ShowSetting, setShowSetting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  }

  const handleShow = () => {
    setShow(!show);
  };

  const handleAddItemClose = () => setShowAddItem(false);
  const handleAddItemShow = () => setShowAddItem(true);

  const handleNoteClose = () => setShowNote(false);
  const handleNoteShow = () => setShowNote(true);

  const handleShippingClose = () => setShowShipping(false);
  const handleShippingShow = () => setShowShipping(true);

  const handleSettingClose = () => setShowSetting(false);
  const handleSettingShow = () => setShowSetting(true);


  const addProduct = async () => {
    try {
      await addDoc(collection(fireDB, "products"),product);
      handleAddItemClose();
      setProduct({});
      toast.success("Product Added");
    } catch (error) {
      toast.error("Add Failed!")
    }
  }

  return (
    <>
      {show && (
        <div className="side">
          <div className="sideMenu">
            <div className="sideHeader">
              <p className="sideTitle">goBilling</p>
              <p className="locTitle">Location:</p>
              <p className="locDesc">Los Angeles, California</p>
            </div>
            <div className="menus">
              <div className="sideMenuOpt">
                <i class="fa-brands fa-flipboard"></i> &nbsp;&nbsp; Dashboard
              </div>
              <div className="sideMenuOpt">
                <i class="fa-solid fa-location-dot"></i> &nbsp;&nbsp;&nbsp;
                Location
              </div>
              <div className="sideMenuOpt">
                <i class="fa-regular fa-life-ring"></i> &nbsp;&nbsp; POS
                Invoices
              </div>
              <div onClick={handleSettingShow} className="sideMenuOpt">
                <i class="fa-solid fa-gear"></i> &nbsp;&nbsp; Settings
              </div>
            </div>
          </div>
          <div className="close">
            <i onClick={handleShow} class="fa-solid fa-xmark clsIcon"></i>
          </div>
        </div>
      )}

      <Modal show={showAddItem} onHide={handleAddItemClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="imageURL"
                type="text"
                placeholder="Image URL"
                onChange={handleChange}
                value={product.imageURL}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="itemName"
                type="text"
                placeholder="Item Name"
                onChange={handleChange}
                value={product.itemName}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control 
                as="textarea" rows={3} 
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={product.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="category"
                type="text"
                placeholder="Category"
                onChange={handleChange}
                value={product.category}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="price"
                type="number"
                placeholder="Unit Price ($)"
                onChange={handleChange}
                value={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="quantity"
                type="number"
                placeholder="Quantity"
                onChange={handleChange}
                value={product.quantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="discount"
                type="number"
                placeholder="Discount (%)"
                onChange={handleChange}
                value={product.discount}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="tax"
                type="number"
                placeholder="Tax (%)"
                onChange={handleChange}
                value={product.tax}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddItemClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNote} onHide={handleNoteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note to the Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Order Note</Form.Label>
              <Form.Control 
                as="textarea" rows={3} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNoteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNoteClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowShipping} onHide={handleShippingClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>  
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Street"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="City"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="State"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Zip Code"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Country"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShippingClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShippingClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowSetting} onHide={handleSettingClose}>
        <Modal.Header closeButton>
          <Modal.Title>Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>  
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Tax on"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Tax type"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSettingClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSettingClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="header">
        <i onClick={handleShow} class="fa fa-bars menuBar"></i>
        <button onClick={handleNoteShow} className="btn">
          <i className="fa-regular fa-pen-to-square headIcon"></i>&nbsp;&nbsp;
          Note
        </button>
        <button onClick={handleShippingShow} className="btn">
          <i className="fa-solid fa-truck headIcon"></i>&nbsp;&nbsp; Shipping
        </button>
        <button className="btn">
          <i className="fa-solid fa-spinner headIcon"></i>&nbsp;&nbsp; Hold
          Orders
        </button>
        <button onClick={handleAddItemShow} className="btn">
          <i className="fa-solid fa-plus headIcon"></i>&nbsp;&nbsp; New Item
        </button>
      </div>
    </>
  );
}

export default Header;
