# mesh-debug

This repo includes reproduction examples of a few mesh bugs

## Setup

```sh
nvm use
```

## Examples

### /working-mesh-helix

This is a working example to start from

```sh
cd working-mesh-helix && yarn && yarn test
```

#### What happens?

Tests pass :tada:

---

### /same-response-issue

When 2 status codes have the same response type, e.g. 200 & 400, the 400 wont be handled nicely

```sh
cd same-response-issue && yarn && yarn test
```

#### What happens?

Get `"HTTP Error: 400, Could not invoke operation GET /pet/{args.petId}"` instead of it returning the data as unioned response

---

### /missing-naming-convention

When You have 2 sources, but only 1 has naming convention transform, it errors when building mesh

```sh
cd missing-naming-convention && yarn && yarn test
```

#### What happens?

Get error `Error: Unable to merge GraphQL directive "httpOperation"`

---

### /bare-enum-sending

When using bare namingConvention transform, enums arnt converted to their original casing before being sent to upstream

```sh
cd bare-enum-sending && yarn && yarn test
```

#### What happens?

Upstream server gets enum value `FLUFFYBOI` instead of `FluffyBoi` which it wants

---

### /naming-convention-originalName

When using bare namingConvention transform, get error "Cannot read properties of undefined (reading 'originalName')"

```sh
cd naming-convention-originalName && yarn && yarn test
```

#### What happens?

Get error `"Cannot read properties of undefined (reading 'originalName')"`

---

### /datetime-timezone

Dates are converted to UTC

Issue: https://github.com/Urigo/graphql-mesh/issues/5229

```sh
cd datetime-timezone && yarn && yarn test
```

#### What happens?

Get `2016-02-01T11:00:00.000Z` instead of `2016-02-01T00:00:00-11:00`
