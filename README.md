# employee_directory
FSJS Project 5

Employee Directory with modal window and search functionality

Uses Fetch to get data from server, and then manipulates that data to provide a rendered directory with cards, each representing one employee.

Various changes have been made to the CSS (via SASS files) to provide variables representing new colours, Google font, etc, and the entire directory makes use of Flexbox and Grid to ensure responsiveness. Borders have been added to moused-over cards, and the search function makes use of opacity and background colours for the filter effects.
See the SCSS files for breakdowns (e.g. component/grid.scss, utilities/variables.scss), or styles.css for complete CSS.



Note: Phone number format follows the rubric, although reluctantly: it makes little sense to format all mobile numbers as US cell numbers. But to ensure this narrow compliance, the UIR query has been restricted to US 'employees', and hence cell numbers. If you did this in real life with an international database (or with the order of the birthday MM/DD/YYYY instead of DD/MM/YYYY), you'd risk confusing a lot of people. A better solution would be to parse the code for each specific nationality, oe else just leave it as (presumably correctly) entered into the database.
