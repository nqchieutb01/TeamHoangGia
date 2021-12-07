import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import {useGlobalContext} from "../context";
const getLocalStorage = () => {
    return [];
    let list = localStorage.getItem('list');
    if (list) {
        return (list = JSON.parse(localStorage.getItem('list')));
    } else {
        return [];
    }
};
export default function Search_element({input}) {
    const { setSearchTerm } = useGlobalContext()
    const searchValue = React.useRef('')

    const [name, setName] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [isEditingName, setIsEditingName] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, 'danger', 'please enter value');
        } else if (name && isEditingName) {
            setList(
                list.map((item) => {
                    if (item.id === editID) {
                        return { ...item, title: name };
                    }
                    return item;
                })
            );

            setName('');
            setEditID(null);
            setIsEditingName(false);
            showAlert(true, 'success', 'value changed');
        } else {
            showAlert(true, 'success', 'item added to the list');
            const newItem = { id: new Date().getTime().toString(), title: name };
            setSearchTerm(name)

            setList([...list, newItem]);
            setName('');
        }
    };

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
    };
    const clearList = () => {
        showAlert(true, 'danger', 'empty list');
        setList([]);
    };
    const removeItem = (id) => {
        showAlert(true, 'danger', 'item removed');
        setList(list.filter((item) => item.id !== id));
    };
    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        setIsEditingName(true);
        setEditID(id);
        setName(specificItem.title);
    };
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);
    return (
        // <section className='section-center_c'>
        <>
            <form className='grocery_c-form' onSubmit={handleSubmit}>
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

                <h3>{input}</h3>
                <div className='form-control_c'>
                    <input
                        type='text'
                        className='grocery_c'
                        placeholder={input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type='submit' className='submit-btn_c'>
                        {isEditingName ? 'edit' : 'submit'}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
                <div className='grocery_c-container'>
                    <List items={list} removeItem={removeItem} editItem={editItem} />
                    {/*<button className='clear-btn' onClick={clearList}>*/}
                    {/*    clear items*/}
                    {/*</button>*/}
                </div>
            )}
        </>

        // </section>
    );
}
