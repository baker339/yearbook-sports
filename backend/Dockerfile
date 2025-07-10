# Use the official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files
COPY YearbookSports.API/YearbookSports.API.csproj YearbookSports.API/

# Restore as distinct layers
RUN dotnet restore YearbookSports.API/YearbookSports.API.csproj

# Copy everything else (including subfolders)
COPY YearbookSports.API YearbookSports.API

WORKDIR /src/YearbookSports.API
RUN dotnet publish -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install dotnet-ef tool for migrations
RUN dotnet tool install --global dotnet-ef && \
    export PATH="$PATH:/root/.dotnet/tools"

COPY --from=build /app/publish .
COPY --from=build /src/YearbookSports.API/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 80
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT ["/app/entrypoint.sh"] 