import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
     const [profile, setProfile] = useState({
          name: '',
          email: '',
          phone: '',
          password: '', // Include password for update
     });

     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     // Fetch the profile from the API
     useEffect(() => {
          const fetchProfile = async () => {
               const token = localStorage.getItem('token');
               if (!token) {
                    toast.error('Please log in first');
                    // navigate('/login');
                    return;
               }

               try {
                    const response = await axios.get('http://localhost:8080/api/auth/profile', {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    });
                    if (response.data.success) {
                         setProfile(response.data.user);
                    } else {
                         toast.error(response.data.message);
                         // navigate('/login');
                    }
               } catch (error) {
                    toast.error('Error fetching profile');
                    console.error(error);
                    // navigate('/login');
               } finally {
                    setLoading(false);
               }
          };

          fetchProfile();
     }, [navigate]);

     // Handle input changes
     const handleChange = (e) => {
          setProfile({ ...profile, [e.target.name]: e.target.value });
     };

     // Update profile function
     const handleUpdate = async (e) => {
          e.preventDefault();

          const token = localStorage.getItem('token');
          if (!token) {
               toast.error('Please log in first');
               return;
          }

          try {
               const response = await axios.put('http://localhost:8080/api/auth/update-profile', profile, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               if (response.data.success) {
                    toast.success('Profile updated successfully');
                    navigate('/profile'); // Redirect to profile view after update
               } else {
                    toast.error(response.data.message);
               }
          } catch (error) {
               toast.error('Error updating profile');
               console.error(error);
          }
     };

     if (loading) {
          return <div>Loading...</div>;
     }

     return (
          <div className="update-profile-container">
               <h2>Update Profile</h2>
               <form onSubmit={ handleUpdate }>
                    <div className="form-group">
                         <label>Name:</label>
                         <input
                              type="text"
                              name="name"
                              value={ profile.name }
                              onChange={ handleChange }
                              className="form-control"
                         />
                    </div>
                    <div className="form-group">
                         <label>Email:</label>
                         <input
                              type="email"
                              name="email"
                              value={ profile.email }
                              className="form-control"
                              readOnly
                              disabled
                         />
                    </div>
                    <div className="form-group">
                         <label>Phone:</label>
                         <input
                              type="text"
                              name="phone"
                              value={ profile.phone }
                              onChange={ handleChange }
                              className="form-control"
                         />
                    </div>
                    {/* <div className="form-group">
                         <label>Password:</label>
                         <input
                              type="password"
                              name="password"
                              value={ profile.password }
                              onChange={ handleChange }
                              className="form-control"
                         />
                    </div> */}
                    <button type="submit" className="btn btn-primary mt-4">Update Profile</button>
               </form>
          </div>
     );
};

export default UpdateProfile;