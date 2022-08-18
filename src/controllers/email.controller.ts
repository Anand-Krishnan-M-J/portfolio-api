import { Request, Response } from "express";
import sgMail from '@sendgrid/mail';
import { add , getAll} from "../models/email.model"

export const getEmails = async (req: Request, res: Response) => {
    try {
        const emails = await getAll(req, res);
        res.status(200).json({
            message: "Status OK for fetching emails",
            data: {
                emails: emails.rows
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: "Status Nok", data: { error: error.message } });
    }
};
export const sendEmail = async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body
    try {
        await add(req, res);
        console.log("Email data added to DB")
    }
    catch (error) {
        console.log("Email data was not added to DB")

    }
    console.log(name, email, subject, message)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'anandkrishmj@gmail.com', // Change to your recipient
        from: 'anandkrishmj@gmail.com', // Change to your verified sender
        subject: subject,
        text: 'subject',
        html: `<div>
         <div><span>Mail From: ${name}</span></div>
         <div><span>EmailId: ${email}</span></div>
         <div>${message}</div>
        </div>
        `
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            res.status(200).json({
                message: "Status ok",
                data: "Mail Sent"
            });
        })
        .catch((error) => {
            console.error(error)
            res.status(400).json({
                message: "Status nok",
                data: error.response.body.errors
            });
        })
}
