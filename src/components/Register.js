import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        //console.log(e)

        //check that the passwords match
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass){
            console.log('Passwords do not match')
            props.flashMessage('Your passwords do not match', 'danger')
        } else {
            console.log('passwords do not match')
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: myHeaders,
                body: formData 
            })

            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                } else {
                    props.flashMessage('You have successfully registered')
                    navigate('/') 
                }
            })
        }
        
    }

    return (
        <>
            <h4 className="text-center" >Register</h4>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type='text' className='form-control' placeholder='Enter Email' name='email' />
                    <label htmlFor="username">Username</label>
                    <input type='text' className='form-control' placeholder='Enter Username' name='username' />
                    <label htmlFor="password">Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' />
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password Again' name='confirmPass' />

                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Register' />
                </div>
            </form>
        </>
    )
}
