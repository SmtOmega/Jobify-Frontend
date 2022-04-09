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
import { initialState } from "./AppContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please enter all values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      user,
      token,
      userLocation: location,
      jobLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "Account Created, Redirecting...",
      isLoading: false,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    const text = action.payload.msg;

    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: text,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    const { user, location, token } = action.payload;
    return {
      ...state,
      user,
      token,
      userLocation: location,
      jobLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successfully, Redirecting...",
      isLoading: false,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    const text = action.payload.msg;
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: text,
      isLoading: false,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    const { user, location, token } = action.payload;
    return {
      ...state,
      user,
      token,
      userLocation: location,
      jobLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile updated successfully",
      isLoading: false,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    const text = action.payload.msg;

    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: text,
      isLoading: false,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    const { name, value } = action.payload;
    return {
      ...state,
      page: 1,
      [name]: value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "New job created",
      isLoading: false,
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    const text = action.payload.msg;

    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: text,
      isLoading: false,
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    const { jobs, numOfPages, totalJobs } = action.payload;
    return { ...state, isLoading: false, jobs, numOfPages, totalJobs };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, status, jobType } = job;

    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      jobLocation,
      company,
      status,
      jobType,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "details updated successfully",
      isLoading: false,
    };
  }

  if (action.type === EDIT_JOB_ERROR) {
    const text = action.payload.msg;

    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: text,
      isLoading: false,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchType: "all",
      searchStatus: "all",
      sort: "latest",
    };
  }
  if(action.type === CHANGE_PAGE){
    return {...state, page: action.payload.page}
  }
  throw new Error(`no such action as : ${action.type}`);
};

export default reducer;
