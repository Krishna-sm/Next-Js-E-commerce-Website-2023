import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
auth:{
    user:"",
    pass:''
},
port:587,
secure:true,
host:'smtp.gmail.com'
});



export const SendEmail = async({html,subject,to})=>{
            transport.sendMail({
                from:'bugswear.com',
                to:to,
                subject:subject,
                html:html
            })
}