import React, { useState, useEffect } from "react";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./TrackOrder.css";

function TrackOrder() {
  const [profile, setProfile] = useState({ firstName: "" });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userToken = localStorage.getItem("token");
        if (!userToken) throw new Error("No user token found.");
        const response = await axios.get("http://127.0.0.1:3005/userdetails", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setProfile({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleTabClick = (status) => {
    setActiveTab(status);
  };

  const filteredOrders = () => {
    return orders.filter((order) => {
      return activeTab === "all" || order.status.toLowerCase() === activeTab;
    });
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("No user token found.");
      const response = await axios.get("http://127.0.0.1:3005/trackOrders", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (isConfirmed) {
      try {
        const userToken = localStorage.getItem("token");
        await axios.put(
          `http://127.0.0.1:3005/waste/${orderId}/cancel`,
          {},
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        fetchOrders();
        alert("Order has been successfully cancelled.");
      } catch (error) {
        console.error("Error cancelling order:", error);
        alert("Failed to cancel the order.");
      }
    }
  };
  const calculateTotalPrice = (wasteDetails) => {
    let totalPrice = 0;
    wasteDetails.forEach((item) => {
     let itemtotalprice=item.price*item.weight;
     console.log("Item Total Price:", itemtotalprice);
      totalPrice += parseFloat(itemtotalprice);
    });
    return totalPrice;
  };

  const handleCompleteOrder = async (orderId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to mark this order as completed?"
    );
    if (isConfirmed) {
      try {
        const userToken = localStorage.getItem("token");
        await axios.put(
          `http://127.0.0.1:3005/waste/${orderId}/complete`,
          {},
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        fetchOrders();
        alert("Order has been successfully marked as completed.");
      } catch (error) {
        console.error("Error completing order:", error);
        alert("Failed to mark the order as completed.");
      }
    }
  };

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={profile.firstName} />
      <h3 className="track-heading">Track Orders</h3>

      <div className="track-order-body">
        <div className="tabs">
          {["all", "confirmed", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => handleTabClick(status)}
              className={activeTab === status ? "active-tab" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        {isLoading ? (
          <div className="loading">Loading orders...</div>
        ) : filteredOrders().length > 0 ? (
          <div className="track-orders">
            {filteredOrders().map((order) => (
              <div key={order._id} className="order">
                <div className="order-image">
                  <img
                    src={`http://127.0.0.1:3005/${order.imagePath}`}
                    alt="Order"
                  />
                </div>
                <div className="order-details">
                  {" "}
                  <p>Total Price: ${calculateTotalPrice(order.wasteDetails)}</p>
                  {/* <h5>Price: $25</h5> */}
                  <p>
                    <strong>Tracking ID: </strong>
                    {order._id}
                  </p>
                  <p>
                    <strong>Pickup Date: </strong>
                    {new Date(order.pickupdate).toLocaleDateString("en-US", {
                      weekday: "long", // "Monday"
                      year: "numeric", // "2021"
                      month: "long", // "July"
                      day: "numeric", // "19"
                    })}
                  </p>
                  <p>
                    <strong>Pick Up Adress: </strong>
                    {order.address}
                  </p>
                  <p>
                    <strong>Status: </strong>
                    {order.status}
                  </p>
                </div>
                <div className="order-actions">
                  <button
                    className="order-save-button"
                    onClick={() => handleCompleteOrder(order._id)}
                  >
                    <img src="mark.png" alt="Complete" className="icon" />{" "}
                    Complete Order
                  </button>
                  <button
                    className="order-save-button"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    <img src="cross.png" alt="Cancel" className="icon" /> Cancel
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">No orders to track.</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TrackOrder;
