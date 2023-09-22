import log from "npmlog";
import isDebugger from "./isDebugger.js";
log.level = isDebugger() ? 'verbose' : 'info'

log.heading = 'roninz-cli'
log.addLevel('success', 2000, { fg: 'green', bold: true })

export default log
