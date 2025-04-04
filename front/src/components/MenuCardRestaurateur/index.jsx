import './index.sass'
import { useState } from 'react'

export default function MenuCardRestaurateur({ name, price, image }) {
    const [showModal, setShowModal] = useState(false)

    const handleEditClick = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    return (
        <>
            <div className="menu-card" onClick={handleEditClick}>
                <div className="menu-card__left">
                    <span className="menu-card__edit">✏️</span>
                    <img src={image} alt={name} className="menu-card__image" />
                    <p className="menu-card__name">{name}</p>
                </div>
                <p className="menu-card__price">{price}€</p>
            </div>

            {showModal && (
                <div className="menu-card__modal">
                    <div className="menu-card__modal-content">
                        <h3>Modifier le menu</h3>
                        <img src={image} alt="aperçu" className="menu-card__modal-image" />
                        <label>Prix</label>
                        <input type="text" defaultValue={price} />
                        <label>Description</label>
                        <input type="text" />
                        <label>Nom</label>
                        <input type="text" defaultValue={name} />
                        <label>Photo</label>
                        <input type="file" />
                        <div className="menu-card__modal-actions">
                            <button className="delete">Supprimer</button>
                            <button className="validate" onClick={handleClose}>Valider</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
