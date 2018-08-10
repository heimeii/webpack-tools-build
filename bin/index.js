#!/usr/bin/env node

const args = process.argv.slice(2);

try {
    require(`../scripts/${args}`);
} catch (e) {
    console.log(e);
}
