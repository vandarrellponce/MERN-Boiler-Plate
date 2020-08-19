import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../actions/userActions'

const Home = (props) => {
const dispatch = useDispatch()
const { user , loading, error } = useSelector(state => state.userProfile)

useEffect( () => {
    dispatch(getUserProfile())
}, [dispatch])

// Status checking / Error guarding
if(loading) return "Loading"
if(error) return "Error Data Request: " + error
if(!user) return "Loading"

return ( 
    <div>
        HOME PAGE
        <br/>
        {user.name}
    </div>
);
}

export default Home;