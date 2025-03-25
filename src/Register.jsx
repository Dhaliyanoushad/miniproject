import { useState } from "react";
import { register } from "./api";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
