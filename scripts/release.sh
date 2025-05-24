#!/bin/sh

set -e

# Local Release Workflow
#
# 1. create release chore commit
#
# References:
#
# - https://git-scm.com/docs/git-commit
# - https://github.com/flex-development/grease
# - https://jqlang.github.io

git commit --allow-empty -S -s -m "release(chore): $(jq .version -r <<<$(grease bump -j $@))"
