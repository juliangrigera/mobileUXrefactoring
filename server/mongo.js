const mongoose = require('mongoose')
const connectionString = "mongodb+srv://proyecto-alumnos:B44XgKm0dsCKDls4@mobileuxrefactoring-tes.bloqb.mongodb.net/mUXr-test?retryWrites=true&w=majority"

exports.connect = () => {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }).catch(e => console.error(e));
}

exports.disconnect = () => {
    mongoose.connection.close()
}