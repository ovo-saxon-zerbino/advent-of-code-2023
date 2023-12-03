import { pipe, parseTextFileIntoRows } from "./utils"

export type Game = {
    id: number
    hands: Hand[]
}

type Hand = {
    red: number
    green: number
    blue: number
}

export const day2Part1 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]): Game[] => lines.map(parseRowIntoGame),
    (games: Game[]) => games.filter(isPossible),
    (games: Game[]) => games.reduce((sum, current) => sum + current.id, 0)
)

export const day2Part2 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]) => lines.map(parseRowIntoGame),
    (games: Game[]) => games.map(calculateMinimumCubes),
    (cubes: Hand[]) => cubes.map(calculatePower),
    (powers: number[]) => powers.reduce((sum, current) => sum + current, 0)
)

export const parseRowIntoGame = (row: string): Game => {
    const parts = row.split(":")
    const id = parts[0].match(/\d+/)
    const handStrings = parts[1].split(";")

    const hands: Hand[] = handStrings.map(handString => {
        return {
            red: extractColour(handString.split(","), "red"),
            green: extractColour(handString.split(","), "green"),
            blue: extractColour(handString.split(","), "blue"),
        }
    });

    return {
        id: +id![0],
        hands: hands
    }
}

const calculateMinimumCubes = (game: Game): Hand => {
    const empty: Hand = {
        red: 0,
        green: 0,
        blue: 0
    }
    return game.hands.reduce((total, current) => {
        return {
            red: Math.max(total.red, current.red),
            green: Math.max(total.green, current.green),
            blue: Math.max(total.blue, current.blue)
        }
    }, empty)
}

const calculatePower = (cubes: Hand): number => cubes.red * cubes.green * cubes.blue

const extractColour = (colours: string[], colour: string): number => {
    const colourString = colours.filter(string => string.includes(colour))[0] || "0"
    return +colourString.match(/\d+/)![0]
}

const isPossible = (game: Game): boolean => game.hands.every(hand => hand.red <= 12 && hand.green <= 13 && hand.blue <= 14)