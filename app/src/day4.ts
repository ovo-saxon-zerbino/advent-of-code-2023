import { pipe, parseTextFileIntoRows } from "./utils"

export type ScratchCard = {
    winning: number[]
    actual: number[]
}

export const day4Part1 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]) => lines.map(parseRowIntoScratchCard),
    (cards: ScratchCard[]) => cards.map(scoreCard),
    (scores: number[]) => scores.reduce((sum, current) => sum + current, 0)
)

export const parseRowIntoScratchCard = (row: string): ScratchCard => {
    const numbers = row.split(":")[1].split("|")
    const winning = numbers[0]
    const actual = numbers[1]

    return {
        winning: extractNumbers(winning),
        actual: extractNumbers(actual)
    }
}

const extractNumbers = (numberString: string) => numberString.split(/\D/).filter(x => !!x).map(x => +x)

const scoreCard = (card: ScratchCard): number => {
    const winningCount = card.actual.filter(x => card.winning.includes(x)).length

    return winningCount === 0 
        ? 0 
        : Math.pow(2, winningCount - 1)
}
