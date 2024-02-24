import { Resend } from 'resend';
import {render} from '@react-email/render'

import { isDev } from "@/config/config"
import { nodemailerAppTransport } from "./transports/nodemailer"
import { env } from "@/env.mjs"

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({subject, to, react}) => {
  const message = {
    from: "magic-app@resend.dev",
    subject,
    to,
  };

  if (isDev) {
      const html = render(react)
      return nodemailerAppTransport.sendMail({
        ...message,
        html,
      });
  } else {
    await resend.emails.send({
      ...message,
      react,
    });
  }
}
