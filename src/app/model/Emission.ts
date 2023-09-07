

export interface Emission {
    id: number,
    name: string,
    timeSeries: EmissionTimeSeriesValue[],
}

export interface EmissionTimeSeriesValue {
    report_from_utc: Date,
    report_to_utc: Date,
    co2_emissions: number,
    sox_emissions: number,
    nox_emissions: number,
    pm_emissions: number,
    ch4_emissions: number,

}