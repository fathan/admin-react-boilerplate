import BaseAlert from "@/components/shared/atoms/BaseAlert";
import { Card } from "@chakra-ui/react";
import { Users } from "lucide-react";

const DocMessagesAlert = () => {
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
            <BaseAlert
              title="Info"
              description="Information"
              status="info"
              variant="solid"
              colorPalette="green"
              showIcon
              closable
              onClose={() => console.log("Closed")}
            />

            <BaseAlert
              title="Success!"
              description="Data berhasil disimpan."
              status="success"
              variant="solid"
              colorPalette="green"
              size="md"
              closable
              onClose={() => console.log("Closed")}
            />

            <BaseAlert
              title="Warning!"
              description="Periksa input anda."
              status="warning"
              variant="solid"
              colorPalette="green"
              size="md"
              closable
              onClose={() => console.log("Closed")}
            />

            <BaseAlert
              title="Failed"
              description="Data gagal disimpan."
              status="error"
              variant="solid"
              colorPalette="green"
              showIcon
              closable
              onClose={() => console.log("Closed")}
            />

            <BaseAlert
              title="Warning!"
              description="Periksa input anda."
              status="warning"
              variant="outline"
              colorPalette="orange"
              showIcon
              closable
              onClose={() => console.log("Closed")}
            />

            <BaseAlert
              title="Success"
              description="Data berhasil disimpan."
              status="success"
              variant="outline"
              colorPalette="orange"
              showIcon
              closable
              onClose={() => console.log("Closed")}
            />

            <BaseAlert
              title="Info"
              description="Information"
              status="info"
              variant="outline"
              colorPalette="orange"
              showIcon
            />

            <BaseAlert
              title="Failed"
              description="Data gagal disimpan."
              status="error"
              variant="outline"
              colorPalette="orange"
              showIcon
            />

            <BaseAlert
              title="Info"
              description="Ini alert info dengan custom icon"
              status="info"
              icon={<Users />}
              variant="subtle"
            />

            <BaseAlert
              title="Info"
              description="Ini alert info dengan custom icon"
              status="success"
              icon={<Users />}
              variant="subtle"
            />

            <BaseAlert
              title="Info"
              description="Ini alert info dengan custom icon"
              status="error"
              icon={<Users />}
              variant="subtle"
            />

            <BaseAlert
              title="Info"
              description="Ini alert info dengan custom icon"
              status="warning"
              icon={<Users />}
              variant="subtle"
            />
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default DocMessagesAlert;
