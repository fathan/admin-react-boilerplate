import { Heading } from "@chakra-ui/react";
import DocButton from "../../../components/fragments/Documentations/DocButton";
import DocAlert from "../../../components/fragments/Documentations/DocAlert";

const Documentation = () => {
  return (
    <div className="space-y-6">
      <section className="mt-10">
        <Heading size="2xl" className="mb-3">Alert Component</Heading>
        <hr className="mb-3" />
        <DocAlert />
      </section>

      <section className="mt-10">
        <Heading size="2xl" className="mb-3">Button Component</Heading>
        <hr className="mb-3" />
        <DocButton />
      </section>
    </div>
  );
};

export default Documentation;