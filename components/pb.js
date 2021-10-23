const pbCodes = require( './pb_codes.json' );


function getStates()
{
    return pbCodes.map( item => item.state );
}

function getCodes()
{
    return pbCodes.reduce( ( a, c ) => ( [ ...a, ...c.codes ] ), [] )
        .sort( ( a, b ) => a - b );
}

function getState( code )
{
    let state;
    try
    {
        pbCodes.forEach( item =>
        {
            if ( item.codes.indexOf( code ) >= 0 )
            {
                state = item.state;
                throw { message: 'Exit this bulsshi' };
            }
        } );
    }
    catch ( e )
    { }

    return state;
}

function getStateCodes( state )
{
    let codes;
    try
    {
        pbCodes.forEach( item =>
        {
            if ( item.state === state )
            {
                codes = item.codes;
                throw { message: 'Exits loop' };
            }
        } );
    } catch ( error )
    {

    }

    return codes;
}

function isCodeValid( code )
{
    return getCodes().indexOf( code ) >= 0 ? true : false;
}

function getPB( soc )
{
    let s;

    try
    {
        pbCodes.forEach( item =>
        {
            if ( item.state === soc || item.codes.indexOf( soc ) >= 0 )
            {
                s = item;
                throw { message: 'Exit loop' };
            }
        } );
    } catch ( error )
    {

    }

    return s;
}
/* 
console.log( '-----------pb test-------' );

console.log( getStates() );
console.log( getCodes() );
console.log( getState( '01' ) );
console.log( getStateCodes( 'Johor' ) );
console.log( getPB( 'Selangor' ) );
console.log( getPB( '10' ) );

for ( let i = 0; i < getStates().length; i++ )
{
    console.log( getStates()[ i ], getStateCodes( getStates()[ i ] ) );
}

console.log( '-----------end pb test-------' );
 */

module.exports = {
    getState,
    getStates,
    getCodes,
    getStateCodes,
    getPB,
    isCodeValid
};