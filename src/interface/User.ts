type Geolocation = {
  lat: string;
  long: string;
};

type Address = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
};

type Name = {
  firstname: string;
  lastname: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
};
