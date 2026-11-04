# Drop the Entire Database

EF Core can easily drop a database. If the database is a sqlite db it will delete the file:

```bash
  dotnet ef database drop
```

## Restore DB and use Seed class to initialize with data

```bash
  dotnet watch
```

The dotnet watch, compiles the app, and runs the app in a hot reload mode, when it runs, the Program.cs will now run the migrations to get the schema up to date and then the Seed class method to add the data.
