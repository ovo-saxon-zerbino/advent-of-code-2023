import { pipe, parseTextFileIntoRows } from "./utils"

export type ScratchCard = {
    winning: number[]
    actual: number[]
}

type CardWin = {
    wins: number
    quantity: number
}

export const day4Part1 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]) => lines.map(parseRowIntoScratchCard),
    (cards: ScratchCard[]) => cards.map(scoreCard),
    (scores: number[]) => scores.reduce((sum, current) => sum + current, 0)
)

export const day4Part2 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (lines: string[]) => lines.map(parseRowIntoScratchCard),
    (cards: ScratchCard[]) => cards.map((card, index) => { return {
        id: index + 1,
        wins: countWins(card),
        quantity: 1
    }}),
    countCopiesOfCards,
    (cardWins: CardWin[]) => cardWins.reduce((sum, current) => sum + current.quantity, 0)
)

const countCopiesOfCards = (cardWins: CardWin[]): CardWin[] => {
    cardWins.forEach((card, index) => {
        let nextCardIndices: number[] = card.wins == 0 
            ? []
            : range(index + 1, index + card.wins, 1)
        
        nextCardIndices = nextCardIndices.filter(x => x < cardWins.length)
        
        nextCardIndices.forEach(index => {
            cardWins[index].quantity += card.quantity
        })
    })
    return cardWins
}

const range = (start: number, stop: number, step: number): number[] => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

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

const scoreCard = (card: ScratchCard): number => countWins(card) === 0 
    ? 0 
    : Math.pow(2, countWins(card) - 1)

const countWins = (card: ScratchCard): number => card.actual.filter(x => card.winning.includes(x)).length
