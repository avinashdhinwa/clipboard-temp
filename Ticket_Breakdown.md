# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assumptions: 
- Custom Id can be updated only once for any agent, it should be an easy change if we want to make it editable in future as well
- Each custom id should be unique for a facility
- The time/effort provided are assuming a general day with a standup, 1-2 meetings, lunch breaks, etc.
- Separate stories for backend and frontend 


1. Frontend Support for adding custom id while onboarding a new agent
time/effort: 2 working days, 1 for implementation (may overflow to another day), 2nd day mostly for adding automated tests
description: In order for facilities to have custom ids of their agents in reports, we want facilities to be able to onboard agents with their own ids. So, we want to provide the Facilities an input box to enter custom id for their agents.
acceptance criteria:
- a new input box in onboarding flow for custom id
- while submitting, if custom id already exists then we return "Custom ID already exists" error
- add test for one failing flow and one passing flow
implementation details: 
- create input box
- add the input box value to the form which is sent for onboarding flow
- display error in case the custom id already exists

2. Backend Support for adding custom id while onboarding a new agent
time/effort: 1 working day
description: In order for facilities to have custom ids of their agents in reports, we want facilities to be able to onboard agents with their own ids. So, we add a new field, customId in the forms
acceptance criteria:
- a new field customId in the api
- if customId already exists, then return error
- save customId with Agent in the table
- add test for failing and passing flows
implementation details: 
- add field customID of type string in the api, which is used by client to send data to backend
- check in database if customId already exists
- save customId in Agent table along with other data


3. Frontend Support for adding custom id to an existing agent, the agent should have a empty custom id
time/effort: 1 day
description: We want facilities to be able to edit custom ids of agents
acceptance criteria:
- a page for selecting agent and ability to input their custom id
- error in case update fails
implementation details: 
- let user select the agent for which they want to update custom id
- we get agent's internal id, and their custom id as input
- send the (internalId, customId) data to backend
- show error if any from backend

4. Backend Support for adding custom id to an existing agent, the agent should have a empty custom id
time/effort: 1 day
description: We want facilities to be able to edit custom ids of agents
acceptance criteria:
- an api for sending customId along with internal id
- error if customID already exists
- add test for failing and passing flows
implementation details: 
- create an api, with internalId and customId as inputs
- check if customId already exists
- check if customId is empty for internalId
- for particular internalId, create transaction, save customId in the same entry


5. Add custom id in reports
time/effort: 1 day in case new column doesn't break the design (page width overflow due to a new column)
description: We want facilities to have their own custom ids as well on their reports
acceptance criteria:
- a new column for custom ids in pdfs
implementation details: 
- fetch custom id as well with rest data when fetching
- create another column in template
- fill custom id in the new column for each entry


6. Update Database Schema (in case of structured DB) with custom Id
time/effort: 2 days (assuming it would be in a phased manner, updating a few shards at a time, which don't have their peak hours), will have to work in Night as well to reduce down time for clients/facilities
description: In order for facilities to have custom ids for their agents in reports, we want to add custom id to agent schema
acceptance criteria:
- a new column for custom ids in agent table
implementation details: 
- find out shards (by facilities) which are active in which part of day
- take each shards and update it in's lowest active duration