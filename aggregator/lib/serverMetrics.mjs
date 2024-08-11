
/**
 * @typedef {Object} T_ServerMetricsConstructor
 * @property {string} server - server name
 * @property {string} ip - server IP
 */

/**
 * @typedef {Object} T_ServerMetrics
 * @property {string} server
 * @property {string} ip
 * @property {number} connections
 * @property {number} messagesReceived
 * @property {number} messagesSent
 * @property {number} bytesReceived
 * @property {number} bytesSent
 * @property {number} cpuUsage
 * @property {number} memoryUsage
 */

export class ServerMetrics {
  #server;
  #ip;
  #metrics;
  /**
   * @param {T_ServerMetricsConstructor} data
   * @returns {ServerMetrics}
   */
  constructor(data) {
    this.#server = data.server;
    this.#ip = data.ip;
  }

  /**
   * @param {T_ServerMetrics} data
   * @returns {ServerMetrics}
   */
  push(data) {
    this.#metrics = data;
    return this;
  }

  /**
   * @returns {T_ServerMetrics} data
   */
  get() {
    console.log(this.#server, this.#ip);
    return this.#metrics;
  }
}
