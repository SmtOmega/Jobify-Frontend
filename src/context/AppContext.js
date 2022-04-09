import React, { useContext, useReducer } from "react";
import {
  CHANGE_PAGE,
  CLEAR_ALERT,
  CLEAR_FILTERS,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  HANDLE_CHANGE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_EDIT_JOB,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "./action";
import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location || "",
  showSideBar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: location || "",
  jobTypeOptions: ["full-time", "part-time", "internship", "remote"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispacth] = useReducer(reducer, initialState);

  const publicUrl = process.env.REACT_APP_PUBLIC_URL
  const authFetch = axios.create({
    baseURL: `${publicUrl}/api/v1`,
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  const displayAlert = () => {
    dispacth({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispacth({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = (data) => {
    const { user, token, location } = data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
  const registerUser = async (currentUser) => {
    dispacth({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(`${publicUrl}/api/v1/auth/register`, currentUser);
      dispacth({ type: REGISTER_USER_SUCCESS, payload: response.data });

      addUserToLocalStorage(response.data);
    } catch (error) {
      dispacth({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (userData) => {
    dispacth({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(`${publicUrl}/api/v1/auth/login`, userData);
      dispacth({ type: LOGIN_USER_SUCCESS, payload: response.data });
      addUserToLocalStorage(response.data);
    } catch (error) {
      dispacth({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const toggleSideBar = () => {
    dispacth({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispacth({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (userDetails) => {
    dispacth({ type: UPDATE_USER_BEGIN });
    try {
      const response = await authFetch.patch("/auth/updateUser", userDetails);
      console.log(response.data);
      dispacth({ type: UPDATE_USER_SUCCESS, payload: response.data });
      addUserToLocalStorage(response.data);
    } catch (error) {
      dispacth({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          logoutUser();
        }, 3010);
      }
    }
    clearAlert();
  };

  const handleChangeGlobal = (data) => {
    dispacth({ type: HANDLE_CHANGE, payload: data });
  };

  const clearValues = () => {
    dispacth({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispacth({ type: CREATE_JOB_BEGIN });

    try {
      const { position, company, jobLocation, status, jobType } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        status,
        jobType,
      });
      dispacth({ type: CREATE_JOB_SUCCESS });
      dispacth({ type: CLEAR_VALUES });
    } catch (error) {
      dispacth({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          logoutUser();
        }, 3010);
      }
    }
    clearAlert();
  };

  const getJobs = async () => {
    const {sort, search, searchType, searchStatus, page } = state
    dispacth({ type: GET_JOBS_BEGIN });
    let url = `/jobs?page=${page}&status=${searchStatus}&sort=${sort}&jobType=${searchType}`;

    if(search){
      url = url + `&search=${search}`
    }
    try {
      const response = await authFetch(url);
      dispacth({ type: GET_JOBS_SUCCESS, payload: response.data });
    } catch (error) {
      logoutUser()
    }
    
    clearAlert();
  };

  const setEditJob = (id) => {
    dispacth({ type: SET_EDIT_JOB, payload: { id } });
  };
  const deleteJob = async (id) => {
    dispacth({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const editJob = async () => {
    dispacth({ type: EDIT_JOB_BEGIN });

    try {
      const { editJobId, position, company, status, jobLocation, jobType } =
        state;
      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispacth({ type: EDIT_JOB_SUCCESS });
      dispacth({ type: CLEAR_VALUES });
    } catch (error) {
      dispacth({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          logoutUser();
        }, 3010);
      }
    }
    clearAlert();
  };

  const showStats = async () => {
    dispacth({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispacth({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser()
    }
    clearAlert();
  };


  const clearFilters = () => {
    dispacth({type: CLEAR_FILTERS})
  }
  const changePage = (page) => {
    dispacth({type: CHANGE_PAGE, payload: {page}})
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSideBar,
        logoutUser,
        updateUser,
        handleChangeGlobal,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters, 
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
