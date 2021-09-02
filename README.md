<br />
<p align="center">
  <h1 align="center">Jella</h1>
  <p align="center">
    <strong>A Kanban board project management tool</strong>
      <br />
      <br />
    <a href="https://jella-app.herokuapp.com/"><strong>View Demo</strong></a>
    ·
    <a href="https://github.com/Gkuzin13/jella/issues">Report Bug</a>
    ·
    <a href="https://github.com/Gkuzin13/jella/issues">Request Feature</a>
  </p>
</p>

<img src="https://github.com/Gkuzin13/jella/blob/assets/jella-main.gif" alt="Jella board page">

<h2 style="display: inline-block">Table of Contents</h2>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#requirements">Requirements</a></li>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
</ol>

## About The Project

### Built With

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.dev/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Requirements

- [Node.js v14.6^](https://nodejs.dev/download)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

### Prerequisites

Install npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Gkuzin13/jella.git
   ```
2. Install Dependencies (client & server)
   ```sh
   npm install
   cd client
   npm install
   ```
3. Set Env Variables
   ```sh
   # Create a .env file in root folder and add the following
   MONGODB_URI=mongodb://127.0.0.1:27017/localjella
   SESSION_SECRET=abc123
   ```

### Run

```sh
# Run client (:3000)
npm start

# Run server (:5000)
node server
```
