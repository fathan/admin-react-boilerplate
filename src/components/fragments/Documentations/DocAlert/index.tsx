import { Card, Alert } from "@chakra-ui/react";

const DocAlert = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card.Root>
        <Card.Header>
          <Card.Title>
            Alert
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="flex flex-col gap-4">
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Title>There was an error processing your request</Alert.Title>
            </Alert.Root>

            <Alert.Root status="info">
              <Alert.Indicator />
              <Alert.Title>
                Chakra is going live on August 30th. Get ready!
              </Alert.Title>
            </Alert.Root>

            <Alert.Root status="warning">
              <Alert.Indicator />
              <Alert.Title>
                Seems your account is about expire, upgrade now
              </Alert.Title>
            </Alert.Root>

            <Alert.Root status="success">
              <Alert.Indicator />
              <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
            </Alert.Root>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default DocAlert;
