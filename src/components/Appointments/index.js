// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', onFilterActive: false}

  onFilter = () => {
    const {onFilterActive} = this.state
    this.setState({onFilterActive: !onFilterActive})
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title,
      date: formatedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onFilterActive = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachitem => {
        if (id === eachitem.id) {
          return {...eachitem, isStarred: !eachitem.isStarred}
        }
        return eachitem
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, onFilterActive} = this.state
    if (onFilterActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }

    return appointmentList
  }

  render() {
    const {title, date, onFilterActive} = this.state
    const filterClassName = onFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="container">
        <div className="card">
          <div className="appointment-card-1">
            <div className="card-1-form-container">
              <h1 className="heading">Add Appoinment</h1>
              <form className="form-container" onSubmit={this.submitForm}>
                <label htmlFor="title-header" className="label">
                  TITLE
                </label>
                <input
                  placeholder="Title"
                  id="title-header"
                  type="text"
                  className="search-input"
                  onChange={this.addTitle}
                  value={title}
                />
                <label htmlFor="title-header" className="label">
                  DATE
                </label>
                <input
                  id="date-header"
                  type="date"
                  className="search-input"
                  onChange={this.addDate}
                  value={date}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <div className="appointment-card-2">
            <h1 className="head-1">Appointments</h1>
            <button
              className={`button-1 ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="unorder-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                onFilterActive={this.onFilterActive}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
