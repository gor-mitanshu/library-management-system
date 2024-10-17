import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
     const [profile, setProfile] = useState({
          name: '',
          email: '',
          phone: '',
     });

     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     // Fetch the profile from the API
     useEffect(() => {
          const fetchProfile = async () => {
               const token = localStorage.getItem('token');
               if (!token) {
                    toast.error('Please log in first');
                    navigate('/login');
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
                         navigate('/login');
                    }
               } catch (error) {
                    toast.error('Error fetching profile');
                    console.error(error);
                    navigate('/login');
               } finally {
                    setLoading(false);
               }
          };

          fetchProfile();
     }, [navigate]);

     if (loading) {
          return <div>Loading...</div>;
     }

     return (
          <div className="profile-container">
               <h2>User Profile</h2>
               <div className="profile-info">
                    <p><strong>Name:</strong> { profile.name }</p>
                    <p><strong>Email:</strong> { profile.email }</p>
                    <p><strong>Phone:</strong> { profile.phone }</p>
               </div>
               <button className="btn btn-primary" onClick={ () => navigate('/update-profile') }>Edit Profile</button>
          </div>
     );
};

export default Profile;