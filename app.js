import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import cors from 'cors';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!jwtSecret) {
  console.error("La clé secrète JWT n'est pas définie dans le fichier .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.post('/pay', async (req, res) => {
  const {
    amount,
    token,
    email,
    price,
    billingAddress,
    firstName,
    lastName,
    description,
  } = req.body;

  const authHeader = req.headers.authorization;
  const authToken = authHeader && authHeader.split(' ')[1];
  if (!authToken) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const { email: userEmail } = jwt.verify(authToken, jwtSecret);

    if (userEmail !== email) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    const charge = await stripe.charges.create({
      amount,
      currency: 'eur',
      description: 'Description de la charge',
      source: token,
    });
    const emailResponse = await axios.post(
      'http://localhost:3004/api/sendFactureEmail',
      {
        email: email,
        price: price,
        billingAddress: billingAddress,
        firstName: firstName,
        lastName: lastName,
        description: description,
      },
    );

    res.status(200).send({success: charge});
  } catch (error) {
    console.error(`Stripe error: ${error.message}`);
    res.status(500).send({error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
