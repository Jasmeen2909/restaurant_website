import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import order_img from "../assets/order_img.png";
import './Order.css';
import omlet from "../assets/omlet.png";
import pancakes from "../assets/pancakes.png";
import pizza from "../assets/Pizza.png";
import pasta from "../assets/pasta.png";
import spaghetti from "../assets/spaghetti.png";
import wrap from "../assets/wrap.png";
import smoothie from "../assets/smoothie.png";
import hotcoffee from "../assets/hot coffee.png";
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleOrderNow = async () => {
        const userData = localStorage.getItem('userdata');
        if (!userData) {
            navigate('/login');
        } else {
            const user = JSON.parse(userData);
            const orderData = {
                userId: user._id,
                items: cart.map(item => ({
                    itemid: item.id, // Item ID
                    title: item.title, // Include title
                    price: item.price, // Include price
                    quantity: item.quantity // Quantity
                }))
            };
    
            try {
                const response = await fetch('http://localhost:8800/api/order/placeOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });
    
                const result = await response.json();
                if (response.ok) {
                    alert('Order placed successfully!');
                    setCart([]); // Clear the cart
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error placing order:', error);
                alert('An error occurred while placing the order.');
            }
        }
    };
    
    

    const menuItems = {
        breakfast: [
            { id: 1, title: 'Pancakes', price: 199, description: 'Fluffy pancakes with syrup', image: pancakes },
            { id: 2, title: 'Classic Omelette', price: 199, description: 'Cheese and ham omelette', image: omlet },
        ],
        lunch: [
            { id: 3, title: 'Pizza', price: 299, description: 'Cheesy pizza with olive and vegetables', image: pizza },
            { id: 4, title: 'Pasta', price: 249, description: 'Italian dish featuring tender pasta', image: pasta },
        ],
        dinner: [
            { id: 5, title: 'Spaghetti', price: 279, description: 'Tossed in creamy sauce', image: spaghetti },
            { id: 6, title: 'Wrap', price: 199, description: 'Combination of veggies', image: wrap },
        ],
        drinks: [
            { id: 7, title: 'Smoothie', price: 149, description: 'Strawberry smoothie', image: smoothie },
            { id: 8, title: 'Hot Coffee', price: 99, description: 'Freshly brewed coffee', image: hotcoffee },
        ],
    };

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, change) => {
        setCart(cart.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
        }).filter(Boolean));
    };

    return (
        <div>
            <Navbar />
            <img className="order_bg" src={order_img} alt="Order background" />
            <div className="order-container">
                {/* Left Section */}
                <div className="left-section">
                    <div className="category-card">
                        <h2>Categories</h2>
                        <a href="#breakfast">Breakfast</a>
                        <a href="#lunch">Lunch</a>
                        <a href="#dinner">Dinner</a>
                        <a href="#drinks">Drinks</a>
                    </div>
                    <div className="cart-card">
                        <h2>Your Cart</h2>
                        {cart.length === 0 ? (
                            <p>No items added yet.</p>
                        ) : (
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        {item.title} - {item.quantity}
                                        <div className="button-container">
                                            <button className="icon-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                                            <button className="icon-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✖</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <p>Total: Rs.{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                        <button className='order_button' onClick={handleOrderNow}>Order Now</button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="right-section">
                    {Object.entries(menuItems).map(([category, items]) => (
                        <div key={category} id={category}>
                            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                            <div className="card-grid">
                                {items.map((item) => (
                                    <div key={item.id} className="menu-card">
                                        <img className="item_image" src={item.image} alt={item.title} />
                                        <h3>{item.title}</h3>
                                        <p>Rs.{item.price}</p>
                                        <p>{item.description}</p>
                                        <button onClick={() => addToCart(item)}>Add</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order;
