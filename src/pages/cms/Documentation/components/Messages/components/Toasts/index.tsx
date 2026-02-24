import BaseDivider from "@/components/shared/atoms/BaseDivider";
import { Toaster, toaster } from "@/components/ui/toaster"
import { Button, HStack, For } from "@chakra-ui/react";

const DocMessagesToasts = () => {
  return (
    <div className="space-y-6">
      <section>
        <h1>Default</h1>
        <BaseDivider />
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toaster.create({
              description: "File saved successfully",
              type: "info",
            })
          }
        >
          Show Toast
        </Button>
      </section>

      <section>
        <h1>Closeable Toast</h1>
        <BaseDivider />
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toaster.create({
              description: "File saved successfully",
              type: "info",
              closable: true,
            })
          }
        >
          Show Toast
        </Button>
      </section>
      
      <section>
        <h1>External Close Toast</h1>
        <BaseDivider />
        
        <HStack>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toaster.create({
                description: "File saved successfully",
                type: "info",
              })
            }
          >
            Show Toast
          </Button>

          <Button variant="outline" size="sm" onClick={() => toaster.dismiss()}>
            Close Toasts
          </Button>
        </HStack>
      </section>
      
      <section>
        <h1>Type Toast</h1>
        <BaseDivider />
        
        <HStack>
          <For each={["success", "error", "warning", "info"]}>
            {(type) => (
              <Button
                size="sm"
                variant="outline"
                key={type}
                onClick={() =>
                  toaster.create({
                    title: `Toast status is ${type}`,
                    type: type,
                  })
                }
              >
                {type}
              </Button>
            )}
          </For>
        </HStack>
      </section>
      
      <section>
        <h1>With Action Toast</h1>
        <BaseDivider />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toaster.success({
              title: "Update successful",
              description: "File saved successfully to the server",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Click me
        </Button>
      </section>

      <Toaster />
    </div>
  )
}

export default DocMessagesToasts;
