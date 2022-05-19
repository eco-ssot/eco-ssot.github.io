#!/usr/bin/env bash

jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' $CONFIG_FILE > $TEMP_CONFIG_FILE && mv $TEMP_CONFIG_FILE $CONFIG_FILE

export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
cat $CONFIG_FILE | envsubst $EXISTING_VARS | tee $CONFIG_FILE

nginx -g 'daemon off;'
