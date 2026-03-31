export class WSClient {
  ws: WebSocket;
  constructor(name?: string) {
    const envUrl = import.meta.env.VITE_REACT_APP_WS_URL;
    const defaultUrl = `ws://${window.location.hostname}:5000`;

    let url: URL;
    try {
      url = new URL(envUrl || defaultUrl);
    } catch (error) {
      console.warn(
        "WSClient: invalid VITE_REACT_APP_WS_URL, falling back to",
        defaultUrl,
        "error:",
        error
      );
      url = new URL(defaultUrl);
    }

    if (name) url.searchParams.set("name", name);
    this.ws = new WebSocket(url.toString());
  }

  send(type: string, payload: any) {
    this.ws.send(JSON.stringify({ type, ...payload }));
  }
}
