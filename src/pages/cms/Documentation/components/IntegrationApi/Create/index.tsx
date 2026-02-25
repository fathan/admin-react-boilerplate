import { useCreateUser } from "@/hooks/users/useCreateUser";
import { getErrorMessage } from "@/utils/error.utils";

const DocIntegrationApiCreate = () => {
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = () => {
    const payload = {
      name: "Fathan Rohman",
      email: "fathan.rohman@gmail.com.com",
      password: "password123",
      role: "admin",
    };

    createUser(payload, {
      onError: (error: any) => {
        console.log(getErrorMessage(error));
      },
      onSuccess: () => {
        alert("Berhasil dibuat");
      },
    });
  };

  return (
    <>
      <h1 onClick={handleSubmit}>Create</h1>
    </>
  );
};

export default DocIntegrationApiCreate;