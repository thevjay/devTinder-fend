
🚀 Just Built DevLink – A Developer Networking Platform (My Latest Project!)
I'm excited to share a project I've been working on: DevLink, a platform that helps developers discover each other, collaborate, and chat in real-time. Think of it as a professional network built for devs, by a dev!

🔨 What I Built
Skill-Based Matching – Find developers with similar tech stacks & interests
Real-Time Chat – Instant messaging using WebSockets (no more email delays!)
Connection System – Send/accept requests with email notifications (Nodemailer + Cron)
Secure Auth – JWT-based access control to keep things safe

🛠️ My Tech Stack
▸ Frontend: React + Tailwind CSS
▸ Backend: Node.js + Express
▸ Real-Time: WebSockets
▸ Emails: Nodemailer & CronJobs
▸ Deployment: AWS

🌍 Live Demo:

This was a fun challenge—especially implementing real-time features and optimizing the connection system. Learned a ton along the way!
Would love your thoughts:
What features would you add?
Any feedback on the UI/UX?

# Vite APp
- # Scaffolding Your First Vite Project
- - $ npm create vite@latest devFrontend -- --template react
- - npm run dev

# installing Tailwind CSS
- npm install -D tailwindcss@3 postcss autoprefixer
- npx tailwindcss init -p

# installing daisy ui
- npm
- plugin

# DevTinder - Frontend
- Add navBar Component t0 App.jsx
- Create a NavBar.jsx separate Component file
- Installed react router dom


Body
    NavBar
    Route=/  => Feed
    Route=/login  => Login
    Route=/connections => Connections
    Route=/profile  => Profile

- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create Outlet in Body Compponenet
- Created the footer bar
- Create Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configuration: origin, creadentials: true
- Whenever you're making API call so pass axios => { withCreadentials:true}
- install Redux Toolkit react-redux
- Install react-redux + @reduxjs/toolkit => configureStore  => Provider => createSlice  => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in 
- Refactor our code to add constants file + create a componenets folder

- You should not be access other routes without login
- If take is not presen, redirect user to login page 
- LogOut Feature 
- Get the feed and add the feed in the store
- build the user card on feed;
- Edit Profile Features
- Show Toast Message on save of profile
- New Page: See all my connections
- New Page: See all my Connection requests
- Feat: Accept/Reject Connection request
- Feat: Send/Ignore the user card from the feed
- - SignUp New USer

Remaining:
- E2E testing
- 
# axiox patch is not working

- 
 


# Testing
- # 1 Unit Testing
- - as the name suggest what it ment by youre writing so much code and you pick a small unit and insure that one single unit working perfectly or not
- ex: car bolt is working not 

# Popular Interview Topics?
- Write code for given test cases
- How to test a given utility
- E2E Test case scenarious
- Test Your own code

- # 2 Component Testing

- # 3 Integration Testing

- # A/B Testing
- - 

- # Test Driven Developemnt

- # E2E Testing

- # Much More....




# Testing the Application:
- Unit Testing
- Integration Testing
- End to End Testing - e2e testing

# Setting up Testing in our app
# Step-1:
- # React Testing Library:
- - npm install --save-dev(-D) @testing-library/react
- # JEST :
- - npm i -D jest
- Using babel 
- npm install --save-dev babel-jest @babel/core @babel/preset-env
- babel.config.js
- - module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};


# Setting up Testing in our app in React-Vite:
- # Step 2: Install Testing Dependencies:
- - npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom @vitejs/plugin-react

- # Update vite.config.js for Jest (Vitest Configuration):
- - /// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});

- # import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app correctly', () => {
  render(<App />);
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});

- # Step 6: Update package.json Scripts:
- - "scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:watch": "vitest --watch"
}

- # Install @babel/preset-react - to make JSX work in test cases
- - Include @babel/present-react inside my babel config

# -:
- beforeAll(()=>{
  console.log("Before Each)
})

- beforeEach(()=>{
  console.log("Before Each)
})

# -:
- afterAll(()=>{
  console.log("After All test cases)
})

- afterEach(()=>{
  consloe.log("After Each test case)
})



# Real Time Chat using Websocket(Socket.io)
- - Build the UI for a chat window on /chat/:targetUserId
- npm install socket.io-client
- Intiallse the chat
- createSocketConnection
- Listen to events

-  when Production level code before deploy the code will change in the fend socket.js code

36