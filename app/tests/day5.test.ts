import { day5Part1, day5Part2, buildAlmanac, Almanac } from "../src/day5"

test("Correctly serialises text row into ScratchCard object", () => {
    // Arrange
    const testData = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

    const expected: Almanac = {
        seeds: [79, 14, 55, 13,],
        toSoil: {
            ranges: [
                {
                    sourceMinVal: 98,
                    sourceMaxVal: 99,
                    destMinVal: 50,
                    destMaxVal: 51
                },
                {
                    sourceMinVal: 50,
                    sourceMaxVal: 97,
                    destMinVal: 52,
                    destMaxVal: 99
                },
            ]
        },
        toFertilizer: {
            ranges: [
                {
                    sourceMinVal: 15,
                    sourceMaxVal: 51,
                    destMinVal: 0,
                    destMaxVal: 36
                },
                {
                    sourceMinVal: 52,
                    sourceMaxVal: 53,
                    destMinVal: 37,
                    destMaxVal: 38
                },
                {
                    sourceMinVal: 0,
                    sourceMaxVal: 14,
                    destMinVal: 39,
                    destMaxVal: 53
                },
            ]
        },
        toWater: {
            ranges: 
            [                
                {
                    sourceMinVal: 53,
                    sourceMaxVal: 60,
                    destMinVal: 49,
                    destMaxVal: 56
                },
                {
                    sourceMinVal: 11,
                    sourceMaxVal: 52,
                    destMinVal: 0,
                    destMaxVal: 41
                },
                {
                    sourceMinVal: 0,
                    sourceMaxVal: 6,
                    destMinVal: 42,
                    destMaxVal: 48
                },
                {
                    sourceMinVal: 7,
                    sourceMaxVal: 10,
                    destMinVal: 57,
                    destMaxVal: 60
                },
            ]
        },
        toLight: {
            ranges: [
                {
                    sourceMinVal: 18,
                    sourceMaxVal: 24,
                    destMinVal: 88,
                    destMaxVal: 94
                },
                {
                    sourceMinVal: 25,
                    sourceMaxVal: 94,
                    destMinVal: 18,
                    destMaxVal: 87
                },
            ]
        },
        toTemperature: {
            ranges: [
                {
                    sourceMinVal: 77,
                    sourceMaxVal: 99,
                    destMinVal: 45,
                    destMaxVal: 67
                },
                {
                    sourceMinVal: 45,
                    sourceMaxVal: 63,
                    destMinVal: 81,
                    destMaxVal: 99
                },
                {
                    sourceMinVal: 64,
                    sourceMaxVal: 76,
                    destMinVal: 68,
                    destMaxVal: 80
                },
            ]
        },
        toHumidity: {
            ranges: [
                {
                    sourceMinVal: 69,
                    sourceMaxVal: 69,
                    destMinVal: 0,
                    destMaxVal: 0
                },
                {
                    sourceMinVal: 0,
                    sourceMaxVal: 68,
                    destMinVal: 1,
                    destMaxVal: 69
                },
            ]
        },
        toLocation: {
            ranges: [
                {
                    sourceMinVal: 56,
                    sourceMaxVal: 92,
                    destMinVal: 60,
                    destMaxVal: 96
                },
                {
                    sourceMinVal: 93,
                    sourceMaxVal: 96,
                    destMinVal: 56,
                    destMaxVal: 59
                },
            ]
        }
    }
    
    // Act
    const res = buildAlmanac(testData)

    console.log(res)

    // Assert
    expect(res.seeds.toString()).toBe(expected.seeds.toString())
    expect(JSON.stringify(res.toSoil)).toBe(JSON.stringify(expected.toSoil))
    expect(JSON.stringify(res.toFertilizer)).toBe(JSON.stringify(expected.toFertilizer))
    expect(JSON.stringify(res.toWater)).toBe(JSON.stringify(expected.toWater))
    expect(JSON.stringify(res.toLight)).toBe(JSON.stringify(expected.toLight))
    expect(JSON.stringify(res.toTemperature)).toBe(JSON.stringify(expected.toTemperature))
    expect(JSON.stringify(res.toHumidity)).toBe(JSON.stringify(expected.toHumidity))
    expect(JSON.stringify(res.toLocation)).toBe(JSON.stringify(expected.toLocation))
})

test("Day 5 part 1 generates correct value for known data set", () => {
    const testData = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`
    expect(day5Part1(testData)).toBe(35)
})
