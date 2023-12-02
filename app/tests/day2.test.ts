import { day2Part1, parseRowIntoGame, Game } from "../src/day2"

test("Correctly serialises text row into Game object", () => {
    // Arrange
    const testData = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"

    const expected: Game = {
        id: 1,
        hands: [
            {
                red: 4,
                green: 0,
                blue: 3                
            },
            {
                red: 1,
                green: 2,
                blue: 6                
            },
            {
                red: 0,
                green: 2,
                blue: 0                
            },
        ]
    }
    
    // Act
    const res = parseRowIntoGame(testData)

    // Assert
    expect(res.id).toBe(expected.id)
    expect(res.hands.length).toBe(expected.hands.length)
    expect(res.hands[0].toString()).toBe(expected.hands[0].toString())
    expect(res.hands[1].toString()).toBe(expected.hands[1].toString())
    expect(res.hands[2].toString()).toBe(expected.hands[2].toString())
})

test("Day 2 part 1 generates correct value for known data set", () => {
    const testData = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`
    expect(day2Part1(testData)).toBe(8)
})
