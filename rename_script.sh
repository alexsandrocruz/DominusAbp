#!/bin/bash
set -e

# Define suffixes
suffixes=(
  "Application"
  "Application.Contracts"
  "Blazor"
  "Blazor.Server"
  "Domain"
  "Domain.Shared"
  "HttpApi"
  "HttpApi.Client"
  "HttpApi.Host"
  "MauiBlazor"
  "MongoDB"
  "Web"
)

# Loop through suffixes
for suffix in "${suffixes[@]}"; do
  src="Sapienza.Dominus.$suffix"
  dest="Sapienza.Dominus.$suffix"

  echo "Processing $suffix..."

  if [ -d "$src" ]; then
    if [ -d "$dest" ]; then
      echo "  Merging $src into $dest"
      # Move all contents from src to dest
      # Use find to move files to avoid issues with hidden files or empty dirs
      mv "$src"/* "$dest"/ 2>/dev/null || true
       mv "$src"/.* "$dest"/ 2>/dev/null || true
      # Remove src directory if empty
      rmdir "$src" || echo "  Warning: $src not empty, please check manually"
    else
      echo "  Renaming $src to $dest"
      mv "$src" "$dest"
    fi
  fi

  # Rename csproj inside dest
  if [ -d "$dest" ]; then
    old_csproj="$dest/Sapienza.Dominus.$suffix.csproj"
    new_csproj="$dest/Sapienza.Dominus.$suffix.csproj"
    if [ -f "$old_csproj" ]; then
        echo "  Renaming csproj to $(basename "$new_csproj")"
        mv "$old_csproj" "$new_csproj"
    fi
  fi
done

# Rename SLN
if [ -f "Sapienza.Dominus.sln" ]; then
    echo "Renaming SLN..."
    mv "Sapienza.Dominus.sln" "Sapienza.Dominus.sln"
fi
