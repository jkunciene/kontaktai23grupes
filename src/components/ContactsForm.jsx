import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';

const ContactsForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //1-tikrinti laukus

        //2-siusti i firestore data
        try {
            const docRef = await addDoc(collection(db, "clientsReq"), {
              name: name,    
              email: email,
              client_message: message,
              created: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="dark" type="submit">Dark</Button>
        </Form>
    )
}

export default ContactsForm
