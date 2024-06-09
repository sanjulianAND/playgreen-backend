<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

PLAYGREEN Sports API is a sports betting application developed with the [Nest](https://github.com/nestjs/nest) framework. It provides a series of endpoints for managing users, bets, and transactions, following best practices of clean code and design patterns.

## Installation

```bash
$ npm install

## development
$ npm run start

## watch mode
$ npm run start:dev

## production mode
$ npm run start:prod

## Configuration
Environment Variables
Set the following variables in the .env file:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=playgreen_sports
JWT_SECRET=JWT_SECRET
JWT_EXPIRATION=3600

{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "playgreen_sports",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}

Implemented Endpoints
User Endpoints / Permissions:
Place a bet on a specific event
Deposit money in its account (create corresponding transaction)
Withdraw money (create corresponding transaction)
Update user data
Request its balance (calculate balance based on transactions)
Get its transactions (can be filtered by type deposit, withdraw, bet, winning)
Admin Endpoints / Permissions:
List all of the bets (can be filtered by specific event or sport)
List all of the user transactions (can be also filtered by specific user and/or category)
Request user balance
Change a bet status (active / cancelled)
Block a specific user (user state => active / blocked) (can’t block other admins)
Settle bets results (won / lost)
This settlement should trigger payments for users that have a placed bet for the winning option in case of a won
Update user data
