FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/MedicRecord.Web.Host/MedicRecord.Web.Host.csproj", "src/MedicRecord.Web.Host/"]
COPY ["src/MedicRecord.Web.Core/MedicRecord.Web.Core.csproj", "src/MedicRecord.Web.Core/"]
COPY ["src/MedicRecord.Application/MedicRecord.Application.csproj", "src/MedicRecord.Application/"]
COPY ["src/MedicRecord.Core/MedicRecord.Core.csproj", "src/MedicRecord.Core/"]
COPY ["src/MedicRecord.EntityFrameworkCore/MedicRecord.EntityFrameworkCore.csproj", "src/MedicRecord.EntityFrameworkCore/"]
WORKDIR "/src/src/MedicRecord.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/MedicRecord.Web.Host", "src/MedicRecord.Web.Host"]
COPY ["src/MedicRecord.Web.Core", "src/MedicRecord.Web.Core"]
COPY ["src/MedicRecord.Application", "src/MedicRecord.Application"]
COPY ["src/MedicRecord.Core", "src/MedicRecord.Core"]
COPY ["src/MedicRecord.EntityFrameworkCore", "src/MedicRecord.EntityFrameworkCore"]
WORKDIR "/src/src/MedicRecord.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "MedicRecord.Web.Host.dll"]
