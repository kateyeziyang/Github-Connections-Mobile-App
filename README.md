# Github-Connections-Mobile-App
- Utilized Github's REST API to create an Android/iOS app to view user connections. Spring 2020 coursework.
- The mobile application is implemented with javascript and React Native
- You will need to install React Native (and all dependencies)  to run this application.
- Layout
![Layout](Layout%20Design.png)

## Some notes
- You have to create a constants.js in the root directory containing the github token for accessing github graphql. You can google how to make one.
- Create constant.js and copy the following content to it. Replace GIT_TOKEN with yours.  
module.exports = {
  GIT_TOKEN: 'YOUR GIT TOKEN',
  ARR: {"avatarUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "bio": "This is Me", "email": "some@email.com", "followers": {"totalCount": 0}, "following": {"totalCount": 1}, "login": "myusername", "name": "Myname", "repositories": {"nodes": [{"description": "Starter code for the maze solution portion of Lab 2.", "name": "Lab2", "owner": {"login": "randomuser"}}, {"description": "Project skeleton for Lab 3.", "name": "Lab3", "owner": {"login": "myusername"}}], "totalCount": 9}, "updatedAt": "2020-03-23T02:29:44Z", "websiteUrl": null}
,
};
- ARR above is for snapshot test.
- The app currently have two page, one loading page and another one displaying user infomation.

## User information displayed
- Profile avatar image view
- Name
- GitHub username
- Bio
- Website
- Email
- Public Repos count: Clickable: but not able to navigate to Repositories Screen now
- Followers count: Clickable: but not able to navigate to Followers Screen now
- Following count: Clickable: but not able to navigate to Following Screen now
- Profile creation date

## Test
Run 'yarn test' (you need to have yarn installed) to do snapshot test.
