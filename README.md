# Smishing Smasher

[![hackmd-github-sync-badge](https://hackmd.io/u4J6ZKOBRAWbGT93uNnrsQ/badge)](https://hackmd.io/u4J6ZKOBRAWbGT93uNnrsQ)


## Table of Contents

1. [Overview](#Overview)
2. [Database Structure](#Database-Structure)
3. [Technical Specifications](#Technical-Specifications)
4. [User Roles](#Manual)
5. [Pages](#Demo)
6. [Future Work](#Future-Work)
7. [Acknowledgment](#Acknowledgment)

## Overview

### Web App Link
[http://www.smishing-smasher.link](http://www.smishing-smasher.link)

### Description

Smishing Smasher is a web app for people to report SMS phishing. Users are welcome to report the suspicious text they received. All users could skim, filter and search the texts posted by all users at home page. Moreover, they could even react to these text posts by making comments and liking them.

### App Evaluation
- **Name**: Smishing Smasher
- **Type**: Web Application
- **Category**: Information Sharing
- **Mission**: Provide forum for people to share their experience of phishing SMS. Help people identify phishing texts and avoid frauds.

### Team Members

- **Jihao Zhang**
- **Bin Feng**

## Database Structure

Our database is called `smishing-smasher`, which includes 5 Schemas.

- `user`: used to save user information
- `smish`: used to save post inforamtion
- `comment`: used to save comment information
- `tag`: used to save tag information (unused currently)
- `photos`:
    - `photos.chunks`: used to save avatar image data
    - `photos.files`: used to save avatar image file information

## Technical Specifications

- **Backend**: Developed by `Node.js` and `Express.js`, built database based on `MongoDB`
- **Frontend**: Developed by `React.js`, app state managed by `Redux`, page routes managed by `React Router`
- **Deployment**: Backend and Frontend are both deployed on `AWS EC2 Server`, built web serving and reverse proxying based on `Nginx`

## User Roles:
1. **Anonymous**: Without logging in, people could only read posts, or search posts.
2. **Normal User**: Users are able to post suspicious text, endorse, thumb up or thumb down to others' posts, also thumb down or up comments.
3. **Administrator**: Admins are able to edit or delete any post.
4. **Owner**: Owners are able to assign or cancel admin.

## Pages

### Home
- Show trending message(accoding to user's location, page shows a list of trending posts in his area.)
- Go to Search page: provides the entry button link to the search page.

### Login
- Users could input username and password in login page to login. After logged in, users are able to comment on other people's posts and create their own posts.
- Users could also log in by Google or Facebook.

### Signup
- People could sign up accounts as user role here by providing some basic information.
- People could upload their avatar when signing up.
- People could use Google and Facebook authentication to sign up.

### Profile
- People could see their basic information here, as well as the posts and comments published by them.
- People could edit their profile here.
- Owners here could add / delete admins here.

### Search
- People could search specific posts here by contents

### Post Detail
- People could make interactions in detail page
- Comments could be submitted here.
- Users could edit / delete their own posts in this page.
- Owners / Admins could edit / delete each post here.

### History
- All logged in people could see all searching history records in this page.

### Head Bar
- Head Bar is not a page, but a component on each page.
- People could use Head Bar buttons to create new post, or go to Profile / History quickly.
- Logged in people could log out in Head Bar.
- Anonymous users could only see log in button on Head Bar.

## Future Work
1. We intend to add accesses to skim other user's profile.
2. Follow / Unfollow button will replace the edit button in other user's profile.
3. People could see the following users in the following page.
4. Add https certifications to access Google / Facebook login authentication on web.
5. Add tags for each post, and people could locate some posts by searching for tags.

## Acknowledgement

The project was firstly proposed in February, the design documents was finished in the first week of March. All wireframes were designed on `Figma`. We use `Github` to accomplish team work and agile software development. Also we use `MongoDB Atlas` to build our database. And we use `Postman` to test our APIs.



