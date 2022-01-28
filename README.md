# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) GA London React Template

### Project Three

* `npm install` - Install dependencies
* `npm run dev` - Run the app in development mode

Project 3 - MUGGLES
Link: https://sei-muggles.netlify.app/

Brief

This is project three for Software Engineering Immersive at General Assembly by Victor Reysantos, Vanessa Swanson and Maggie Ward. We were assigned to build a MERN app within one week.

Overview and Concept

The idea is to build an app like a MeetUp clone website. We decided to focus on a specific group and went with a Harry Potter theme that lets the fans connect through the app. Users will have to register to join groups and attend events whether online or in person. Users are also able to create their own group or events as well as leave comments.

Technologies Used

HTML5
CSS SASS
MongoDB
Mongoose
React.js
JSX
React-Bootstrap
CRUD
JSON
Express
Insomnia
GitHub
Trello
Node


Approach taken

We first started working on the backend as a team with one person writing the code and the others contributing and editing. We took our time and we all took turns throughout the day working together through problems we encountered as we went along. It allowed us to build a robust database with a lot of relationships between Schemas. It also helped me learn some aspects of backend that I didn’t fully understand at the time.

<img width="435" alt="Screenshot 2022-01-28 at 11 46 50" src="https://user-images.githubusercontent.com/86128330/151541841-e40a5552-5008-4cd0-aaee-935e48109678.png">

We then divided the data entry needed for the database seeds (groups, events, online-events, users) and did it as an overnight task.

We started working on frontend by setting it up and connecting it to backend making sure it's working. Then we decided to split up the work and each one was assigned a component to work on. I worked mostly on the online-events and its show page as well as the home page. I was able to fetch multiple data using useEffect() and show it on the home page. I also worked on sorting the events shown based on the date. I also added the footer and helped with styling.

<img width="591" alt="Screenshot 2022-01-28 at 10 50 16" src="https://user-images.githubusercontent.com/86128330/151541966-26f9708a-3d25-4a3a-8177-3ffec0cb80e3.png">

<img width="751" alt="Screenshot 2022-01-28 at 10 49 28" src="https://user-images.githubusercontent.com/86128330/151541968-4a3e4630-c9d5-4e82-8b4e-007c7478b875.png">

Each morning, we gave updates and checked each other’s code, edited and made changes before committing and pushing to the main branch. We then continued to work on our individual tasks and check up on each other and ask for help when any of us started struggling.

We decided to use a Trello board to track what needed to be done and who was working on it. It was an excellent tool that helped us manage time and workload when we started doing individual work.

![20210827_111835](https://user-images.githubusercontent.com/86128330/151542108-087b98e9-ce70-42c1-962c-50742a2b2a22.png)

Visuals

<img width="433" alt="Screenshot 2022-01-28 at 11 51 19" src="https://user-images.githubusercontent.com/86128330/151542444-226d1f04-3e4b-4875-acdc-f994e9b25d96.png">


![Screenshot 2021-09-24 at 16 00 06](https://user-images.githubusercontent.com/86128330/151542540-25a211d5-8930-4258-a147-c02a6e68505a.png)
![Screenshot 2021-09-24 at 16 00 27](https://user-images.githubusercontent.com/86128330/151542552-4325568b-4cdf-43e8-ae5d-fea3c5856fc2.png)
![Screenshot 2021-09-24 at 16 00 48](https://user-images.githubusercontent.com/86128330/151542557-c2183b68-a134-4ea1-b1f3-f8d97899d786.png)
![Screenshot 2021-09-24 at 16 01 04](https://user-images.githubusercontent.com/86128330/151542560-eeec2d8f-300d-41a5-b974-a92e890c6dbb.png)
![Screenshot 2021-09-24 at 16 01 41](https://user-images.githubusercontent.com/86128330/151542561-2e5df36a-e706-43a7-b0f7-247b753fc187.png)
![Screenshot 2021-09-24 at 16 01 52](https://user-images.githubusercontent.com/86128330/151542562-9ed56527-4851-4fb1-b377-fde82f00c998.png)
![Screenshot 2021-09-24 at 16 02 33](https://user-images.githubusercontent.com/86128330/151542564-a3fcd342-f05b-47b9-92b9-ea649d58e151.png)
![Screenshot 2021-09-24 at 16 02 52](https://user-images.githubusercontent.com/86128330/151542566-031fe4b1-1f46-49af-8384-95e4c79a1a9c.png)
![Screenshot 2021-09-24 at 16 07 04](https://user-images.githubusercontent.com/86128330/151542568-3d696c2a-cb69-439d-b638-f0972f214273.png)

Struggles

I originally planned to have a keyword search filter on the home page or some button category filters but I had a hard time fetching all data from the database. We also had some issues with the mapbox requests and some of the pages did not load properly upon deployment.

Wins

We were able to add a stretch goal which sorts out which house the user belongs to based on a few questions upon registration.

Improvements

For users to have the ability to follow other users
For groups to add events
For comments to stay on event / group page

Key Learnings

For me, it was the right decision to work together on backend first. We were able to make a strong foundation for the app. Using a Trello board was also very useful for keeping track of the work.
