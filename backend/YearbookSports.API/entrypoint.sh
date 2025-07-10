#!/bin/sh
set -e

# Apply database migrations
export DOTNET_ROOT=$(dirname $(which dotnet))/..
dotnet ef database update

# Start the API
exec dotnet YearbookSports.API.dll 