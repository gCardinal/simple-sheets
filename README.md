Simple Sheets
===

This project is both an online tool to create, manage and
share RPG character sheets online and an excuse for me
to play around new libraries and technologies and
over-engineer a simple project.

Since professionally I always have to balance clean and well
tested code with ROI, often shortcuts are taken or partial
solutions, coupled to the domain, are implemented. Here, I can
go stupidly overboard with the architecture and design :)

## Requirements

- nvm

## Installation

```bash
nvm install && nvm use && yarn
```

## Running

```bash
yarn dev
```

## About This Project

As mentioned above, this is just a playground for me to do
things I can't do in an environment where efficiency also has
to be taken into account. I don't expect many (or any) people
will read this, but I will still try and document my thought
process for any decision I've made in this project.

### Libraries Used

I just wanted to play with them ¯\\_(ツ)_/¯.

- `@tanstack/router`: Been using `react-router` for a while now
  and wanted to try it since it seems like it's just... better.
- `dexie`: Never really had a reason to play with IndexedDB and
  this seemed like a good excuse. I also debated implementing
  a ORM myself, but... nah. You who read this, know that 
  databases and I aren't friends.
