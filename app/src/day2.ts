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
// for each game identify whether or not game is possible 
// break file down into games
// break game into ID + num of hands
// for each hand determine if possible
// (game is impossible if in single hand num red cubes exceeds 12, num green cubes exceeds 13, num blue cubes exceeds 14)
// return sum total of all possible games
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

const extractColour = (colours: string[], colour: string): number => {
    const colourString = colours.filter(string => string.includes(colour))[0] || "0"
    return +colourString.match(/\d+/)![0]
}

const isPossible = (game: Game): boolean => game.hands.every(hand => {
    return hand.red <= 12 && hand.green <= 13 && hand.blue <= 14
})