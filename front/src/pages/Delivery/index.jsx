import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.sass';

// Import des images
import BurgerKingLogo from '../../assets/images/burgerking-logo.png';
import KfcLogo from '../../assets/images/kfc_logo.png';
import McDonaldsLogo from '../../assets/images/mcdonalds-logo.png';

const Delivery = () => {
    const [showHistory, setShowHistory] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const toggleHistory = () => setShowHistory(!showHistory);
    const toggleDetails = (order = null) => {
        setSelectedOrder(order);
        setShowDetails(!showDetails);
    };

    const historyData = [
        {
            restaurant: "à la belle bouffe !",
            client: "MacNiddian",
            address: "53 Rue de la Rue",
            price: "48 €"
        },
        {
            restaurant: "à la belle bouffe !",
            client: "MacNiddian",
            address: "53 Rue de la Rue",
            price: "49 €"
        }
    ];

    const sampleOrderDetails = {
        restaurant: "à la belle bouffe !",
        items: [
            { name: "Menu Burger", quantity: 2, price: "12.00 €" },
            { name: "Frites", quantity: 1, price: "4.50 €" },
            { name: "Boisson", quantity: 2, price: "3.50 €" }
        ],
        total: "23.50 €",
        address: "33 Rue de la Rue, 75000 Paris",
        deliveryCode: "629189"
    };

    return (
        <div className="delivery-page">
            <Header />
            
            <main className="delivery-container">
                <div className="status-bar">
                    <div className="status">
                        <span>Statut :</span>
                        <select>
                            <option>Disponible</option>
                            <option>Occupé</option>
                        </select>
                    </div>
                    <div className="earnings">
                        Gains du jour : <span>38 €</span>
                    </div>
                </div>

                <section className="current-orders">
                    <h2>Commandes en cours :</h2>
                    <div className="order-card">
                        <p><strong>Restaurant :</strong> à la belle bouffe !</p>
                        <p><strong>Client :</strong> Khalid</p>
                        <p><strong>Adresse :</strong> 33 Rue de la Rue</p>
                        <p><strong>Code :</strong> 629189</p>
                        <p><strong>Prix :</strong> 18 €</p>
                        <button className="btn details" onClick={() => toggleDetails(sampleOrderDetails)}>
                            Voir les détails
                        </button>
                    </div>
                </section>

                <section className="available-orders">
                    <h2>Commandes disponibles</h2>
                    <div className="orders-grid">
                        {/* Burger King */}
                        <div className="order-item">
                            <img 
                                src={BurgerKingLogo}
                                alt="Burger King" 
                                className="order-image" 
                            />
                            <div className="order-details">
                                <p><strong>Restaurant :</strong> Burger King</p>
                                <p><strong>Client :</strong> Marie Dupont</p>
                                <p><strong>Adresse :</strong> 15 Avenue des Champs, 75001 Paris</p>
                                <p><strong>Prix :</strong> 22 €</p>
                                <div className="order-actions">
                                    <button className="btn decline">Refuser</button>
                                    <button 
                                        className="btn visual" 
                                        onClick={() => toggleDetails({
                                            restaurant: "Burger King",
                                            items: [
                                                { name: "Whopper Menu", quantity: 1, price: "9.99 €" },
                                                { name: "Nuggets x6", quantity: 2, price: "4.50 €" },
                                                { name: "Coca-Cola", quantity: 1, price: "3.00 €" }
                                            ],
                                            total: "22.00 €",
                                            address: "15 Avenue des Champs, 75001 Paris",
                                            deliveryCode: "BK7821"
                                        })}
                                    >
                                        Visualiser
                                    </button>
                                    <button className="btn accept">Accepter</button>
                                </div>
                            </div>
                        </div>

                        {/* KFC */}
                        <div className="order-item">
                            <img 
                                src={KfcLogo}
                                alt="KFC" 
                                className="order-image" 
                            />
                            <div className="order-details">
                                <p><strong>Restaurant :</strong> KFC</p>
                                <p><strong>Client :</strong> Jean Martin</p>
                                <p><strong>Adresse :</strong> 7 Rue de la Paix, 75002 Paris</p>
                                <p><strong>Prix :</strong> 19.50 €</p>
                                <div className="order-actions">
                                    <button className="btn decline">Refuser</button>
                                    <button 
                                        className="btn visual"
                                        onClick={() => toggleDetails({
                                            restaurant: "KFC",
                                            items: [
                                                { name: "Bucket Familial", quantity: 1, price: "15.00 €" },
                                                { name: "Pepsi 1.5L", quantity: 1, price: "4.50 €" }
                                            ],
                                            total: "19.50 €",
                                            address: "7 Rue de la Paix, 75002 Paris",
                                            deliveryCode: "KFC3356"
                                        })}
                                    >
                                        Visualiser
                                    </button>
                                    <button className="btn accept">Accepter</button>
                                </div>
                            </div>
                        </div>

                        {/* McDonald's */}
                        <div className="order-item">
                            <img 
                                src={McDonaldsLogo}
                                alt="McDonald's" 
                                className="order-image" 
                            />
                            <div className="order-details">
                                <p><strong>Restaurant :</strong> McDonald's</p>
                                <p><strong>Client :</strong> Sophie Leroy</p>
                                <p><strong>Adresse :</strong> 22 Boulevard Voltaire, 75011 Paris</p>
                                <p><strong>Prix :</strong> 15.75 €</p>
                                <div className="order-actions">
                                    <button className="btn decline">Refuser</button>
                                    <button 
                                        className="btn visual"
                                        onClick={() => toggleDetails({
                                            restaurant: "McDonald's",
                                            items: [
                                                { name: "Big Mac Menu", quantity: 1, price: "8.50 €" },
                                                { name: "McFlurry", quantity: 1, price: "4.25 €" },
                                                { name: "Frites Moyenne", quantity: 1, price: "3.00 €" }
                                            ],
                                            total: "15.75 €",
                                            address: "22 Boulevard Voltaire, 75011 Paris",
                                            deliveryCode: "MCD4892"
                                        })}
                                    >
                                        Visualiser
                                    </button>
                                    <button className="btn accept">Accepter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popup Détails de commande */}
                {showDetails && (
                    <div className="details-popup" onClick={() => toggleDetails()}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <div className="popup-header">
                                <h2>Détails de la commande</h2>
                                <button className="close-btn" onClick={() => toggleDetails()}>×</button>
                            </div>
                            
                            <div className="details-content">
                                <h3>{selectedOrder?.restaurant}</h3>
                                
                                <table className="details-table">
                                    <thead>
                                        <tr>
                                            <th>Article</th>
                                            <th>Quantité</th>
                                            <th>Prix</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder?.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>× {item.quantity}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        ))}
                                        <tr className="total-row">
                                            <td colSpan="2"><strong>Total</strong></td>
                                            <td><strong>{selectedOrder?.total}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="additional-info">
                                    <div className="info-section">
                                        <h4>Adresse de livraison</h4>
                                        <p>{selectedOrder?.address}</p>
                                    </div>
                                    <div className="info-section">
                                        <h4>Code de livraison</h4>
                                        <p>{selectedOrder?.deliveryCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Popup Historique */}
                {showHistory && (
                    <div className="history-popup" onClick={toggleHistory}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <div className="popup-header">
                                <h2>Historique des commandes</h2>
                                <button className="close-btn" onClick={toggleHistory}>×</button>
                            </div>
                            <div className="history-list">
                                {historyData.map((order, index) => (
                                    <div key={index} className="history-item">
                                        <p><strong>Restaurant :</strong> {order.restaurant}</p>
                                        <p><strong>Client :</strong> {order.client}</p>
                                        <p><strong>Adresse :</strong> {order.address}</p>
                                        <p><strong>Prix :</strong> {order.price}</p>
                                        {index < historyData.length - 1 && <hr />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <section className="order-history">
                    <h2>Historique récent</h2>
                    <div className="history-list">
                        {historyData.slice(0, 1).map((order, index) => (
                            <div key={index} className="history-item">
                                <p><strong>Restaurant :</strong> {order.restaurant}</p>
                                <p><strong>Client :</strong> {order.client}</p>
                                <p><strong>Adresse :</strong> {order.address}</p>
                                <p><strong>Prix :</strong> {order.price}</p>
                            </div>
                        ))}
                    </div>
                    <button className="history-btn" onClick={toggleHistory}>
                        Historique des commandes
                    </button>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Delivery;