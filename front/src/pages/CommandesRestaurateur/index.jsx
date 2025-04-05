import { useEffect, useState } from "react";
import axios from "axios";
import SidebarRestaurateur from "../../components/SidebarRestaurateur";
import CommandeCard from "../../components/CommandeCard";
import "./index.sass";

export default function CommandesRestaurateur() {
  const [deliveries, setDeliveries] = useState([]);

  const RESTAURANT_ID = "670000000000000000000001"; // ID restaurateur en dur

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get("http://localhost:3040/api/deliveries");
      const filtered = res.data.filter(
        (delivery) => delivery.restaurant_id === RESTAURANT_ID
      );
      setDeliveries(filtered);
    } catch (err) {
      console.error("Erreur lors du chargement des livraisons :", err);
    }
  };

  useEffect(() => {
    fetchDeliveries(); // initial load

    const intervalId = setInterval(() => {
      fetchDeliveries(); // refresh every 5 sec
    }, 5000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <h2>Vos Commandes :</h2>
          <div className="commande-list">
            {deliveries.filter(d => d.status !== "refused").length > 0 ? (
              deliveries
                .filter(d => d.status !== "refused")
                .map((delivery) => (
                  <CommandeCard
                    key={delivery._id}
                    delivery={delivery}
                    onUpdate={fetchDeliveries}
                  />
                ))
            ) : (
              <p style={{ fontStyle: "italic" }}>Aucune commande en cours.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
