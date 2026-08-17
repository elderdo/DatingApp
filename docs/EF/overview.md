# Entity Framework

## Commands

- Show Entity Frame work tools

```bash
dotnet ef
```

- Get help

```bash
dotnet ef --help
```

- Explain the migrations command

  ```bash
  dotnet ef migrations -h
  ```

- Create a EF Migration called InitialCreate in directory Data/Migrations \*\* recommend shutting down the server if it is running.

```bash
dotnet ef migrations add InitialCreate -o Data/Migrations
```

- Output of interest will be the yyyymmddhhmmss_InitialCreate.cs file
- Up methods are used to update the database
- Down methods are used to rollback or remove the migration from the database
- Update the database using the current migration

  ```bash
  dotnet ef database update
  ```
