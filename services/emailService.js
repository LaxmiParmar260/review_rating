var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "parmarlaxmi260@gmail.com",
        pass: "cjhrtabqqhmftdzp"
    }
});
//send out email through nodeemailer
var emailOptions = {
    from : "parmarlaxmi260@gmail.com",
    to: "lparmar6269@gmail.com",
    subject: "Hey this is test mail",
    text: "how are you body ?"
}
module.exports={
    transporter,
    emailOptions
}
