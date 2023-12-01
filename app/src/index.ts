import * as path from 'path'
import { readFileSync } from 'fs'
import { day1Part1, day1Part2 } from "./day1"

// Day 1

const day1DataFile = path.join(__dirname, "../static/day-1-input.txt")
const day1Data = readFileSync(day1DataFile, 'utf8');

console.log(`Day 1, part 1 answer: ${day1Part1(day1Data)}`)
console.log(`Day 1, part 2 answer: ${day1Part2(day1Data)}`)
