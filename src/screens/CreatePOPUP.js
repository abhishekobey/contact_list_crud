import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';

const CreatePOPUP = () => {

    const [firstName, setFirst] = useState("")
    const [lastName, setLast] = useState("")
    const [number, setNumber] = useState("")

    const contacts = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        const checkNumber = contacts.find(
            (contact) => contact.number === number && number
        )

        if (!firstName || !lastName || !number) {
            alert("Please fill all fields")
        } else {
            if (checkNumber) {
                alert("Number already exists in the contact list")
            } else {
                if (contacts.length === 0) {
                    const enterData = {
                        _id: 0,
                        firstName,
                        lastName,
                        number,
                        image: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
                    }
                    dispatch({ type: "ADD_CONTACT", payload: enterData })
                    history.push("/")
                } else {
                    const enterData = {
                        _id: contacts[contacts.length-1]._id + 1,
                        firstName,
                        lastName,
                        number,
                        image: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
                    }
                    dispatch({ type: "ADD_CONTACT", payload: enterData })
                    history.push("/")
                }
            }
        }
        
    }

    return (
        <div className='create'>
            <h2>Create New Contact</h2>
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
                    <button id='submit' onClick={handleSubmit}>Create Contact</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePOPUP
