# SWE-Project-study_straight

[Project description] - TBA

[setup and requirements]

clone the project, open it in a sensible application of your choice

you should have:

    backend

        SS_backend

        study_log

        task_calendar

        user_management

        db.sqlite3 -> eventually will be deleted once we fully set up PostgreSQL

        manage.py

        requirements.txt

    frontend

        src

        jsconfig.json

        next.config.mjs

        package-lock.json

        package.json

    .gitignore
    README.md
    run.ps1 -> allows you to run the server and app without having to manually change directories

before you start, ensure you have the latest version of python and node.js installed

python link: https://www.python.org/downloads/

node.js link: https://nodejs.org/en/download/package-manager

open a new terminal within the project directory, this can be done within the application you're using to open the workspace

1) run this command:

cd backend

pip install -r requirements.txt

this allows you install all of the required modules for the django project

2) start the virtual envionment (I'll probably add this to the executable file)

within the backend folder, create your virtual environemnt:

virtualenv venv

to run the virtual environment (also within the backend folder):

venv/Scripts/activate -> this command requires that you're in the directory containing the virtual environment

3) setup frontend

you do not have the node modules installed for this project

to install them, navigate to the frontend folder and call this command:

npm install

this should install all of the required modules specified by the package.json files within the folder


4) check if you've set up django and next.js 

navigate to the project directory with this command:

cd ..

run the executable provided within the folder with:

.\run

note that run.ps1 is a powershell file, you are required to use powershell to run this executable

howver, I'll try to make a new executable that can be run another terminal :-]






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
