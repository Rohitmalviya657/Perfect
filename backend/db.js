import mongoose from 'mongoose';
export const connect = mongoose.connect("mongodb://localhost:27017/Codiant", {

}).then(() => {
    console.log("databse connected Succes");

}).catch(() => {
    console.log("something went rong");

})