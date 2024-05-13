const express = require("express");
const cookieParser = require('cookie-parser'); 
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));    
app.use(cookieParser());

const rootrouter = require("./user/index");
app.use(express.json());

app.use("/api/v1", rootrouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
    