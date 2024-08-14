#!/bin/bash
npm i -g corepack
corepack enable pnpm
pnpm i --frozen-lockfile
pnpm run dbpush
pnpm run generate