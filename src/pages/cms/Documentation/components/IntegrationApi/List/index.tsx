import { useUsers } from "@/hooks/users/useUsers";

const DocIntegrationApiList = () => {
  const { data, isLoading, error } = useUsers(params);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  return (
    <>
      <h1>List</h1>
    </>
  );
};

export default DocIntegrationApiList;