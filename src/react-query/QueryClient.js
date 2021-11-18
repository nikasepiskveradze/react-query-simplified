import Query from "./Query";

class QueryClient {
  constructor() {
    this.queries = [];
  }

  getQuery = (options) => {
    const queryHash = JSON.stringify(options.queryKey);
    let query = this.queries.find((d) => d.queryHash === queryHash);

    if (!query) {
      query = new Query(this, options);
      this.queries.push(query);
    }

    return query;
  };
}

export default QueryClient;
