import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePost(props){
//i dont think im doing this right :(
    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        let title = e.target.title.value;
        let body = e.target.body.value;

        if ( props.login() !== true){
            props.flashMessage('You must be logged in order to Create a post', 'danger')
        }

        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer' + token)

        localStorage.setItem('token');
        localStorage.setItem('expiration');


        let formData = JSON.stringify({
            title: e.target.title.value,
            body: e.target.body.value,
        
        })

        fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: myHeaders,
                body: formData 
            })


            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.error(data.error)
                } else {
                    props.flashMessage('You have successfully created a new post', 'success')
                    navigate('/') 
                }

            })    
    }

    return (
        <>
        <h4 className="text-center">Create Post</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type='text' className='form-control' placeholder='Enter title' name='title' />
                    <label htmlFor="body">Body</label>
                    <input type='body' className='form-control' placeholder='Enter body' name='body' />
                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Submit Post' />
                </div>
            </form>
        </>
    )

}




