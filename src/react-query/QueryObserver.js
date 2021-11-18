class QueryObserver {
  constructor(client, options) {
    this.query = client.getQuery(options);
  }

  notify = () => {};

  getResult = () => {
    return this.query.getState();
  };

  subscribe = (callback) => {
    this.notify = callback;
    const unsubscribe = this.query.subscribe(this);

    this.fetch();

    return unsubscribe;
  };

  fetch = () => {
    this.query.fetch();
  };
}

export default QueryObserver;
