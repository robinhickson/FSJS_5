# employee_directory
FSJS Project 5

Employee Directory with modal window and search functionality

Uses Fetch to get data from server, and then manipulates that data to provide a rendered directory with cards, each representing one employee.

Various changes have been made to the CSS (via SASS files) to provide variables representing new colours, and the entire directory makes use of FLexbox and Grid to ensure responsiveness. See the SCSS files for breakdowns (e.g. component/grid.scss, utilities/variables.scss), or styles.css for complete CSS.



Note: Phone number format follows the rubric, but not strictly the 'Note', because it makes no sense to format all mobile numbers as US cell numbers. Therefore any format from the database is preserved as nationally recognised. However, if absolutely required, the solution would be to restrict all phone numbers to US numbers in the UIR query, and use something like the following regex to replace any input with the (123) 123-1234 format

```
const UScellRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

if (UScellRegex.test(phone)) {
    let USformatNumber =
        phone.replace(UScellRegex, "($1) $2-$3");
} 

```

But I don't believe this is required, and it's not specified so in the rubric.