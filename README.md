# task_cv30_server

## Running

```bash
docker-compose up
```

## Example Graphql

```json
mutation {
  register(
    firstName: "first"
    lastName: "last"
    email: "test@gmail.com"
    password: "a"
  ) {
    firstName,
    lastName,
    email,
  }
}
mutation {
  login(
    email: "test@gmail.com"
    password: "a"
  )
}
```
