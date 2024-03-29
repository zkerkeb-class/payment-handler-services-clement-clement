import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!jwtSecret) {
  console.error("La clé secrète JWT n'est pas définie dans le fichier .env");
  process.exit(1);
}

// Ajoutez cette ligne
app.use(express.json());

app.post('/pay', async (req, res) => {
  const {amount, token} = req.body;
  console.log(token);
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'eur',
      description: 'Description de la charge',
      source: token,
    });

    res.status(200).send({success: charge});
  } catch (error) {
    console.error(`Stripe error: ${error.message}`);
    res.status(500).send({error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Exemple de body pour requête POST avec Postman

// {
//   "token": "tok_visa",
//   "amount": 2000
// }
