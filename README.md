# Welcome to CodeGenie

# Project info

The only requirement is having Node.js & npm installed

Follow these steps:


# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# How to Obtain a Hugging Face Access Token
To use Hugging Face's API, you need an access token. Follow these steps to obtain one:
# Create a Hugging Face Account:
Visit Hugging Face and sign up for a new account if you don't have one.
If you already have an account, simply log in.
# Access Your Account Settings:
Once logged in, click on your profile picture or username in the top-right corner of the page.
Select "Settings" from the dropdown menu.
# Navigate to Access Tokens:
In the settings menu, find and click on the "Access Tokens" tab.
# Create a New Token:
Click on the "New token" button.
Provide a name for your token to help you remember its purpose.
Choose the appropriate role for the token. For most API interactions, the default role should suffice.
# Copy Your Token:
Once the token is created, copy it immediately. You will not be able to view it again later.
Store it securely, as it will be used to authenticate your API requests.
# Use the Token in Your Application:
Add the token to the application's code in the huggingfaceservice.ts file.
