import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';

const EditPOPUP = () => {

    const [firstName, setFirst] = useState("")
    const [lastName, setLast] = useState("")
    const [number, setNumber] = useState("")

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const contacts = useSelector((state) => state)
    const current = contacts.find(contact => contact._id === parseInt(id))

    useEffect(() => {
        if (current) {
            setFirst(current.firstName)
            setLast(current.lastName)
            setNumber(current.number)
        }
    }, [current])

    const handleSubmit = (e) => {
        e.preventDefault()

        const checkNumber = contacts.find(
            (contact) => contact._id !== parseInt(id) && contact.number === number
        )

        if (!firstName || !lastName || !number) {
            alert("Please fill all fields")
        } else {
            if (checkNumber) {
                alert("Number already exists in the contact list")
            } else {
                const enterData = {
                    _id: parseInt(id),
                    firstName,
                    lastName,
                    number,
                    image: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
                }
                dispatch({ type: "UPDATE_CONTACT", payload: enterData })
                history.push("/")
            }
        }
        
    }

    return (
        <>
        {current ? (
            <div className='create'>
                <h2>Edit Contact {id}</h2>
                <form>
                    <div className='firstname'>
                        <label>First Name </label>
                        <input 
                            type="text"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirst(e.target.value)} 
                        />
                    </div>
                    <div className='lastname'>
                        <label>Last Name </label>
                        <input 
                            type="text"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLast(e.target.value)} 
                        />
                    </div>
                    <div className='number'>
                        <label>Contact Number </label>
                        <input
                            type="text"
                            placeholder='Contact Number'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)} 
                        />
                    </div>
                    <div className='buttons'>
                        <Link to='/'>
                            <button id='cancel'>Cancel</button>
                        </Link>
                        <button id='submit' onClick={handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        ):(
        <>
            {alert("ID NOT EXIST")}
            {history.push('/')}
        </>
        )}
        </>
    )
}

export default EditPOPUP
