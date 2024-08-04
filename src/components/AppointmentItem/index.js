// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onFilterActive} = props
  const {id, title, date, isStarred} = appointmentDetails
  const filterActivate = () => {
    onFilterActive(id)
  }
  const filteredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-cards">
      <div className="appointment-cards-1">
        <p className="para">{title}</p>
        <button
          className="appointment-button"
          onClick={filterActivate}
          data-testid="star"
          type="button"
        >
          <img src={filteredImage} className="star" alt="star" />
        </button>
      </div>
      <p className="Date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
