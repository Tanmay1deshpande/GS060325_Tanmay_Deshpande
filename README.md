# GS060325_Tanmay_Deshpande

Data Viewer: progressive web app for manipulating and analyzing data

Implemented a JWT based authentication system keeping 2 constant username-password pairs for testing purposes.
Upon successful authentication the JWT token is stored in the cookies and for an added measure also in the localStorage.
The /home path to the main window is protected by a PrivateRoute which requires the JWT in the cookie or localStorage to proceed.

The Home page consists of 4 tabs on the left hand side drawer menu.
The Store, SKU and Planning tab consist of Tables created using the AG-Grid library which were specified in the problem description. Additionally, an upload file option is also provided so that users can upload their own excel data. However due to time constraints the excel file sheet structure has to be maintained and the sheet order should not be changed while uploading the .xlsx file.
Adding a row is also possible in the Store and SKU tabs but not in the Planning tab as per description.

The Charts tab displays 4 charts created using the AG-Charts library. 4 charts are: simple bar chart, 2 line and bar chart combinations and a dual axis bar chart.

The navbar contains a profile icon in which My Profile and My account are dummy tabs but the Sign Out tab removes the JWT token from the COokies and the localstorage.

Implemented Firebase initialization and even tried deploying, however firebase insists on not letting me use it without paying up first. Code for firebase configuration is added in the repo.

Used a Mock Express.js backend for the login API.

Created a Button component but realized I only need one type of button so I used a MUI button. Although the Button component I created is a reusable component.

Some parts of the code are not utilized as I had to quickly move to more practical alternatives and did not get time for code cleanup. However I think it highlights the fact that I gave it my best and tried numerous different techniques to achieve my goal.

**#Instructions on how to access deployed Site:**
1. access website on : https://gs060325-tanmay-deshpande.onrender.com
2. Login Credentials:  username: recruiter & password: hireMe@GreatFit.yay


**#Instructions on how to access through local:**

1. Clone the repository in your respective IDE (recommended to use VSCode)
2. Open the terminal using ctrl + shift + `
3. Assumming you have node installed in your system and added as Path in your environment variables type "npm install" in the terminal.
4. Check if "nodemon" is added in the devDependencies array in package.json. If no, type in "npm i -D nodemon" in the terminal, if already present the ignore
5. Go to the server folder of the project using the terminal. "cd your_source_folder/src/backend/server"
6. In the terminal type node server.js to start the backend express server.
7. Check if the terminal outputs "Server running on port 5000", If no, try a different server initialization such as: "npx nodemon server.js"
8. If running only on local then go to the Login.tsx file and comment line 54 and uncomment line 53 : // API_HTTP + REACT_APP_API_URL + loginApiEndpoint, //For Local
        RENDER_API_ENDPOINT_LOGIN, //FOR HOSTED BACKEND ON RENDER
Use the one local endpoint and not the RENDER_API_ENDPOINT_LOGIN.
9. Start a new terminal for frontend using Ctrl + Shift + +
10. Type npm start to start the frontend server on port 3000.
11. Go to http://localhost:3000/login to view the application
12. Use credentials: Username: recruiter & Password: hireMe@GreatFit.yay
13. For debugging of the login API without frontend you can use Thunder CLient extension in VSCode to send a request after starting the backend server. send request to "http://localhost:5000/api/login with body: { "username":"recruiter", "password":"hireMe@GreatFit.yay" }. (Only if login fails on your end).

**Looking forward to working with you. **

Thanks & Regards,
Tanmay Deshpande
