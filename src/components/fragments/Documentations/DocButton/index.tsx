import { Button, Card } from "@chakra-ui/react";

const DocButton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card.Root>
        <Card.Header>
          <Card.Title>
            Default
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div>
            <Button>Button</Button>
          </div>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>
            Size
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="flex flex-row gap-4">
            <Button size="xs">Button (xs)</Button>
            <Button size="sm">Button (sm)</Button>
            <Button size="md">Button (md)</Button>
            <Button size="lg">Button (lg)</Button>
            <Button size="xl">Button (xl)</Button>
          </div>
        </Card.Body>
      </Card.Root>
      
      <Card.Root>
        <Card.Header>
          <Card.Title>
            Variant
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="flex flex-row gap-4">
            <Button variant="solid">Solid</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="surface">Surface</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="plain">Plain</Button>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default DocButton;