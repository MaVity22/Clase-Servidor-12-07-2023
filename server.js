const express = require('express');
//const cors = require('cors');
const app = express();
const port = 8000;

require('./server/config/mongoose.config');

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allUserRoutes = require('./server/routes/user.routes');
allUserRoutes(app);

app.listen(port, () => {
console.log("Server listening at port", port);
})