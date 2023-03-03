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

# Docker
- Make sure you have your own docker repositories to store your images
- This is important as third party hosting services can retrieve your latest images

# Deployment
Using fly.io as a hosting service and Buddy.works as a pipline. 
- Setup your own applications in fly.io dashboard
- Setup your own pipeline to deploy latest docker image to fly.io
- Push to master to deploy!