import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/userActions';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [cred, setCred] = useState({email: '', password: ''}) 
    const {loading, result, error} = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    useEffect(() => {
        if(result) props.history.push('/')
    }, [result, props.history])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(cred))
    }

    const handleChange = (e) => {
        setCred({   
                ...cred,
                [e.target.name]: e.target.value
            })
        }
    console.log(result)
    return ( 
        
        <div className = 'container'>
            <div className="row">
                <div className="col s4"></div>

                <form className="col input-field s4" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="row">
                        <input
                            name='email'
                            value={cred.email}
                            onChange={handleChange}
                            type='email'
                            className='validate'
                            autoComplete ='resultname'
                            />
                        <label htmlFor="email">Email</label>
                        <span 
                            className='helper-text'
                            data-error='Valid email needed'
                            data-succes='Good to go'
                        ></span>
                    </div>

                    {result ? 'Login Success' : null}
                    {error ? error : null}
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
                        <button
                            className='btn waves-effect grey'
                            type='submit'
                            name='action'
                            onClick={handleSubmit}
                        >
                        Login
                        </button>
                        &nbsp; &nbsp;
                        <Link to='/register'>
                        <button
                            className='btn waves-effect grey'
                            type='submit'
                            name='action'
                        >
                        Register
                        </button>
                        </Link>
                    </div>

                    
                       
                   

                </form>

            </div>

            
        </div>
     );
}
 
export default Login;