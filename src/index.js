const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
const mailSender = require('./config/email-config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    try{
        const response = await mailSender.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: 'harsheet.new@gmail.com',
            subject: 'is the service working',
            text: 'Yes, it is working',
        })
        console.log(response);
    } catch(error) {
        console.log(error);
    }

});
