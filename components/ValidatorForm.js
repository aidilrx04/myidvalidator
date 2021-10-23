import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import { validate } from './id-validation';
import { IDStore } from './IDStore';

function ValidatorForm()
{
    const router = useRouter();
    const [ _id, setId ] = useState( '' );
    const [ validInput, setValidInput ] = useState( true );
    const [ disabled, setDisabled ] = useState( false );
    const [ id, dispatch ] = useContext( IDStore );
    const [ init, setInit ] = useState( true );

    useEffect( () =>
    {
        return () =>
        {
            setId( '' );
            setValidInput( true );
            setDisabled( false );
            setInit( true );
        };
    }, [] );

    useEffect( () =>
    {
        if ( router.query.id )
        {
            setId( router.query.id );

            console.log( router.query.id );

            if ( init )
            {
                validateInput( router.query.id );
                setInit( false );
            }
        }
    }, [ router, init ] );

    /*     useEffect( () =>
        {
            if ( init )
            {
                console.log( _id );
                validateInput( _id );
                setInit( false );
            }
        }, [ init, _id ] );
     */
    function validateInput( _id )
    {
        //e.preventDefault();
        setDisabled( true );
        console.log( validate( _id ) );
        if ( validate( _id ).isValid() ) 
        {
            console.log( 'id is valid' );
            dispatch( {
                type: 'SET_ID', payload: {
                    id: _id,
                    data: validate( _id )
                }
            } );
            setTimeout( () =>
            {
                document.getElementById( 'result' )?.scrollIntoView();
            }, 100 );
        }
        else
        {
            setValidInput( false );
        }
        setDisabled( false );

    }


    return (
        <div className="mx-auto mb-2 p-2 bg-white">
            <h2 className="text-center font-bold text-2xl">Validator</h2>

            <form className="my-2" onSubmit={ ( e ) => { e.preventDefault(); window.location.href = `/${_id}`; } }>
                <input type="text" placeholder="Input ic here"
                    className="block my-2 px-2 py-3 box-border text-center text-3xl bg-gray-50 w-full
                            focus:outline-none"
                    autoFocus={ true }
                    maxLength={ 14 }
                    onChange={ e =>
                    {
                        setValidInput( true );
                        setId( e.target.value );
                    } }
                    value={ _id }
                    disabled={ disabled }
                />

                {
                    !validInput &&
                    <div className="text-red-900 bg-red-200 text-center p-2 mb-2">
                        Invalid Input!
                    </div>
                }

                <button className="text-2xl font-bold block mx-auto px-3 py-2 bg-black text-white rounded transition-all
                                    hover:bg-opacity-[.8]
                                    disabled:hover:bg-opacity-[1] disabled:cursor-auto disabled:bg-gray-700"
                    disabled={ disabled }
                >
                    { disabled ? "Validating..." : 'Validate' }
                </button>
            </form>
        </div>
    );
}

export default ValidatorForm;
