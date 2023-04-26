import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
});
// (async () => {
//     await db.sync();
// })();

app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: "auto", // klo http jd false klo https jd true
        },
    })
);

app.use(
    cors({
        //ini berfungsi agar nanti front end dapat mengirimkan request beserta cookie dg menyertakan credentialnya
        credentials: true,
        //ini adalah domain yg kita ijinkan untuk dapat mengakses IP kita,, bisa array untuk banyak
        origin: "http://localhost:3000",
    })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on Port 5000...");
});
