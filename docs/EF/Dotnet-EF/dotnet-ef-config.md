# VS Code & .NET Development Session

## 1. C# Class Template with File-Scoped Namespaces (.NET 10)
To configure Visual Studio Code to generate braces-free (file-scoped) namespaces, apply these formatting updates.

### VS Code `settings.json`
Append the following key-value pairs to your global user settings:
```json
{
    "csharp.experimental.fileScopedNamespaces": true,
    "csharpextensions.useFileScopedNamespace": true
}
```

### `.editorconfig` (Recommended)
Add this rule to the `.editorconfig` file in your root project folder to enforce file-scoped layouts:
```ini
[*.cs]
csharp_style_namespace_declarations = file_scoped:suggestion
```

### Native CLI Template Generation
Generate classes directly through the integrated terminal using:
```bash
dotnet new class -n MyNewClass
```

### Custom User Snippet
Go to **File > Preferences > Configure User Snippets**, select **csharp**, and paste this layout to map a shortcut:
```json
"File-Scoped Class": {
    "prefix": "fclass",
    "body": [
        "namespace ${TM_DIRECTORY/^.*[\\\\\/]([^\\\\\/]+)$/$1/};",
        "",
        "public class ${TM_FILENAME_BASE}",
        "{",
        "    $0",
        "}"
    ],
    "description": "Creates a modern .NET 10 class with a file-scoped namespace"
}
```

---

## 2. VS Code Duplicate Line Shortcuts
VS Code provides instant actions to duplicate text selections or single lines up or down without overwriting the clipboard.

*   **Windows / Linux:** `Shift` + `Alt` + `Down Arrow` (or `Up Arrow`)
*   **macOS:** `Shift` + `Option` + `Down Arrow` (or `Up Arrow`)

---

## 3. Viewing Dependencies in VS Code
VS Code's default file explorer displays raw directories rather than logical trees. Use these methods to inspect active dependencies.

*   **C# Dev Kit Explorer:** Open the virtual **C# Project Details** panel or the **Solution Explorer** nested at the bottom of the default sidebar.
*   **Manual `.csproj` Inspection:** Open the project file directly to view installed entries listed inside the `<ItemGroup>` blocks as `<PackageReference>` elements.
*   **CLI Package Auditing:** Run `dotnet list package` within the integrated terminal to list top-level packages. Use `--include-transitive` for deeper dependency mapping.

---

## 4. Installing the EF Core CLI Tool (`dotnet-ef`)
Entity Framework Core CLI components must be installed manually since they are detached from the base .NET SDK bundle.

1. **Install Globally:**
   ```bash
   dotnet tool install --global dotnet-ef
   ```
2. **Verify Installation:** Restart your terminal and run `dotnet ef` to see the ASCII visual banner.
3. **Add Design-Time Assets:** Install the runtime generator tooling directly into your targeted application project:
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.Design
   ```
4. **Enforce Updates:** If versions fall out of sync with your SDK target, use:
   ```bash
   dotnet tool update --global dotnet-ef
   ```

---

## 5. Source Control Management for EF Core Migrations
*   **Commit Strategy:** **Always commit** migration files (`.cs`) to your git repository. They serve as the definitive history of your database schema evolutionary steps.
*   **Collaboration & CI/CD:** Sharing migrations lets other developers and build servers use `dotnet ef database update` to sync infrastructure safely.
*   **Exclusion Matrix:** Never track localized application state or development databases. Keep files like `*.db`, `*.sqlite`, and environment-sensitive overrides like `appsettings.Development.json` blocked in your `.gitignore`.