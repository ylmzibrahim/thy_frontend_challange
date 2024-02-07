export type Location = {
  code: string;
  name: string;
};

export type Airport = {
  name: string;
  code: string;
  city: Location;
  country: Location;
};

export type Price = {
  amount: number;
  currency: Currency;
};

export type Subcategory = {
  brandCode: BrandCode;
  price: Price;
  order: number;
  status: Status;
  rights: string[];
};

export enum Currency {
  TRY = "TRY",
}

export enum FareCategories {
  BUSINESS = "BUSINESS",
  ECONOMY = "ECONOMY",
}

export enum BrandCode {
  ECO_FLY = "ecoFly",
  EXTRA_FLY = "extraFly",
  PRIME_FLY = "primeFly",
}

export enum Status {
  AVAILABLE = "AVAILABLE",
  ERROR = "ERROR",
}

export type Flight = {
  originAirport: Airport;
  destinationAirport: Airport;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: {
    [FareCategories.BUSINESS]: {
      subcategories: Subcategory[];
    };
    [FareCategories.ECONOMY]: {
      subcategories: Subcategory[];
    };
  };
};

export type FlightQuery = {
  departure: string;
  arrival: string;
  passengerCount: number;
  fareCategory: FareCategories;
};
