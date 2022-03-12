## Hospital API | Node JS

## Description

This is API for managing hospital such as creating doctors account, adding patients and mangang their report data.

## Instructions

If you would like to download the code and try it for yourself:

1. Clone the repo: `https://github.com/Akhilesh17-Tech/Hospital_API.git`
2. Install packages: `npm install`
3. Launch: Run `npm start` to run server
4. Visit in your browser at: `http://localhost:3000`

## Functionalities

1. Doctor Registration (password are encrypted)
2. Doctor Login
3. Patient Registration
4. Report Creation
5. Getting report of particular patient with patient ID
6. Getting report with the status
7. Getting report with report code

## Routes

1. /doctor/register -> with user phone number, name, password and confirm password
2. /doctor/login -> return JWT to be used for authentication
3. /patient/register -> with patient phone number and name these requires docter's login
4. /patient/:id/create_report -> Creating report these requires doctor's login
5. /patient/:id/all_reports -> Getting all reports with patient ID these requires doctor's login
6. /report/:status -> Getting all the report with particular status these requires doctor's login
7. /report/get_report/:code -> Getting report with the code these doesn't requires doctor's login
