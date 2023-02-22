# AtticaVoting
<!-- PROJECT LOGO -->  
<p align="center">
    <h3 align="center">Attica Voting Project</h3>
    <p align="center">
    <img src="/Server/public/images/atticaLogo.jpg" alt="Attica Logo">
</p>

## Attica

The current practices in place to administer national democratic voting are heavily riddled with security vulnerabilities. It was demonstrated publicly how to obtain full administrative access to what are called Direct-Recording Electronic voting machines with no special tools in under two minutes. The DRE machines are still being used across the nation as well as other poor voting practices. Attica proposes a solution to addressing these current security vulnerabilities by implementing a consensus voting protocol on a distributed ledger. The commit and reveal structure allows any individual who voted to check and track that their vote was counted. The votes are committed through the Hedera Hashgraph Consensus Service to be sure there is no double sending, counting, or voting from unregistered individuals. 

## Motivation

The motivation for this project comes from the poor voting practices across the nation. While it is understood that part of this problem is due to the fact that each state is in charge of its own voting policy. This makes it very difficult for there to be implemented standards across the nation. This being said, we hope that the use of Attica by a state founded university will set an example of what we can do better. Digital voting is a topic of high interest among cyber security professionals and we hope to have a large positive contribution on the direction of this technology.


## Tech/framework used

<b>Built with</b>
- [Hedera Hashgraph](https://www.hedera.com/)
- [Java Script](https://www.javascript.com/)
- [Reactjs](https://reactjs.org/)
- [Nodejs](https://nodejs.org/en/)

## Features
Our project provides consensus validation for every vote casts and administration. Currently there is no technology that provides this service with provable security up to the Byzantine Fault Tolerance. 

### Prerequisites
   1) Node.JS, tested with v12.16.1

   2) [Hedera Hashgraph](https://www.hedera.com/) account

   3) [DragonGlass](https://testnet.dragonglass.me/hedera/login) API Keys

   4) PGP keypair, can be generated multiple ways including [here](https://github.com/djblackbelt/PGP-Keygen)

## Usage
### Setup
- Install node dependencies with `npm install`

### Starting an Election 

- Start the script with `npm run start`

- Once you get to the 404 page add `/elections/dogs` or `elections/CSU` to the URL

### Finishing an Election

- Start the tallying script with `npm run tally`

- Follow the menu prompts for the topic ID and PGP key information


## Authors
- Derek Larkins
- Waylon Jepsen
- Maddie Mihevc
- Christian Ferguson
