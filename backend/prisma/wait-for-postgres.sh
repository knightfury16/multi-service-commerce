#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
user="$2"
shift
shift
cmd="$@"

until PGPASSWORD=$PG_PASSWORD psql -h "$host" -U "$user" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping $host $user $PG_PASSWORD"

  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd