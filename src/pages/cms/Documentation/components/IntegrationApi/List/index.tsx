import { useUsers } from "@/hooks/api/users";

const DocIntegrationApiList = () => {
  const params = {
    page: 1,
    pageSize: 10,
    search: "",
    sorting: [],
  }

  const { data, isLoading, error } = useUsers(params);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  return (
    <>
      <h1>List</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default DocIntegrationApiList;