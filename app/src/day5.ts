import { pipe, parseTextFileIntoRows } from "./utils"

export type Almanac = {
    seeds: number[] // name is misleading as this is tracking state of mapping
    toSoil: AlmanacMapping
    toFertilizer: AlmanacMapping
    toWater: AlmanacMapping
    toLight: AlmanacMapping
    toTemperature: AlmanacMapping
    toHumidity: AlmanacMapping
    toLocation: AlmanacMapping
}

type AlmanacMapping = {
    ranges: AlmanacRange[]
}

type AlmanacRange = {
    sourceMinVal: number
    sourceMaxVal: number
    destMinVal: number
    destMaxVal: number
}

export const day5Part1 = (file: string): number => pipe(
    // TODO - 
    // convert input into: 
    //      a list of seeds to plant
    //      a collection of maps from source number to destination number
    // each row in map is made up of destination range start, source range start, range length
    // e.g. 
    // 50 98 2
    // 52 50 48
    // means inputs 98, 99 map to outputs 50, 51, & inputs 50 to 97 map to outputs 52 to 99
    // any source that isn't explicitly mapped maps 1:1 with its output, e.g. in the above input 47 maps to output 47

    // aim: find the lowest location number that corresponds to any of the initial seeds
    // (map seed -> soil -> fertilizer -> water -> light -> temperature -> humidity -> location)

    // Build Almanac 
    buildAlmanac(file),
    mapToSoil,
    mapToFertilizer,
    mapToWater,
    mapToLight,
    mapToTemperature,
    mapToHumidity,
    mapToLocation,
    // return smallest location value in list
    (almanac: Almanac) => Math.min(...almanac.seeds)
)

export const day5Part2 = (file: string): number => pipe(
    parseTextFileIntoRows(file),
    (rows) => 0
)

export const buildAlmanac = (file: string): Almanac => {
    const fileRows = parseTextFileIntoRows(file)
    
    let seeds: number[] = fileRows[0].split(":")[1].split(/\D/).filter(x => !!x).map(x => +x)

    // console.log(seeds)

    let toSoilMapStart = -1
    let toFertilizerMapStart = -1
    let toWaterMapStart = -1
    let toLightMapStart = -1
    let toTemperatureMapStart = -1
    let toHumidityMapStart = -1
    let toLocationMapStart = -1

    for (let i = 1; i < fileRows.length; i++) {
        if (fileRows[i].includes("seed-to-soil")) toSoilMapStart = i + 1
        else if (fileRows[i].includes("soil-to-fertilizer")) toFertilizerMapStart = i + 1
        else if (fileRows[i].includes("fertilizer-to-water")) toWaterMapStart = i + 1
        else if (fileRows[i].includes("water-to-light")) toLightMapStart = i + 1
        else if (fileRows[i].includes("light-to-temperature")) toTemperatureMapStart = i + 1
        else if (fileRows[i].includes("temperature-to-humidity")) toHumidityMapStart = i + 1
        else if (fileRows[i].includes("humidity-to-location")) toLocationMapStart = i + 1
    }

    const toSoilMapRows = fileRows.slice(toSoilMapStart, toFertilizerMapStart - 1)
    const toFertilizerMapRows = fileRows.slice(toFertilizerMapStart, toWaterMapStart - 1)
    const toWaterMapRows = fileRows.slice(toWaterMapStart, toLightMapStart - 1)
    const toLightMapRows = fileRows.slice(toLightMapStart, toTemperatureMapStart - 1)
    const toTemperatureMapRows = fileRows.slice(toTemperatureMapStart, toHumidityMapStart - 1)
    const toHumidityMapRows = fileRows.slice(toHumidityMapStart, toLocationMapStart - 1)
    const toLocationMapRows = fileRows.slice(toLocationMapStart)

    return {
        seeds: seeds,
        toSoil: buildMapping(toSoilMapRows),
        toFertilizer: buildMapping(toFertilizerMapRows),
        toWater: buildMapping(toWaterMapRows),
        toLight: buildMapping(toLightMapRows),
        toTemperature: buildMapping(toTemperatureMapRows),
        toHumidity: buildMapping(toHumidityMapRows),
        toLocation: buildMapping(toLocationMapRows)
    }
}

const buildMapping = (mappingRows: string[]): AlmanacMapping => {
    let ranges: AlmanacRange[] = []

    mappingRows.map(row => {
        const parts = row.split(/\D/).filter(x => !!x).map(x => +x)
        ranges.push({
            sourceMinVal: parts[1],
            sourceMaxVal: parts[1] + parts[2] - 1,
            destMinVal: parts[0],
            destMaxVal: parts[0] + parts[2] - 1
        })
    })

    return {
        ranges: ranges
    }
}

const mapToSoil = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toSoil))
    return almanac
}

const mapToFertilizer = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toFertilizer))
    return almanac
}

const mapToWater = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toWater))
    return almanac
}

const mapToLight = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toLight))
    return almanac
}

const mapToTemperature = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toTemperature))
    return almanac
}

const mapToHumidity = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toHumidity))
    return almanac
}

const mapToLocation = (almanac: Almanac): Almanac => {
    almanac.seeds = almanac.seeds.map(seed => applyMapping(seed, almanac.toLocation))
    return almanac
}

const applyMapping = (source: number, map: AlmanacMapping): number => {
    const rangeContainingSource = map.ranges.find(range => (source >= range.sourceMinVal && source <= range.sourceMaxVal))

    if (rangeContainingSource) {
        const offset = source - rangeContainingSource.sourceMinVal
        return rangeContainingSource.destMinVal + offset
    } else {
        return source
    }
}
