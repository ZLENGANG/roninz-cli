import { program } from "commander";
import createInitCommand from "@roninz/init";

export default function (args) {
  createInitCommand(program)
  program.parse(process.argv)
}