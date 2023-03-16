const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

router.post("/", async (req, res) => {
  const code = req.body.code;
  console.log("token", code);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://audiobrew.netlify.app/me",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router;
