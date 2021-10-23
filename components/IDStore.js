const { createContext, useReducer } = require( "react" );

const initState = {
    id: '',
    data: null
};

export const IDStore = createContext( initState );

export function IDStoreProvider( { children } )
{
    const [ id, dispatch ] = useReducer( ( state, action ) =>
    {
        switch ( action.type )
        {
            case 'SET_ID':
                return action.payload;

            case 'RESET':
                return initState;
            default:
                return state;
        }
    }, initState );
    return (
        <IDStore.Provider value={ [ id, dispatch ] }>
            { children }
        </IDStore.Provider>
    );
}