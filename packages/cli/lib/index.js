import { program } from "commander";
import createInitCommand from "@roninz/init";
import './exception.js'


export default function (args) {
  createInitCommand(program)
  program.parse(process.argv)
}