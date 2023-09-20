export default function () {
  return process.argv.includes('--debugger') || process.argv.includes('-d')
}