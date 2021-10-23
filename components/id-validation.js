/**
 * Identity Card(IC) number validation
 *
 * Valid formats of Identity Card:
 * YYMMDD-PB-###G
 * or
 * YYMMDDPB##G
 *
 * Keys: \
 * Y = Year - [ISO 8601:2000]{@link https://en.wikipedia.org/wiki/ISO_8601:2000#Truncated_representations} \
 * M = Month  -  [ISO 8601:2000]{@link https://en.wikipedia.org/wiki/ISO_8601:2000#Truncated_representations} \
 * D = Day - [ISO 8601:2000]{@link https://en.wikipedia.org/wiki/ISO_8601:2000#Truncated_representations} \
 * PB = Place of Birth \
 * \# = Generic number generate by NRDM \
 * G = Genders \
 */

const pb = require( './pb' );

const errors = {
    InvalidType: 'IC is not a string',
    InvalidLength: 'IC is not 12 or 14 characters long'
};

function validate( ic )
{
    let isHypenFormat = false;
    let parts = [];
    const error = [];
    /* 
        // validate id type
        if ( !isValidICType( ic ) ) return errors.InvalidType;
    
        // check if |id| is YYMMDD-PB-###G format or otherwise
        if ( isHyphenFormatted( ic ) ) isHypenFormat = true;
    
        // validate possible length of |id|
        if ( !isValidLength( ic ) ) return errors.InvalidLength;
     */
    // get ic parts
    parts = getParts( ic );

    const res = {
        ic: ic,
        head: parts[ 0 ],
        body: parts[ 1 ],
        tail: parts[ 2 ],
        dateOfBirth: getDateOfBirth( parts[ 0 ] ),
        placeOfBirth: getPlaceOfBirth( parts[ 1 ] ),
        gender: getGender( parts[ 2 ] ),
        valid: isValid( ic ),

        // methods
        isValid: ( () => isValid( ic ) ),
        isHyphenFormatted: ( () => isHyphenFormatted( ic ) ),
        getParts: ( () => getParts( ic ) ),
        getDateOfBirth: ( () => parts[ 0 ] ? getDateOfBirth( parts[ 0 ] ) : null ),
        getPlaceOfBirth: ( () => parts[ 1 ] ? getPlaceOfBirth( parts[ 1 ] ) : null ),
        getGender: ( () => parts[ 2 ] ? getGender( parts[ 2 ] ) : null )
    };

    return res;
}

function isValid( ic )
{
    if ( !isValidICType( ic ) ) return false;

    if ( !isValidLength( ic ) ) return false;

    if ( ic.length === 14 && !isHyphenFormatted( ic ) ) return false;
    return true;
}

function isValidICType( ic )
{
    return typeof ic === 'string' ? true : false;
}

function isHyphenFormatted( ic )
{
    return ic.indexOf( '-' ) >= 0;
}

/**
 * Validate IC length
 * @param {string} ic IC
 */
function isValidLength( ic ) 
{
    return (
        ( ic.indexOf( '-' ) && ic.length === 14 ) || ic.length === 12
    ) ? true : false;
}

/**
 * Get parts of ic (head, body, tail)
 * @param {string} ic IC
 * @returns 
 */
function getParts( ic )
{
    let parts;

    if ( !isValidICType( ic ) ) return;


    if ( isHyphenFormatted( ic ) )
    {
        parts = ic.split( '-' );
    }
    else
    {
        parts = [ ic.substr( 0, 6 ), ic.substr( 6, 2 ), ic.substr( 8, 4 ) ];
    }

    if ( parts.length !== 3 ) return;

    return parts;
}

/**
 * Date of birth
 * @param {string} dob Date of Birth
 * @returns {Date|undefined|false}
 */
function getDateOfBirth( dob )
{
    if ( dob.length !== 6 ) return;

    /*
    try to determine year of birth

    if given year is larger than current year
    like 63 > 21, then add 1900,
    and 02 < 21, then add 2000
    */

    const currentYear = new Date()
        .getFullYear()
        .toString()
        .substr( 2 ); // get year from last 2 digits
    const ymd = dob.split( /(\w{2,2})/g )
        .filter( n => n !== '' )
        .map( n => parseInt( n ) ); // filter any empty string & convert into int

    ymd[ 0 ] = ymd[ 0 ] + ( ymd[ 0 ] > currentYear ? 1900 : 2000 ); // determine year of birth is in 2000s or 1900s

    // console.log( ymd );
    try
    {
        let rDate = ymd.join( '-' );
        // console.log( rDate );
        let date = new Date( rDate );

        return date;
    }
    catch ( e )
    {
        return false;
    }
}

/**
 * get place of birth
 * @param {string} _pb Place of birth code
 * @returns {object|undefined}
 */
function getPlaceOfBirth( _pb )
{
    // check if _pb if valid
    if ( !pb.isCodeValid( _pb ) ) return;

    return pb.getPB( _pb );
}

/**
 * Get gender
 * @param {string} g Last number on the ic
 * @returns {'Female'|'Male'|undefined}
 */
function getGender( g )
{
    if ( typeof g !== 'string' ) return;
    return parseInt( g[ g.length - 1 ] ) % 2 === 0 ? 'Female' : 'Male';
}

/* const tests = {
    ic1: '041114100431',
    ic2: 0,
    ic3: '041114-10-0431'
};
console.log( validate( tests.ic1 ) );
console.log( validate( tests.ic3 ) );
 */


module.exports = {
    validate, isValidICType, isHyphenFormatted, isValidLength, getParts, getDateOfBirth, getPlaceOfBirth, getGender, isValid
};