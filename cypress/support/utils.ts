import { Booking } from './types';

import { faker } from '@faker-js/faker';
import { Booking } from './types';

export function generateBookingData(overrides: Partial<Booking> = {}): Booking {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 50, max: 500 }),
        depositpaid: faker.datatype.boolean(),
        bookingdates: {
            checkin: faker.date.future().toISOString().split('T')[0],
            checkout: faker.date.future({ years: 1 }).toISOString().split('T')[0]
        },
        additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'None']),
        ...overrides
    };
}
