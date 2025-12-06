type Connection<T> =
  | {
      edges: Array<{
        node: T;
      }>;
    }
  | null
  | undefined;

export const flattenEdges = <T>(connection: Connection<T>): T[] => {
  return connection?.edges?.map((edge) => edge.node) ?? [];
};
