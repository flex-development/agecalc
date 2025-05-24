#!/bin/sh

set -e

# Tarball Workflow
#
# References:
#
# - https://bun.sh/docs/cli/pm#pack

for dir in packages/*/; do
  echo -e "\033[1m$dir\033[0m"
  bun --cwd=$dir pm pack
done
