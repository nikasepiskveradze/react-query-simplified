import { useContext, useEffect, useReducer, useRef } from "react";
import { context } from "./QueryClientProvider";
import QueryObserver from "./QueryObserver";

const useQuery = (queryKey, queryFn) => {
  const client = useContext(context);
  const [, rerender] = useReducer((i) => i + 1, 0);

  const observerRef = useRef();

  if (!observerRef.current) {
    observerRef.current = new QueryObserver(client, { queryKey, queryFn });
  }

  useEffect(() => {
    return observerRef.current.subscribe(rerender);
  }, []);

  return observerRef.current.getResult();
};

export default useQuery;
