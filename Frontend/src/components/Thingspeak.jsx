import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function ThingSpeakData() {
    const [fieldValue, setFieldValue] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/thingspeak');
                console.log(response.data);
                setFieldValue(response.data.field1);
            } catch (error) {
                console.error('Error fetching data from ThingSpeak:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
        <h2>Movement Data</h2>
        <p>Value of Field 1: {fieldValue}</p>
        <iframe
                width="450"
                height="260"
                style={{ border: '1px solid #cccccc' }}
                src="https://thingspeak.com/channels/2295351/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line"
                title="ThingSpeak Chart"
            ></iframe>
        </div>
    );
}

export default ThingSpeakData