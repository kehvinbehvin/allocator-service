# Engagment Tracker

# Steps to run this project without docker

1. Run `npm install` command
2. Set up a database
3. Setup database settings inside `data-source.ts` file
4. Create .env file
5. Run `npm run dev` at project root

# Building docker image
- docker login
- docker build . -t <docker-repo>:<commit>
- docker tag <docker-repo>:<commit> <docker-repo>:latest

# Test docker image
- docker run -p 8080:8080 -d --env-file ./.env <docker-repo>:<commit>

# Push image to registry
- docker push <docker-repo>:<commit>
- docker push <docker-repo>:latest

# Modules descriptions
Each module consists of (See user module for example)
- Schema
- Controller
- Routes
- Manager
- Logger

# Deployment
Using fly.io as a hosting service and Buddy.works as a pipline. 
- Push to master to deploy!