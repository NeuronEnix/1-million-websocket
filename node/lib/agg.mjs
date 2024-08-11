import Axios from 'axios';

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

export class Agg {
  #isConnected = false;
  #aggUrl = `http://${process.env.AGGREGATOR_HOST}:${process.env.AGGREGATOR_PORT}/`;
  #aggAxios = Axios.create({
    baseURL: `http://${process.env.AGGREGATOR_HOST}:${process.env.AGGREGATOR_PORT}/`,
  });
  /**@type {T_ServerMetrics} */
  metrics;
  constructor() {
    this.#aggAxios = Axios.create({ baseURL: this.#aggUrl, });
    console.log("Agg Url:", this.#aggUrl)
    this.metrics = {
      host: "node", ip: "127.0.0.1",
      con: 0,
      msg: { received: 0, sent: 0 },
      bytes: { received: 0, sent: 0 },
      resourceUsage: { cpu: 0, prevCpu: 0, memory: 0 }
    }
  }
  updateResourceUsage() {
    this.metrics.resourceUsage.prevCpu = this.metrics.resourceUsage.cpu
    this.metrics.resourceUsage.cpu = process.cpuUsage().user
    this.metrics.resourceUsage.memory = process.memoryUsage().rss
  }
  isConnected() {
    return this.#isConnected
  }
  async sendMetrics() {
    this.updateResourceUsage()
    try {
      const res = await this.#aggAxios.post('server-metrics', this.metrics)
      if (!this.#isConnected) {
        this.#isConnected = true
        console.log("Connected to aggregator")
      }

      if (res.status !== 200) {
        console.log(res)
        console.log("Failed to send metrics res code != 200", `Got: ${res.status}`)
        process.exit(2)
      }
    } catch (e) {

      if (e.code === "ECONNREFUSED") {
        if (this.#isConnected) {
          console.log("Failed to connect to aggregator")
          this.#isConnected = false
        }
        return
      }
      // throw e
    } finally {
      setTimeout(this.sendMetrics.bind(this), 1000)
    }
  }
}
