import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = '453711346264-amknu166dfhhd97j5b4ket9nohicfdbj.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const loginWithGoogle = async(req, res) => {
  const { id_token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload['email'];

    // Use `userId` to look up or create a user in your database
    // Then, create a session or JWT to handle user authorization in your app

    res.status(200).send('Authenticated');
  } catch (error) {
    res.status(401).send('Authentication failed');
  }
}

export default (app) => {
  app.post("/api/users/login/google", loginWithGoogle);
}