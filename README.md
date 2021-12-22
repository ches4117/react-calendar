# react-calendar

## Getting Started

### Prerequisites

1. `Node v16 or higher`

### Start project

1. `yarn install`
2. `yarn start`
   <br><br>

## Architecture

### modules

- moment

### Introduction

The project has **App** and **Calendar** component. We should pass some params from **App** to **Calendar**.

| Name                   |                   Type                   |  Default | Description                                      |
| ---------------------- | :--------------------------------------: | -------: | ------------------------------------------------ |
| dateObject             |              moment object               | moment() | record calendar status                           |
| todayObject            |              moment object               | moment() | record today                                     |
| handleRangeChange      | function(addType, preDateObject, action) | () => {} | change dateObject depend on cliked calendar type |
| handleDateObjectChange |         function(moment object)          | () => {} | change dateObject dependd on cliked date         |

<br><br>

## Features

- Record user last select date
- Test basic month days
