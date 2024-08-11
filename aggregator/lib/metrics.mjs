import { ClientMetrics } from "./clientMetrics.mjs";
import { ServerMetrics } from "./serverMetrics.mjs";

class Metrics {

  /** @type {Map<string, ServerMetrics>} */
  #servers = new Map();

  /** @type {Map<string, ClientMetrics>} */
  #clients = new Map();

  constructor() { }
  /**
   * @param {import("./serverMetrics.mjs").T_ServerMetricsConstructor} data
   */
  registerServer(data) {
    return new ServerMetrics(data);
  }

  registerClient(data) {
    return new ClientMetrics({ server, ip });
  }

  /**
   * @param {import("./serverMetrics.mjs").T_ServerMetrics} data
   */
  pushServerMetrics(data) {
    this.#servers.get(data.server).push(data);
    return this
  }

  getMetrics() {
    /** @type {Array<ServerMetrics>} */
    const servers = [];
    /** @type {Array<ClientMetrics>} */
    const clients = []

    this.#servers.forEach((value, key) => { servers.push(value.get()) })
    this.#clients.forEach((value, key) => { clients.push(value.get()) })

    return { servers, clients }
  }

}


export const metrics = Metrics()
