import { ClientMetrics } from "./clientMetrics.mjs";
import { ServerMetrics } from "./serverMetrics.mjs";

export class Metrics {

  /** @type {Map<string, ServerMetrics>} */
  #servers = new Map();

  /** @type {Map<string, ClientMetrics>} */
  #clients = new Map();

  registerClient(data) {
    return new ClientMetrics({ server, ip });
  }

  /**
   * @param {import("./serverMetrics.mjs").T_ServerMetrics} data
   */
  pushServerMetrics(data) {
    if (!this.#servers.has(data.host)) {
      this.#servers.set(data.host, new ServerMetrics(data));
    }
    this.#servers.get(data.host).push(data);
    return this
  }

  get() {
    /** @type {Array<ServerMetrics>} */
    const servers = [];
    /** @type {Array<ClientMetrics>} */
    const clients = []

    this.#servers.forEach((value, key) => { servers.push(value.get()) })
    this.#clients.forEach((value, key) => { clients.push(value.get()) })

    return { servers, clients }
  }

}
