#!/bin/bash

# Default port
DEFAULT_PORT=3000

# Get the port number from the first argument or use the default
PORT=${1:-$DEFAULT_PORT}

# Find the process using the specified port
PID=$(lsof -t -i:$PORT)

# Check if the PID variable is set to a non-empty string
if [ -n "$PID" ]; then
  echo "Killing process on port $PORT with PID: $PID"
  kill -9 $PID
else
  echo "No process found on port $PORT."
fi
