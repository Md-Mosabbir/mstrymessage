import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}



const VerificationEmails = ({username, otp}: VerificationEmailProps) => {
  return (
    <Html lang="en" dir='ltr'>
      <Head>
        <title>Verification code</title>

        <Font fontFamily='Roboto' fallbackFontFamily={"Verdana"} webFont={{
          url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
          format: 'woff2'
        }}
        fontWeight={400}
        fontStyle='normal'
         />
      </Head>
      <Preview> Here is your verification code: {otp} </Preview>
      <Section>
        <Row>
          <Heading as='h2'>Hello {username},</Heading>
        </Row>

        <Row>
          <Text>
            Thank you for registering. Please use the following verification code 
            to complete your registration!
          </Text>
        </Row>

        <Row>
          <Text>
            Verification code: {otp}
          </Text>
        </Row>

        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>

        
      </Section>

      
    </Html>


  )
}

export default VerificationEmails