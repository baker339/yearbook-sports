#!/bin/sh
set -e

# Apply database migrations
export DOTNET_ROOT=$(dirname $(which dotnet))/..
dotnet tool install --global dotnet-ef
export PATH="$PATH:/root/.dotnet/tools"
dotnet ef database update --configuration Release --no-build --project YearbookSports.API.csproj

# Start the API
exec dotnet YearbookSports.API.dll 