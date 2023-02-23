import React, { useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function SubscribeForm() {
  const initialState = {
    fullName : "",
    email : "",
    subscribed: false
  }

  const subscribeReducer = (state, action) => {
    console.log("-->Reached here<--");
    switch (action.type) {
      case "setFullName":
        return {
          fullName: action.fullName,
          email: state.email,
          subscribed: state.subscribed
        }
      case "setEmail":
        return {
          fullName: state.fullName,
          email: action.email,
          subscribed: state.subscribed
        }
      case "isSubscribed":
        {
          console.log("-->isSubscribed starts-->", state, "<--ends");
          return {
            fullName: action.fullName,
            email: state.email,
            subscribed: true
          }
        }
      case "hasSubscribed":
        return {
          fullName: state.fullName,
          email: state.email,
          subscribed: true
        }
      default:
        return {
          fullName : "",
          email : "",
          subscribed: false
        }
    }
  }

  const [subscribe, subscribeDispatch] = useReducer(subscribeReducer, initialState)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
          fullName : subscribe.fullName,
          email: subscribe.email
      }
      axios.post('https://truintenttechnologies.com/demo-api.php', data).then(
        (response) => { 
            console.log(response);
        }
      ).catch(
        (error) => { 
            console.log(error);
        }
      );
      Cookies.set("fullName", data.fullName, 30)
      subscribeDispatch({type: "hasSubscribed"});
    } catch (error) {
      console.error("-->Try Catch Error<--", error);
    }
  }

  if(Cookies.get("fullName") !== undefined || Cookies.get("fullName") !== ''){
    subscribeDispatch({type: "isSubscribed", fullName: Cookies.get("fullName")});
    console.log("Value of subscribe.subscribed -->", subscribe.subscribed, "<--");
  }

  return (
    <>
    <div>Hello testing</div>
    {/* subscribe.subscribed == true ? "true" : "false" */}
    {/* {subscribe.subscribed? <div className='hello-bar'>Hello, <b>{subscribe.fullName}</b></div> :
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" value={subscribe.fullName} onChange={(e) => { subscribeDispatch({type: "setFullName", fullName: e.target.value})}} />
      </label>
      <label>
        Email:
        <input type="email" value={subscribe.email} onChange={(e) => { subscribeDispatch({type: "setEmail", email: e.target.value})}} />
      </label>
      <button type="submit">Subscribe</button>
    </form>} */}
    </>
    
  );
}

export default SubscribeForm;
