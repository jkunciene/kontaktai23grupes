import { useState, useEffect } from 'react';

import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

import Table from 'react-bootstrap/Table';


const QuestionsTable = () => {
    const [questions, setQuestion] = useState([]);

    const getDataFromFirestore = async () => {
        const data = await getDocs(collection(db, "clientsReq"));
        const tempQuestion = data.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data()
            }));
        // console.log(tempQuestion);
        setQuestion(tempQuestion);
    }

    useEffect(() => {
        //kada iskviesti duomenu gavimo funkcija
        getDataFromFirestore();
    }, []);

    console.log(questions);

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Client Name</th>
                    <th>Question</th>
                </tr>
            </thead>
            <tbody>
                {questions && questions.map((oneQuestion, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{oneQuestion.name}</td>
                        <td>{oneQuestion.client_message}</td>
                    </tr>
                )

                )}
            </tbody>
        </Table>
    )
}

export default QuestionsTable
