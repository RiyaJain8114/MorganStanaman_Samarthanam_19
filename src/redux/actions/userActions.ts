import { AppDispatch } from '../store';
import api from '../../utils/api';
import { 
  fetchProfileStart, 
  fetchProfileSuccess, 
  fetchProfileFailure, 
  updateProfileStart, 
  updateProfileSuccess, 
  updateProfileFailure,
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
  registerForEventStart,
  registerForEventSuccess,
  registerForEventFailure
} from '../slices/userSlice';

import axios from 'axios';

// Fetch user profile
export const fetchUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchProfileStart());
    const response = await api.user.getProfile();
    dispatch(fetchProfileSuccess(response.data));
  } catch (error:unknown) {
    console.error('Error fetching profile:', error);
    let errorMessage = "Failed to fetch user profile";
    if(axios.isAxiosError(error) && error.response?.data?.message){
      errorMessage=error.response.data?.message
    }
    dispatch(fetchProfileFailure(errorMessage));
  }
};

// Update user profile
export const updateUserProfile = (profileData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateProfileStart());
    const response = await api.user.updateProfile(profileData);
    dispatch(updateProfileSuccess(response.data));
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    let errorMessage = "Failed to update user profile";
    if(axios.isAxiosError(error) && error.response?.data?.message){
      errorMessage=error.response.data?.message
    }
    dispatch(updateProfileFailure(errorMessage));
    throw error;
  }
};

// Register for event
export const registerForEvent = (eventId: string, eventData?: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerForEventStart());
    await api.events.registerForEvent(eventId);
    const payload = eventData ? { eventId, eventData } : eventId;
    dispatch(registerForEventSuccess(payload));
    return { success: true };
  } catch (error) {
    console.error('Error registering for event:', error);
    let errorMessage = "Failed to register for event";
    if(axios.isAxiosError(error) && error.response?.data?.message){
      errorMessage=error.response.data?.message
    }
    dispatch(registerForEventFailure(errorMessage));
    throw error;
  }
};

// Fetch leaderboard data
export const fetchLeaderboard = (period = 'all-time') => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchLeaderboardStart());
    const response = await api.user.getLeaderboard(period);
    dispatch(fetchLeaderboardSuccess(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    let errorMessage = "Failed to fetch leaderboard data";
    if(axios.isAxiosError(error) && error.response?.data?.message){
      errorMessage=error.response.data?.message
    }
    dispatch(fetchLeaderboardFailure(errorMessage));
    throw error;
  }
}; 