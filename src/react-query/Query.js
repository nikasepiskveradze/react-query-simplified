class Query {
  constructor(client, options) {
    this.query = {
      queryKey: options.queryKey,
      queryHash: JSON.stringify(options.queryKey),
      queryFn: options.queryFn,
      promise: null,
      subscribers: [],
      state: {
        status: "loading",
        isFetching: true,
        data: undefined,
        error: undefined
      }
    };
  }

  setState = (updater) => {
    this.query.state = updater(this.query.state);
    this.query.subscribers.forEach((subscriber) => subscriber.notify());
  };

  getState = () => {
    return this.query.state;
  };

  fetch = () => {
    if (!this.query.promise) {
      this.query.promise = (async () => {
        this.setState((old) => ({
          ...old,
          isFetching: true,
          error: undefined
        }));

        try {
          const data = await this.query.queryFn();
          this.setState((old) => ({ ...old, status: "success", data: data }));
        } catch (error) {
          this.setState((old) => ({ ...old, status: "error", error: error }));
        } finally {
          this.query.promise = null;
          this.setState((old) => ({ ...old, isFetching: false }));
        }
      })();
    }

    return this.query.promise;
  };

  subscribe = (subscriber) => {
    this.query.subscribers.push(subscriber);

    return () => {
      this.query.subscribers = this.query.subscribers.filter(
        (d) => d !== subscriber
      );
    };
  };
}

export default Query;
