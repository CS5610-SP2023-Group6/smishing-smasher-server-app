import axios from "axios";

const loginWithFacebook = async(req, res) => {
  const { accessToken } = req.body;

  try {
    // Get user data from Facebook
    const fbUserData = await axios.get(
      `https://graph.facebook.com/me?fields=id,email,name&access_token=${accessToken}`
    );

    const { id: facebookId, email, name } = fbUserData.data;

    // Use `facebookId`, `email`, and `name` to look up or create a user in your database
    // Then, create a session or JWT to handle user authorization in your app

    res.status(200).send('Authenticated');
  } catch (error) {
    res.status(401).send('Authentication failed');
  }
}

export default (app) => {
  app.post("/api/users/login/facebook", loginWithFacebook);
}