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
} from "@react-email/components"
import * as React from "react"

const baseUrl = process.env.WEBAPP_URL

export const WelcomeUserEmail = ({ name = "DISPLAY_NAME", validateEmailUrl = "" }) => (
  <Html>
    <Head />
    <Preview>Welcome to Magic App! 🔮</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          🔮
          <Hr style={hr} />
          <Text style={paragraph}>
            Hi {name}, welcome to Magic App! You're now ready to make live
          </Text>
          {validateEmailUrl && (
            <Button style={button} href={validateEmailUrl}>
              Confirm your email
            </Button>
          )}
          {!validateEmailUrl && (
            <Button style={button} href={baseUrl}>
              Go to Magic App
            </Button>
          )}
          <Hr style={hr} />
          <Text style={footer}>Magic App, Inc. 1234 Street Rd. Suite 1234</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WelcomeUserEmail

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const box = {
  padding: "0 48px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
}

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
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
}
