
/**
 * @typedef {Object} T_ServerMetricsConstructor
 * @property {string} host - server name
 * @property {string} ip - server IP
 */

/**
 * @typedef {Object} T_ServerMetrics
 * @property {string} host
 * @property {string} ip
 * @property {number} con
 * @property {Object} msg
 * @property {number} msg.received
 * @property {number} msg.sent
 * @property {Object} bytes
 * @property {number} bytes.received
 * @property {number} bytes.sent
 * @property {Object} resourceUsage
 * @property {number} resourceUsage.cpu
 * @property {number} resourceUsage.memory
 */

export class ServerMetrics {
  #host;
  #ip;
  #metrics;
  /**
   * @param {T_ServerMetricsConstructor} data
   * @returns {ServerMetrics}
   */
  constructor(data) {
    this.#host = data.host;
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
    return this.#metrics;
  }
}
