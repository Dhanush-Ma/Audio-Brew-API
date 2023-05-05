const express = require("express");
const router = express.Router();
const redirectUri = require("./utilities/redirectUri");
const SpotifyWebApi = require("spotify-web-api-node");

router.post("/", async (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri,
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
      res.status(400).send(err);
    });
});

module.exports = router;
