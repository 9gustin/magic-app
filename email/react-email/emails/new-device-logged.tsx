import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { env } from "@/env.mjs"

const baseUrl = env.WEBAPP_URL

export const NewDeviceLogged = ({name = 'DISPLAY_NAME', deviceInfo = ''}) => (
  <Html>
    <Head />
    <Preview>New device logged</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          🔮
          <Hr style={hr} />
          <Text style={paragraph}>
            Hi {name}, a new device has been logged into your account.
          </Text>
          <Text style={paragraph}>
            Device info: {deviceInfo}
          </Text>
          <Text style={paragraph}>
            If this was you, you can safely ignore this email.
          </Text>
          <Button style={button} href={baseUrl}>
            Review activity
          </Button>
          <Hr style={hr} />
          <Text style={footer}>
            Magic App, Inc. 1234 Street Rd. Suite 1234
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewDeviceLogged;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
