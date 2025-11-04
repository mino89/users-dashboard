#!/usr/bin/env bash

NODE_VERSION=$(node -p -e "require('./package.json').version")

if [ "$1" = "stdout" ]; then
    pnpm exec git-cliff -o - --unreleased --tag $NODE_VERSION
else
    pnpm exec git-cliff -u --tag $NODE_VERSION --prepend './CHANGELOG.md' 
fi