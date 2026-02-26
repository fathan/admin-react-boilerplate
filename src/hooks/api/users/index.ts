/**
 * 
 *  sample call from component 
    import { useUsers, useCreateUser } from "@/hooks/api/users";

    const { data } = useUsers(params);
    const { mutate } = useCreateUser();
 */

export * from "./queries";
export * from "./mutations";
export * from "./keys";