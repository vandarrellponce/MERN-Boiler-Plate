import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../actions/userActions';


const RegisterPage = (props) => {

    const [cred, setCred] = useState({
        email: '', 
        password: '',
        name: '',
        lastname: ''
    }) 
    const [rePassword, setRePassword] = useState('')
    const [notification, setNotification] = useState('')
    const {loading, result, error} = useSelector(state => state.userRegister)

    const dispatch = useDispatch()

    useEffect(() => {
        if(result) props.history.push('/')
    }, [result, props.history])

    const handleSubmit = (e) => {
        setNotification('')
        e.preventDefault()

        if(!isPasswordValid()) return setNotification('Password should match')

        dispatch(registerUser(cred))
    }

    const handleChange = (e) => {
        setCred({   
                ...cred,
                [e.target.name]: e.target.value
            })
        }
    const isPasswordValid = () => {
        return cred.password === rePassword
    }

    return ( 
        <div className = 'container'>
        <div className="row">
            <div className="col s4"></div>

            <form className="col input-field s4" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="row">
                    <input
                        name='email'
                        value={cred.email}
                        onChange={handleChange}
                        type='email'
                        className='validate'
                        autoComplete ='username'
                        />
                    <label htmlFor="email">Email</label>
                    <span 
                        className='helper-text'
                        data-error='Valid email needed'
                        data-succes='Good to go'
                    ></span>
                </div>

                {result ? 'Registration Success' : null}
                {notification.length ? notification : error ? error : null}
                {loading ? 'Loading...' : null}
                

                <div className="row">
                    <input
                        name='password'
                        value={cred.password}
                        onChange={handleChange}
                        type='password'
                        className='validate'
                        autoComplete ='current-password'
                        />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="row">
                    <input
                        name='rePassword'
                        value={rePassword}
                        onChange={e => setRePassword(e.target.value)}
                        type='password'
                        className='validate'
                        autoComplete ='current-password'
                        />
                    <label htmlFor="password">Re-Enter Password</label>
                </div>

                <div className="row">
                    <input
                        name='name'
                        value={cred.name}
                        onChange={handleChange}
                        type='text'
                        className='validate'
                        />
                    <label htmlFor="name">Name</label>
                </div>

                <div className="row">
                    <input
                        name='lastname'
                        value={cred.lastname}
                        onChange={handleChange}
                        type='text'
                        className='validate'
                        />
                    <label htmlFor="name">Last Name</label>
                </div>

                <div className="row">
                    <button
                        className='btn waves-effect grey'
                        type='submit'
                        name='action'
                        onClick={handleSubmit}
                    >
                    Create Account
                    </button>
                   
                </div>

                
                   
               

            </form>

        </div>

        
    </div>
     );
}
 
export default RegisterPage;