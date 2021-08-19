import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeScreen = () => {

    const contacts = useSelector((state) => state)

    const dispatch = useDispatch()

    const deleteHandler = (id) => {
        dispatch({type: "DELETE_CONTACT", payload: id})
    }

    return (
        <>
        <div className='Hscreen'>
            <header>
                <h1>Contact List</h1>
                <Link to='/add'>
                    <button>+</button>
                </Link>
            </header>
            <ul>
                {contacts.map(contact => (
                    <li>
                        <img src={contact.image} alt='not found' />
                        <h4>{contact.firstName} {contact.lastName} <p>{contact.number}</p></h4>
                        <Link to={`/edit/${contact._id}`}>
                            <button id='edit'>Edit</button>
                        </Link>
                        <button id='delete' onClick={() => deleteHandler(contact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default HomeScreen
