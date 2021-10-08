# GasPal
Fall 2021

## Setup
1. Install node.js on your local machine for development
    1. On OXS you can use https://github.com/nvm-sh/nvm 
2. Clone the repo
3. Cd into the project directory
4. Run `npm install`
    1. This will install all of the project dependencies
5. To run the web server run `npm start`

## Feature Development
1. Create a new branch by doing `git checkout -b <name of branch>`
2. Write code
3. Add files by doing `git add`
4. Commit the files via `git commit -m “your message”`
5. Push to github via `git push`
6. Go to github and create a pull request to main which is our default branch and will be auto selected for you.
7. Ask for a code review on discord.
8. Merge

## Deploying
1. SSH to the server
2. cd into gaspal
3. Run `git pull` to get the latest code
4. Run `forever stopall` to stop the old code
5. Run `forever start index.js` to run the new code

## Production
Our production environment is hosted here 

​​http://ec2-3-133-144-31.us-east-2.compute.amazonaws.com:3000/ 

## General Reference for development in Git:

## If you have newly developed code that has not been committed:
1. Execute | `git stash`
2. Execute | `git fetch`
3. Execute | `git reset --hard origin/main` [DO NOT PERFORM THIS WITHOUT STASHING]
4. Execute | `git stash pop`
5. Execute | `git add [files]` (use -u to grab recently worked files)
6. Execute | `git commit -m "message for commit"`
7. Execute | `git push`
8.  Go to Github | Create Pull Request on your branch - comparing it to main

## If you accidentally commit before resetting to main branch:
1. Execute | `git reset --soft HEAD~[num of commits]` (you can check number with git log)
## Steps 1-8 of not committed

## Authors
- Bryan Hill
- Justin Lombardo
- Dean Cutalo
- Jun Yan Chen
- Phillip Declet
- David McCullers
