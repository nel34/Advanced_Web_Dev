const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connexion réussie à MongoDB"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));

module.exports = mongoose;
