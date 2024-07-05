import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AdminHeader from "../AdminHeader";
import "./index.css";

const AdminHomePage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = Cookies.get("jwt_token");
      const response = await fetch("http://localhost:3008/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const ordersData = await response.json();

      const ordersWithTableNumbers = ordersData.map((order) => ({
        ...order,
        table_number: Math.floor(Math.random() * 20) + 1,
      }));

      setOrders(ordersWithTableNumbers);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleRemoveOrders = async (customerName) => {
    try {
      const token = Cookies.get("jwt_token");
      const response = await fetch(
        `http://localhost:3008/admin/orders/${customerName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log(`Orders for ${customerName} removed successfully`);
        fetchOrders();
      } else {
        console.error(`Failed to remove orders for ${customerName}`);
      }
    } catch (error) {
      console.error("Error removing orders:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-homepage-container">
        <h2>Admin Dashboard - Orders</h2>
        {orders.map((order, index) => (
          <div key={index} className="order-details">
            <div className="order-header">
              <h3>Ordered By: {order.customer_name}</h3>
              <p>Table Number: {order.table_number}</p>
              <button
                onClick={() => handleRemoveOrders(order.customer_name)}
                className="remove-btn"
              >
                Remove Orders
              </button>
            </div>
            <ul className="order-items-list">
              {order.items.map((item, idx) => (
                <li key={idx} className="order-item">
                  <span className="item-name">{item.food_name}</span> -
                  <span className="item-quantity">
                    {" "}
                    {item.total_items} items
                  </span>{" "}
                  (Total Quantity:{" "}
                  <span className="total-quantity">{item.total_quantity}</span>)
                </li>
              ))}
            </ul>
            <p className="total-cost">Total Cost: ₹{order.total_cost}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminHomePage;
