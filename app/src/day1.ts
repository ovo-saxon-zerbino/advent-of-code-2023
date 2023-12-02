import { pipe, parseTextFileIntoRows } from "./utils"

export const day1Part1 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]): number[] => lines.map(generateCalibrationValueFromDigits),
    (calibrationValues: number[]): number => calibrationValues.reduce((sum, current) => sum + current, 0)
)

export const day1Part2 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]): string[] => lines.map(replaceNumbersWithDigits),
    (lines: string[]): number[] => lines.map(generateCalibrationValueFromDigits),
    (calibrationValues: number[]): number => calibrationValues.reduce((sum, current) => sum + current, 0)
)

export const generateCalibrationValueFromDigits = (line: string): number => {
    const numericChars = line.replace(/\D+/g, "")
    if (numericChars.length == 0) {
        console.log(line)
        console.error("invalid value: no numeric characters")
    }
    const calibrationValue = `${numericChars[0]}${numericChars[numericChars.length-1]}`
    return +calibrationValue
}

export const replaceNumbersWithDigits = (line: string): string => 
    line
        .split(/(?=(one|two|three|four|five|six|seven|eight|nine))/)
        .map((string: string) => {
            string = string.replace("one", "1")
            string = string.replace("two", "2")
            string = string.replace("three", "3")
            string = string.replace("four", "4")
            string = string.replace("five", "5")
            string = string.replace("six", "6")
            string = string.replace("seven", "7")
            string = string.replace("eight", "8")
            string = string.replace("nine", "9")
            return string
        })
        .reduce((acc, value) => acc.concat(value), "")