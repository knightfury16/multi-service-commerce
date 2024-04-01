# Use the official .NET Core SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

# Set the working directory in the container
WORKDIR /app

# Copy the project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining files and build the project
COPY . ./

# Build the project
RUN dotnet publish -c Release -o out

WORKDIR /app/out

CMD ["dotnet","worker.worker.dll"]


