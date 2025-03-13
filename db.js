const mongoose = require("mongoose");


const port = 3000;

mongoose.connect('mongodb://localhost:27017/student-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
 console.log("connection success")
})
.catch ((error) => {
console.error("error connecting", error);
})

module.exports = mongoose;