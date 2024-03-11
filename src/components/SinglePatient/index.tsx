import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiBaseUrl } from '../../constants';
import axios from 'axios';
import patientService from "../../services/patients";
import { Patient, Gender, Entry } from '../../types';

function SinglePatient() {
    const location = useLocation();
    const { id } = location.state;

    const initialState: Patient = {
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "occupation": "New york city cop",
        "entries": [],
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        gender: Gender.Male
    };

    const [patient, setPatient] = useState<Patient>(initialState);
    console.log({ patient });

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

        const fetchPatient = async () => {
            const patient = await patientService.getOne(id);
            setPatient(patient);

        };
        void fetchPatient();
    }, [id]);



    return (
        <div>
            <h1>SinglePatient</h1>
            <h2>Name: {patient.name} - Gender: {patient.gender}</h2>
            <p>ID:{patient.id}</p>
            <p>DOB: {patient.dateOfBirth} - SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries:
            </h3>
            {patient.entries.map((entry: Entry) => {
                return (<div key={entry.id}>

                    <p>{entry.date} - {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}

                    </ul>
                </div>
                );
            })}
        </div>
    );
}

export default SinglePatient;