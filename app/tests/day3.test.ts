import { day3Part1, Part, buildPartsMatrix } from "../src/day3"

test("Serialises char matrix to PartsMatrix correctly", () => {
    // Arrange
    const testData = [
        ["1", ".", "2", "3",],
        [".", "5", "6", "*",],
        [".", "#", ".", ".",],
        ["9", "7", "7", "8",],
    ]
    const expected: Part[] = [
        {
            value: 1,
            xs: [0,],
            y: 0
        },
        {
            value: 23,
            xs: [2, 3,],
            y: 0
        },
        {
            value: 56,
            xs: [1, 2,],
            y: 1
        },
        {
            value: 9778,
            xs: [0, 1, 2, 3,],
            y: 3
        },
    ]

    // Act
    const res = buildPartsMatrix(testData)

    // Assert
    expect(res.length).toBe(expected.length)
    expect(res[0].toString()).toBe(expected[0].toString())
    expect(res[1].toString()).toBe(expected[1].toString())
    expect(res[2].toString()).toBe(expected[2].toString())
    expect(res[3].toString()).toBe(expected[3].toString())
})

test("Day 3 part 1 generates correct value for known data set", () => {
    const testData = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`
    expect(day3Part1(testData)).toBe(4361)
})
