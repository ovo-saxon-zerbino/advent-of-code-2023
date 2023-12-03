import { generateCalibrationValueFromDigits, replaceNumbersWithDigitsAndStripExcess, day1Part1, day1Part2 } from "../src/day1"

test("generates correct calibration using only digits", () => {
    // Arrange
    const testData = [
        "1abc2",
        "jhg1fghfgh8",
        "8abc5yui6",
        "6asd67as9a",
        "te5asd",
    ]

    // Act
    const res = testData.map(generateCalibrationValueFromDigits)

    // Assert
    expect(res[0]).toBe(12);
    expect(res[1]).toBe(18);
    expect(res[2]).toBe(86);
    expect(res[3]).toBe(69);
    expect(res[4]).toBe(55);
});

test("replaces numbers in text with correct digit", () => {
    // Arrange
    const testData = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "1nine",
        "1nine2",
        "one2",
        "oneight",
        "sevenine",
    ]

    // Act
    const res = testData.map(replaceNumbersWithDigitsAndStripExcess)

    // Assert
    expect(res[0]).toBe("zero");
    expect(res[1]).toBe("1");
    expect(res[2]).toBe("2");
    expect(res[3]).toBe("3");
    expect(res[4]).toBe("4");
    expect(res[5]).toBe("5");
    expect(res[6]).toBe("6");
    expect(res[7]).toBe("7");
    expect(res[8]).toBe("8");
    expect(res[9]).toBe("9");
    expect(res[10]).toBe("19");
});

test("Day 1 part 1 generates correct value for known data set", () => {
    const testData = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`
    expect(day1Part1(testData)).toBe(142)
})

test("Day 1 part 2 generates correct value for known data set", () => {
    const testData = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`
    expect(day1Part2(testData)).toBe(281)
})
