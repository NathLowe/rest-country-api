export interface DataType  {
    name: {
        common: string,
        official: string,
        nativeName:object
    },
    tld: string[],
    independent: boolean,
    status: string,
    unMember: boolean,
    currencies: object,
    capital:string[],
    altSpellings:string[],
    region: string,
    subregion: string,
    languages: object,
    borders: string[],
    population: number,
    continents: string[],
    flags: {
        png: string,
        svg: string
    },
    cca3:string
}

export interface CountryType {
    data:DataType,
    index?:number
}

export interface HomeProps {
  data:DataType[]
}

export interface SearchProps{
    data:DataType[]
}