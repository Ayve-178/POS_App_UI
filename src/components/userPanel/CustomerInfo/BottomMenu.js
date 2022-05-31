import {
  collection,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore";
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import fireDB from '../../../fireConfig';

function BottomMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cancelOrders = async () => {
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
      productsArray.map(async (product) => {
        await deleteDoc(doc(fireDB, "purchaseList", product.id));
      })
    } catch (error) {
      console.log(error);
      toast.error("Failed!");
    }
  }


  return (
    <>
    <div className='bottomMenu'>
        <button onClick={cancelOrders} className='bottomBtn cancelBtn'>
          <i className="fa-regular fa-circle-xmark bottomCancelIcon"></i>&nbsp;&nbsp; Cancel
        </button>
        <button className='bottomBtn'>
          <i className="fa-regular fa-hand bottomIcon"></i>&nbsp;&nbsp; Hold
        </button>
        <button className='bottomBtn'>
          <i className="fa-solid fa-percent bottomIcon"></i>&nbsp;&nbsp; Discount
        </button>
        <button onClick={handleShow} className='bottomBtn'>
          <i className="fa-solid fa-money-bill bottomIcon"></i>&nbsp;&nbsp; Pay Now
        </button>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Cash</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Card</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Card Number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Cheque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Cheque Number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Payment Done
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default BottomMenu;