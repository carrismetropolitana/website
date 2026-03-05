#!/bin/sh

# BACKUP FREQUENCY
# Run every 6 hours (21600 seconds)
frequency=21600



# Infinite loop to run mongodump continously
while true; do

  echo ""
  echo ""
  echo ""

  # RUN WEBSITEDB BACKUP
  sh websitedb.sh

  echo ""
  echo ""
  echo ""

  # Log end of program
  echo "Complete! Next run in $frequency seconds :)"
  echo "-------------------------------------------"

  # Sleep until the next iteration
  sleep $frequency

done