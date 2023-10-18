# Device-Master

<p> The application allows you to add, enable and disable devices, update and remove devices, and also performs several checks:
  <ul>
    <li> Checking the uniqueness of the device on the page - if the device is not unique, then the application will report it 
    </li>  
    <li> Checking the safe device update: if the device is turned on, the application does not allow updating the device and displays a message to turn off the device before updating. 
    </li> 
  </ul>
 Information about the added devices is recorded in the database.
</p>
  
<h3>
 Techs: HTML, CSS, JavaScript, Express.js, Node.js, PostgreSQL, React, Redux-Thunk, REST API, ORM Sequelize.
</h3>

<h3> 
  How to start the app locally:
</h3>

<p>
  <ul>
    <li>
      Clone this repo <b><i> git clone git@github.com:antonsipin/Device-Master.git </i></b>
    </li>
     <li>
       Go to the backend folder <b><i> cd backend </i></b>
    </li>
    <li>
      Install the dependencies <b><i> npm install </i></b>
    </li>
    <li>
      Place the <b>.env</b> file in the root directory (you can get it from me or take a look at <b>.envexample</b> file)
    </li>
    <li>
      Run the app server <b><i> npm start </i></b> (The server starts at http://localhost:3100)
    </li>
    <li>
      Go to the frontend folder <b><i> cd frontend </i></b>
    </li>
    <li>
      Install the dependencies <b><i> npm install </i></b>
    </li>
    <li>
      Run the app <b><i> npm start </i></b> (The app starts at http://localhost:3000 in browser and you will be able to test the app)
    </li>
  </ul>
</p>
  
    <p>Add device in the database:</p><br />
      ![1](https://github.com/antonsipin/Device-Manager/assets/46906477/bf454da7-cd55-461c-bdbf-586252afcb38)
