# Use the official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY *.sln ./
COPY YearbookSports.API/*.csproj ./YearbookSports.API/
RUN dotnet restore ./YearbookSports.API/YearbookSports.API.csproj

# Copy everything else and build
COPY YearbookSports.API/. ./YearbookSports.API/
WORKDIR /src/YearbookSports.API
RUN dotnet publish -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Install dotnet-ef tool for migrations
RUN dotnet tool install --global dotnet-ef && \
    export PATH="$PATH:/root/.dotnet/tools"

# Copy published app and entrypoint script
COPY --from=build /app/publish .
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expose port 80
EXPOSE 80

# Set environment path for dotnet tools
ENV PATH="$PATH:/root/.dotnet/tools"

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"] 