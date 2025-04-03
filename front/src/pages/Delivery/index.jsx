import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.sass';

const Delivery = () => {
    const [showHistory, setShowHistory] = useState(false);

    const toggleHistory = () => {
        setShowHistory(!showHistory);
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
        },
        {
            restaurant: "à la belle bouffe !",
            client: "MacNiddian",
            address: "53 Rue de la Rue",
            price: "48 €"
        }
    ];

    return (
        <div className="delivery-page">
            <Header />
            
            <main className="delivery-container">
                <div className="status-bar">
                    <h1>CEST Eats</h1>
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

                <section className="current-orders">
                    <h2>Commandes en cours :</h2>
                    <div className="order-card">
                        <p><strong>Restaurant :</strong> à la belle bouffe !</p>
                        <p><strong>Client :</strong> Khalid</p>
                        <p><strong>Adresse :</strong> 33 Rue de la Rue</p>
                        <p><strong>Code :</strong> 629189</p>
                        <p><strong>Prix :</strong> 18 €</p>
                        <div className="order-actions">
                            <button className="btn decline">Refuser</button>
                            <button className="btn visual">Visualiser</button>
                            <button className="btn accept">Accepter</button>
                        </div>
                    </div>
                </section>

                <section className="order-history">
                    <h2>Historique récent</h2>
                    <div className="history-list">
                        <div className="history-item">
                            <p><strong>Restaurant :</strong> à la belle bouffe !</p>
                            <p><strong>Client :</strong> MacNiddian</p>
                            <p><strong>Adresse :</strong> 53 Rue de la Rue</p>
                            <p><strong>Prix :</strong> 48 €</p>
                        </div>
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