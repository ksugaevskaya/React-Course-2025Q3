const OWID_CO2_JSON =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

type YearDatum = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
};

type Entity = {
  iso_code: string;
  country?: string;
  name?: string;
  data: YearDatum[];
};

type DataMap = Record<string, Entity>;

export type Row = {
  name: string;
  iso: string;
  year: number;
  population?: number;
  co2?: number;
  co2PerCapita?: number;
  methane?: number;
  oilCO2?: number;
  temperatureChangeFromCO2?: number;
};

export async function getCO2RowsLatest(): Promise<Row[]> {
  const res = await fetch(OWID_CO2_JSON);
  const json = (await res.json()) as DataMap;

  const rows: Row[] = [];
  for (const key in json) {
    const ent = json[key];

    if (!ent?.iso_code) continue;

    const last = ent.data?.[ent.data.length - 1];
    if (!last) continue;

    rows.push({
      name: ent.country ?? ent.name ?? key,
      iso: ent.iso_code,
      year: last.year,
      population: last.population,
      co2: last.co2,
      co2PerCapita: last.co2_per_capita,
      methane: last.methane,
      oilCO2: last.oil_co2,
      temperatureChangeFromCO2: last.temperature_change_from_co2,
    });
  }

  rows.sort((a, b) => a.name.localeCompare(b.name));
  return rows;
}
