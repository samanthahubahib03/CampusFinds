# CampusFinds

A web-based Lost and Found Management System for Cebu Technological
University (CTU).

CampusFinds is designed to help students and authorized university
personnel report, browse, search, and manage lost and found items
through one centralized platform.

## Tech Stack

-   **Frontend:** React.js
-   **Build tool:** Vite
-   **Language:** JavaScript (JSX)
-   **Routing:** React Router DOM
-   **Icons:** Lucide React
-   **Styling:** CSS

> **Project status:** Frontend development. The backend and database are
> not configured yet.

## Getting Started

### Prerequisites

Install the following before starting:

-   [Node.js](https://nodejs.org/) (which includes npm)
-   [Git](https://git-scm.com/)
-   A code editor such as [Visual Studio
    Code](https://code.visualstudio.com/)

To check whether Node.js and npm are installed, open a terminal and run:

``` bash
node -v
npm -v
```

### 1. Clone the repository

``` bash
git clone https://github.com/samanthahubahib03/CampusFinds.git
```

### 2. Open the project folder

``` bash
cd CampusFinds
```

### 3. Install the project dependencies

Go into the React frontend folder:

``` bash
cd client
```

Install the dependencies listed in `package.json`:

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Vite will display a local development URL in the terminal, usually:

``` text
http://localhost:5173/
```

Open that URL in your browser to view CampusFinds.

## Project Structure

The repository currently follows this structure:

``` text
CampusFinds/
├── client/
│   ├── node_modules/       # Installed packages (not committed to Git)
│   ├── public/             # Static files served directly by Vite
│   ├── src/
│   │   ├── assets/         # Images and other imported assets
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context for shared application state
│   │   ├── pages/          # Application pages
│   │   ├── utils/          # Helper functions and utilities
│   │   ├── App.jsx         # Main application component
│   │   ├── config.js       # Application configuration
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # React application entry point
│   ├── .gitignore
│   ├── eslint.config.js   # ESLint configuration
│   ├── index.html         # Vite HTML entry point
│   ├── package-lock.json  # Exact dependency versions
│   ├── package.json       # Project metadata, dependencies, and scripts
│   ├── README.md          # Frontend-specific documentation, if maintained
│   └── vite.config.js     # Vite configuration
├── .gitignore             # Root Git ignore rules
└── README.md              # Main project documentation
```


## Development Notes

-   This project is currently a frontend application built with React
    and Vite.
-   The application is intended to be developed as a web application.
-   Backend and database integration will be added in a future
    development phase.
-   Do not place passwords, API keys, or other secrets in committed
    source files.
-   Keep reusable components in `src/components`, page-level views in
    `src/pages`, shared state in `src/context`, and helper functions in
    `src/utils`.

## Contributing

1.  Clone the repository.
2.  Create a separate branch for your changes.
3.  Make and test your changes locally.
4.  Commit your changes with a clear message.
5.  Push your branch and open a pull request.

------------------------------------------------------------------------

**CampusFinds** --- Bringing Lost and Found Services Together at CTU.
