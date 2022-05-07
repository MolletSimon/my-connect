# My Connect

## My what ? 🤨
My Connect is a web application developed for a group of people that organized event that assemble young adults (named Connect). The idea of the application is to help the organization with a feed where people can posts content, a common calendar, the notion of group, poll etc.
The application has been thought, designed and developed to work on Android, iOS, on tablet and smartphone format.

<div style="border-radius: 50px">
<img src="https://media.giphy.com/media/KDOpe6tGW9gZSlbEdQ/giphy.gif"/></div>


This app is the web version of this : https://github.com/MolletSimon/my-econnect-mobile

## Features 🗒

- **Authentification** 🔐
_The application has an all system of authentification_

<img width="1680" alt="login" src="https://user-images.githubusercontent.com/43732526/167269680-e2f75506-9108-4618-9e29-f8d3348f58a6.png">


- **Groups** 👥
_The application is based on groups, when you're account is created, you are assigned to one or many groups (like graphist, marketing or whatever) that defines what you will see in feeds, calendar etc._

<img width="1680" alt="groups" src="https://user-images.githubusercontent.com/43732526/167269709-5069a343-e129-4d22-87ff-96b816fcf0e7.png">

_You also have the possibility to create groups

<img width="1680" alt="addgroups" src="https://user-images.githubusercontent.com/43732526/167269814-b34f1014-d355-4923-8b0d-74ecb9811b23.png">

- **Feed** 📝
_It also have a feed which display posts written by other users of your groups and let you the possibility to write one_

<img width="1680" alt="home" src="https://user-images.githubusercontent.com/43732526/167269836-ee0c898d-27eb-440f-9c53-9963ad9de849.png">

- **Poll** 📶
_You can post poll and answer it, then see who voted and for which answer

<img width="1680" alt="postpoll" src="https://user-images.githubusercontent.com/43732526/167269909-b3b4d57d-dac8-4a1e-91fd-ddf2838d68c9.png">


- **Shared calendar** 📆
_There is a shared calendar where you can add event and consult them, an event is attached to one or many groups_

<img width="1680" alt="agenda" src="https://user-images.githubusercontent.com/43732526/167269925-8b4f520b-40a7-4e4f-b34c-81ac73606cfa.png">
<img width="1680" alt="addappointment" src="https://user-images.githubusercontent.com/43732526/167269930-9ea68314-51ac-4df9-81d1-7fd632755f5e.png">

- **Admin** 🧑🏻‍ 
_The web application allows you to administrate the application (if you have the superadmin role)

<img width="1680" alt="users" src="https://user-images.githubusercontent.com/43732526/167270121-8a708cee-b6e0-427c-8c10-abecbfe41267.png">
<img width="1680" alt="adduser" src="https://user-images.githubusercontent.com/43732526/167270127-3ee57120-6dbe-44c0-a383-6536f436e839.png">


- **Push notifications**  🔔
_The application has push notifications when a new posts or a new event from your group are published_  

## How is it made ? ⚙️ 
<div>
<image src="https://user-images.githubusercontent.com/43732526/165847389-6dd69078-ece2-4361-8dcf-35b65b45e08d.png" width="150px" height="40px"/>
<image src="https://user-images.githubusercontent.com/43732526/165913954-a5dfefb6-3e1c-47f0-ba7c-f8b5a7ae38b5.png" width="50px" height="50px"/>
<image src="https://user-images.githubusercontent.com/43732526/167270247-001277a0-9a52-4ca7-8853-fcbc70d3fba3.png" width="60px" height="60px" />
</div>

- **_API_** : [NodeJS Express](https://expressjs.com/fr/) backend, hosted on [Heroku](https://www.heroku.com/) 


- **_Database_** : NoSQL [MongoDb](https://www.mongodb.com/fr-fr) database, hosted on MongoDb cluster


- **_Analytics, Hosting, Notifications_** : [Firebase](https://firebase.google.com/) project, integrated with Fireflutter (Firebase Cloud Messaging for notifications, Google analytics etc...)


- **_The App_** : The web app has been developed with the framework developed by Google : [Angular](https://angular.io/)







