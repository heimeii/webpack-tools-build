// const inquirer = require('inquirer');

// inquirer.prompt([
//     {
//         type: 'list',
//         name: 'testname',
//         message: 'testmessage',
//         choices: ["Choice A", new inquirer.Separator(), "choice B"],
//     },
//     {
//         type: 'list',
//         name: 'testname1',
//         message: 'testmessage1',
//         choices: ["Choice A1", new inquirer.Separator(), "choice B1"],
//     },
// ]).then((arr) => {
//     console.log(arr);
// });

const Element = require('../model/Element');

const config = new Element({
    a: 123,
    b: {
        c: [
            {
                d: 1,
            }
        ],
    }
});

config.merge({
    a: 321,
    b: {
        c: [
            {
                e: 1,
            }
        ],
        d: 'asd'
    }
});

config.get('b').set('d', {});

console.log(config.model);
