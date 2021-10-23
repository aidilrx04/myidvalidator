import React, { useContext, useEffect } from 'react';
import { IDStore } from './IDStore';

function InformationDetail()
{
    const [ id ] = useContext( IDStore );
    const dob = id.data?.dateOfBirth;


    useEffect( () => console.log( id ), [ id ] );
    return (
        id.data
            ? <div className="bg-white mb-2" id="result">
                <h3 className="px-2 py-3 font-bold text-xl text-center border-b-[3px] border-black">ID Information</h3>
                <div className="px-2 py-3">
                    <table className="table-fixed  border border-black w-full">
                        <tbody>
                            <Tr>
                                <Td>IC Number </Td>
                                <Tdd> { id.id } </Tdd>
                            </Tr>
                            <Tr>
                                <Td>Date Of Birth</Td>
                                <Tdd>
                                    {
                                        `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`
                                    }
                                </Tdd>
                            </Tr>
                            <Tr>
                                <Td>Age</Td>
                                <Tdd>{ new Date().getFullYear() - dob.getFullYear() } years old</Tdd>
                            </Tr>
                            <Tr>
                                <Td>Gender</Td>
                                <Tdd>{ id.data.gender }</Tdd>
                            </Tr>
                            <Tr>
                                <Td>Place Of Birth</Td>
                                <Tdd>{ id.data.placeOfBirth.state }({ id.data.placeOfBirth.codes.join( ', ' ) })</Tdd>
                            </Tr>
                            <Tr>
                                <Td>Place Of Birth Code</Td>
                                <Tdd>{ id.data.body }</Tdd>
                            </Tr>
                        </tbody>
                    </table>
                </div>
            </div>
            : null
    );
}

function Tr( { children, className, ...props } )
{
    return (
        <tr className={ `border border-collapse border-black ${className}` } { ...props }>
            { children }
        </tr>
    );
}

function Td( { children, className, ...props } )
{
    return (
        <td className={ `border border-collapse border-black  w-40 px-2 py-3 text-center font-bold ${className}` } { ...props }>{ children }</td>
    );
}
function Tdd( { children, className, ...props } )
{
    return (
        <td className={ `border border-collapse border-black px-2 py-3${className}` } { ...props }>{ children }</td>
    );
}

export default InformationDetail;
