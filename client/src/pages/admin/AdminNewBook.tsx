import { useState } from 'react';
import Modal from '../../components/wrappers/Modal';
import { useModal } from '../../layouts/ModalContext';
import styles from "../../styles/components/post.module.css"

const AdminNewBook = () => {
    const [formData, setFormData] = useState({
        src: '',
        title: '',
        author: '', 
        description: '',
        genre: '',
        published: '',
    });

    const {open} = useModal();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/admin/books', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Book added successfully!');
            } else {
                console.error('Failed to add book.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeDesscription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Modal open={open}>
            <div className={styles.container}>
                <h1>Add New Book</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Image Source:
                        <input
                            type="text"
                            name="src"
                            value={formData.src}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Author:
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChangeDesscription}
                        />
                    </label>
                    <label>
                        Genre:
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Published:
                        <input
                            type="text"
                            name="published"
                            value={formData.published}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Modal>
    );
};

export default AdminNewBook;