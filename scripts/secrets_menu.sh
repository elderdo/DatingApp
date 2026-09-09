#!/usr/bin/env bash

#!/bin/bash

# 1. Check if a .csproj file exists in the current directory or its subdirectories
echo "?? Searching for a .NET project file..."
PROJECT_FILE=$(find . -maxdepth 2 -name "*.csproj" -print -quit)

if [ -z "$PROJECT_FILE" ]; then
    echo "? Error: No .csproj file found in the current directory or immediate subdirectories."
    echo "Please navigate to your .NET project folder and try again."
    exit 1
fi

echo "? Found project: $PROJECT_FILE"
echo "----------------------------------------"

# 2. Check if UserSecretsId is initialized in the .csproj file
if ! grep -q "<UserSecretsId>" "$PROJECT_FILE"; then
    echo "??  User Secrets are not initialized for this project."
    read -p "Would you like to initialize them now? (y/n): " init_choice
    if [[ "$init_choice" =~ ^[Yy]$ ]]; then
        dotnet user-secrets init --project "$PROJECT_FILE"
    else
        echo "?? Cannot proceed without initializing user secrets. Exiting."
        exit 1
    fi
fi

# 3. Interactive Menu Loop
while true; do
    echo ""
    echo "========================================"
    echo "      .NET USER SECRETS MANAGER         "
    echo "========================================"
    echo "1) ?? List all current secrets"
    echo "2) ?? Set / Update a secret"
    echo "3) ? Remove a single secret"
    echo "4) ?? Clear ALL secrets"
    echo "5) ?? Exit"
    echo "========================================"
    read -p "Select an option [1-5]: " menu_option

    case $menu_option in
        1)
            echo "--- Current Secrets ---"
            dotnet user-secrets list --project "$PROJECT_FILE"
            ;;
        2)
            echo "--- Set / Update a Secret ---"
            read -p "Enter Secret Key (e.g., ConnectionStrings:Default or Stripe:ApiKey): " secret_key
            if [ -z "$secret_key" ]; then
                echo "?? Key cannot be empty."
                continue
            fi
            read -s -p "Enter Secret Value (input will be hidden): " secret_value
            echo "" # New line after hidden input
            
            # Run the command
            dotnet user-secrets set "$secret_key" "$secret_value" --project "$PROJECT_FILE"
            ;;
        3)
            echo "--- Remove a Secret ---"
            read -p "Enter the exact Key to remove: " secret_key
            if [ -z "$secret_key" ]; then
                echo "?? Key cannot be empty."
                continue
            fi
            dotnet user-secrets remove "$secret_key" --project "$PROJECT_FILE"
            ;;
        4)
            echo "--- Clear All Secrets ---"
            read -p "?? Are you absolutely sure you want to delete ALL secrets for this project? (y/n): " confirm
            if [[ "$confirm" =~ ^[Yy]$ ]]; then
                dotnet user-secrets clear --project "$PROJECT_FILE"
            else
                echo "Operation canceled."
            fi
            ;;
        5)
            echo "?? Exiting. Happy coding!"
            exit 0
            ;;
        *)
            echo "?? Invalid option. Please enter a number between 1 and 5."
            ;;
    esac
done

