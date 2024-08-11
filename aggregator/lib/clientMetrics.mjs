
/**
 * @typedef {Object} T_ClientMetricsConstructor
 * @property {string} server - server name
 * @property {string} ip - server IP
 */

/**
 * @typedef {Object} T_ClientMetrics
 * @property {number} connections
 * @property {number} messages
 * @property {number} bytesReceived
 * @property {number} bytesSent
 * @property {number} cpu
 * @property {number} memory
 */

export class ClientMetrics {
  #server;
  #ip;
  #metrics;
  /**
   * @param {T_ClientMetricsConstructor} data
   * @returns {ClientMetrics}
   */
  constructor(data) {
    this.#server = data.server;
    this.#ip = data.ip;
  }

  /**
   * @param {T_ClientMetrics} data
   * @returns {ClientMetrics}
   */
  push(data) {
    this.#metrics = data;
    return this;
  }

  /**
   * @returns {T_ClientMetrics} data
   */
  get() {
    console.log(this.#server, this.#ip);
    return this.#metrics;
  }
}
