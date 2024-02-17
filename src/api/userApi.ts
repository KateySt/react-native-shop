import { HOST } from '@/constant/api';
import { User } from '@/interface/User';

export async function fetchLogin(username: string, password: string): Promise<{ token: string }> {
  return await fetch(HOST + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
}

export async function fetchUsers(): Promise<User[]> {
  return await fetch(HOST + '/users').then((res) => res.json());
}

export async function fetchUser(id: number | string): Promise<User> {
  return await fetch(HOST + '/users/' + id).then((res) => res.json());
}

export async function fetchCreatUser(user: { username: string; password: string; email: string }): Promise<User> {
  return await fetch(HOST + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      password: user.password,
    }),
  }).then((res) => res.json());
}

export async function fetchUpdateUser(id: string | number, user: User): Promise<User> {
  return await fetch(HOST + '/users/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      password: user.password,
      name: {
        firstname: user.name.firstname,
        lastname: user.name.lastname,
      },
      address: {
        city: user.address.city,
        street: user.address.street,
        number: user.address.number,
        zipcode: user.address.zipcode,
        geolocation: {
          lat: user.address.geolocation.lat,
          long: user.address.geolocation.long,
        },
      },
      phone: user.phone,
    }),
  }).then((res) => res.json());
}

export async function fetchDeleteUser(id: string): Promise<User> {
  return await fetch(HOST + '/users/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
