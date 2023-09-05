const mongoose = require('mongoose');

// Conexión a base de datos
mongoose.connect("mongodb://127.0.0.1/alerts_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to database"))
    .catch(err => console.log("Something went wrong when connecting to the database", 
err
));

