import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddEdit = () => {
    const initialState = {
        name: "",
        email: "",
        contact: "",
    };

    const [state, setState] = useState(initialState);

    const addContact = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/user", data);
            if (response.status === 200) {
                toast.success(response.data);
            }
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(state);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    return (
        <div>
            <h1>Add Edit</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" value={state.name} onChange={handleChange} placeholder="Name" />
                <input type="text" id="email" value={state.email} onChange={handleChange} placeholder="Email" />
                <input type="number" id="contact" value={state.contact} onChange={handleChange} placeholder="Contact" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddEdit;
