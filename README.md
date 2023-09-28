# V-Assignment-API-Backend
#Tools Used:
1) Node JS
2) Express JS
3) Database: MongoDb
4) VS Code as text-editor

`A Simple API to create any user in the records provided with a user_id, user_name and bank_accounts.`

#Structure of the API:

#For POST request:
"Provide the following details":
`user_id`   : Number
`user_name` : String
`Bank Accounts`: Array {You can Look for the IFSC codes in the IFSC-List.json} file.

#For GET request:
Sends all the users which were created using the POST request from the database
