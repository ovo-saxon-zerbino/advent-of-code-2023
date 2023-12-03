import * as path from 'path'
import { readFileSync } from 'fs'
import { day1Part1, day1Part2 } from "./day1"
import { day2Part1, day2Part2 } from "./day2"
import { day3Part1, day3Part2 } from "./day3"

// Day 1
const day1DataFile = path.join(__dirname, "../static/day-1-input.txt")
const day1Data = readFileSync(day1DataFile, 'utf8')

console.log(`Day 1, part 1 answer: ${day1Part1(day1Data)}`)
console.log(`Day 1, part 2 answer: ${day1Part2(day1Data)}`)

// Day 2
const day2DataFile = path.join(__dirname, "../static/day-2-input.txt")
const day2Data = readFileSync(day2DataFile, 'utf8')

console.log(`Day 2, part 1 answer: ${day2Part1(day2Data)}`)
console.log(`Day 2, part 2 answer: ${day2Part2(day2Data)}`)

// Day 3
const day3DataFile = path.join(__dirname, "../static/day-3-input.txt")
const day3Data = readFileSync(day3DataFile, 'utf8')

console.log(`Day 3, part 1 answer: ${day3Part1(day3Data)}`)
console.log(`Day 3, part 2 answer: ${day3Part2(day3Data)}`)
