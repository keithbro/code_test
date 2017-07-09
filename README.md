# Compensation Calculator

## Getting Started

You'll need Node installed. I used v8.1.2.

    $ git clone git@github.com:keithbro/code_test.git

    $ cd code_test

    $ npm install

### Running the tests

    $ npm test # (uses mocha)

### Running the reports

    $ ./scripts/payThisWeek.js

    Ebony Boycott will get paid $2604.0735 this week
    Geoff Rainford-Brent will get paid $1119.026336 this week
    Meg Gillespie will get paid $1125 this week
    Jason Lanning will get paid $160.022 this week

    $ ./scripts/paymentReport.js

    # Outputs each payment that a person should have received since their
    # injury until now.

## Given more time I would...

* Better input validation! Currently the JSON files must be in the correct format
  and if they are not you would probably get an ugly error message.
* Possibly split out calculator.js in to multiple modules, one focused on
  rules, and another focused on people. Might even be worth turning them in to
  proper classes, but I went for a more functional approach instead.
* Move the "scripts" in to their own module so that they can be unit tested.


