async function getMetrics() {
  const res = await fetch(`/get-metrics`)
  if (res.status !== 200) { console.log("Failed to get metrics") }
  const body = await res.json()
  console.log(body)
  body.servers.forEach((server) => {
    if (!document.getElementById(`server-table-${server.host}`)) {
      const serverTable = document.getElementById("server-table")
      serverTable.innerHTML += `
        <tr id="server-table-${server.host}">
        </tr>
      `
    }
    const serverTableRow = document.getElementById(`server-table-${server.host}`)
    serverTableRow.innerHTML = `
      <td>${server.host}</td>
      <td>${server.con}</td>
      <td>${server.msg.received}</td>
      <td>${server.msg.sent}</td>
      <td>${server.bytes.received}</td>
      <td>${server.bytes.sent}</td>
      <td>${server.resourceUsage.cpu}</td>
      <td>${(server.resourceUsage.memory/1024/1024).toFixed(2)}</td>
    `

  })
  setTimeout(getMetrics, 1000)
}
getMetrics()
