const sgMail = require('@sendgrid/mail')
const sendGridApiKey = process.env.SENDGRIG_API_KEY
sgMail.setApiKey(sendGridApiKey)




const sendToNewUser = (email, name) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'Nathan.swindall20103@gmail.com', // Change to your verified sender
        subject: 'Thank you for signing up!',
        text: `We welcome you, ${name}, for signing up to our service`,
      })
 
}

const sendToDeletedUser = (email, name) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'Nathan.swindall20103@gmail.com', // Change to your verified sender
        subject: 'Sorry to see you go',
        text: `It is what it is ${name}, but sometimes we have to do these things`,
    })
}



module.exports = {
    sendToNewUser,
    sendToDeletedUser
}