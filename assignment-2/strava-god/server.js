const express = require('express');
const app = express();
const port = process.env.PORT || 3010;
const _app_folder = 'dist/strava-god';

app.use(express.static(_app_folder));

app.all('*', function(req, res) {
  res.status(200).sendFile(`/`, { root: _app_folder });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
