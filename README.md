# Social Network API

## Description

I was asked to build a social media API that could be integrated into a website to provide all the necessary functionality using a NoSQL database for flexibility.

## Usage

[This walkthrough video shows the API in use.](https://drive.google.com/file/d/1SHfoiaCH33y5bLji6b4mXDTMFOaXaRRb/view?usp=sharing)

To invoke the application, clone the repo and run `npm i` to install the node dependencies. Then, run `node server` to start the server and enable the API routes.

The basic structure of the social media platform consists of users and thoughts. Users can sign up for the platform and add/remove other users as friends. Users can post thoughts, as well as reactions to thoughts. Once posted, thoughts can be edited or removed, while reactions can only be removed.

## Endpoints

### User Endpoints

**Get All Users** - GET /api/users

**Create a User** - POST /api/users

**Get One User** - GET /api/users/userId

**Update a User's Data** - PUT /api/users/userId

**Remove a User** - DELETE /api/users/userId

**Add a Friend to a User** - POST /api/users/userId/friends/friendId

**Remove a Friend from a User** - DELETE /api/users/userId/friends/friendId

### Thought Endpoints

**Get All Thoughts** - GET /api/thoughts

**Create a Thought** - POST /api/thoughts

**Get One Thought** - GET /api/thoughts/thoughtId

**Edit a Thought** - PUT /api/thoughts/thoughtId

**Remove a Thought** - DELETE /api/thoughts/thoughtId

**Create a Reaction** - POST /api/thoughts/thoughtId/reactions

**Remove a Reaction** - DELETE /api/thoughts/thoughtId/reactions/reactionId

## Contact 

Brett Piper

[GitHub](https://github.com/bpiper91) | [Email](mailto:bpiper91@gmail.com)