# Inherit existing system paths and aliases
if [ -f ~/.bashrc ]; then . ~/.bashrc; fi

alias cls='clear'
alias gentoken='gen-token-key.sh'
alias secrets='secrets_menu.sh'

# Get the absolute path of this workspace directory
WORKSPACE_DIR="$(pwd)"

# Add the project's scripts folder to the PATH
export PATH="$WORKSPACE_DIR/scripts:$PATH"

echo "🔐 Workspace environments loaded. Custom scripts added to PATH."
