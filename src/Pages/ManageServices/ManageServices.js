import React, { useEffect, useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    const handleDelete = id => {
        const url = `http://localhost:5000/services/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) { //acconding to doc
                    alert('Successfully Deleted')
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining)
                }

            })
    }
    return (
        <div>
            <h1 className="text-primary mt-4 mb-4 fw-bold">Welcome to Service Manager</h1>
            {
                services.map(service => <div key={service._id}
                > <h3>{service.name}</h3>
                    <img src={service.img} alt="" /> <br /> <br />
                    <button onClick={() => handleDelete(service._id)} className="mt-3 mb-3">Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageServices;