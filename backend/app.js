import express from 'express';
import { connect } from './db.js';
import cors from 'cors';
import router from './routers.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/my-uploads', express.static('my-uploads'));

app.use("/user", router);

app.listen(5000, () => {
    console.log("Server started successfully on port 5000");
});
