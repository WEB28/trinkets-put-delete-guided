import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const initialItem = {
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    shipping: ''
};

const UpdateForm = props => {
    console.log(props);
    const { id } = useParams();
    const { push } = useHistory();
    // console.log(params);
    const [item, setItem] = useState(initialItem);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'price') {
        value = parseInt(value, 10);
        }

        setItem({
        ...item,
        [ev.target.name]: value
        });
    };

    // get the id from params
    // loop through the items list to find the item
    // set the item to state to pre-populate the form
    useEffect(() => {
        const itemToUpdate = props.items.find(e => `${e.id}` === id)
        if(itemToUpdate) {
            setItem(itemToUpdate);
        }
    }, [props.item, id])

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios.put(`http://localhost:3333/items/${id}`, item)
            .then(res => {
                // update state in App through the setter function
                console.log(res.data);
                props.setItems(res.data);
                push(`/item-list/${id}`)
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            onChange={changeHandler}
            placeholder="name"
            value={item.name}
            />
            <div className="baseline" />

            <input
            type="number"
            name="price"
            onChange={changeHandler}
            placeholder="Price"
            value={item.price}
            />
            <div className="baseline" />

            <input
            type="string"
            name="imageUrl"
            onChange={changeHandler}
            placeholder="Image"
            value={item.imageUrl}
            />
            <div className="baseline" />

            <input
            type="string"
            name="description"
            onChange={changeHandler}
            placeholder="Description"
            value={item.description}
            />
            <div className="baseline" />

            <input
            type="string"
            name="shipping"
            onChange={changeHandler}
            placeholder="Shipping"
            value={item.shipping}
            />
            <div className="baseline" />

            <button className="md-button form-button">Update</button>
        </form>
        </div>
    );
};

export default UpdateForm;
