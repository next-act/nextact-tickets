# nextact-tickets
Next Act Ticketing Application


TODOS before deploying app!
-Go to settings.json and update the correct fields (ask director if you are unsure about any of the info)
-Go to the locker for next act on athena (ssh into athena.dialup.mit.edu and get to nextact locker)
-Change the form in the www folder so it is up to date for current year of nact

To run the app run:
"meteor --settings settings.json"

To add a reservation on a Friday show for prod-staff:
-Go to /secret route and add reservation there

To access reservations and delete reservations of people who want to be removed:
-Go to the /admin route and login with the admin account (by default this isn't created so just make an account that has the username called admin with whatever password you want)


Note! Do not upgrade the version of Meteor from 1.3, or risk having the app not work.