FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["YearbookSports.API/YearbookSports.API.csproj", "YearbookSports.API/"]
RUN dotnet restore "YearbookSports.API/YearbookSports.API.csproj"
COPY . .
WORKDIR "/src/YearbookSports.API"
RUN dotnet build "YearbookSports.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "YearbookSports.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "YearbookSports.API.dll"] 