import { day4Part1, day4Part2, parseRowIntoScratchCard, ScratchCard } from "../src/day4"

test("Correctly serialises text row into ScratchCard object", () => {
    // Arrange
    const testData = "Card 1: 41 48 83 | 83 86  6 31 17"

    const expected: ScratchCard = {
        winning: [41, 48, 83,],
        actual: [83, 86, 6, 31, 17,],
    }
    
    // Act
    const res = parseRowIntoScratchCard(testData)

    // Assert
    expect(res.winning.length).toBe(expected.winning.length)
    expect(res.winning[0]).toBe(expected.winning[0])
    expect(res.winning[1]).toBe(expected.winning[1])
    expect(res.winning[2]).toBe(expected.winning[2])

    expect(res.actual.length).toBe(expected.actual.length)
    expect(res.actual[0]).toBe(expected.actual[0])
    expect(res.actual[1]).toBe(expected.actual[1])
    expect(res.actual[2]).toBe(expected.actual[2])
    expect(res.actual[3]).toBe(expected.actual[3])
    expect(res.actual[4]).toBe(expected.actual[4])
})

test("Day 4 part 1 generates correct value for known data set", () => {
    const testData = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`
    expect(day4Part1(testData)).toBe(13)
})

test("Day 4 part 2 generates correct value for known data set", () => {
    const testData = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`
    expect(day4Part2(testData)).toBe(30)
})
