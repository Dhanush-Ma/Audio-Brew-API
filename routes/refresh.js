const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const redirectUri = require("./utilities/redirectUri");

router.post("/", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) =>
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    )
    .catch((err) => res.send(err));
});

module.exports = router;
