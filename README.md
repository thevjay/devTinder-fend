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
- LogOut
- Profile
 
