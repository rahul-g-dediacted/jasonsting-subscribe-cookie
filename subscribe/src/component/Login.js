import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function SubscribeForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data ={
            fullName : fullName,
            email: email
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
      setCookie('fullName', data.fullName, 30);
      setFullName(data.fullName);
      setHasSubscribed(true);
    } catch (error) {
      console.error(error);
    }
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

//   const getCookie = (name) => {
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const cookies = decodedCookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i];
//       while (cookie.charAt(0) === ' ') {
//         cookie = cookie.substring(1);
//       }
//       if (cookie.indexOf(name + '=') === 0) {
//         return cookie.substring(name.length + 1, cookie.length);
//       }
//     }
//     return null;
//   };

  if (hasSubscribed) {
    return <h1>Hello, {fullName}!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Subscribe</button>
    </form>
  );
}

export default SubscribeForm;
