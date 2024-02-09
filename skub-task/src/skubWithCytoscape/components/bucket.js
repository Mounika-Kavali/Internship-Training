import React from 'react';

// Your Bucket component definition
const Bucket = ({ label, inData, outData }) => {
    // Check if inData and outData are defined, otherwise set them to empty strings
    console.log("HII")

    return (
        <div>
            {JSON.stringify(label)} 
            <br />
            In: {JSON.stringify(inData)} Out: {JSON.stringify(outData)}
        </div>
    );
};

// Export the Bucket component
export default Bucket;
