import { pipe, parseTextFileIntoRows } from "./utils"

export type Part = {
    value: number
    xs: number[]
    y: number
}

type Gear = {
    part1: number
    part2: number
}

type Coordinate = {
    x: number
    y: number
}

export const day3Part1 = (file: string): number => {
    const schematic = buildSchematic(file)

    return pipe(
        buildPartsMatrix(schematic),
        (parts: Part[]) => parts.filter(isValid(schematic)),
        (parts: Part[]) => parts.reduce((sum, current) => sum + current.value, 0)
    )
}

export const day3Part2 = (file: string): number => {
    const schematic = buildSchematic(file)

    return pipe(
        buildPartsMatrix(schematic),
        findGears(schematic),
        (gears) => gears.map(calculateGearRatio),
        (gearRatios: number[]) => gearRatios.reduce((sum, current) => sum + current, 0)
    )
}

const buildSchematic = (file: string) => pipe(
    parseTextFileIntoRows(file),
    (rows: string[]) => rows.filter(row => !!row),
    (rows: string[]) => rows.map(parseTextRowIntoCharArray)
)

const parseTextRowIntoCharArray = (row: string): string[] => row.split("")

export const buildPartsMatrix = (schematic: string[][]): Part[] => {
    let parts: Part[] = []
    schematic.forEach((row, y) => {parts.push(...getPartsInRow(row, y))});
    return parts
}

const getPartsInRow = (row: string[], y: number): Part[] => {
    let parts: Part[] = []
    let xs = []
    let value = 0

    for (let x = 0; x < row.length; x++) {
        const char = row[x]

        if (isNumeric(char)) {
            xs.push(x)
            value = value * 10 + +char

            if (x === row.length-1) {
                parts.push({
                    value,
                    xs,
                    y
                })
            }
        } else {
            if (value) {
                parts.push({
                    value,
                    xs,
                    y
                })
            }
            xs = []
            value = 0
        }
    }

    return parts
}

const isValid = (schematic: string[][]) => (part: Part): boolean => {
    // It is assumed that top left of matrix is (0,0)
    // Assumes that all rows are same length
    const xs = [part.xs[0] - 1, ...part.xs, part.xs[part.xs.length - 1] + 1].filter(x => x > 0 && x < schematic[0].length)
    const ys = [part.y - 1, part.y, part.y + 1].filter(x => x > 0 && x < schematic.length)

    let isValid = false
    xs.forEach(x => {
        ys.forEach(y => {
            isValid = isValid || schematic[y][x] !== "." && !isNumeric(schematic[y][x])
            if (isValid) return
        })
        if (isValid) return
    })
    return isValid
}

const isNumeric = (value: string) => !isNaN(parseFloat(value)) && isFinite(+value);

const findGears = (schematic: string[][]) => (parts: Part[]): Gear[] => {
    let potentialGearLocations: Coordinate[] = []
    for (let y = 0; y < schematic.length; y++) {
        for (let x = 0; x < schematic[y].length; x++) {
            if (schematic[y][x] === "*") potentialGearLocations.push({ x, y })
        }
    }

    let gears: Gear[] = []
    potentialGearLocations.forEach(gear => {
        let partsAdjacentToGear: number[] = parts
            .filter(part => {
                return [part.y - 1, part.y, part.y + 1].includes(gear.y) 
                    && [part.xs[0] - 1, ...part.xs, part.xs[part.xs.length - 1] + 1].includes(gear.x)
            })
            .map(part => part.value)
        if (partsAdjacentToGear.length === 2) {
            gears.push({
                part1: partsAdjacentToGear[0],
                part2: partsAdjacentToGear[1],
            })
        }
    })
    return gears
}

const calculateGearRatio = (gear: Gear): number => gear.part1 * gear.part2
