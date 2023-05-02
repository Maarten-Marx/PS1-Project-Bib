# API

## Documentation

> **Note:** All dates are formatted as `YYYY-MM-DD`.

### `POST /reservations/new`

Adds a new reservation.

#### Request Payload

```
{
  reservationIDs: [int],
  firstName: string,
  lastName: string,
  email: string
}
```

#### Response

`200: OK` when successful, `304: Not Modified` if a new reservation could not be added. 

### `DELETE /reservations/{hash}`

Cancels the reservation corresponding to the provided `hash`.

#### Response

`200: OK` when successful, `304: Not Modified` when there is no reservation corresponding to the provided `hash`.

### `GET /week/{day}`

Gets basic info about each day of the week that `day` is a part of.

#### Response

```
{
  days: [
    {
      day: string,
      weekdayIndex: int,
      openingTime: string?,
      closingTime: string?
    }
  ]
}
```

> **Note:** Time values are formatted as `hh:mm`.

### `GET /timeslots/{day}`

Gets all timeslots for a given `day`.

#### Response

```
{
  day: string,
  timeslots: [
    {
      id: int,
      openingTime: string,
      closingTime: string,
      numberOfSeats: int
    }
  ]
}
```

> **Note:** Time values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamps containing a date and time.
