"use strict";

const toInsertArray = cat => [
    +cat.number, cat.name, +cat.yearofbirth, +cat.weight, cat.breed
];

const toUpdateArray = cat => [
    cat.name, +cat.yearofbirth, +cat.weight, cat.breed, +cat.number
];

module.exports = { toInsertArray, toUpdateArray }